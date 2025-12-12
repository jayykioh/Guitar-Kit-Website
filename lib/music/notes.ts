import type { NoteName, ScaleNote, IntervalName } from '@/types/music';

// All 12 chromatic notes (using sharps)
export const CHROMATIC_NOTES: NoteName[] = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

// Interval degree display names
export const INTERVAL_NAMES: IntervalName[] = [
    '1', 'b2', '2', 'b3', '3', '4', 'b5', '5', '#5', '6', 'b7', '7'
];

// Enharmonic equivalents map
export const ENHARMONIC_MAP: Record<string, NoteName> = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
    'C#': 'C#', 'D#': 'D#', 'F#': 'F#', 'G#': 'G#', 'A#': 'A#',
};

/**
 * Normalize a note name to sharp notation
 * @param note - Note name (can be flat or sharp)
 * @returns Normalized note name using sharps
 */
export function normalizeNote(note: string): NoteName {
    return (ENHARMONIC_MAP[note] || note) as NoteName;
}

/**
 * Get the MIDI number for a note (C4 = 60)
 * @param note - Note name
 * @param octave - Octave number (default 4)
 */
export function noteToMidi(note: NoteName, octave: number = 4): number {
    const normalizedNote = normalizeNote(note);
    const noteIndex = CHROMATIC_NOTES.indexOf(normalizedNote);
    return 12 * (octave + 1) + noteIndex;
}

/**
 * Get interval in semitones between two notes
 * @param note1 - First note
 * @param note2 - Second note
 * @returns Number of semitones (0-11)
 */
export function getInterval(note1: NoteName, note2: NoteName): number {
    const index1 = CHROMATIC_NOTES.indexOf(normalizeNote(note1));
    const index2 = CHROMATIC_NOTES.indexOf(normalizeNote(note2));
    return (index2 - index1 + 12) % 12;
}

/**
 * Transpose a note by a number of semitones
 * @param note - Original note
 * @param semitones - Number of semitones to transpose (can be negative)
 * @returns Transposed note
 */
export function transposeNote(note: NoteName, semitones: number): NoteName {
    const normalizedNote = normalizeNote(note);
    const currentIndex = CHROMATIC_NOTES.indexOf(normalizedNote);
    const newIndex = (currentIndex + semitones + 12) % 12;
    return CHROMATIC_NOTES[newIndex];
}

/**
 * Get the interval name for a semitone distance
 * @param semitones - Number of semitones from root (0-11)
 * @returns Interval degree name
 */
export function getIntervalName(semitones: number): IntervalName {
    return INTERVAL_NAMES[semitones % 12];
}

/**
 * Check if a note is in a set of scale notes
 * @param note - Note to check
 * @param scaleNotes - Array of scale notes
 * @returns True if note is in scale
 */
export function isNoteInScale(note: NoteName, scaleNotes: ScaleNote[]): boolean {
    const normalizedNote = normalizeNote(note);
    return scaleNotes.some(sn => normalizeNote(sn.note) === normalizedNote);
}

/**
 * Get all notes in an octave starting from a root note
 * @param root - Root note
 * @returns Array of all 12 notes starting from root
 */
export function getNotesFromRoot(root: NoteName): NoteName[] {
    const rootIndex = CHROMATIC_NOTES.indexOf(normalizeNote(root));
    const notes: NoteName[] = [];
    for (let i = 0; i < 12; i++) {
        notes.push(CHROMATIC_NOTES[(rootIndex + i) % 12]);
    }
    return notes;
}
