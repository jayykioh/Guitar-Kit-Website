import type { NoteName, ScaleNote, FretNote, TuningDefinition, IntervalName } from '@/types/music';
import { transposeNote, normalizeNote } from './notes';

/**
 * Standard guitar tunings
 */
export const STANDARD_TUNINGS: Record<string, TuningDefinition> = {
    standard: {
        id: 'standard',
        name: 'Standard (EADGBE)',
        notes: ['E', 'B', 'G', 'D', 'A', 'E'], // High E (1) to Low E (6)
        isStandard: true
    },
    dropD: {
        id: 'drop-d',
        name: 'Drop D (DADGBE)',
        notes: ['E', 'B', 'G', 'D', 'A', 'D'],
        isStandard: false
    },
    halfStepDown: {
        id: 'half-step-down',
        name: 'Half Step Down (Eb)',
        notes: ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'],
        isStandard: false
    },
    fullStepDown: {
        id: 'full-step-down',
        name: 'Full Step Down (D)',
        notes: ['D', 'A', 'F', 'C', 'G', 'D'],
        isStandard: false
    },
    dropC: {
        id: 'drop-c',
        name: 'Drop C (CGCFAD)',
        notes: ['D', 'A', 'F', 'C', 'G', 'C'],
        isStandard: false
    },
    openG: {
        id: 'open-g',
        name: 'Open G (DGDGBD)',
        notes: ['D', 'B', 'G', 'D', 'G', 'D'],
        isStandard: false
    },
    openD: {
        id: 'open-d',
        name: 'Open D (DADF#AD)',
        notes: ['D', 'A', 'F#', 'D', 'A', 'D'],
        isStandard: false
    },
    dadgad: {
        id: 'dadgad',
        name: 'DADGAD',
        notes: ['D', 'A', 'G', 'D', 'A', 'D'],
        isStandard: false
    }
};

/**
 * Calculate the note at a specific string and fret
 * @param tuning - Tuning definition or array of string notes
 * @param stringIndex - String index (0 = low E, 5 = high E)
 * @param fret - Fret number (0 = open string)
 * @returns Note name at that position
 */
export function getNoteAtPosition(
    tuning: NoteName[] | TuningDefinition,
    stringIndex: number,
    fret: number
): NoteName {
    const notes = Array.isArray(tuning) ? tuning : tuning.notes;
    const openNote = notes[stringIndex];
    return transposeNote(openNote, fret);
}

/**
 * Map scale notes to all positions on the fretboard
 * @param scaleNotes - Array of scale notes
 * @param tuning - Tuning definition or array of string notes
 * @param fretCount - Number of frets to map (default 24)
 * @param rootNote - Root note of the scale for highlighting
 * @returns Array of all notes on the fretboard with scale information
 */
export function mapScaleToFretboard(
    scaleNotes: ScaleNote[],
    tuning: NoteName[] | TuningDefinition,
    fretCount: number = 24,
    rootNote?: NoteName
): FretNote[] {
    const notes = Array.isArray(tuning) ? tuning : tuning.notes;
    const fretNotes: FretNote[] = [];

    // Create a set of normalized scale note names for quick lookup
    const scaleNoteSet = new Set(scaleNotes.map(sn => normalizeNote(sn.note)));

    // Create a map of note to interval for quick lookup
    const noteToInterval = new Map<string, IntervalName>();
    scaleNotes.forEach(sn => {
        noteToInterval.set(normalizeNote(sn.note), sn.degree);
    });

    const normalizedRoot = rootNote ? normalizeNote(rootNote) : scaleNotes[0].note;

    // Iterate through each string and fret
    for (let stringIndex = 0; stringIndex < notes.length; stringIndex++) {
        for (let fret = 0; fret <= fretCount; fret++) {
            const note = getNoteAtPosition(notes, stringIndex, fret);
            const normalizedNote = normalizeNote(note);
            const isInScale = scaleNoteSet.has(normalizedNote);

            fretNotes.push({
                string: stringIndex,
                fret,
                note,
                isInScale,
                isRoot: normalizedNote === normalizedRoot,
                interval: isInScale ? noteToInterval.get(normalizedNote) : undefined
            });
        }
    }

    return fretNotes;
}

/**
 * Get all positions of a specific note on the fretboard
 * @param note - Note to find
 * @param tuning - Tuning definition or array of string notes
 * @param fretCount - Number of frets to search (default 24)
 * @returns Array of positions where the note appears
 */
export function findNotePositions(
    note: NoteName,
    tuning: NoteName[] | TuningDefinition,
    fretCount: number = 24
): { string: number; fret: number }[] {
    const notes = Array.isArray(tuning) ? tuning : tuning.notes;
    const normalizedTargetNote = normalizeNote(note);
    const positions: { string: number; fret: number }[] = [];

    for (let stringIndex = 0; stringIndex < notes.length; stringIndex++) {
        for (let fret = 0; fret <= fretCount; fret++) {
            const noteAtPos = getNoteAtPosition(notes, stringIndex, fret);
            if (normalizeNote(noteAtPos) === normalizedTargetNote) {
                positions.push({ string: stringIndex, fret });
            }
        }
    }

    return positions;
}

/**
 * Get only the fret notes that are in the scale
 * @param fretNotes - All fret notes from mapScaleToFretboard
 * @returns Array of notes that are in the scale
 */
export function getScaleNotesOnly(fretNotes: FretNote[]): FretNote[] {
    return fretNotes.filter(fn => fn.isInScale);
}

/**
 * Get tuning definition by ID
 * @param tuningId - Tuning identifier
 * @returns Tuning definition or undefined
 */
export function getTuningById(tuningId: string): TuningDefinition | undefined {
    return STANDARD_TUNINGS[tuningId];
}

/**
 * Get all available tunings
 * @returns Array of all tuning definitions
 */
export function getAllTunings(): TuningDefinition[] {
    return Object.values(STANDARD_TUNINGS);
}

/**
 * Create a custom tuning
 * @param name - Tuning name
 * @param notes - Array of 6 string notes from low to high
 * @returns Custom tuning definition
 */
export function createCustomTuning(name: string, notes: NoteName[]): TuningDefinition {
    if (notes.length !== 6) {
        throw new Error('Tuning must have exactly 6 strings');
    }

    return {
        id: `custom-${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        notes,
        isStandard: false
    };
}
