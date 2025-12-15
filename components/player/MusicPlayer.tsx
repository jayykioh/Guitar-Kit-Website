'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedDropdown from '@/components/ui/AnimatedDropdown';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [genre, setGenre] = useState('blues');
    const [style, setStyle] = useState('shuffle');

    // Mocks
    const genres = [
        { value: 'blues', label: 'Blues' },
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'metal', label: 'Metal' }
    ];

    const styles = [
        { value: 'shuffle', label: 'Slow Shuffle' },
        { value: 'straight', label: 'Straight Feel' },
        { value: 'ballad', label: 'Ballad' }
    ];

    return (
        <div className="flex flex-col gap-4 w-full h-full justify-between">

            {/* Top: Player Display (Apple Music Style) */}
            <div className="flex items-center gap-4 bg-bg-surface-hover/50 p-3 rounded-xl border border-border-subtle/50">
                {/* Album Art / Rotating CD */}
                <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 shadow-md flex items-center justify-center flex-shrink-0 relative overflow-hidden ring-2 ring-white/10"
                >
                    <div className="w-4 h-4 rounded-full bg-bg-surface absolute z-10"></div>
                    {/* Vinyl grooves hint */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/5 opacity-50"></div>
                    <div className="absolute inset-2 rounded-full border border-white/5 opacity-50"></div>
                    {/* Gloss effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </motion.div>

                {/* Track Info */}
                <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-bold text-text-primary truncate">
                        Backing Track 1
                    </h3>
                    <p className="text-xs text-text-secondary truncate">
                        {genres.find(g => g.value === genre)?.label} • {styles.find(s => s.value === style)?.label}
                    </p>

                    {/* Progress Bar (Visual Mock) */}
                    <div className="w-full h-1 bg-border-subtle rounded-full mt-2 overflow-hidden">
                        <motion.div
                            initial={{ width: "30%" }}
                            animate={{ width: isPlaying ? ["30%", "100%"] : "30%" }}
                            transition={{ duration: 30, ease: "linear", repeat: isPlaying ? Infinity : 0 }}
                            className="h-full bg-accent-primary"
                        />
                    </div>
                </div>

                {/* Play Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 flex-shrink-0 rounded-full bg-text-primary text-bg-page flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                >
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M5 3l14 9-14 9V3z" /></svg>
                    )}
                </motion.button>
            </div>

            {/* Bottom: Configuration */}
            <div className="grid grid-cols-2 gap-3">
                <AnimatedDropdown
                    label="Genre"
                    value={genre}
                    options={genres}
                    onChange={setGenre}
                />
                <AnimatedDropdown
                    label="Style"
                    value={style}
                    options={styles}
                    onChange={setStyle}
                />
            </div>

        </div>
    );
}
