'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Reusable Components
const FeatureCard = ({ icon, title, desc, delay }: { icon: string, title: string, desc: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        className="group p-8 rounded-3xl bg-bg-surface/50 border border-border-subtle hover:border-accent-primary/30 transition-all duration-300 hover:bg-bg-surface-hover relative overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-xl"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent-primary/20 transition-colors relative z-10">
            <span className="material-symbols-outlined text-accent-primary text-2xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3 relative z-10 tracking-tight">{title}</h3>
        <p className="text-text-secondary leading-relaxed text-sm relative z-10 font-medium">{desc}</p>
    </motion.div>
);



export default function LandingPageEnhanced() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Mock Data
    const features = [
        { icon: 'graphic_eq', title: 'Precision Audio', desc: 'High-accuracy polyphonic DSP tuning for any environment.', delay: 0.1 },
        { icon: 'piano', title: 'Fretboard Logic', desc: 'Visualize scales and modes instantly across the entire neck.', delay: 0.2 },
        { icon: 'queue_music', title: 'Jam Station', desc: 'Adaptive backing tracks that follow your key and tempo.', delay: 0.3 },
    ];

    return (
        <div ref={containerRef} className="bg-bg-page min-h-screen text-text-primary font-sans selection:bg-accent-primary selection:text-white overflow-x-hidden transition-colors duration-300">
            {/* Google Fonts Injection */}
            <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=swap" rel="stylesheet" />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
                {/* Modern Mesh Gradient Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-accent-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-center gap-10 max-w-5xl mx-auto">
                        {/* New Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_var(--accent-primary)]"></span>
                            <span className="text-xs font-bold text-accent-primary tracking-wide uppercase">v1.0 Now Live</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-text-primary drop-shadow-sm"
                        >
                            Master the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-purple-500 to-blue-500">Fretboard</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="text-lg md:text-2xl text-text-secondary max-w-2xl font-medium leading-relaxed"
                        >
                            A distraction-free studio for the modern guitarist. <br className="hidden md:block" /> Connect theory to muscle memory.
                        </motion.p>

                        {/* Buttons & Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="flex flex-col items-center gap-12 pt-4"
                        >
                            <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                                <Link href="/dashboard">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="h-14 px-12 rounded-full bg-accent-primary text-white font-bold text-lg transition-all shadow-xl shadow-accent-primary/25 hover:shadow-accent-primary/40 hover:brightness-110 flex items-center gap-3"
                                    >
                                        Start Practice
                                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                    </motion.button>
                                </Link>
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05, backgroundColor: "var(--bg-surface-hover)" }} whileTap={{ scale: 0.95 }}
                                        className="h-14 px-12 rounded-full bg-bg-surface border border-border-subtle text-text-primary font-bold text-lg flex items-center gap-2 hover:border-border-strong transition-colors shadow-sm"
                                    >
                                        Log In
                                    </motion.button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-60 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-text-secondary">
                                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent-primary"></span>Interactive Fretboard</span>
                                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent-primary"></span>Focus Mode</span>
                                <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent-primary"></span>Smart Tracking</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Live Preview Mockup - Reimagined */}
                <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 40 }}
                    className="mt-32 relative w-full max-w-7xl mx-auto px-4 perspective-1000"
                >
                    <div className="absolute -inset-1 bg-gradient-to-t from-accent-primary/20 via-purple-500/10 to-transparent blur-3xl opacity-40 rounded-[2rem]"></div>
                    <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-border-subtle shadow-2xl bg-bg-page ring-1 ring-white/10 aspect-[16/10] md:aspect-[21/10] flex flex-col group transition-transform duration-500 hover:scale-[1.01]">

                        {/* Header Mock */}
                        <div className="h-14 border-b border-border-subtle flex items-center px-8 gap-4 bg-bg-surface/80 backdrop-blur-md justify-between">
                            <div className="flex gap-2 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center gap-2 opacity-30">
                                <div className="w-32 h-2 rounded-full bg-text-primary"></div>
                            </div>
                        </div>

                        <div className="flex-1 flex bg-bg-page relative">
                            {/* Sidebar Mock */}
                            <div className="w-20 border-r border-border-subtle flex flex-col items-center py-8 gap-8 bg-bg-surface/30">
                                <div className="w-10 h-10 rounded-xl bg-accent-primary/20"></div>
                                <div className="w-10 h-10 rounded-xl bg-bg-surface-hover"></div>
                                <div className="w-10 h-10 rounded-xl bg-bg-surface-hover"></div>
                                <div className="mt-auto w-10 h-10 rounded-full bg-bg-surface border border-border-subtle"></div>
                            </div>

                            {/* Main Content Mock */}
                            <div className="flex-1 p-8 md:p-12 flex flex-col gap-8">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-3">
                                        <div className="w-48 h-4 rounded-lg bg-text-tertiary/20"></div>
                                        <div className="w-96 h-10 rounded-lg bg-text-primary/10"></div>
                                    </div>
                                    <div className="w-32 h-32 rounded-full border-4 border-bg-surface bg-accent-primary/10 relative flex items-center justify-center">
                                        <div className="text-accent-primary font-black text-2xl">85%</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 h-full">
                                    <div className="rounded-3xl bg-bg-surface border border-border-subtle p-6 flex flex-col gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20"></div>
                                        <div className="w-full h-32 rounded-xl bg-bg-page/50 border border-border-subtle/50"></div>
                                    </div>
                                    <div className="rounded-3xl bg-gradient-to-br from-accent-primary/20 to-bg-surface border border-accent-primary/20 p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-3xl rounded-full"></div>
                                        <div className="relative z-10 space-y-4">
                                            <div className="w-24 h-6 rounded-full bg-accent-primary/20"></div>
                                            <div className="w-full h-4 rounded-full bg-text-primary/10"></div>
                                            <div className="w-2/3 h-4 rounded-full bg-text-primary/10"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="py-32 bg-bg-surface/30 border-t border-border-subtle backdrop-blur-sm relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent-primary/5 rounded-full blur-[100px]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 max-w-7xl mx-auto">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary tracking-tight">Your Digital Studio</h2>
                            <p className="text-text-secondary text-xl max-w-lg font-light">Everything you need to go from beginner to pro, packaged in a sleek, minimalist interface.</p>
                        </div>
                        <Link href="/dashboard" className="group flex items-center gap-2 text-accent-primary font-bold text-lg hover:text-accent-primary/80 transition-colors bg-accent-primary/5 px-6 py-3 rounded-full hover:bg-accent-primary/10">
                            Explore all features
                            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {features.map((f, i) => (
                            <FeatureCard key={i} {...f} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
