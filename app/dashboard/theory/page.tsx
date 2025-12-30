'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TheoryPage() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const sections = [
        {
            title: " The Major Scale (Ionian)",
            desc: "The foundation of Western music. All other scales and modes are compared to this one.",
            formula: "W - W - H - W - W - W - H",
            intervals: "1 - 2 - 3 - 4 - 5 - 6 - 7",
            color: "text-blue-500"
        },
        {
            title: "The Natural Minor (Aeolian)",
            desc: "The sad, emotional counterpart to the major scale. Essential for rock and metal.",
            formula: "W - H - W - W - H - W - W",
            intervals: "1 - 2 - b3 - 4 - 5 - b6 - b7",
            color: "text-purple-500"
        },
        {
            title: "Pentatonic Scales",
            desc: "The 'five-tone' scales that discard the tension notes. The bread and butter of guitar solos.",
            formula: "Minor: 1 - b3 - 4 - 5 - b7",
            intervals: "Major: 1 - 2 - 3 - 5 - 6",
            color: "text-green-500"
        }
    ];

    const modes = [
        { name: "Dorian", desc: "Minor with a natural 6th. Jazzy, funky, Santana-esque.", interval: "1 2 b3 4 5 6 b7" },
        { name: "Phrygian", desc: "Minor with a flat 2nd. Exotic, Spanish, Metal.", interval: "1 b2 b3 4 5 b6 b7" },
        { name: "Lydian", desc: "Major with a sharp 4th. Dreamy, floating, sci-fi.", interval: "1 2 3 #4 5 6 7" },
        { name: "Mixolydian", desc: "Major with a flat 7th. Bluesy, Rock n' Roll.", interval: "1 2 3 4 5 6 b7" },
        { name: "Locrian", desc: "Diminished. Unstable, dark, rarely used.", interval: "1 b2 b3 4 b5 b6 b7" }
    ];

    return (
        <main className="min-h-screen w-full pt-24 pb-12 px-4 md:px-8 max-w-[1000px] mx-auto flex flex-col gap-10">

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
            >
                <Link href="/dashboard" className="text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-2 mb-2 w-fit">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Studio
                </Link>
                <div className="flex items-center gap-3">
                    <span className="p-3 rounded-xl bg-accent-primary/10 text-accent-primary text-2xl material-symbols-outlined">
                        school
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-text-primary">
                        Music Theory
                    </h1>
                </div>
                <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                    Understanding the language of music unlocks the fretboard. Here are the core concepts every guitarist needs.
                </p>
            </motion.header>

            {/* Core Scales */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {sections.map((s, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="glass-panel p-6 flex flex-col gap-4 group hover:border-accent-primary/50 transition-colors"
                    >
                        <h3 className={`font-bold text-xl ${s.color}`}>{s.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed min-h-[60px]">{s.desc}</p>

                        <div className="mt-auto pt-4 border-t border-border-subtle/50 space-y-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-text-tertiary text-xs uppercase tracking-wider">Formula</span>
                                <span className="font-mono text-text-primary font-medium text-sm">{s.formula}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-text-tertiary text-xs uppercase tracking-wider">Intervals</span>
                                <span className="font-mono text-text-primary font-medium text-sm">{s.intervals}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            {/* The Modes */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <h2 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                    The Modes
                    <span className="text-sm font-normal text-text-secondary bg-bg-surface px-3 py-1 rounded-full border border-border-subtle">Variations of Major</span>
                </h2>

                <div className="glass-panel overflow-hidden">
                    <div className="grid grid-cols-1 divide-y divide-border-subtle">
                        {modes.map((mode, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-bg-surface-hover/30 transition-colors"
                            >
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg text-text-primary text-accent-primary">{mode.name}</h4>
                                    <p className="text-text-secondary text-sm">{mode.desc}</p>
                                </div>
                                <div className="font-mono text-sm bg-bg-surface px-4 py-2 rounded-lg border border-border-subtle text-text-primary whitespace-nowrap">
                                    {mode.interval}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Footer Note */}
            {/* Footer: Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-accent-primary/20 bg-gradient-to-br from-accent-primary/5 via-bg-surface/50 to-bg-page p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 group backdrop-blur-sm"
            >
                {/* Decorative background effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-primary/20 transition-colors duration-700"></div>

                <div className="relative z-10 max-w-xl space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
                        Ready to Apply This?
                    </h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Theory is just the map. The territory is your fretboard. Jump into <span className="text-accent-primary font-bold">Focus Mode</span> and start connecting the dots.
                    </p>
                </div>

                <div className="relative z-10 shrink-0">
                    <Link href="/practice">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-14 px-8 rounded-full bg-accent-primary text-white font-bold text-lg shadow-glow hover:brightness-110 transition-all flex items-center gap-3"
                        >
                            <span className="material-symbols-outlined">piano</span>
                            Open Fretboard
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

        </main>
    );
}
