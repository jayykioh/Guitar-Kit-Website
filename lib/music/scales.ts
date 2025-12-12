import type { NoteName, ScaleNote, ScaleDefinition, IntervalName } from '@/types/music';
import { transposeNote, getIntervalName, normalizeNote } from './notes';

/**
 * Pre-defined scale formulas
 * Numbers represent semitones from the root note
 */
export const SCALE_FORMULAS: Record<string, ScaleDefinition> = {
    // Major scales
    'major': {
        id: 'major',
        name: 'Major',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        formula: 'W-W-H-W-W-W-H',
        category: 'Major',
        description: 'The happy, bright scale - foundation of Western music'
    },
    'major-pentatonic': {
        id: 'major-pentatonic',
        name: 'Major Pentatonic',
        intervals: [0, 2, 4, 7, 9],
        formula: 'W-W-m3-W-m3',
        category: 'Pentatonic',
        description: 'Five-note major scale, great for melodic playing'
    },

    // Minor scales
    'minor': {
        id: 'minor',
        name: 'Natural Minor',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        formula: 'W-H-W-W-H-W-W',
        category: 'Minor',
        description: 'The sad, dark counterpart to major'
    },
    'minor-pentatonic': {
        id: 'minor-pentatonic',
        name: 'Minor Pentatonic',
        intervals: [0, 3, 5, 7, 10],
        formula: 'm3-W-W-m3-W',
        category: 'Pentatonic',
        description: 'Most common scale in rock and blues'
    },
    'harmonic-minor': {
        id: 'harmonic-minor',
        name: 'Harmonic Minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        formula: 'W-H-W-W-H-m3-H',
        category: 'Minor',
        description: 'Minor scale with raised 7th - exotic sound'
    },
    'melodic-minor': {
        id: 'melodic-minor',
        name: 'Melodic Minor',
        intervals: [0, 2, 3, 5, 7, 9, 11],
        formula: 'W-H-W-W-W-W-H',
        category: 'Minor',
        description: 'Minor with raised 6th and 7th - jazzy flavor'
    },

    // Modes
    'ionian': {
        id: 'ionian',
        name: 'Ionian (Major)',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        formula: 'W-W-H-W-W-W-H',
        category: 'Modal',
        description: 'Same as major scale - 1st mode'
    },
    'dorian': {
        id: 'dorian',
        name: 'Dorian',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        formula: 'W-H-W-W-W-H-W',
        category: 'Modal',
        description: 'Minor with raised 6th - jazzy, funky sound'
    },
    'phrygian': {
        id: 'phrygian',
        name: 'Phrygian',
        intervals: [0, 1, 3, 5, 7, 8, 10],
        formula: 'H-W-W-W-H-W-W',
        category: 'Modal',
        description: 'Dark Spanish/flamenco flavor'
    },
    'lydian': {
        id: 'lydian',
        name: 'Lydian',
        intervals: [0, 2, 4, 6, 7, 9, 11],
        formula: 'W-W-W-H-W-W-H',
        category: 'Modal',
        description: 'Major with raised 4th - dreamy, floating'
    },
    'mixolydian': {
        id: 'mixolydian',
        name: 'Mixolydian',
        intervals: [0, 2, 4, 5, 7, 9, 10],
        formula: 'W-W-H-W-W-H-W',
        category: 'Modal',
        description: 'Major with flat 7th - bluesy, rock sound'
    },
    'aeolian': {
        id: 'aeolian',
        name: 'Aeolian (Natural Minor)',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        formula: 'W-H-W-W-H-W-W',
        category: 'Modal',
        description: 'Same as natural minor - 6th mode'
    },
    'locrian': {
        id: 'locrian',
        name: 'Locrian',
        intervals: [0, 1, 3, 5, 6, 8, 10],
        formula: 'H-W-W-H-W-W-W',
        category: 'Modal',
        description: 'Unstable, diminished sound - rarely used'
    },

    // Blues
    'blues': {
        id: 'blues',
        name: 'Blues',
        intervals: [0, 3, 5, 6, 7, 10],
        formula: 'm3-W-H-H-m3-W',
        category: 'Pentatonic',
        description: 'Minor pentatonic with added blue note (b5)'
    }
};

/**
 * Generate scale notes from root note and intervals
 * @param root - Root note of the scale
 * @param intervals - Array of semitone intervals
 * @returns Array of scale notes with interval names
 */
export function generateScale(root: NoteName, intervals: number[]): ScaleNote[] {
    const normalizedRoot = normalizeNote(root);

    return intervals.map(interval => ({
        note: transposeNote(normalizedRoot, interval),
        interval,
        degree: getIntervalName(interval)
    }));
}

/**
 * Get scale definition by ID
 * @param scaleId - Scale identifier
 * @returns Scale definition or undefined
 */
export function getScaleById(scaleId: string): ScaleDefinition | undefined {
    return SCALE_FORMULAS[scaleId];
}

/**
 * Get all available scales
 * @returns Array of all scale definitions
 */
export function getAllScales(): ScaleDefinition[] {
    return Object.values(SCALE_FORMULAS);
}

/**
 * Get scales by category
 * @param category - Scale category
 * @returns Array of scales in that category
 */
export function getScalesByCategory(
    category: 'Major' | 'Minor' | 'Pentatonic' | 'Modal' | 'Exotic'
): ScaleDefinition[] {
    return Object.values(SCALE_FORMULAS).filter(scale => scale.category === category);
}

/**
 * Generate a complete scale with root note
 * @param scaleId - Scale identifier
 * @param root - Root note
 * @returns Array of scale notes or null if scale not found
 */
export function getScale(scaleId: string, root: NoteName): ScaleNote[] | null {
    const scaleDef = getScaleById(scaleId);
    if (!scaleDef) return null;

    return generateScale(root, scaleDef.intervals);
}
