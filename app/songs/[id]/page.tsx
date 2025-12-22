'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { mockSongs } from '../../../data/mockSongs';
import Link from 'next/link';

export default function SongDetailPage() {
    const params = useParams();
    const songId = params?.id as string;
    const song = mockSongs.find(s => s.id === songId);

    // Feature States
    const [showChords, setShowChords] = useState(true);
    const [transpose, setTranspose] = useState(0);
    const [autoScroll, setAutoScroll] = useState(false);

    // Mock Auto Scroll Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoScroll) {
            interval = setInterval(() => {
                window.scrollBy({ top: 1, behavior: 'smooth' });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [autoScroll]);

    if (!song) {
        return <div className="min-h-screen pt-32 text-center text-text-primary">Song not found</div>;
    }

    return (
        <main className="min-h-screen w-full flex flex-col font-sans">
            {/* Hero Section - Taller for Detail View */}
            <div className="relative shrink-0 w-full h-[40vh] min-h-[400px] overflow-hidden bg-bg-page border-b border-border-subtle">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-black/40 z-0"></div>
                    <div className="w-full h-full bg-cover bg-center blur-md opacity-50 scale-105" style={{ backgroundImage: `url('${song.cover}')` }}></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-[1400px] mx-auto w-full h-full px-6 md:px-12 pb-8 flex items-end">
                    <div className="w-full flex flex-col md:flex-row gap-8 md:items-end">
                        {/* Artwork */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="shrink-0 relative group shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10 hidden md:block mb-2 w-48 h-48"
                        >
                            <div className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${song.cover}')` }}></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                                <svg className="w-16 h-16 text-accent-primary drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                            </div>
                        </motion.div>

                        {/* Title & Metadata */}
                        <div className="flex flex-col flex-1 gap-1 mb-2">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/20 text-[10px] font-bold uppercase tracking-widest">Now Playing</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-text-tertiary border border-white/5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">Guitar Tab</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-text-primary drop-shadow-2xl">{song.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 mt-3 text-lg">
                                <div className="flex items-center gap-2 text-text-secondary font-medium">
                                    <div className="w-6 h-6 rounded-full bg-text-tertiary bg-cover bg-center ring-1 ring-white/20"></div>
                                    <span>{song.artist}</span>
                                </div>
                                <span className="hidden md:inline text-text-tertiary text-sm">•</span>
                                <span className="text-text-tertiary">{song.album}</span>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-6">
                                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-bg-surface/20 border border-white/10 backdrop-blur-sm">
                                    <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-text-tertiary text-xs font-bold uppercase tracking-wider">Key</span>
                                        <span className="text-text-primary font-bold">{song.key}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-bg-surface/20 border border-white/10 backdrop-blur-sm">
                                    <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" /></svg>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-text-tertiary text-xs font-bold uppercase tracking-wider">BPM</span>
                                        <span className="text-text-primary font-bold">{song.bpm}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Controls Bar - Matched Ref UI */}
            <div className="shrink-0 bg-bg-surface/95 backdrop-blur border-b border-border-subtle z-30 sticky top-16 shadow-xl">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {/* Transpose Widget */}
                        <div className="flex items-center gap-1 bg-bg-surface-hover rounded-lg p-1 pr-1 border border-border-subtle shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary px-3 hidden sm:inline">Transpose</span>
                            <button onClick={() => setTranspose(t => t - 1)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-bg-surface text-text-secondary hover:text-text-primary transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z" /></svg>
                            </button>
                            <span className="w-8 text-center text-accent-primary font-bold text-sm">{transpose > 0 ? `+${transpose}` : transpose}</span>
                            <button onClick={() => setTranspose(t => t + 1)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-bg-surface text-text-secondary hover:text-text-primary transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                            </button>
                        </div>

                        <div className="h-6 w-px bg-border-subtle hidden md:block"></div>

                        {/* Auto Scroll */}
                        <button
                            onClick={() => setAutoScroll(!autoScroll)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all group shrink-0 ${autoScroll ? 'bg-accent-primary/20 border-accent-primary text-accent-primary' : 'bg-bg-surface-hover hover:bg-bg-surface text-text-primary border-border-subtle'}`}
                        >
                            <svg className={`w-5 h-5 transition-transform ${autoScroll ? 'translate-y-1' : ''}`} fill="currentColor" viewBox="0 0 24 24"><path d="M11 5v11.17l-4.88-4.88L5 12.41l7 7 7-7-1.41-1.41L12.7 16.17V5h-1.7z" /></svg>
                            <span className="text-sm font-medium">Auto Scroll</span>
                        </button>

                        {/* Show Chords Toggle */}
                        <label className="flex items-center gap-3 cursor-pointer select-none group shrink-0 px-2 ml-4">
                            <span className="text-sm font-medium text-text-tertiary group-hover:text-text-primary transition-colors">Show Chords</span>
                            <div className="relative inline-flex items-center">
                                <input type="checkbox" checked={showChords} onChange={(e) => setShowChords(e.target.checked)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-tertiary after:border-gray-500 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-primary/20 peer-checked:after:bg-accent-primary"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative flex bg-bg-page">
                {/* Scrolling Lyrics Area */}
                <div className="flex-1 overflow-y-auto scroll-smooth h-full">
                    <div className="max-w-4xl mx-auto px-6 md:px-16 py-12 pb-48">
                        {/* Chords Overview (Mobile) */}
                        <div className="md:hidden grid grid-cols-4 gap-2 mb-8 p-4 bg-bg-surface rounded-xl border border-border-subtle">
                            {song.chords.map(chord => (
                                <div key={chord} className="text-center">
                                    <div className="text-accent-primary font-bold text-lg">{chord}</div>
                                </div>
                            ))}
                        </div>

                        {/* Render Lyrics */}
                        {song.lyrics.length > 0 ? (
                            song.lyrics.map((section, idx) => (
                                <div key={idx} className={`mb-16 ${section.type === 'chorus' ? 'pl-6 md:pl-8 border-l-4 border-accent-primary rounded-l-sm bg-gradient-to-r from-accent-primary/5 to-transparent p-6 -mr-6 md:-mr-16 rounded-r-xl' : 'group relative'}`}>

                                    {/* Section Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className={`${section.type === 'chorus' ? 'text-accent-primary' : 'text-text-tertiary'} text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2`}>
                                            {section.type === 'chorus' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" /></svg>}
                                            {section.label}
                                        </h3>
                                    </div>

                                    {/* Lines */}
                                    <div className={`flex flex-col gap-8 text-xl md:text-2xl lg:text-3xl ${section.type === 'chorus' ? 'font-bold text-text-primary' : 'font-medium tracking-tight'} leading-relaxed`}>
                                        {section.lines.map((line, lIdx) => (
                                            <div key={lIdx} className="relative hover:bg-bg-surface-hover/50 p-4 -mx-4 rounded-xl transition-colors duration-200 cursor-pointer">
                                                {showChords && (
                                                    <div className="flex items-end h-7 text-accent-primary font-bold text-base md:text-lg mb-1 select-none opacity-90 group-hover:opacity-100">
                                                        {line.chords.map((chord, cIdx) => (
                                                            <span key={cIdx} style={{ width: chord.width || 'auto', marginRight: chord.width ? 0 : '1rem' }}>{chord.name}</span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-text-primary/90 leading-relaxed">{line.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-text-secondary py-20">Lyrics pending...</div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar (Desktop) - Chord Diagrams */}
                <div className="w-72 hidden xl:flex flex-col bg-bg-surface border-l border-border-subtle z-20 shadow-2xl">
                    <div className="p-5 border-b border-border-subtle bg-bg-surface/95 backdrop-blur-sm sticky top-0">
                        <h3 className="text-text-primary font-bold text-base flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                Chords
                            </span>
                            <span className="text-xs bg-bg-surface-hover text-text-secondary px-2 py-0.5 rounded-full">{song.chords.length}</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {song.chords.map((chord) => (
                            <div key={chord} className="bg-bg-surface-hover rounded-xl p-3 flex gap-3 items-center hover:shadow-md transition-all border border-transparent hover:border-accent-primary/20 cursor-pointer group hover:-translate-y-0.5">
                                <div className="flex flex-col items-center gap-0.5 w-10">
                                    <span className="text-accent-primary font-bold text-xl group-hover:scale-110 transition-transform">{chord}</span>
                                </div>
                                {/* Mock Chord Diagram Visual */}
                                <div className="relative w-12 h-16 bg-white rounded-sm shadow-inner p-[1px] opacity-90 group-hover:opacity-100 transition-opacity">
                                    <div className="w-full h-0.5 bg-gray-800 mb-[1px]"></div>
                                    <div className="flex justify-between h-[85%] px-[1px]">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="w-px h-full bg-gray-400"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Sidebar Footer */}
                    <div className="p-4 mt-auto border-t border-border-subtle bg-bg-surface">
                        <div className="rounded-lg bg-accent-primary/10 border border-accent-primary/20 p-3 text-center">
                            <p className="text-accent-primary text-xs font-bold mb-1">PRO TIP</p>
                            <p className="text-text-tertiary text-[10px] leading-tight">Use keyboard arrows to scroll while playing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
