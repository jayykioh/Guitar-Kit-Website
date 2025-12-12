import type { PatternBox } from '@/types/patterns';
import type { IntervalName } from '@/types/music';

// Standard 5 Pentatonic Shapes (based on Minor Pentatonic relative positions)
// These shapes are movable.
// StartFret reference is the lowest fret of the generic box shape.

export const PENTATONIC_SHAPES: PatternBox[] = [
    {
        id: 'shape-1',
        name: 'Shape 1 (E-Shape)',
        type: 'pentatonic',
        startFret: 0,
        description: 'The standard "box" shape. Root on string 6 and 1.',
        positions: [
            { string: 5, fret: 0, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 5, fret: 3, isFingered: true, interval: 'b3' as IntervalName },
            { string: 4, fret: 0, isFingered: true, interval: '4' as IntervalName },
            { string: 4, fret: 2, isFingered: true, interval: '5' as IntervalName },
            { string: 3, fret: 0, isFingered: true, interval: 'b7' as IntervalName },
            { string: 3, fret: 2, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 2, fret: 0, isFingered: true, interval: 'b3' as IntervalName },
            { string: 2, fret: 2, isFingered: true, interval: '4' as IntervalName },
            { string: 1, fret: 0, isFingered: true, interval: '5' as IntervalName },
            { string: 1, fret: 3, isFingered: true, interval: 'b7' as IntervalName },
            { string: 0, fret: 0, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 0, fret: 3, isFingered: true, interval: 'b3' as IntervalName }
        ]
    },
    {
        id: 'shape-2',
        name: 'Shape 2 (D-Shape)',
        type: 'pentatonic',
        startFret: 2,
        description: 'Root on string 4 and 2.',
        positions: [
            { string: 5, fret: 3, isFingered: true, interval: 'b3' as IntervalName },
            { string: 5, fret: 5, isFingered: true, interval: '4' as IntervalName },
            { string: 4, fret: 2, isFingered: true, interval: '5' as IntervalName },
            { string: 4, fret: 5, isFingered: true, interval: 'b7' as IntervalName },
            { string: 3, fret: 2, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 3, fret: 5, isFingered: true, interval: 'b3' as IntervalName },
            { string: 2, fret: 2, isFingered: true, interval: '4' as IntervalName },
            { string: 2, fret: 4, isFingered: true, interval: '5' as IntervalName },
            { string: 1, fret: 3, isFingered: true, interval: 'b7' as IntervalName },
            { string: 1, fret: 5, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 0, fret: 3, isFingered: true, interval: 'b3' as IntervalName },
            { string: 0, fret: 5, isFingered: true, interval: '4' as IntervalName }
        ].map(p => ({ ...p, fret: p.fret - 2 }))
    },
    {
        id: 'shape-3',
        name: 'Shape 3 (C-Shape)',
        type: 'pentatonic',
        startFret: 4,
        description: 'Root on string 5 and 2.',
        positions: [
            { string: 5, fret: 5, isFingered: true, interval: '4' as IntervalName },
            { string: 5, fret: 7, isFingered: true, interval: '5' as IntervalName },
            { string: 4, fret: 5, isFingered: true, interval: 'b7' as IntervalName },
            { string: 4, fret: 7, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 3, fret: 5, isFingered: true, interval: 'b3' as IntervalName },
            { string: 3, fret: 7, isFingered: true, interval: '4' as IntervalName },
            { string: 2, fret: 4, isFingered: true, interval: '5' as IntervalName },
            { string: 2, fret: 7, isFingered: true, interval: 'b7' as IntervalName },
            { string: 1, fret: 5, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 1, fret: 8, isFingered: true, interval: 'b3' as IntervalName },
            { string: 0, fret: 5, isFingered: true, interval: '4' as IntervalName },
            { string: 0, fret: 7, isFingered: true, interval: '5' as IntervalName }
        ].map(p => ({ ...p, fret: p.fret - 4 }))
    },
    {
        id: 'shape-4',
        name: 'Shape 4 (A-Shape)',
        type: 'pentatonic',
        startFret: 7,
        description: 'Root on string 5 and 3.',
        positions: [
            { string: 5, fret: 7, isFingered: true, interval: '5' as IntervalName },
            { string: 5, fret: 10, isFingered: true, interval: 'b7' as IntervalName },
            { string: 4, fret: 7, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 4, fret: 10, isFingered: true, interval: 'b3' as IntervalName },
            { string: 3, fret: 7, isFingered: true, interval: '4' as IntervalName },
            { string: 3, fret: 9, isFingered: true, interval: '5' as IntervalName },
            { string: 2, fret: 7, isFingered: true, interval: 'b7' as IntervalName },
            { string: 2, fret: 10, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 1, fret: 8, isFingered: true, interval: 'b3' as IntervalName },
            { string: 1, fret: 10, isFingered: true, interval: '4' as IntervalName },
            { string: 0, fret: 7, isFingered: true, interval: '5' as IntervalName },
            { string: 0, fret: 10, isFingered: true, interval: 'b7' as IntervalName }
        ].map(p => ({ ...p, fret: p.fret - 7 }))
    },
    {
        id: 'shape-5',
        name: 'Shape 5 (G-Shape)',
        type: 'pentatonic',
        startFret: 9,
        description: 'Root on string 6 and 3. Connects back to Shape 1.',
        positions: [
            { string: 5, fret: 10, isFingered: true, interval: 'b7' as IntervalName },
            { string: 5, fret: 12, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 4, fret: 10, isFingered: true, interval: 'b3' as IntervalName },
            { string: 4, fret: 12, isFingered: true, interval: '4' as IntervalName },
            { string: 3, fret: 9, isFingered: true, interval: '5' as IntervalName },
            { string: 3, fret: 12, isFingered: true, interval: 'b7' as IntervalName },
            { string: 2, fret: 10, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 2, fret: 12, isFingered: true, interval: 'b3' as IntervalName },
            { string: 1, fret: 10, isFingered: true, interval: '4' as IntervalName },
            { string: 1, fret: 13, isFingered: true, interval: '5' as IntervalName },
            { string: 0, fret: 10, isFingered: true, interval: 'b7' as IntervalName },
            { string: 0, fret: 12, isFingered: true, interval: '1' as IntervalName, isRoot: true }
        ].map(p => ({ ...p, fret: p.fret - 9 }))
    }
];
