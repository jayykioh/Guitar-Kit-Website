// Music theory types for the guitar learning app

export type NoteName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B' | 
                       'Db' | 'Eb' | 'Gb' | 'Ab' | 'Bb';

export type IntervalName = '1' | 'b2' | '2' | 'b3' | '3' | '4' | 'b5' | '5' | '#5' | '6' | 'b7' | '7';

export interface ScaleNote {
  note: NoteName;
  interval: number;      // Semitones from root (0-11)
  degree: IntervalName;  // Display name: "1", "b3", "5", etc.
}

export interface FretNote {
  string: number;        // 0-5 (0 = low E, 5 = high E)
  fret: number;          // 0-24
  note: NoteName;        // Actual note name
  isInScale: boolean;    // Is this note in the selected scale?
  isRoot: boolean;       // Is this the root note?
  interval?: IntervalName; // Interval from root if in scale
}

export interface ScaleDefinition {
  id: string;
  name: string;
  intervals: number[];   // Semitone intervals from root
  formula: string;       // Display formula (e.g., "W-W-H-W-W-W-H")
  category: 'Major' | 'Minor' | 'Pentatonic' | 'Modal' | 'Exotic';
  description?: string;
}

export interface TuningDefinition {
  id: string;
  name: string;
  notes: NoteName[];     // Array of 6 strings from low to high
  isStandard: boolean;
}

// Pattern box for pentatonic/CAGED shapes
export interface PatternBox {
  id: string;
  name: string;          // "Box 1", "Box 2", "C Shape", "A Shape"
  startFret: number;     // Which fret this pattern starts on
  positions: {
    string: number;
    fret: number;
    isFingered: boolean; // Is this note in the pattern?
  }[];
}
