'use client';

import { motion } from 'framer-motion';
import { useTuner } from '../../hooks/useTuner';

export const TunerWidget = () => {
    const { isListening, note, cents, frequency, error, startListening, stopListening } = useTuner();

    const toggleTuner = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel bg-bg-surface text-text-primary p-8 flex flex-col items-center justify-between gap-8 relative overflow-hidden shadow-md"
        >
            {/* Header */}
            <div className="flex justify-between w-full items-start z-10">
                <div>
                    <h3 className="text-xl font-bold">Tuner</h3>
                    <p className="text-sm text-text-secondary">Standard E • 440Hz</p>
                </div>
                <button
                    onClick={toggleTuner}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening
                            ? 'bg-red-500/10 text-red-500 animate-pulse'
                            : 'bg-bg-surface-hover hover:text-accent-primary'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="absolute top-16 left-0 right-0 z-20 px-8">
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-2 rounded text-center">
                        {error}
                    </div>
                </div>
            )}

            {/* Active Tuner Visuals */}
            {isListening ? (
                <div className="flex flex-col items-center z-10 w-full">
                    <div className="relative w-full h-32 flex items-end justify-center mb-2">
                        {/* Dynamic Needle */}
                        <div className="absolute bottom-0 w-64 h-32 overflow-hidden">
                            <div className="w-full h-full border-t-[16px] border-x-[16px] border-border-subtle rounded-t-full opacity-20"></div>
                        </div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: (cents / 50) * 45 }} // ±45 degrees range
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            className="absolute bottom-0 w-1 h-28 bg-accent-primary origin-bottom rounded-full shadow-[0_0_15px_var(--accent-primary)] z-10"
                        ></motion.div>

                        {/* Center Marker */}
                        <div className="absolute bottom-0 w-4 h-4 bg-bg-surface border-2 border-accent-primary rounded-full z-20"></div>
                    </div>

                    <div className="flex flex-col items-center -mt-4">
                        <span className={`text-6xl font-black tracking-tighter drop-shadow-md ${Math.abs(cents) < 5 ? 'text-accent-primary' : 'text-text-primary'}`}>
                            {note || '--'}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mt-1 ${Math.abs(cents) < 5
                                ? 'bg-accent-primary/20 text-accent-primary'
                                : 'bg-bg-surface-hover text-text-secondary'
                            }`}>
                            {frequency ? `${frequency.toFixed(0)} Hz` : 'Listening...'}
                        </span>
                    </div>
                </div>
            ) : (
                /* Static Placeholder (Idle State) */
                <div className="flex flex-col items-center z-10 w-full opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="relative w-48 h-24 mt-4 flex justify-center items-end">
                        <div className="absolute bottom-0 w-48 h-24 border-t-[12px] border-x-[12px] border-border-strong rounded-t-full box-border"></div>
                        <div className="absolute bottom-0 w-48 h-24 border-t-[12px] border-x-[12px] border-accent-primary border-b-0 rounded-t-full box-border opacity-30"></div>
                        <div className="absolute bottom-0 left-1/2 w-1 h-20 bg-accent-primary origin-bottom rounded-full -translate-x-1/2 rotate-[12deg] shadow-[0_0_20px_var(--accent-primary)]"></div>
                        <div className="absolute -bottom-1 w-5 h-5 bg-bg-surface rounded-full z-20 shadow-md border border-border-subtle"></div>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-4 pb-2">
                        <span className="text-7xl font-black text-accent-primary tracking-tighter drop-shadow-md">E</span>
                        <span className="text-xs font-bold text-text-secondary bg-bg-surface-hover px-3 py-1 rounded-full uppercase tracking-widest">Tap mic to start</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
};
