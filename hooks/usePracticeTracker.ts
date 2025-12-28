import { useState, useRef, useEffect, useCallback } from 'react';
import { useUser } from '@/hooks/useUser';

// Configuration
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const SAVE_THRESHOLD_SECONDS = 60; // Minimum 1 minute to save

export type InteractionType = 'PLAYBACK' | 'FRETBOARD' | 'METRONOME' | 'SETTINGS' | 'SCROLL';

export function usePracticeTracker() {
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

        // Validation: Must be > threshold and have a user
        if (activeSecondsRef.current < SAVE_THRESHOLD_SECONDS || !user) {
            console.log('Session too short or no user, discarding.', activeSecondsRef.current);
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
    // Helper: Check Inactivity
    // -------------------------------------------------------------------------
    const checkInactivity = useCallback(() => {
        const now = Date.now();
        const timeSinceInteraction = now - lastInteractionTimeRef.current;

        // If playing audio, we are NOT inactive, update interaction time
        if (isPlayingRef.current) {
            lastInteractionTimeRef.current = now;
            return;
        }

        if (timeSinceInteraction > INACTIVITY_TIMEOUT) {
            stopTracking();
        }
    }, [stopTracking]);

    // -------------------------------------------------------------------------
    // Core: Track Interaction
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

        // Start Tracking if not active
        if (!isTracking) {
            setIsTracking(true);
            setSessionStartTime(new Date());
            activeSecondsRef.current = 0;
            setActiveSeconds(0);

            // Start Timer
            intervalIdRef.current = setInterval(() => {
                // Only increment if tab is visible
                const isVisible = document.visibilityState === 'visible';

                // Debug log
                console.log(`[PracticeTracker] Tick. Active: ${activeSecondsRef.current}, Visible: ${isVisible}, Playing: ${isPlayingRef.current}`);

                if (isVisible) {
                    activeSecondsRef.current += 1;
                    setActiveSeconds(prev => prev + 1);
                    checkInactivity();
                }
            }, 1000);
        } else {
            // Just reset inactivity check if already running
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
            // We check inactivity in the interval, but we can also set a safety timeout here if needed
        }
    }, [isTracking, checkInactivity]);

    // -------------------------------------------------------------------------
    // Lifecycle Listeners
    // -------------------------------------------------------------------------

    // Save on Unmount / Tab Close
    useEffect(() => {
        const handleUnload = () => {
            if (activeSecondsRef.current >= SAVE_THRESHOLD_SECONDS) {
                saveSession();
            }
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            handleUnload(); // Also save on component unmount
            if (intervalIdRef.current) clearInterval(intervalIdRef.current);
        };
    }, [saveSession]);


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
