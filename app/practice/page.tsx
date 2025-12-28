'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { getScale, getScaleById, getAllScales } from '@/lib/music/scales';
import { getTuningById, mapScaleToFretboard } from '@/lib/music/fretboard';
import { ALL_PATTERNS, getPatternById } from '@/lib/music/patterns';
import { calculatePatternPosition } from '@/lib/music/patterns/logic';
import type { NoteName } from '@/types/music';

import MusicPlayer from '@/components/player/MusicPlayer';
import MetronomeControl from '@/components/metronome/MetronomeControl';

// Components
import Fretboard from '@/components/fretboard/Fretboard';
import AnimatedDropdown from '@/components/ui/AnimatedDropdown';

// New Imports
import { usePracticeTracker } from '@/hooks/usePracticeTracker';
import { useSongs, Song } from '@/hooks/useSongs';

const KEYS: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function PracticePage() {
    // URL Params
    const searchParams = useSearchParams();
    const songId = searchParams.get('songId');

    // Hooks
    const { songs } = useSongs();
    const { isTracking, formattedTime, trackInteraction } = usePracticeTracker();

    // State
    const [selectedScale, setSelectedScale] = useState('minor-pentatonic');
    const [selectedKey, setSelectedKey] = useState<NoteName>('A');
    const [selectedTuning, setSelectedTuning] = useState('standard');
    const [selectedPatternId, setSelectedPatternId] = useState<string>('');
    const [showIntervals, setShowIntervals] = useState(true);

    // Song Focus State
    const [activeSong, setActiveSong] = useState<Song | null>(null);

    // Initialize Focus Mode if songId is present
    useEffect(() => {
        if (songId && songs.length > 0) {
            const song = songs.find(s => s.id === songId);
            if (song) {
                setActiveSong(song);
                // Also notify tracker of song context
                trackInteraction('SETTINGS', { focusType: 'SONG', songId: song.id });

                // Auto-set Key if valid
                if (song.key && KEYS.includes(song.key as NoteName)) {
                    setSelectedKey(song.key as NoteName);
                }
            }
        }
    }, [songId, songs, trackInteraction]);

    // Data for Dropdowns
    const keyOptions = KEYS.map(k => ({ value: k, label: k }));
    const scaleOptions = getAllScales().map(s => ({ value: s.id, label: s.name }));
    const patternOptions = [
        { value: '', label: 'Show Full Fretboard', group: 'Default' },
        ...ALL_PATTERNS.map(p => ({
            value: p.id,
            label: p.name,
            group: p.type === 'pentatonic' ? 'Pentatonic Boxes' : 'CAGED System'
        }))
    ];

    // Logic to cycle patterns
    const handlePatternCycle = (direction: 'prev' | 'next') => {
        // trackInteraction('FRETBOARD'); // Removed as requested
        const pentatonicPatterns = ALL_PATTERNS.filter(p => p.type === 'pentatonic');
        const currentIndex = pentatonicPatterns.findIndex(p => p.id === selectedPatternId);

        let nextIndex = 0;
        if (currentIndex === -1) {
            nextIndex = (currentIndex + 1) % pentatonicPatterns.length;
        } else {
            if (direction === 'next') {
                nextIndex = (currentIndex + 1) % pentatonicPatterns.length;
            } else {
                nextIndex = (currentIndex - 1 + pentatonicPatterns.length) % pentatonicPatterns.length;
            }
        }
        setSelectedPatternId(pentatonicPatterns[nextIndex].id);
    };

    const { scaleNotes, fretNotes, currentTuning, scaleInfo, activePattern, patternDefinition } = useMemo(() => {
        const scaleNotes = getScale(selectedScale, selectedKey);
        const tuning = getTuningById(selectedTuning);
        const scaleInfo = getScaleById(selectedScale);

        if (!scaleNotes || !tuning || !scaleInfo) {
            return { scaleNotes: [], fretNotes: [], currentTuning: null, scaleInfo: null, activePattern: null, patternDefinition: null };
        }

        const fretNotes = mapScaleToFretboard(scaleNotes, tuning, 15, selectedKey);

        let activePattern = null;
        let patternDefinition = null;
        if (selectedPatternId) {
            patternDefinition = getPatternById(selectedPatternId);
            if (patternDefinition) {
                activePattern = calculatePatternPosition(patternDefinition, selectedKey, tuning.notes);
            }
        }

        return { scaleNotes, fretNotes, currentTuning: tuning, scaleInfo, activePattern, patternDefinition };
    }, [selectedScale, selectedKey, selectedTuning, selectedPatternId]);

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } }
    };

    if (!currentTuning) return <div className="p-10 flex justify-center text-text-secondary">Loading...</div>;

    return (
        <motion.div
            initial="hidden" animate="visible" variants={containerVariants}
            className="min-h-screen p-4 md:p-6 flex flex-col items-center gap-6 font-sans bg-bg-page transition-colors duration-200"
        >

            {/*
        UNIFIED DASHBOARD CONTAINER
        - Max Width 1400px (matches fretboard)
        - 2 Main Columns: [Hero Controls(60%)] | [Backing Track(40%)]
      */}
            <motion.header variants={itemVariants} className="w-full max-w-[1400px] z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                {/* LEFT: HERO & CONTROLS (Cols 1-8) */}
                <div className="lg:col-span-8 glass-panel p-6 flex flex-col justify-between shadow-sm relative group">

                    {/* Clean Background Layer */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none bg-gradient-to-br from-transparent to-bg-surface-hover/30 transition-colors duration-300"></div>

                    {/* FOCUS MODE BANNER */}
                    {activeSong && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary via-purple-400 to-accent-primary animate-pulse"></div>
                    )}

                    {/* HERO TYPOGRAPHY: Scale Name / Song Name */}
                    <div className="mb-6 relative z-10">
                        {activeSong ? (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col gap-1"
                            >
                                <div className="flex items-center gap-2 text-accent-primary font-bold text-xs uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                                    Focus Mode
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary truncate">
                                    {activeSong.title}
                                </h1>
                                <p className="text-xl text-text-secondary font-medium">
                                    {activeSong.artist} • {activeSong.bpm} BPM
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={`${selectedKey}-${selectedScale}`} // Re-animate on change
                                className="flex flex-col"
                            >
                                <div className="flex items-baseline gap-3">
                                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-text-primary">
                                        {selectedKey}
                                    </h1>
                                    <span className="text-3xl md:text-4xl font-light text-text-secondary">
                                        {scaleInfo?.name}
                                    </span>
                                </div>
                                <p className="text-lg font-medium text-accent-primary mt-1 flex items-center gap-2">
                                    {activePattern
                                        ? <span className="bg-accent-surface px-2 py-0.5 rounded text-accent-primary text-sm uppercase tracking-wide font-bold">{patternDefinition?.name}</span>
                                        : <span className="text-text-tertiary">Full Fretboard View</span>
                                    }
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* CONTROLS ROW */}
                    {/* CONTROLS ROW */}
                    <div className="flex flex-wrap items-end gap-x-6 gap-y-4 border-t border-border-subtle/50 pt-5 relative z-20">

                        {/* Group 1: Key & Scale (Flexible Grow) */}
                        <div className="flex-1 min-w-[200px] flex gap-3">
                            <AnimatedDropdown
                                label="Key"
                                value={selectedKey}
                                options={keyOptions}
                                onChange={(v) => setSelectedKey(v as NoteName)}
                                className="w-[25%] min-w-[80px]" // Flexible width
                            />
                            <AnimatedDropdown
                                label="Scale"
                                value={selectedScale}
                                options={scaleOptions}
                                onChange={setSelectedScale}
                                className="flex-grow" // Takes remaining space
                            />
                        </div>

                        {/* Group 2: Pattern (Flexible Grow, slightly larger base) */}
                        <div className="flex-1 min-w-[240px] flex gap-2 items-end">
                            <motion.button
                                whileHover={{ scale: 1.05, borderColor: 'var(--border-strong)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePatternCycle('prev')}
                                className="w-10 h-[40px] flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-primary transition-all shadow-sm"
                                aria-label="Previous"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                            </motion.button>

                            <div className="flex-grow">
                                <AnimatedDropdown
                                    label="Pattern"
                                    value={selectedPatternId}
                                    options={patternOptions}
                                    onChange={setSelectedPatternId}
                                    className="w-full"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, borderColor: 'var(--border-strong)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePatternCycle('next')}
                                className="w-10 h-[40px] flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-primary transition-all shadow-sm"
                                aria-label="Next"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                            </motion.button>
                        </div>

                        {/* Group 3: Toggles & Timer Control */}
                        <div className="flex-none flex items-end justify-end gap-3 pb-0.5 ml-auto">

                            <MetronomeControl />

                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => setShowIntervals(!showIntervals)}
                                className={`
                    h-[40px] px-4 rounded-xl font-bold text-xs flex items-center gap-2 border shadow-sm transition-all
                    ${showIntervals
                                        ? 'bg-bg-surface text-text-secondary border-border-subtle hover:border-accent-primary hover:text-accent-primary'
                                        : 'bg-bg-surface text-accent-primary border-accent-primary shadow-[0_0_8px_rgba(109,40,217,0.15)]'
                                    }
                `}
                            >
                                <span>{showIntervals ? 'Int' : 'Note'}</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: MUSIC PLAYER (Cols 9-12) */}
                <div className="lg:col-span-4 glass-panel p-6 shadow-sm flex flex-col justify-center">
                    <MusicPlayer
                        activeSong={activeSong}
                        isTracking={isTracking}
                        formattedTime={formattedTime}
                    />
                </div>

            </motion.header>

            {/*
        MAIN HERO AREA: Fretboard
        - Width matches dashboard (1400px)
        - Seamless visual continuation
      */}
            <motion.main variants={itemVariants} className="w-full max-w-[1400px] flex-grow flex flex-col pb-32">
                <div className="w-full overflow-x-auto rounded-xl shadow-lg border border-border-subtle bg-fretboard-bg relative">
                    {/* Decorative top accent */}
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent absolute top-0 left-0"></div>

                    <div className="min-w-[900px] lg:min-w-full p-4 md:p-8">
                        <Fretboard
                            fretNotes={fretNotes}
                            tuning={currentTuning.notes}
                            fretCount={15}
                            showIntervals={showIntervals}
                            activePattern={activePattern}
                            patternDefinition={patternDefinition}
                        />
                    </div>
                </div>
            </motion.main>
        </motion.div>
    );
}
