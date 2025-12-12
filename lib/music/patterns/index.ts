export * from './pentatonic';
export * from './caged';

import { PENTATONIC_SHAPES } from './pentatonic';
import { CAGED_SHAPES } from './caged';
import type { PatternBox } from '@/types/patterns';

export const ALL_PATTERNS: PatternBox[] = [
    ...PENTATONIC_SHAPES,
    ...CAGED_SHAPES
];

export function getPatternById(id: string): PatternBox | undefined {
    return ALL_PATTERNS.find(p => p.id === id);
}
