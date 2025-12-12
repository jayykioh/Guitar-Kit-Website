import type { PatternBox } from '@/types/patterns';
import type { IntervalName } from '@/types/music';

// CAGED System Shapes (Major Scale)
// These shapes map the major scale across the fretboard.

export const CAGED_SHAPES: PatternBox[] = [
    {
        id: 'c-shape',
        name: 'C-Shape',
        type: 'caged',
        startFret: 0,
        description: 'Based on the open C chord shape.',
        positions: [
            { string: 5, fret: 0, isFingered: true, interval: '3' as IntervalName },
            { string: 5, fret: 1, isFingered: true, interval: '4' as IntervalName },
            { string: 5, fret: 3, isFingered: true, interval: '5' as IntervalName },
            { string: 4, fret: 0, isFingered: true, interval: '6' as IntervalName },
            { string: 4, fret: 2, isFingered: true, interval: '7' as IntervalName },
            { string: 4, fret: 3, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 3, fret: 0, isFingered: true, interval: '2' as IntervalName },
            { string: 3, fret: 2, isFingered: true, interval: '3' as IntervalName },
            { string: 3, fret: 3, isFingered: true, interval: '4' as IntervalName },
            { string: 2, fret: 0, isFingered: true, interval: '5' as IntervalName },
            { string: 2, fret: 2, isFingered: true, interval: '6' as IntervalName },
            { string: 1, fret: 0, isFingered: true, interval: '7' as IntervalName },
            { string: 1, fret: 1, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 0, fret: 0, isFingered: true, interval: '3' as IntervalName },
            { string: 0, fret: 1, isFingered: true, interval: '4' as IntervalName },
            { string: 0, fret: 3, isFingered: true, interval: '5' as IntervalName }
        ]
    },
    {
        id: 'a-shape',
        name: 'A-Shape',
        type: 'caged',
        startFret: 3,
        description: 'Based on the open A chord shape.',
        positions: [
            { string: 5, fret: 0, isFingered: true, interval: '5' as IntervalName },
            { string: 5, fret: 2, isFingered: true, interval: '6' as IntervalName },
            { string: 4, fret: 0, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 4, fret: 2, isFingered: true, interval: '2' as IntervalName },
            { string: 4, fret: 4, isFingered: true, interval: '3' as IntervalName },
            { string: 3, fret: 0, isFingered: true, interval: '4' as IntervalName },
            { string: 3, fret: 2, isFingered: true, interval: '5' as IntervalName },
            { string: 3, fret: 4, isFingered: true, interval: '6' as IntervalName },
            { string: 2, fret: 1, isFingered: true, interval: '7' as IntervalName },
            { string: 2, fret: 2, isFingered: true, interval: '1' as IntervalName, isRoot: true },
            { string: 1, fret: 0, isFingered: true, interval: '2' as IntervalName },
            { string: 1, fret: 2, isFingered: true, interval: '3' as IntervalName },
            { string: 1, fret: 3, isFingered: true, interval: '4' as IntervalName },
            { string: 0, fret: 0, isFingered: true, interval: '5' as IntervalName },
            { string: 0, fret: 2, isFingered: true, interval: '6' as IntervalName }
        ]
    }
];
