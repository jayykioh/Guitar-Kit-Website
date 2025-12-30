'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

// --- Assets ---
const HERO_IMAGE = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop";
const FRETBOARD_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuD4MxjDaQ8rHK62u6HYq4qbPfoP3xKwT343Bud-bJLx7hX4r0zBD0wiFTG4kd6ApaPaVgcK6IitiT9zK8Bt0lsnIyo4Y_5peLBpf5UZfWmgrKNHhdiIuTy2YEO14y555IOFBZaMYpyaNv6WNE9234z-7IMcgd61TzCk8XcWOSYHOC8X3VAN80uhjXBXVnBKAOtXiGsBnXEEVDfrzSEjwlabZKvMIpRELA6_xRV7fHaze2mgg-BvthPvr2PwuJ6vVc-i6NIqIu8A0LVL";
const PULSE_UI_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBfo9fZ7IZzKy1z6ySr3oIqGCcPhH2WZzeDBpKoxve9NDh_Dhm4m8y2GrZTP_hxzWVhbIFBeaFJVoBrawa9XI6z5FEf6heezQEbFy6Kr_rvVIvSxh33FMjgx-bzroW-vtj0ntNHNVuNAd_R7aSlUxgHnTd_NFhB5XJBVmrSEzN7kIlxNF9iU5mi5EzLKDdsYE6ZDzdv7yEInrXfQF6PjMEEuqvg8JPj5l7loecWb7hL_lVyllX5pFJwLwRUq9_qSXAxVku3v6_y3JP_";

