import { useState, useRef, useEffect, useCallback } from 'react';

export interface TunerState {
    note: string | null;
    cents: number;
    frequency: number | null;
    isListening: boolean;
    error: string | null;
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

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            const ctx = audioContextRef.current;
            analyzerRef.current = ctx.createAnalyser();
            analyzerRef.current.fftSize = 2048;

            sourceRef.current = ctx.createMediaStreamSource(stream);
            sourceRef.current.connect(analyzerRef.current);

            setState(prev => ({ ...prev, isListening: true }));

            // Placeholder for detection loop
            const detectPitch = () => {
                if (!analyzerRef.current) return;

                const buffer = new Float32Array(analyzerRef.current.fftSize);
                analyzerRef.current.getFloatTimeDomainData(buffer);

                // TODO: Implement Autocorrelation / Pitch Detection Algorithm here
                // For now, we just loop

                requestRef.current = requestAnimationFrame(detectPitch);
            };

            detectPitch();

        } catch (err: any) {
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
