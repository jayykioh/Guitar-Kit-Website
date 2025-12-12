import type { NoteName } from '@/types/music';
import type { PatternBox, ActivePattern } from '@/types/patterns';
import { normalizeNote, getInterval } from '../notes';

/**
 * Calculate the starting fret for a pattern based on the root key.
 * This logic centers on finding the primary root note position on the 6th string (Low E),
 * and applying the pattern's start offset.
 */
export function calculatePatternPosition(
    pattern: PatternBox,
    rootKey: NoteName,
    tuning: string[] // Tuning notes [High E, B, G, D, A, Low E]
): ActivePattern {

    const normalizedRoot = normalizeNote(rootKey);

    // Find Low E string. We decided standard tuning is now [HighE, B, ..., LowE].
    // So Low E is at index 5.
    const lowEIndex = 5;
    const lowENote = normalizeNote(tuning[lowEIndex]);

    // Calculate relative distance from Open Low E string note to the Target Root Key.
    const delta = getInterval(lowENote, normalizedRoot);

    // Pattern start offset (e.g., Box 2 starts 2 semitones up from root)
    const patternOffset = pattern.startFret;

    // Absolute start fret on fretboard
    const absoluteStartFret = delta + patternOffset;

    return {
        patternId: pattern.id,
        rootKey,
        absoluteStartFret
    };
}
