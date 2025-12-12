'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FretNote } from '@/types/music';
import type { ActivePattern, PatternBox } from '@/types/patterns';

interface FretboardProps {
    fretNotes: FretNote[];
    tuning: string[];
    fretCount?: number;
    showIntervals?: boolean;
    activePattern?: ActivePattern | null;
    patternDefinition?: PatternBox | null;
}

export default function Fretboard({
    fretNotes,
    tuning,
    fretCount = 15,
    showIntervals = true,
    activePattern,
    patternDefinition
}: FretboardProps) {
    const width = 1200;
    const height = 300;
    const paddingX = 50;
    const paddingY = 40;

    // Standard styling for Sprint 1
    const fretWidth = (width - paddingX * 2) / (fretCount + 1);
    const stringSpacing = (height - paddingY * 2) / 5;

    const calculateX = (fret: number) => paddingX + (fret * fretWidth) + (fretWidth / 2);
    const calculateY = (stringIndex: number) => paddingY + (stringIndex * stringSpacing);

    // Helper to check if note is in pattern
    const isNoteInPattern = (note: FretNote) => {
        if (!activePattern || !patternDefinition) return true; // Show all if no pattern active
        const relativeFret = note.fret - activePattern.absoluteStartFret;
        return patternDefinition.positions.some(pos =>
            pos.string === note.string && pos.fret === relativeFret
        );
    };

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block select-none"
            style={{ overflow: 'visible' }} // Allow shadows/markers to bleed if needed
        >
            <defs>
                {/* Subtle shadow filter for depth */}
                <filter id="fret-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Board Background - Clean Flat */}
            <rect x="0" y="0" width={width} height={height} fill="var(--fretboard-bg)" rx="10" ry="10" />

            {/* Frets - Thin Lines */}
            {/* Nut */}
            <line
                x1={paddingX + fretWidth}
                y1={paddingY}
                x2={paddingX + fretWidth}
                y2={height - paddingY}
                stroke="var(--border-strong)"
                strokeWidth="6"
            />

            {/* Regular Frets */}
            {Array.from({ length: fretCount }).map((_, i) => (
                <line
                    key={`fret-${i}`}
                    x1={paddingX + (i + 2) * fretWidth}
                    y1={paddingY}
                    x2={paddingX + (i + 2) * fretWidth}
                    y2={height - paddingY}
                    stroke="var(--fretboard-fret)"
                    strokeWidth="2"
                />
            ))}

            {/* Inlay Markers - Simple & Clean */}
            {[3, 5, 7, 9, 12, 15].map(fret => (
                fret <= fretCount && (
                    <circle
                        key={`marker-${fret}`}
                        cx={calculateX(fret)}
                        cy={height / 2}
                        r={fret === 12 ? 8 : 5}
                        fill="var(--text-tertiary)"
                        opacity="0.4"
                    />
                )
            ))}

            {/* Strings */}
            {tuning.map((note, index) => (
                <g key={`string-${index}`}>
                    <line
                        x1={paddingX}
                        y1={calculateY(index)}
                        x2={width - paddingX}
                        y2={calculateY(index)}
                        stroke="var(--string-color)"
                        strokeWidth={1 + index * 0.5}
                    />
                    {/* Tuning Text */}
                    <text
                        x={20}
                        y={calculateY(index) + 5}
                        fill="var(--text-tertiary)"
                        fontWeight="600"
                        fontSize="13"
                        fontFamily="Inter, sans-serif"
                    >
                        {note}
                    </text>
                </g>
            ))}

            {/* Notes - High Contrast Circles with Motion */}
            <AnimatePresence>
                {fretNotes
                    .filter(fn => fn.isInScale)
                    .map((fn) => {
                        const inPattern = isNoteInPattern(fn);

                        // Interaction Logic
                        const isActive = activePattern ? inPattern : true;

                        // Using flat colors
                        const circleFill = fn.isRoot ? 'var(--accent-primary)' : 'var(--text-secondary)';
                        const finalFill = isActive ? circleFill : 'var(--text-tertiary)';
                        const textColor = '#ffffff';

                        return (
                            <motion.g
                                key={`${fn.string}-${fn.fret}-${fn.note}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.2,
                                    scale: 1
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="cursor-pointer"
                                whileHover={{ scale: 1.2 }}
                            >
                                <motion.circle
                                    cx={calculateX(fn.fret)}
                                    cy={calculateY(fn.string)}
                                    r={14} // Slightly larger for better readability
                                    fill={finalFill}
                                    stroke="var(--bg-page)"
                                    strokeWidth="2"
                                    style={{ filter: isActive && fn.isRoot ? 'url(#fret-shadow)' : 'none' }}
                                />
                                <motion.text
                                    x={calculateX(fn.fret)}
                                    y={calculateY(fn.string)}
                                    dy=".35em"
                                    textAnchor="middle"
                                    fill={textColor}
                                    fontSize="12px"
                                    fontWeight="700"
                                    fontFamily="Inter, sans-serif"
                                    style={{ pointerEvents: 'none' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {showIntervals ? fn.interval : fn.note}
                                </motion.text>
                            </motion.g>
                        );
                    })}
            </AnimatePresence>
        </svg>
    );
}
