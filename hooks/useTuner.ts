import { useState, useRef, useEffect, useCallback } from 'react';

export interface TunerState {
    note: string | null;
    cents: number;
    frequency: number | null;
    isListening: boolean;
    error: string | null;
}

// Standard tuning frequencies (A4 = 440Hz)
const A4 = 440;
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Convert frequency to note name and cents deviation
 * @param frequency - Frequency in Hz
 * @returns Object with note name and cents deviation
 */
function frequencyToNote(frequency: number): { note: string; cents: number; octave: number } {
    // Calculate semitones from A4 (440Hz)
    const semitones = 12 * Math.log2(frequency / A4);
    const noteIndex = Math.round(semitones) + 9; // +9 because A is index 9
    const cents = Math.floor((semitones - Math.round(semitones)) * 100);

    const octave = Math.floor(noteIndex / 12) + 4;
    const note = NOTE_NAMES[(noteIndex % 12 + 12) % 12];

    return { note, cents, octave };
}

/**
 * Autocorrelation pitch detection algorithm
 * Based on McLeod Pitch Method (MPM)
 * @param buffer - Audio buffer
 * @param sampleRate - Sample rate in Hz
 * @returns Detected frequency in Hz, or -1 if no pitch detected
 */
function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    const size = buffer.length;
    const maxSamples = Math.floor(size / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;

    // Calculate RMS (Root Mean Square) to check if signal is strong enough
    for (let i = 0; i < size; i++) {
        rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / size);

    // If signal is too weak, return -1 (no pitch detected)
    if (rms < 0.01) return -1;

    // Find the lag with highest correlation
    let lastCorrelation = 1;
    for (let offset = 1; offset < maxSamples; offset++) {
        let correlation = 0;

        for (let i = 0; i < maxSamples; i++) {
            correlation += Math.abs(buffer[i] - buffer[i + offset]);
        }

        correlation = 1 - (correlation / maxSamples);

        if (correlation > 0.9 && correlation > lastCorrelation) {
            const foundGoodCorrelation = correlation > bestCorrelation;
            if (foundGoodCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        }
        lastCorrelation = correlation;
    }

    if (bestCorrelation > 0.01 && bestOffset !== -1) {
        return sampleRate / bestOffset;
    }
    return -1;
}

export function useTuner() {
    const [state, setState] = useState<TunerState>({
        note: null,
        cents: 0,
        frequency: null,
        isListening: false,
        error: null,
    });

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const requestRef = useRef<number | null>(null);

    const startListening = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, error: null }));

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    autoGainControl: false,
                    noiseSuppression: false
                }
            });

            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            const ctx = audioContextRef.current;
            analyzerRef.current = ctx.createAnalyser();
            analyzerRef.current.fftSize = 2048;
            analyzerRef.current.smoothingTimeConstant = 0.8;

            sourceRef.current = ctx.createMediaStreamSource(stream);
            sourceRef.current.connect(analyzerRef.current);

            setState(prev => ({ ...prev, isListening: true }));

            // Pitch detection loop
            const detectPitch = () => {
                if (!analyzerRef.current || !audioContextRef.current) return;

                const buffer = new Float32Array(analyzerRef.current.fftSize);
                analyzerRef.current.getFloatTimeDomainData(buffer);

                const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);

                if (frequency > 0) {
                    // Filter out unrealistic frequencies (guitar range: ~80Hz - 1200Hz)
                    if (frequency >= 70 && frequency <= 1400) {
                        const { note, cents } = frequencyToNote(frequency);

                        setState(prev => ({
                            ...prev,
                            note,
                            cents,
                            frequency: Math.round(frequency * 10) / 10
                        }));
                    }
                }

                requestRef.current = requestAnimationFrame(detectPitch);
            };

            detectPitch();

        } catch (err: unknown) {
            console.error("Microphone Access Error:", err);
            setState(prev => ({
                ...prev,
                isListening: false,
                error: "Microphone access denied. Please allow permissions."
            }));
        }
    }, []);

    const stopListening = useCallback(() => {
        if (sourceRef.current) {
            sourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
            sourceRef.current.disconnect();
        }
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        setState(prev => ({ ...prev, isListening: false, note: null, frequency: null }));
    }, []);

    useEffect(() => {
        return () => stopListening();
    }, [stopListening]);

    return {
        ...state,
        startListening,
        stopListening
    };
}
