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
            <div className="flex items-center bg-bg-surface border border-border-subtle rounded-full p-1 pl-3 pr-1 shadow-sm transition-colors hover:border-accent-primary group">

                {/* Click text to open settings */}
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 text-xs font-bold text-text-secondary group-hover:text-text-primary mr-2"
                >
                    <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-accent-primary animate-pulse' : 'bg-border-strong'}`}></span>
                    {bpm} BPM
                </button>

                {/* Quick Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-colors
                        ${isPlaying ? 'bg-accent-primary text-bg-page' : 'bg-border-subtle text-text-tertiary hover:bg-border-strong hover:text-text-primary'}
                    `}
                >
                    {isPlaying ? (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M5 3l14 9-14 9V3z" /></svg>
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

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute bottom-full mb-3 right-0 w-64 bg-bg-surface border border-border-subtle rounded-xl shadow-xl p-4 z-[101]"
                        >
                            <h3 className="text-sm font-bold text-text-primary mb-3">Set Tempo</h3>

                            {/* BPM Display & Controls */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <motion.button whileTap={{ scale: 0.9 }} onClick={decrement} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-subtle hover:bg-bg-surface-hover text-lg font-medium">-</motion.button>
                                <div className="flex-grow text-center">
                                    <input
                                        type="number"
                                        value={tempBpm}
                                        onChange={(e) => setTempBpm(Number(e.target.value))}
                                        className="w-16 text-center text-2xl font-black text-accent-primary bg-transparent focus:outline-none"
                                    />
                                    <span className="text-xs text-text-tertiary block -mt-1">BPM</span>
                                </div>
                                <motion.button whileTap={{ scale: 0.9 }} onClick={increment} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-subtle hover:bg-bg-surface-hover text-lg font-medium">+</motion.button>
                            </div>

                            {/* Slider */}
                            <input
                                type="range"
                                min="30" max="300"
                                value={tempBpm}
                                onChange={handleSliderChange}
                                className="w-full mb-4 accent-accent-primary h-1 bg-border-subtle rounded-full appearance-none cursor-pointer"
                            />

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleConfirm}
                                    className="flex-1 bg-accent-primary text-bg-page py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                                >
                                    Set BPM
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-3 py-2 rounded-lg text-xs font-bold text-text-secondary hover:bg-bg-surface-hover transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Arrow Tip */}
                            <div className="absolute top-full right-6 w-3 h-3 bg-bg-surface border-b border-r border-border-subtle rotate-45 -mt-1.5"></div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
