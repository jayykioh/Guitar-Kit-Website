import { useEffect, useRef } from 'react';

interface UsePracticeGuardProps {
    isActive: boolean;
    onExit: () => void; // Called when user confirms exit
}

export function usePracticeGuard({ isActive, onExit }: UsePracticeGuardProps) {
    const isGuardActive = useRef(false);

    useEffect(() => {
        // 1. Handle Browser Refresh / Close / Exterior Navigation
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isActive) {
                e.preventDefault();
                e.returnValue = ''; // Trigger browser confirmation
            }
        };

        // 2. Handle Browser Back Button (History Trap)
        const handlePopState = (e: PopStateEvent) => {
            if (isActive) {
                // Prevent the back action basically by checking intent
                // We are now at position N-1 (because popstate happened)

                const confirmed = window.confirm("You’re currently practicing. Do you want to stop the session and leave?");

                if (confirmed) {
                    // User wants to leave
                    onExit();
                    // We are already at N-1, so just let it be?
                    // Or do we need to trigger further cleanup?
                    // onExit usually cleans up state.
                    // If we need to go back further (e.g. they pressed back twice), logic gets complex.
                    // For now, accepting the popstate is enough to "leave" the current logical view.
                } else {
                    // User wants to stay
                    // We must push state again to return to N (Guard position)
                    window.history.pushState(null, '', window.location.href);
                }
            }
        };

        if (isActive) {
            window.addEventListener('beforeunload', handleBeforeUnload);
            window.addEventListener('popstate', handlePopState);

            // Push a state to trap the back button
            if (!isGuardActive.current) {
                window.history.pushState(null, '', window.location.href);
                isGuardActive.current = true;
            }
        } else {
            // Cleanup: If we are turning OFF guard, we might need to go back
            // if we pushed a state manually.
            // BUT: If the user naturally navigated away, we shouldn't force back.
            // Only force back if we are still on the same page and just turning off Focus Mode.
            if (isGuardActive.current) {
                // Ideally, we go back once to remove the fake state.
                // window.history.back(); 
                // However, executing this might conflict if we are navigating away.
                // Let's rely on the fact that if we navigate away, strictly valid history doesn't matter much for this SPA interaction.
                // But for "Turn Focus Mode OFF", we should probably pop.
                window.history.back();
                isGuardActive.current = false;
            }
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isActive, onExit]);
}
