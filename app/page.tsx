'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getScale, getScaleById } from '@/lib/music/scales';
import { getTuningById, mapScaleToFretboard } from '@/lib/music/fretboard';
import { ALL_PATTERNS, getPatternById } from '@/lib/music/patterns';
import { calculatePatternPosition } from '@/lib/music/patterns/logic';
import type { NoteName } from '@/types/music';

// Components
import Fretboard from '@/components/fretboard/Fretboard';
import ScaleSelector from '@/components/selectors/ScaleSelector';
import KeySelector from '@/components/selectors/KeySelector';
import TuningSelector from '@/components/selectors/TuningSelector';

export default function Home() {
  const [selectedScale, setSelectedScale] = useState('minor-pentatonic');
  const [selectedKey, setSelectedKey] = useState<NoteName>('A');
  const [selectedTuning, setSelectedTuning] = useState('standard');
  const [selectedPatternId, setSelectedPatternId] = useState<string>('');
  const [showIntervals, setShowIntervals] = useState(true);

  // Logic to cycle patterns
  const handlePatternCycle = (direction: 'prev' | 'next') => {
    const pentatonicPatterns = ALL_PATTERNS.filter(p => p.type === 'pentatonic');
    const currentIndex = pentatonicPatterns.findIndex(p => p.id === selectedPatternId);

    let nextIndex = 0;
    if (currentIndex === -1) {
      nextIndex = 0; // Default to first if none selected
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (!currentTuning) return <div className="p-10 flex justify-center text-text-secondary">Loading...</div>;

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8 font-sans bg-bg-page transition-colors duration-200"
    >

      {/* 
        TOP CONTROLS (Dashboard)
        - Compact Grid Layout
        - Glassmorphism Panel
       */}
      <motion.header variants={itemVariants} className="w-full max-w-7xl flex flex-col items-center gap-6 z-10">

        {/* Title & Info */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            Guitar Scale Explorer
          </h1>
          <p className="text-sm text-text-secondary">
            {activePattern ? `Viewing ${patternDefinition?.name} in ${selectedKey} ${scaleInfo?.name}` : `${selectedKey} ${scaleInfo?.name} - Full Neck`}
          </p>
        </div>

        {/* The Dashboard Panel */}
        <div className="glass-panel p-4 md:p-6 w-full flex flex-col gap-4">

          {/* Row 1: Primary Selectors */}
          <div className="dashboard-grid">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">Key</label>
              <KeySelector selectedKey={selectedKey} onKeyChange={setSelectedKey} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">Scale</label>
              <ScaleSelector selectedScale={selectedScale} onScaleChange={setSelectedScale} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">Tuning</label>
              <TuningSelector selectedTuning={selectedTuning} onTuningChange={setSelectedTuning} />
            </div>

            {/* Pattern Controls - Integrated into Grid */}
            <div className="flex flex-col gap-1.5 min-w-[240px]">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">Pattern Sequence</label>
              <div className="flex gap-2 w-full">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handlePatternCycle('prev')} className="min-btn px-3 flex-shrink-0" aria-label="Previous">←</motion.button>
                <div className="relative flex-grow">
                  <select
                    value={selectedPatternId}
                    onChange={(e) => setSelectedPatternId(e.target.value)}
                    className="min-select w-full appearance-none cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    <option value="">Show Full Fretboard</option>
                    <optgroup label="Pentatonic Boxes">
                      {ALL_PATTERNS.filter(p => p.type === 'pentatonic').map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="CAGED System">
                      {ALL_PATTERNS.filter(p => p.type === 'caged').map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handlePatternCycle('next')} className="min-btn px-3 flex-shrink-0" aria-label="Next">→</motion.button>
              </div>
            </div>
          </div>

          {/* Row 2: View Toggles (Optional Refinements) */}
          <div className="flex justify-end pt-2 border-t border-border-subtle mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowIntervals(!showIntervals)}
              className="text-xs font-semibold text-accent-primary hover:text-accent-secondary transition-colors"
            >
              {showIntervals ? 'Mode: Intervals (1, 3, 5)' : 'Mode: Note Names (A, C, E)'}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* 
        MAIN HERO AREA: Fretboard 
        - Centered
        - Max Width
        - Shadow/Depth
      */}
      <motion.main variants={itemVariants} className="w-full flex-grow flex flex-col items-center justify-start pb-32"> {/* Large padding bottom for future player */}

        <div className="w-full max-w-[1400px] overflow-x-auto rounded-2xl shadow-2xl border border-border-subtle bg-fretboard-bg">
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
