'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSongs } from '@/hooks/useSongs';
import Link from 'next/link';
import { GlassPanel } from '../../components/ui/GlassPanel';

export default function SongsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { songs, isLoading } = useSongs();

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen w-full flex flex-col bg-bg-page transition-colors duration-300">
            {/* Google Fonts Injection for Icons if not loaded in layout (Safety) */}
            {/* Note: Material Symbols usually loaded in layout, assuming availability */}

            {/* Hero Section */}
            <div className="relative shrink-0 w-full h-[35vh] min-h-[300px] overflow-hidden border-b border-border-subtle bg-bg-surface-hover">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/60 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/50 z-0"></div>
                    {/* Hero Image - Abstract Fretboard/Music */}
                    <div className="w-full h-full bg-cover bg-center blur-sm opacity-60 scale-105" style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop')"
                    }}></div>
                </div>

                <div className="relative z-20 max-w-[1400px] mx-auto w-full h-full px-4 md:px-8 pb-8 flex items-end">
                    <div className="w-full flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">Library</span>
                                <span className="text-text-secondary text-xs font-medium">
                                    {isLoading ? '...' : `${songs.length} Songs`}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-text-primary drop-shadow-xl">
                                My Songs
                            </h1>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-2 bg-accent-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-accent-primary/20 hover:brightness-110 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">add_circle</span>
                            <span>Import Song</span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Sticky Filter Bar */}
            <div className="shrink-0 bg-bg-surface/80 backdrop-blur-xl border-b border-border-subtle z-30 sticky top-16 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96 group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </span>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-surface-hover/50 border border-border-subtle rounded-xl py-3 pl-12 pr-4 text-sm text-text-primary placeholder-text-tertiary focus:ring-1 focus:ring-accent-primary focus:border-accent-primary/50 transition-all shadow-inner outline-none"
                            placeholder="Search by title, artist, or lyrics..."
                            type="text"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {['Genre', 'Artist', 'Key', 'BPM'].map((filter) => (
                            <button key={filter} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-surface hover:bg-bg-surface-hover text-text-secondary border border-border-subtle transition-all whitespace-nowrap shrink-0 group">
                                <span className="text-sm font-medium">{filter}</span>
                                <span className="material-symbols-outlined text-[16px] text-text-tertiary group-hover:text-text-primary">expand_more</span>
                            </button>
                        ))}
                        <div className="h-6 w-px bg-border-subtle mx-1 shrink-0 hidden md:block"></div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary/10 text-accent-primary border border-accent-primary/20 transition-all whitespace-nowrap shrink-0 hover:bg-accent-primary/20">
                            <span className="text-sm font-bold">Recent</span>
                            <span className="material-symbols-outlined text-[18px]">history</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content View */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-4">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin"></div>
                            <p className="text-text-secondary mt-4">Loading songs...</p>
                        </div>
                    ) : filteredSongs.length === 0 ? (
                        <div className="text-center py-20 text-text-secondary">
                            <span className="material-symbols-outlined text-6xl text-text-tertiary mb-4 block">music_off</span>
                            <p className="text-xl font-medium mb-2">
                                {searchQuery ? `No songs found matching "${searchQuery}"` : 'No songs yet'}
                            </p>
                            {!searchQuery && (
                                <p className="text-sm">Import your first song to get started!</p>
                            )}
                        </div>
                    ) : (
                        filteredSongs.map((song) => (
                        <Link href={`/songs/${song.id}`} key={song.id}>
                            <GlassPanel
                                hoverEffect
                                whileHover={{ scale: 1.005 }}
                                className="group p-4 flex items-center gap-6 cursor-pointer"
                            >
                                {/* Cover Art & Play Button */}
                                <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 shadow-md relative overflow-hidden ring-1 ring-border-subtle flex items-center justify-center">
                                    <span className="material-symbols-outlined text-accent-primary text-4xl">music_note</span>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                        <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg transform group-hover:scale-110 transition-transform">play_circle</span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl md:text-2xl font-bold text-text-primary truncate group-hover:text-accent-primary transition-colors">{song.title}</h3>
                                        <div className="flex items-center gap-2 text-text-secondary text-sm mt-1">
                                            <span className="font-medium">{song.artist}</span>
                                            {song.genre && (
                                                <>
                                                    <span className="text-text-tertiary">•</span>
                                                    <span className="truncate">{song.genre}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Metadata Badges */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        {song.key && (
                                            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-bg-surface-hover/50 border border-border-subtle group-hover:border-border-strong transition-colors">
                                                <span className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">Key</span>
                                                <span className="text-accent-primary font-bold text-lg">{song.key}</span>
                                            </div>
                                        )}
                                        {song.bpm && (
                                            <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-bg-surface-hover/50 border border-border-subtle group-hover:border-border-strong transition-colors">
                                                <span className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">BPM</span>
                                                <span className="text-text-primary font-bold text-lg">{song.bpm}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions (Hover) */}
                                <div className="shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 md:-translate-x-4 md:group-hover:translate-x-0">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-surface hover:bg-bg-surface-hover text-text-tertiary hover:text-accent-primary transition-colors border border-border-subtle shadow-sm">
                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-surface hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors border border-border-subtle shadow-sm">
                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                    </button>
                                </div>
                            </GlassPanel>
                        </Link>
                    ))
                    )}
                </div>

                {!isLoading && filteredSongs.length > 0 && (
                    <div className="mt-12 mb-20 flex justify-center">
                        <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-bg-surface hover:bg-bg-surface-hover border border-border-subtle text-text-secondary hover:text-text-primary transition-all text-sm font-bold tracking-wide shadow-sm">
                            <span>Load More Songs</span>
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

