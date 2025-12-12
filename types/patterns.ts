import type { IntervalName, NoteName } from './music';

export interface PatternPosition {
    string: number;            // 0-5 (low E to high E)
    fret: number;              // Relative to pattern start fret
    isFingered: boolean;       // Is this note part of the pattern shape?
    isRoot?: boolean;          // Is this the root note of the pattern?
    interval?: IntervalName;   // Interval degree
    finger?: number;           // Suggested finger (1-4)
}

export interface PatternBox {
    id: string;
    name: string;              // "Box 1", "C Shape", etc.
    type: 'pentatonic' | 'caged';
    description?: string;
    startFret: number;         // Default start fret (usually 0 for definition)
    positions: PatternPosition[];
}

export interface ActivePattern {
    patternId: string;
    rootKey: NoteName;
    absoluteStartFret: number; // Calculated based on key
}
