'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Reusable Components for this page
const FeatureCard = ({ icon, title, desc, delay }: { icon: string, title: string, desc: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        className="group p-8 rounded-2xl bg-bg-surface/50 border border-border-subtle hover:border-accent-primary/30 transition-all duration-300 hover:bg-bg-surface-hover relative overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-md"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent-primary/20 transition-colors relative z-10">
            <span className="material-symbols-outlined text-accent-primary text-2xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3 relative z-10">{title}</h3>
        <p className="text-text-secondary leading-relaxed text-sm relative z-10">{desc}</p>
    </motion.div>
);

export default function LandingPageEnhanced() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Mock Data
    const features = [
        { icon: 'graphic_eq', title: 'Precision Audio', desc: 'High-accuracy polyphonic DSP tuning for any environment. Always pitch perfect.', delay: 0.1 },
        { icon: 'piano', title: 'Fretboard Logic', desc: 'Visualize scales and modes instantly. See the hidden patterns across the neck.', delay: 0.2 },
        { icon: 'queue_music', title: 'Jam Station', desc: 'Adaptive backing tracks that follow your key and tempo. Your personal session band.', delay: 0.3 },
    ];

    return (
        <div ref={containerRef} className="bg-bg-page min-h-screen text-text-primary font-sans selection:bg-accent-primary selection:text-white overflow-x-hidden transition-colors duration-300">
            {/* Google Fonts Injection */}
            <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=swap" rel="stylesheet" />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
                {/* Dynamic Background Blobs - Adjusted opacity for Light Mode */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <motion.div
                        animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] bg-accent-primary/10 rounded-full blur-[100px] opacity-40 mix-blend-multiply dark:mix-blend-screen"
                    />
                    <motion.div
                        animate={{ x: [0, -30, 20, 0], y: [0, 40, -30, 0], scale: [1, 1.2, 0.8, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                        className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-30 mix-blend-multiply dark:mix-blend-screen"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-surface border border-border-subtle shadow-sm hover:border-accent-primary/30 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_10px_var(--accent-primary)]"></span>
                            <span className="text-xs font-semibold text-text-primary tracking-wide uppercase">Interactive Studio</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[1.1] text-text-primary drop-shadow-sm"
                        >
                            The Art of <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent-primary to-blue-500">Fretboard Logic</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-text-secondary max-w-2xl font-light leading-relaxed"
                        >
                            A beautiful, distraction-free environment to visualize scales, tune your instrument, and master the guitar.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    className="h-14 px-10 rounded-full bg-accent-primary text-white font-semibold text-lg transition-all shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:brightness-110"
                                >
                                    Enter Studio
                                </motion.button>
                            </Link>
                            <Link href="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "var(--bg-surface-hover)" }} whileTap={{ scale: 0.95 }}
                                    className="h-14 px-10 rounded-full bg-bg-surface border border-border-subtle text-text-primary font-medium text-lg flex items-center gap-2 hover:border-border-strong transition-colors shadow-sm"
                                >
                                    Log In
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Live Preview Mockup (Code-drawn dashboard) */}
                <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.6, duration: 1, type: "spring" }}
                    className="mt-24 relative w-full max-w-6xl mx-auto px-4 perspective-1000"
                >
                    <div className="absolute -inset-1 bg-gradient-to-t from-accent-primary/20 to-transparent blur-3xl opacity-40 rounded-[2rem]"></div>
                    <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-border-subtle shadow-2xl bg-bg-page ring-1 ring-border-subtle aspect-[16/9] md:aspect-[21/9] flex flex-col group">

                        {/* Fake Header */}
                        <div className="h-12 border-b border-border-subtle flex items-center px-6 gap-4 bg-bg-surface/50 backdrop-blur-md">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="h-6 w-64 bg-bg-surface-hover rounded-full"></div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-bg-surface-hover"></div>
                        </div>

                        {/* Body Preview */}
                        <div className="flex-1 flex relative overflow-hidden bg-bg-page/50">
                            {/* Sidebar Mock */}
                            <div className="w-16 md:w-64 border-r border-border-subtle hidden md:flex flex-col p-4 gap-4 bg-bg-surface/30">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-10 rounded-lg bg-bg-surface-hover animate-pulse opacity-50" style={{ animationDelay: `${i * 100}ms` }}></div>
                                ))}
                            </div>
                            {/* Content Mock */}
                            <div className="flex-1 p-6 flex flex-col gap-6 relative">
                                {/* Glowing Fretboard Placeholder */}
                                <div className="w-full h-32 rounded-xl bg-gradient-to-r from-bg-surface-hover to-bg-surface border border-border-subtle relative overflow-hidden flex items-center justify-around px-10 shadow-inner">
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,var(--bg-surface)_50%,transparent_100%)] opacity-50 animate-[shimmer_3s_infinite]"></div>
                                    <div className="w-full h-[1px] bg-border-strong/50"></div>
                                    <div className="w-full h-[1px] bg-border-strong/50"></div>
                                    <div className="w-full h-[1px] bg-border-strong/50"></div>
                                    <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_12px_var(--accent-primary)] z-10"></div>
                                    <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_12px_var(--accent-primary)] z-10"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="h-32 rounded-xl bg-bg-surface border border-border-subtle shadow-sm"></div>
                                    <div className="h-32 rounded-xl bg-bg-surface border border-border-subtle shadow-sm"></div>
                                    <div className="h-32 rounded-xl bg-bg-surface border border-border-subtle shadow-sm"></div>
                                </div>
                            </div>

                            {/* Overlay Data */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-bg-page via-bg-page/95 to-transparent flex items-center gap-6 text-sm font-mono text-text-secondary border-t border-border-subtle/20">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-accent-primary text-base">graphic_eq</span>
                                    <span className="font-bold text-text-primary">Tuner Active</span>
                                </div>
                                <div className="h-1 w-1 bg-border-strong rounded-full"></div>
                                <div>Key: Am</div>
                                <div className="h-1 w-1 bg-border-strong rounded-full"></div>
                                <div>120 BPM</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="py-24 bg-bg-surface/30 border-t border-border-subtle backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 max-w-6xl mx-auto">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Your Digital Studio</h2>
                            <p className="text-text-secondary text-lg max-w-md">Everything needed to go from beginner to pro, packaged in a sleek, minimalist interface.</p>
                        </div>
                        <Link href="/dashboard" className="group flex items-center gap-2 text-accent-primary font-medium hover:text-accent-primary/80 transition-colors">
                            Explore all features
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {features.map((f, i) => (
                            <FeatureCard key={i} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-bg-page border-t border-border-subtle py-12 text-sm text-text-tertiary">
                <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <p>© 2024 GuitArt. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-text-primary transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-text-primary transition-colors">Twitter</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
