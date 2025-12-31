'use client';

import Link from 'next/link';
import FlowingMenu from '@/components/ui/FlowingMenu';
import ChromaGrid from '@/components/ui/ChromaGrid';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import ScrollFloat from '@/components/ui/ScrollFloat';

// --- Assets ---
const HERO_IMAGE = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop";

// --- Animation Config ---
const transitionCurrent = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }; // "Moka" ultra-smooth ease

const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitionCurrent
    }
};

const staggerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const reducedMotion = useReducedMotion();

    // Scroll Reveal Effects
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -50]); // Subtler parallax

    return (
        <div className="bg-bg-page text-text-primary font-sans selection:bg-accent-primary/20 selection:text-white overflow-x-hidden w-full antialiased pb-0">

            {/* --- FONTS --- */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;900&family=Playfair+Display:ital,wght@1,400&family=Pinyon+Script&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <style jsx global>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-script { font-family: 'Pinyon Script', cursive; }
                html { scroll-behavior: smooth; }
            `}</style>

            {/* --- GLOBAL GLOW FRAME (Moka "Vignette") --- */}
            <div className="fixed inset-0 pointer-events-none z-[100] shadow-[inset_0_0_120px_rgba(16,185,129,0.15)] dark:shadow-[inset_0_0_120px_rgba(16,185,129,0.08)]"></div>

            {/* --- HERO SECTION --- */}
            <header className="relative w-full min-h-screen flex flex-col items-center justify-center px-6">
                <div className="max-w-[1400px] w-full mx-auto relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerVariant}
                        className="flex flex-col items-center text-center z-10 relative"
                    >
                        {/* Version Tag (Restored Minimal) */}
                        <motion.div variants={fadeUpVariant} className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-text-secondary/60 uppercase mb-6">
                            <span className="w-8 h-[1px] bg-accent-primary" />
                            <span>v1.0</span>
                            <span className="w-8 h-[1px] bg-accent-primary" />
                        </motion.div>

                        {/* Huge "Moka" Scale + "Old" Mixed Fonts */}
                        <motion.h1 variants={fadeUpVariant} className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.9] text-text-primary mix-blend-overlay dark:mix-blend-normal opacity-90">
                            RHYTHM <br />
                            <span className="font-serif italic font-light text-text-tertiary text-5xl md:text-8xl align-middle px-4">&</span>
                            <span className="text-accent-primary">LEAD</span>
                        </motion.h1>

                        {/* Minimal Description */}
                        <motion.p variants={fadeUpVariant} className="mt-10 text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-lg mx-auto tracking-wide">
                            Master the fretboard. Visualize scales. <br />
                            Compose with <span className="font-medium text-text-primary">absolute precision</span>.
                        </motion.p>

                        {/* Restored Hero CTA Button */}
                        <motion.div variants={fadeUpVariant} className="pt-10">
                            <Link href="/dashboard" className="relative group inline-block">
                                <span className="absolute inset-0 rounded-full bg-accent-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                                <div className="relative px-10 py-5 bg-text-primary text-bg-page group-hover:bg-accent-primary group-hover:text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-3 shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-0.5">
                                    Start Practice
                                    <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </Link>
                        </motion.div>

                    </motion.div>
                </div>

                {/* Background (Subtle Texture) */}
                <motion.div style={{ y: yHero }} className="absolute inset-0 z-[-1] opacity-20 dark:opacity-30 mix-blend-luminosity">
                    <img src={HERO_IMAGE} alt="Texture" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/50 to-transparent"></div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6, y: [0, 8, 0] }}
                    transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-tertiary pointer-events-none"
                >
                    <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                </motion.div>
            </header>

            {/* --- PHILOSOPHY (Scroll Opacity Sync) --- */}
            <section className="py-32 bg-bg-page relative px-6 min-h-[50vh] flex items-center">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="w-full md:w-1/3 text-[14px] font-bold uppercase tracking-[0.2em] text-text-tertiary sticky top-32">
                            (01) <br /> The Philosophy
                        </div>
                        <div className="w-full md:w-2/3">
                            <ScrollFloat
                                animationDuration={1}
                                ease='back.out(2)'
                                scrollStart='center bottom+=50%'
                                scrollEnd='bottom bottom-=40%'
                                stagger={0.03}
                                textClassName="text-5xl md:text-6xl font-medium text-text-primary tracking-tight leading-tight"
                            >
                                Practice shouldn't feel like a chore. It should be an immersive experience where technology meets artistry.
                            </ScrollFloat>

                            <div className="mt-8 flex flex-wrap items-baseline gap-y-2">
                                <ScrollFloat
                                    animationDuration={1}
                                    ease='back.out(2)'
                                    stagger={0.02}
                                    containerClassName='my-0'
                                    textClassName="text-4xl md:text-5xl font-medium text-text-primary tracking-tight leading-tight"
                                >
                                    Driven by&nbsp;
                                </ScrollFloat>
                                <ScrollFloat
                                    animationDuration={1}
                                    ease='back.out(2)'
                                    stagger={0.02}
                                    containerClassName='my-0'
                                    textClassName="text-5xl md:text-6xl font-script text-accent-primary align-middle px-1 leading-none"
                                >
                                    Passion
                                </ScrollFloat>
                                <ScrollFloat
                                    animationDuration={1}
                                    ease='back.out(2)'
                                    stagger={0.02}
                                    containerClassName='my-0'
                                    textClassName="text-4xl md:text-5xl font-medium text-text-primary tracking-tight leading-tight"
                                >
                                    , crafted for musicians who demand excellence.
                                </ScrollFloat>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- AUDIO ENGINE: Flowing Menu --- */}
            <section className="py-24 px-4 md:px-6">
                <div className="max-w-[1400px] mx-auto">


                    <div className="h-[500px] w-full relative border-t border-b border-white/10">
                        <FlowingMenu
                            items={[
                                { link: '#eq', text: 'Signal Analysis', image: 'https://picsum.photos/600/400?grayscale' },
                                { link: '#metronome', text: 'Poly-Metronome', image: 'https://picsum.photos/600/400?grayscale&blur=2' },
                                { link: '#library', text: 'Smart Library', image: 'https://picsum.photos/600/400?grayscale' },
                                { link: '#tuner', text: 'Precision Tuner', image: 'https://picsum.photos/600/400?grayscale&blur=1' }
                            ]}
                            bgColor="transparent"
                            textColor="#ffffff"
                            marqueeBgColor="#10B981"
                            marqueeTextColor="#000000"
                        />
                    </div>
                </div>
            </section>

            {/* --- CHROMA GRID: Legends --- */}
            <section className="py-24 px-4 md:px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-16 md:text-center max-w-2xl mx-auto space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-primary"
                        >
                            03 • Inspiration
                        </motion.span>
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-semibold tracking-tight text-white"
                        >
                            Legends, and more legends...
                        </motion.h3>
                    </div>

                    <div className="min-h-[600px] w-full relative group">
                        <ChromaGrid
                            items={[
                                { image: "/guitarist/JimiHendrix.jpg", title: "Jimi Hendrix", subtitle: "Psychedelic Rock", handle: "1942-1970", gradient: "linear-gradient(145deg, #7c3aed, #000)", borderColor: "#7c3aed" },
                                { image: "/guitarist/DavidGlimour.jpg", title: "David Gilmour", subtitle: "Progressive Rock", handle: "Pink Floyd", gradient: "linear-gradient(145deg, #3b82f6, #000)", borderColor: "#3b82f6" },
                                { image: "/guitarist/JimmyPage.jpg", title: "Jimmy Page", subtitle: "Hard Rock", handle: "Led Zeppelin", gradient: "linear-gradient(145deg, #ef4444, #000)", borderColor: "#ef4444" },
                                { image: "/guitarist/JohnMayer.jpg", title: "John Mayer", subtitle: "Blues Pop", handle: "Continuum", gradient: "linear-gradient(145deg, #10b981, #000)", borderColor: "#10b981" },
                                { image: "/guitarist/TimHenson.jpg", title: "Tim Henson", subtitle: "Math Rock", handle: "Polyphia", gradient: "linear-gradient(145deg, #a855f7, #000)", borderColor: "#a855f7" },
                                { image: "/guitarist/EddieVanHalen.avif", title: "Eddie Van Halen", subtitle: "Hard Rock", handle: "EVH", gradient: "linear-gradient(145deg, #ef4444, #000)", borderColor: "#ef4444" },
                                { image: "/guitarist/B.B King.jpg", title: "B.B. King", subtitle: "Electric Blues", handle: "The King", gradient: "linear-gradient(145deg, #3b82f6, #000)", borderColor: "#3b82f6" },
                                { image: "/guitarist/Slash.jpg", title: "Slash", subtitle: "Hard Rock", handle: "Guns N' Roses", gradient: "linear-gradient(145deg, #f59e0b, #000)", borderColor: "#f59e0b" },
                            ]}
                            radius={450}
                        />
                    </div>
                </div>
            </section>


            {/* --- FOOTER CTA & CREATOR --- */}
            <section className="pt-32 pb-12 px-6 text-center bg-bg-page">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={transitionCurrent}
                    className="max-w-4xl mx-auto flex flex-col items-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-text-primary mb-12">
                        "The distance between <span className="text-text-tertiary">imagination</span> and execution is practice."
                    </h2>

                    <Link href="/dashboard">
                        <button className="group relative h-16 px-12 bg-text-primary text-bg-page rounded-full overflow-hidden transition-all hover:scale-105 duration-300">
                            <div className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-[0.15em] text-xs">
                                Start Playing Now
                            </div>
                            <div className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </button>
                    </Link>
                </motion.div>

                {/* Creator Footer */}
                <div className="max-w-7xl mx-auto border-t border-text-tertiary/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-medium">
                    <div>
                        Version 1.0 • {new Date().getFullYear()}
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Created by <span className="text-text-primary">Doan Luc</span></span>
                        <span className="w-1 h-1 rounded-full bg-accent-primary"></span>
                        <span>Built for Passion</span>
                    </div>
                </div>
            </section>

            {/* --- FLOATING FAB --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-8 right-8 z-40 hidden md:flex flex-col gap-2 pointer-events-none"
            >
                <Link href="/dashboard" className="pointer-events-auto">
                    <div className="w-12 h-12 bg-bg-surface border border-text-primary/10 rounded-full flex items-center justify-center shadow-lg hover:bg-text-primary hover:text-bg-page transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                    </div>
                </Link>
            </motion.div>

        </div>
    );
}
