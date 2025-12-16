'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MetronomeControl() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempBpm, setTempBpm] = useState(120); // For modal editing

    // Handle Modal Open
    const openModal = () => {
        setTempBpm(bpm);
        setIsModalOpen(true);
    };

    // Handle Confirm
    const handleConfirm = () => {
        setBpm(tempBpm);
        setIsModalOpen(false);
        setIsPlaying(true); // Auto-start on confirm? Or just set? "Playing (active)" state implies we might want to start.
        // User request: "After BPM is selected... display chosen BPM... button visually indicate playing/stopped"
    };

    // Handle Cancel
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Adjust BPM helpers
    const increment = () => setTempBpm(prev => Math.min(prev + 1, 300));
    const decrement = () => setTempBpm(prev => Math.max(prev - 1, 30));
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => setTempBpm(Number(e.target.value));

    // Handle Toggle Play (if we want direct access without modal? User said "When click... open modal". 
    // But once setup, clicking again to stop is standard. 
    // I will split the button: Icon (Toggle) | Text (Settings/Modal))
    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative z-50">
            {/* Main Button Control */}
            <div className="flex items-center bg-bg-surface border border-border-subtle rounded-xl h-[40px] px-1 shadow-sm transition-colors hover:border-accent-primary group">

                {/* BPM Settings Trigger */}
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 px-3 h-full text-xs font-bold text-text-secondary hover:text-text-primary transition-colors border-r border-border-subtle/50"
                >
                    <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-accent-primary animate-pulse' : 'bg-border-strong'}`}></span>
                    <span className="tabular-nums">{bpm}</span> <span className="text-[10px] text-text-tertiary uppercase tracking-wide">BPM</span>
                </button>

                {/* Quick Play Toggle */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className={`
                        w-8 h-8 ml-1 rounded-lg flex items-center justify-center transition-colors
                        ${isPlaying ? 'bg-accent-primary text-bg-page' : 'text-text-tertiary hover:bg-bg-surface-hover hover:text-text-primary'}
                    `}
                >
                    {isPlaying ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M5 3l14 9-14 9V3z" /></svg>
                    )}
                </motion.button>
            </div>

            {/* BPM Selection Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
                            onClick={handleCancel}
                        />

                        {/* Modal Container - Centered Fixed Overlay */}
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="w-full max-w-xs bg-bg-surface border border-border-subtle rounded-xl shadow-2xl p-6 pointer-events-auto shadow-glow/10"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-text-primary">Set Tempo</h3>
                                    <span className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">BPM</span>
                                </div>

                                {/* BPM Display & Controls */}
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={decrement}
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle hover:bg-bg-surface-hover hover:border-text-tertiary transition-all text-xl font-medium shadow-sm"
                                    >
                                        −
                                    </motion.button>

                                    <div className="flex-grow text-center relative">
                                        <input
                                            type="number"
                                            value={tempBpm}
                                            onChange={(e) => setTempBpm(Number(e.target.value))}
                                            className="w-24 text-center text-4xl font-black text-accent-primary bg-transparent focus:outline-none"
                                        />
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={increment}
                                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-bg-surface border border-border-subtle hover:bg-bg-surface-hover hover:border-text-tertiary transition-all text-xl font-medium shadow-sm"
                                    >
                                        +
                                    </motion.button>
                                </div>

                                {/* Slider */}
                                <div className="mb-6 px-1">
                                    <input
                                        type="range"
                                        min="30" max="300"
                                        value={tempBpm}
                                        onChange={handleSliderChange}
                                        className="w-full h-2 bg-bg-surface-hover rounded-full appearance-none cursor-pointer accent-accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-text-tertiary font-medium mt-2 px-1">
                                        <span>30</span>
                                        <span>120</span>
                                        <span>300</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-3 rounded-xl text-sm font-bold text-text-secondary bg-transparent border border-border-subtle hover:bg-bg-surface-hover hover:text-text-primary transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="px-4 py-3 rounded-xl text-sm font-bold text-bg-page bg-accent-primary hover:opacity-90 transition-opacity shadow-lg shadow-accent-primary/20"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
