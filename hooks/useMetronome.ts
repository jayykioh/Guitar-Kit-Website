
// Custom hook for Web Audio Metronome
// Uses lookahead scheduling for precise timing

import { useState, useEffect, useRef } from 'react';

interface MetronomeOptions {
    bpm: number;
    onTick?: (beat: number) => void;
}

export function useMetronome({ bpm }: MetronomeOptions) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextNoteTimeRef = useRef<number>(0);
    const timerIDRef = useRef<number | null>(null);
    const beatRef = useRef<number>(0); // 0-3 for 4/4 time
    const bpmRef = useRef(bpm); // Mutable ref for real-time updates

    // Sync Ref with prop
    useEffect(() => {
        bpmRef.current = bpm;
    }, [bpm]);

    // Config
    const lookahead = 25.0; // ms
    const scheduleAheadTime = 0.1; // s

    // Initialize AudioContext on user interaction/first load
    const ensureContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const nextNote = () => {
        const secondsPerBeat = 60.0 / bpmRef.current; // Read from Ref
        nextNoteTimeRef.current += secondsPerBeat;
        beatRef.current = (beatRef.current + 1) % 4;
    };

    const scheduleNote = (beatNumber: number, time: number) => {
        const osc = audioContextRef.current!.createOscillator();
        const envelope = audioContextRef.current!.createGain();

        // Accent on first beat
        const isAccent = beatNumber === 0;
        osc.frequency.value = isAccent ? 1000 : 800;

        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(audioContextRef.current!.destination);

        osc.start(time);
        osc.stop(time + 0.03);
    };

    const scheduler = () => {
        while (nextNoteTimeRef.current < audioContextRef.current!.currentTime + scheduleAheadTime) {
            scheduleNote(beatRef.current, nextNoteTimeRef.current);
            nextNote();
        }
        timerIDRef.current = window.setTimeout(scheduler, lookahead);
    };

    const start = () => {
        ensureContext();
        if (isPlaying) return;

        beatRef.current = 0;
        nextNoteTimeRef.current = audioContextRef.current!.currentTime + 0.05;

        setIsPlaying(true);
        scheduler();
    };

    const stop = () => {
        setIsPlaying(false);
        if (timerIDRef.current) {
            window.clearTimeout(timerIDRef.current);
        }
    };

    // Update next time if BPM changes while playing? 
    // Actually simplicity: Web Audio handles "nextNote" calc dynamically in scheduler loop.
    // Since `bpm` is in dependency or ref, nextNote() picks up new value immediately.

    useEffect(() => {
        return () => {
            if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
        }
    }, []);

    // Effect to handle BPM change mid-stream is tricky with "nextNoteTime" accumulation.
    // But for small adjustments, it usually works fine if we just let the next calculation use the new BPM.

    return { isPlaying, start, stop, toggle: () => isPlaying ? stop() : start() };
}
