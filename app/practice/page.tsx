'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
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
import { logToTerminal } from '@/app/actions';
import { usePracticeGuard } from '@/hooks/usePracticeGuard';

const KEYS: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function PracticePageContent() {
    // URL Params
    const searchParams = useSearchParams();
    const songId = searchParams.get('songId');

    // State
    // Focus Mode State (Hoisted for tracker)
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentBpm, setCurrentBpm] = useState<number | string>('--');

    const [selectedScale, setSelectedScale] = useState('minor-pentatonic');
    const [selectedKey, setSelectedKey] = useState<NoteName>('A');
    const [selectedTuning, setSelectedTuning] = useState('standard');
    const [selectedPatternId, setSelectedPatternId] = useState<string>('');
    const [showIntervals, setShowIntervals] = useState(true);

    // Song Focus State
    const [activeSong, setActiveSong] = useState<Song | null>(null);

    // Hooks
    const { songs } = useSongs();
    // Pass isFocusMode to tracker
    const { isTracking, formattedTime, trackInteraction } = usePracticeTracker({ shouldTrack: isFocusMode });

    // Combined Guard State
    const isGuardActive = isFocusMode || isAudioPlaying;

    // Guard against accidental exit (Browser Back / Refresh)
    usePracticeGuard({
        isActive: isGuardActive,
        onExit: () => {
            logToTerminal('[PracticePage] Guard: User confirmed exit.');
            setIsFocusMode(false);
            setIsAudioPlaying(false); // Can't force player stop easily from here without ref, but mostly for logic
        }
    });

    // Guard against Internal Navigation (Link Clicks)
    const handleGlobalClick = useCallback((e: React.MouseEvent) => {
        if (!isGuardActive) return;

        // Check if we clicked a link or inside a link
        const link = (e.target as HTMLElement).closest('a');
        if (link) {
            // It is a navigation attempt
            if (!window.confirm("You’re currently practicing. Do you want to stop the session and leave?")) {
                e.preventDefault();
                e.stopPropagation();
                logToTerminal('[PracticePage] Guard: Internal Navigation Blocked');
            } else {
                logToTerminal('[PracticePage] Guard: Internal Navigation Allowed');
                // Cleanup logic implies we should stop Focus Mode, but navigation will happen anyway.
                // We should theoretically stop tracking here, but unmount effect will handle save.
                setIsFocusMode(false); // Optimistic cleanup
            }
        }
    }, [isGuardActive]);

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

    // Guard against accidental exit
    usePracticeGuard({
        isActive: isFocusMode,
        onExit: () => {
            logToTerminal('[PracticePage] Guard: User confirmed exit.');
            setIsFocusMode(false);
        }
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
            if ((e.target as HTMLElement).isContentEditable) return;

            if (e.key.toLowerCase() === 'f') {
                logToTerminal('[PracticePage] Keyboard Input: Toggling Focus Mode');
                setIsFocusMode(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleTrackSelect = (track: any) => {
        // Sync BPM
        if (track.bpm) {
            setCurrentBpm(track.bpm);
        }

        if (!track.key) return; // No key, no sync

        // Regex to parse "A", "Am", "F#m", "Bb Maj"
        // Groups: 1=Note, 2=Modifier
        const match = track.key.match(/^([A-G][#b]?)(.*)$/);
        if (match) {
            const note = match[1] as NoteName;
            const modifier = match[2].trim().toLowerCase();

            if (KEYS.includes(note)) {
                setSelectedKey(note);
                // "m", "min", "minor" -> Minor Pentatonic (safe default for rock/blues backing tracks)
                // "maj", "" -> Major Pentatonic or Major Scale
                if (modifier.includes('m') || modifier.includes('min')) {
                    setSelectedScale('minor-pentatonic'); // Or 'aeolian'
                } else {
                    setSelectedScale('major-pentatonic'); // Or 'ionian'
                }
            }
        }
    };

    return (
        <motion.div
            initial="hidden" animate="visible" variants={containerVariants}
            onClickCapture={handleGlobalClick}
            onClick={(e) => {
                // Only exit if clicking the background itself, not children
                if (isFocusMode && e.target === e.currentTarget) {
                    setIsFocusMode(false);
                }
            }}
            className={`min-h-screen p-4 md:p-6 flex flex-col items-center gap-6 font-sans transition-all duration-500 ease-in-out ${isFocusMode ? 'fixed inset-0 z-[100] bg-[#050505] justify-center overflow-hidden cursor-zoom-out' : 'relative bg-bg-page'}`}
        >

            {/* FOCUS MODE DASHBOARD (Minimal) */}
            <AnimatePresence>
                {isFocusMode && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-12 left-0 right-0 flex justify-center z-20 pointer-events-none"
                    >
                        <div className="flex items-center gap-8 text-white/40 font-bold tracking-widest uppercase text-sm bg-black/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/5">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] opacity-50">Key</span>
                                <span className="text-white text-lg">{selectedKey}</span>
                            </div>
                            <div className="w-px h-6 bg-white/10"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] opacity-50">Scale</span>
                                <span className="text-[#13ec5b] text-lg whitespace-nowrap">{scaleInfo?.name}</span>
                            </div>
                            <div className="w-px h-6 bg-white/10"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] opacity-50">BPM</span>
                                <span className="text-white text-lg">{currentBpm !== '--' ? currentBpm : (activeSong?.bpm || '--')}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NORMAL MODE DASHBOARD */}
            <AnimatePresence mode="wait">
                {!isFocusMode && (
                    <motion.header
                        layout
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                        variants={itemVariants}
                        className="w-full max-w-[1400px] z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start shrink-0"
                    >

                        {/* LEFT: HERO & CONTROLS (FULL WIDTH) */}
                        <div className="lg:col-span-12 glass-panel p-6 flex flex-col justify-between shadow-sm relative group">

                            {/* Clean Background Layer */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none bg-gradient-to-br from-transparent to-bg-surface-hover/30 transition-colors duration-300"></div>

                            {/* HERO TYPOGRAPHY: Scale Name / Song Name */}
                            <div className="mb-6 relative z-10 flex justify-between items-start">
                                {activeSong ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col gap-1"
                                    >
                                        <div className="flex items-center gap-2 text-accent-primary font-bold text-xs uppercase tracking-widest">
                                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                                            Now Playing
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

                                {/* FOCUS MODE HINT (Top Right) */}
                                <div className="flex flex-col items-end gap-1">
                                    <button
                                        onClick={() => {
                                            logToTerminal('[PracticePage] Button Click: Focus Mode ON');
                                            setIsFocusMode(true);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-surface border border-border-subtle hover:border-accent-primary hover:text-accent-primary transition-colors group/hint"
                                        aria-label="Enter Focus Mode"
                                    >
                                        <span className="material-symbols-outlined text-lg md:hidden">center_focus_weak</span>
                                        <span className="text-xs font-medium text-text-secondary group-hover/hint:text-text-primary hidden md:inline">Focus Mode</span>
                                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border-subtle bg-bg-page px-1.5 font-mono text-[10px] font-medium text-text-tertiary">
                                            F
                                        </kbd>
                                    </button>
                                </div>
                            </div>

                            {/* CONTROLS ROW - Rearranged */}
                            <div className="flex flex-wrap items-end gap-x-6 gap-y-4 border-t border-border-subtle/50 pt-5 relative z-20">

                                {/* Group 1: Musical Context (Key & Scale) */}
                                <div className="flex-none flex gap-3 min-w-[280px]">
                                    <AnimatedDropdown
                                        label="Key"
                                        value={selectedKey}
                                        options={keyOptions}
                                        onChange={(v) => setSelectedKey(v as NoteName)}
                                        className="w-[80px]"
                                    />
                                    <AnimatedDropdown
                                        label="Scale"
                                        value={selectedScale}
                                        options={scaleOptions}
                                        onChange={setSelectedScale}
                                        className="w-[200px]"
                                    />
                                </div>

                                {/* Group 2: Pattern Navigation */}
                                <div className="flex-auto max-w-[400px] flex gap-2 items-end">
                                    <motion.button
                                        whileHover={{ scale: 1.05, borderColor: 'var(--border-strong)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handlePatternCycle('prev')}
                                        className="w-10 h-[40px] flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-primary transition-all shadow-sm shrink-0"
                                        aria-label="Previous Pattern"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                    </motion.button>

                                    <div className="flex-grow min-w-[150px]">
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
                                        className="w-10 h-[40px] flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-primary transition-all shadow-sm shrink-0"
                                        aria-label="Next Pattern"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                    </motion.button>
                                </div>

                                {/* Group 3: View Toggles & Tools */}
                                <div className="flex-none flex items-end justify-end gap-3 pb-0.5 ml-auto">

                                    <div className="h-8 w-px bg-border-subtle/50 mx-2 hidden lg:block"></div>

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
                                        <span>{showIntervals ? 'Show Intervals' : 'Show Notes'}</span>
                                    </motion.button>

                                    <MetronomeControl
                                        syncedBpm={currentBpm !== '--' ? Number(currentBpm) : (activeSong?.bpm ? activeSong.bpm : null)}
                                    />
                                </div>
                            </div>
                        </div>

                    </motion.header>
                )}
            </AnimatePresence>

            {/* FLOATING MUSIC PLAYER */}
            <MusicPlayer
                activeSong={activeSong}
                isTracking={isTracking}
                formattedTime={formattedTime}
                onTrackSelect={handleTrackSelect}
                isFocusMode={isFocusMode}
                onInteraction={setIsAudioPlaying}
            />

            {/*
        MAIN HERO AREA: Fretboard
        - Width matches dashboard (1400px)
        - Seamless visual continuation
      */}
            <motion.main
                variants={itemVariants}
                className={`w-full max-w-[1400px] flex flex-col transition-all duration-700 ${isFocusMode ? 'justify-center items-center scale-110 pb-0' : 'flex-grow pb-32'}`}
            >
                <div className={`w-full overflow-x-auto rounded-xl shadow-lg border relative transition-colors duration-700 ${isFocusMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-fretboard-bg border-border-subtle'}`}>
                    {/* Decorative top accent */}
                    <div className={`w-full h-1 bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent absolute top-0 left-0 transition-opacity duration-700 ${isFocusMode ? 'opacity-20' : 'opacity-100'}`}></div>

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

export default function PracticePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-page flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading Practice Engine...</p>
                </div>
            </div>
        }>
            <PracticePageContent />
        </Suspense>
    );
}