// --- Animation Config ---
const transitionSpring = { type: "spring", stiffness: 100, damping: 20 };
const transitionEase = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitionEase
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const reducedMotion = useReducedMotion();

    // Smooth Parallax Effects
    const yHero = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -150]);
    const scaleHero = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.1]);

    return (
        <div ref={containerRef} className="bg-bg-page text-text-primary font-sans selection:bg-accent-primary selection:text-white overflow-x-hidden w-full">

            {/* --- Fonts & Global Styles --- */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Pinyon+Script&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <style jsx global>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-script { font-family: 'Pinyon Script', cursive; }
                html { scroll-behavior: smooth; }
            `}</style>

            {/* --- HERO SECTION --- */}
            <header className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden text-center">
                {/* Background Layer */}
                <motion.div style={{ scale: scaleHero }} className="absolute inset-0 z-0">
                    <img
                        src={HERO_IMAGE}
                        alt="Background ambience"
                        className="w-full h-full object-cover opacity-90 dark:opacity-60"
                        priority="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-page/50 to-bg-page" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-page/95 via-bg-page/60 to-transparent sm:via-bg-page/40" />
                </motion.div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center h-full pt-16">
                    {/* Text Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8 md:space-y-10 max-w-3xl mx-auto items-center flex flex-col"
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-text-secondary uppercase">
                            <span className="w-12 h-[2px] bg-accent-primary" />
                            <span>Version 1.0</span>
                            <span className="w-12 h-[2px] bg-accent-primary" />
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-text-primary">
                            Rhythm <br />
                            <span className="font-serif italic font-normal text-text-secondary opacity-80">&</span> <span className="text-accent-primary drop-shadow-xl inline-block transform translate-y-1">Lead</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-md mx-auto">
                            Master the fretboard. Visualize scales. <br />
                            Compose with precision.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="pt-2 flex flex-wrap items-center justify-center gap-4">
                            <Link href="/dashboard" className="relative group rounded-full">
                                <span className="absolute inset-0 rounded-full bg-accent-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative px-8 py-4 bg-text-primary text-bg-page hover:bg-accent-primary hover:text-white rounded-full font-bold text-sm uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 shadow-lg">
                                    Start Practice
                                    <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary pointer-events-none"
                >
                    <span className="text-[9px] uppercase tracking-widest font-medium">Scroll</span>
                    <span className="material-icons-outlined text-base">keyboard_arrow_down</span>
                </motion.div>
            </header>

            {/* --- PHILOSOPHY SECTION --- */}
            <section className="py-24 md:py-32 bg-bg-page relative overflow-hidden">
                {/* Gradient Blob */}
                <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-accent-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20%" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex justify-between items-center text-[10px] uppercase tracking-widest text-text-tertiary mb-16 border-b border-border-subtle pb-6">
                            <span>// Philosophy</span>
                            <span>Est. 2025</span>
                            <span>Creator: Doan Luc</span>
                        </motion.div>

                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-text-primary mb-10">
                            Driven by <span className="font-script text-accent-primary text-5xl md:text-7xl relative px-2">Passion</span>, crafted for <span className="font-serif italic text-text-secondary">musicians</span> who demand excellence.
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            We believe that practice shouldn't feel like a chore. It should be an immersive experience where technology meets artistry.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* --- AUDIO ENGINE V2 --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden py-20">
                <div className="absolute inset-0 pointer-events-none">
                    <img
                        alt="Macro Strings"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                        src={PULSE_UI_IMAGE}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-bg-page via-transparent to-bg-page"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-page via-transparent to-bg-page"></div>
                </div>
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-gray-300 text-[10px] tracking-[0.2em] uppercase backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                            Audio Engine V2
                        </motion.span>
                        <motion.h2 variants={fadeInUp} className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6">
                            Rhythm in <span className="font-script font-normal text-accent-primary text-6xl md:text-9xl ml-2">Motion</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            A metronome that breathes. A tuner that listens. Tools built not just to measure, but to enhance your natural timing and tone.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: "graphic_eq", title: "Signal Analysis", desc: "High-fidelity input processing ensures every nuance of your playing is captured and visualized instantly." },
                            { icon: "timer", title: "Poly-Metronome", desc: "Complex time signatures, accents, and gradual tempo ramping for building true rhythmic independence." },
                            { icon: "library_music", title: "Backing Library", desc: "Generate dynamic backing tracks in any key or mode. Practice improvisation with a virtual band that never tires." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl group hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center mb-6 text-accent-primary group-hover:scale-110 transition-transform relative z-10">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2 relative z-10">{item.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed relative z-10">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURE HIGHLIGHT: Fretboard & Library --- */}
            <section className="py-24 px-6 bg-bg-page">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                        {/* Large Visual Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="md:col-span-8 relative group overflow-hidden rounded-[2.5rem] min-h-[500px] shadow-2xl"
                        >
                            <img
                                src={FRETBOARD_IMAGE}
                                alt="Guitar fretboard close up"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 md:p-14 flex flex-col justify-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-3 mb-4"
                                >
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary"></span>
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">Interactive Fretboard</span>
                                </motion.div>
                                <h3 className="text-4xl md:text-5xl font-serif italic text-white mb-2">Visualize & Master</h3>
                                <p className="text-white/70 max-w-md">See scales, modes, and arpeggios light up across the neck in real-time.</p>
                            </div>
                        </motion.div>

                        {/* Interactive Side Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="md:col-span-4 bg-bg-surface dark:bg-[#111] rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-border-subtle"
                        >
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent-primary/10 rounded-full blur-3xl"></div>

                            <div className="space-y-8 z-10">
                                <div className="w-16 h-16 rounded-3xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                    <span className="material-icons-outlined text-3xl">album</span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-text-primary mb-2">Backing <br /> <span className="font-serif italic font-normal text-text-tertiary">Tracks</span></h3>
                                    <p className="text-sm text-text-secondary leading-relaxed mt-4">
                                        Jam along to professional audio tracks that adapt to your key and tempo preferences.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-10 z-10">
                                <Link href="/songs" className="block w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl border border-border-strong text-text-primary hover:bg-text-primary hover:text-bg-page transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        Explore Library
                                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- GROWTH VISUALIZER --- */}
            <section className="py-32 bg-bg-surface relative border-t border-border-subtle">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="order-2 md:order-1 relative"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 border border-text-tertiary/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-8 border border-text-tertiary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                            <div className="absolute inset-16 border border-accent-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-text-primary">100%</div>
                                    <div className="text-xs tracking-widest text-accent-primary uppercase mt-2">Focus</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="order-1 md:order-2 space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold text-text-primary"
                        >
                            Your growth, <br />
                            <span className="font-serif italic text-text-tertiary">visualized.</span>
                        </motion.h2>
                        <div className="space-y-6">
                            {[
                                { title: "Session History", desc: "Automatically logs your practice time, bpm achievements, and scales mastered." },
                                { title: "Goal Setting", desc: "Define your weekly targets. We'll keep the streak alive with subtle nudges." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                                    className="flex gap-4"
                                >
                                    <div className="mt-1">
                                        <span className="material-symbols-outlined text-accent-primary text-sm">check_circle</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-text-primary">{item.title}</h4>
                                        <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DETAILED FEATURES --- */}
            <section className="py-32 bg-bg-page border-t border-border-subtle">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Feature List */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-accent-primary mb-6 flex items-center gap-3">
                            <span className="w-6 h-[2px] bg-accent-primary"></span>
                            <span>The Workflow</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-12 text-text-primary tracking-tight">
                            Tools that <br />
                            <span className="font-script text-6xl text-text-tertiary font-normal block mt-1">Drive Progress</span>
                        </motion.h2>

                        <div className="space-y-2">
                            {[
                                { id: "01", title: "Smart Metronome", desc: "Polyrhythms, accents, and gradual tempo increases." },
                                { id: "02", title: "Theory Engine", desc: "Instantly identify chords and scales with advanced theory integration." },
                                { id: "03", title: "Session Recorder", desc: "Capture your practice sessions and track improvement." }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="group border-b border-border-subtle hover:border-accent-primary/40 cursor-pointer transition-colors duration-500"
                                >
                                    <div className="py-6 md:py-8 flex items-center justify-between">
                                        <div className="flex items-center gap-6 md:gap-8">
                                            <span className="text-sm font-mono text-text-tertiary/50 group-hover:text-accent-primary transition-colors">{feature.id}</span>
                                            <h4 className="text-xl md:text-2xl font-medium text-text-primary group-hover:translate-x-2 transition-transform duration-300">{feature.title}</h4>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:bg-accent-primary group-hover:border-transparent transition-all">
                                            <span className="material-icons-outlined text-text-tertiary text-sm group-hover:text-white transition-colors">arrow_downward</span>
                                        </div>
                                    </div>
                                    <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                        <p className="pb-8 pl-14 md:pl-16 text-text-secondary text-base leading-relaxed max-w-sm">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Feature Visualization (Mockup) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative perspective-1000 mt-10 lg:mt-0"
                    >
                        <div className="absolute inset-0 bg-accent-primary/10 blur-[80px] rounded-full opacity-40 animate-pulse-slow"></div>
                        <div className="relative bg-[#0B0C0E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-1 transition-transform duration-700 ease-out">
                            {/* Header Gradient */}
                            <div className="h-40 bg-gradient-to-b from-white/5 to-transparent p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[10px] text-accent-primary font-bold uppercase tracking-widest mb-2">Current Scale</div>
                                        <div className="text-2xl md:text-3xl font-serif italic text-white/90">A Minor Pentatonic</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">BPM</div>
                                        <div className="text-3xl font-mono text-accent-primary">128</div>
                                    </div>
                                </div>
                            </div>

                            {/* Fret Lines */}
                            <div className="px-8 pb-12 space-y-6">
                                {[1, 2, 3, 4, 5, 6].map((string, i) => (
                                    <div key={i} className="h-[1px] bg-white/10 w-full relative">
                                        {(i === 1 || i === 4) && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + (i * 0.1), type: "spring" }}
                                                className="absolute left-[30%] -top-1.5 w-3 h-3 bg-accent-primary rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Control Bar */}
                            <div className="px-8 pb-8 flex gap-4">
                                <div className="flex-1 h-20 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center flex-col gap-1 hover:bg-white/10 transition-colors">
                                    <span className="material-icons-outlined text-gray-400 text-xl">tune</span>
                                    <span className="text-[9px] uppercase font-bold text-gray-500">Tuner</span>
                                </div>
                                <div className="flex-1 h-20 bg-accent-primary/10 rounded-2xl border border-accent-primary/20 flex items-center justify-center flex-col gap-1">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] uppercase font-bold text-accent-primary">Rec</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CALL TO ACTION & QUOTE MERGED --- */}
            <section className="py-32 bg-bg-page border-t border-border-subtle flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto space-y-12"
                >
                    {/* Quote */}
                    <div className="space-y-6">
                        <span className="material-symbols-outlined text-5xl text-text-tertiary/20">format_quote</span>
                        <h2 className="text-3xl md:text-5xl font-serif italic text-text-primary leading-tight">
                            "The distance between imagination and execution is practice."
                        </h2>
                        <div className="w-24 h-[1px] bg-accent-primary mx-auto opacity-50"></div>
                    </div>

                    {/* CTA Button */}
                    <div className="space-y-6">
                        <h2 className="text-lg uppercase tracking-widest text-text-tertiary font-bold">Ready to amplify your skills?</h2>
                        <div className="flex justify-center">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="h-14 md:h-16 px-12 md:px-16 rounded-full bg-accent-primary text-white font-bold text-lg tracking-wide shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-3"
                                >
                                    Start Playing Now
                                    <span className="material-icons-outlined">arrow_forward</span>
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}
