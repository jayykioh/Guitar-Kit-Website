'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSongs } from '@/hooks/useSongs';
import Link from 'next/link';
import { GlassPanel } from '../../components/ui/GlassPanel';

export default function SongsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'all' | 'saved'>('all');
    const { songs, isLoading, toggleSave } = useSongs();

    const displayedSongs = songs.filter(song => {
        const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchQuery.toLowerCase());

        if (view === 'saved') {
            return matchesSearch && song.isSaved;
        }
        return matchesSearch;
    });

    return (
        <main className="min-h-screen w-full flex flex-col bg-bg-page transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative shrink-0 w-full h-[35vh] min-h-[300px] overflow-hidden border-b border-border-subtle bg-bg-surface-hover">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/60 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/50 z-0"></div>
                    {/* Hero Image */}
                    <div className="w-full h-full bg-cover bg-center blur-sm opacity-60 scale-105" style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop')"
                    }}></div>
                </div>

                <div className="relative z-20 max-w-[1400px] mx-auto w-full h-full px-4 md:px-8 pb-8 flex items-end">
                    <div className="w-full flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">Catalog</span>
                                <span className="text-text-secondary text-xs font-medium">
                                    {isLoading ? '...' : `${songs.length} Songs Available`}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-text-primary drop-shadow-xl">
                                Song Library
                            </h1>
                        </div>
                        {/* Tabs */}
                        <div className="flex bg-bg-surface/50 backdrop-blur-md p-1 rounded-xl border border-border-subtle">
                            <button
                                onClick={() => setView('all')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'all' ? 'bg-accent-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                All Songs
                            </button>
                            <button
                                onClick={() => setView('saved')}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'saved' ? 'bg-accent-primary text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                Saved
                            </button>
                        </div>
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
                            placeholder="Search by title, artist..."
                            type="text"
                        />
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
                    ) : displayedSongs.length === 0 ? (
                        <div className="text-center py-20 text-text-secondary">
                            <span className="material-symbols-outlined text-6xl text-text-tertiary mb-4 block">music_off</span>
                            <p className="text-xl font-medium mb-2">
                                {view === 'saved' ? 'No saved songs found' : 'No songs found'}
                            </p>
                        </div>
                    ) : (
                        displayedSongs.map((song) => (
                            <div key={song.id} className="relative"> {/* Use div wrapper to handle internal clicks vs link */}
                                <GlassPanel
                                    hoverEffect
                                    className="group p-4 flex flex-col md:flex-row md:items-center gap-6"
                                >
                                    {/* Cover Art */}
                                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 shadow-md flex items-center justify-center ring-1 ring-border-subtle">
                                        <span className="material-symbols-outlined text-accent-primary text-4xl">music_note</span>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl md:text-2xl font-bold text-text-primary truncate">{song.title}</h3>
                                        <div className="flex items-center gap-2 text-text-secondary text-sm mt-1">
                                            <span className="font-medium">{song.artist}</span>
                                            {song.genre && (
                                                <>
                                                    <span className="text-text-tertiary">•</span>
                                                    <span className="truncate">{song.genre}</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mt-3">
                                            {song.key && (
                                                <span className="px-2 py-1 rounded-md bg-bg-surface-hover/50 border border-border-subtle text-xs font-bold text-text-secondary">
                                                    Key: {song.key}
                                                </span>
                                            )}
                                            {song.bpm && (
                                                <span className="px-2 py-1 rounded-md bg-bg-surface-hover/50 border border-border-subtle text-xs font-bold text-text-secondary">
                                                    {song.bpm} BPM
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 md:ml-auto mt-4 md:mt-0">
                                        {/* Practice Button */}
                                        <Link
                                            href={`/practice?songId=${song.id}`}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-white font-bold text-sm shadow-lg shadow-accent-primary/20 hover:brightness-110 active:scale-95 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">play_circle</span>
                                            Practice
                                        </Link>

                                        {/* Like Button */}
                                        <button
                                            onClick={() => toggleSave && toggleSave(song.id)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all active:scale-90 ${song.isSaved
                                                    ? 'bg-red-500/10 border-red-500/30 text-red-500'
                                                    : 'bg-bg-surface hover:bg-bg-surface-hover border-border-subtle text-text-tertiary hover:text-text-primary'
                                                }`}
                                        >
                                            <span className={`material-symbols-outlined text-[20px] ${song.isSaved ? 'fill-current' : ''}`}>
                                                favorite
                                            </span>
                                        </button>
                                    </div>
                                </GlassPanel>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

