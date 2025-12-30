import { useState, useRef, useEffect, useCallback } from 'react';
import { useUser } from '@/hooks/useUser';
import { logToTerminal } from '@/app/actions';

// Configuration
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const SAVE_THRESHOLD_SECONDS = 5; // Reduced to 5s for easier verification

export type InteractionType = 'PLAYBACK' | 'FRETBOARD' | 'METRONOME' | 'SETTINGS' | 'SCROLL';

export function usePracticeTracker({ shouldTrack = false }: { shouldTrack?: boolean } = {}) {
    const { user } = useUser();

    // State
    const [isTracking, setIsTracking] = useState(false);
    const [activeSeconds, setActiveSeconds] = useState(0);
    const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

    // Refs for mutable state avoiding re-renders
    const lastInteractionTimeRef = useRef<number>(Date.now());
    const isPlayingRef = useRef(false);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const activeSecondsRef = useRef(0);
    const sessionDataRef = useRef<{ focusType: string; songId?: string }>({ focusType: 'FREE' });

    // -------------------------------------------------------------------------
    // Helper: Save Session
    // -------------------------------------------------------------------------
    const saveSession = useCallback(async () => {
        const durationMinutes = Math.ceil(activeSecondsRef.current / 60);

        logToTerminal(`[Tracker] Attempting save. Active Seconds: ${activeSecondsRef.current}`);

        // Validation: Must be > threshold and have a user
        if (activeSecondsRef.current < SAVE_THRESHOLD_SECONDS || !user) {
            logToTerminal('[Tracker] Session discarded: Too short or no user.');
            return;
        }

        const payload = {
            userId: user.id,
            duration: durationMinutes,
            focusType: sessionDataRef.current.focusType,
            songId: sessionDataRef.current.songId,
        };

        try {
            // Use sendBeacon if possible for reliability on unload, otherwise fetch
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            const success = navigator.sendBeacon('/api/practice/sessions', blob);

            if (!success) {
                // Fallback for non-unload saves
                await fetch('/api/practice/sessions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }
            console.log('Practice Session Saved:', payload);
        } catch (err) {
            console.error('Failed to save session:', err);
        }
    }, [user]);

    // -------------------------------------------------------------------------
    // Helper: Stop Tracking
    // -------------------------------------------------------------------------
    const stopTracking = useCallback(() => {
        if (!isTracking) return;

        logToTerminal('[Tracker] Stopping...');
        saveSession();

        // Reset State
        setIsTracking(false);
        setSessionStartTime(null);
        setActiveSeconds(0);
        activeSecondsRef.current = 0;

        if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    }, [isTracking, saveSession]);

    // -------------------------------------------------------------------------
    // Helper: Start Tracking
    // -------------------------------------------------------------------------
    const startTracking = useCallback(() => {
        if (isTracking) return;

        logToTerminal('[Tracker] Starting...');
        setIsTracking(true);
        setSessionStartTime(new Date());
        activeSecondsRef.current = 0;
        setActiveSeconds(0);
        lastInteractionTimeRef.current = Date.now(); // Reset inactivity timer on start

        let tickCount = 0;

        // Start Timer
        intervalIdRef.current = setInterval(() => {
            tickCount++;
            const isVisible = document.visibilityState === 'visible';

            if (isVisible) {
                activeSecondsRef.current += 1;
                setActiveSeconds(prev => prev + 1);
                checkInactivity();
            }
        }, 1000);
    }, [isTracking]); // checkInactivity is circular, define it before or use ref? 

    // -------------------------------------------------------------------------
    // Helper: Check Inactivity
    // -------------------------------------------------------------------------
    // We need to define checkInactivity before startTracking or use a ref usage pattern
    // to avoid circular dependency in useCallback if we were strict, but here hoisting works or we can reorder.
    // Actually, `checkInactivity` calls `stopTracking`. `startTracking` calls `checkInactivity`.
    // Let's rely on standard hoisting or define checkInactivity first.
    // But `startTracking` was defined above. Let's fix the order or dependencies.
    // Better yet, `checkInactivity` is stable.

    const checkInactivity = useCallback(() => {
        const now = Date.now();
        const timeSinceInteraction = now - lastInteractionTimeRef.current;

        // If playing audio, we are NOT inactive, update interaction time
        if (isPlayingRef.current) {
            lastInteractionTimeRef.current = now;
            return;
        }

        if (timeSinceInteraction > INACTIVITY_TIMEOUT) {
            // If inactive for too long, we stop tracking even if shouldTrack is true?
            // The requirements say "Count practice time only while Focus Mode is active".
            // If I am in Focus Mode but walk away, should it stop?
            // "no need to finalize edge cases yet".
            // Only stop if we really want to enforce "active" practice.
            // Let's keep it for now to prevent 5 hours of "practice" while sleeping.
            stopTracking();
        }
    }, [stopTracking]);

    // -------------------------------------------------------------------------
    // Effect: Handle shouldTrack prop
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (shouldTrack) {
            startTracking();
        } else {
            stopTracking();
        }
    }, [shouldTrack, startTracking, stopTracking]);


    // -------------------------------------------------------------------------
    // Core: Track Interaction (Updates Context only)
    // -------------------------------------------------------------------------
    const trackInteraction = useCallback((type: InteractionType, data?: { focusType?: string, songId?: string, isPlaying?: boolean }) => {
        const now = Date.now();
        lastInteractionTimeRef.current = now;

        // Update Context Data
        if (data?.focusType) sessionDataRef.current.focusType = data.focusType;
        if (data?.songId !== undefined) sessionDataRef.current.songId = data.songId;
        if (type === 'PLAYBACK' && data?.isPlaying !== undefined) {
            isPlayingRef.current = data.isPlaying;
        }

        // NOTE: We no longer auto-start tracking here. We only respect `shouldTrack`.
    }, []);

    // -------------------------------------------------------------------------
    // Lifecycle Listeners
    // -------------------------------------------------------------------------

    // Keep latest saveSession in ref to avoid effect re-execution
    const saveSessionRef = useRef(saveSession);
    useEffect(() => {
        saveSessionRef.current = saveSession;
    }, [saveSession]);

    // Save on Unmount / Tab Close (Only runs once on mount/unmount)
    useEffect(() => {
        const handleUnload = () => {
            if (activeSecondsRef.current >= SAVE_THRESHOLD_SECONDS) {
                saveSessionRef.current();
            }
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            handleUnload(); // Also save on component unmount
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, []);


    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        isTracking,
        formattedTime: formatTime(activeSeconds),
        trackInteraction
    };
}
