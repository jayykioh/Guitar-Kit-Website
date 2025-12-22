'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockSongs } from '../../data/mockSongs';
import Link from 'next/link';

export default function SongsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSongs = mockSongs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen w-full flex flex-col">
            {/* Hero Section - Matched to Ref */}
            <div className="relative shrink-0 w-full h-[35vh] min-h-[300px] overflow-hidden border-b border-border-subtle bg-bg-page">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/60 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-black/40 z-0"></div>
                    <div className="w-full h-full bg-cover bg-center blur-sm opacity-60 scale-105" style={{
                        backgroundImage: "url('https://res.cloudinary.com/difdkbohi/image/upload/v1766409291/95da6668-cfba-4a0b-8dd4-cf6b6f35bd4f.png')"
                    }}></div>
                </div>

                <div className="relative z-20 max-w-[1400px] mx-auto w-full h-full px-4 md:px-8 pb-8 flex items-end">
                    <div className="w-full flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/20 text-[10px] font-bold uppercase tracking-widest">Library</span>
                                <span className="text-text-secondary text-xs font-medium">{mockSongs.length} Songs</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-text-primary drop-shadow-xl">
                                My Songs
                            </h1>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-2 bg-accent-primary text-black px-6 py-3 rounded-full font-bold shadow-lg shadow-accent-primary/20"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                            <span>Import Song</span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Sticky Filter Bar */}
            <div className="shrink-0 bg-bg-surface/95 backdrop-blur-md border-b border-border-subtle z-30 sticky top-16 shadow-lg">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96 group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                        </span>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-surface-hover border border-border-subtle rounded-xl py-3 pl-12 pr-4 text-sm text-text-primary placeholder-text-tertiary focus:ring-1 focus:ring-accent-primary focus:border-accent-primary/50 transition-all shadow-inner outline-none"
                            placeholder="Search by title, artist, or lyrics..."
                            type="text"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {['Genre', 'Artist', 'Key', 'BPM'].map((filter) => (
                            <button key={filter} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-surface-hover hover:bg-bg-surface text-text-secondary border border-border-subtle transition-all whitespace-nowrap shrink-0 group">
                                <span className="text-sm font-medium">{filter}</span>
                                <svg className="w-4 h-4 text-text-tertiary group-hover:text-text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
                            </button>
                        ))}
                        <div className="h-6 w-px bg-border-subtle mx-1 shrink-0 hidden md:block"></div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary/10 text-accent-primary border border-accent-primary/20 transition-all whitespace-nowrap shrink-0 hover:bg-accent-primary/20">
                            <span className="text-sm font-bold">Recent</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content View */}
            <div className="flex-1 bg-bg-page/50 p-6 md:p-8 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-4">
                    {filteredSongs.map((song) => (
                        <Link href={`/songs/${song.id}`} key={song.id}>
                            <motion.div
                                whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                className="group relative bg-bg-surface border border-border-subtle rounded-2xl p-4 flex items-center gap-6 transition-all hover:bg-bg-surface-hover cursor-pointer"
                            >
                                {/* Cover Art & Play Button */}
                                <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl bg-cover bg-center shadow-md relative overflow-hidden ring-1 ring-border-subtle" style={{ backgroundImage: `url('${song.cover}')` }}>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                        <svg className="w-12 h-12 text-accent-primary drop-shadow-md transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl md:text-2xl font-bold text-text-primary truncate group-hover:text-accent-primary transition-colors">{song.title}</h3>
                                        <div className="flex items-center gap-2 text-text-secondary text-sm mt-1">
                                            <span className="font-medium">{song.artist}</span>
                                            <span className="text-text-tertiary">•</span>
                                            <span className="truncate">{song.album}</span>
                                        </div>
                                    </div>

                                    {/* Metadata Badges */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-bg-surface-hover border border-border-subtle group-hover:border-border-strong transition-colors shadow-sm">
                                            <span className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">Key</span>
                                            <span className="text-accent-primary font-bold text-lg">{song.key}</span>
                                        </div>
                                        <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-bg-surface-hover border border-border-subtle group-hover:border-border-strong transition-colors shadow-sm">
                                            <span className="text-[10px] uppercase text-text-tertiary font-bold tracking-wider">BPM</span>
                                            <span className="text-text-primary font-bold text-lg">{song.bpm}</span>
                                        </div>
                                        <div className="hidden lg:flex items-center justify-center px-4 h-14 rounded-xl bg-bg-surface-hover border border-border-subtle text-text-secondary text-xs font-bold uppercase tracking-wider group-hover:text-text-primary transition-colors shadow-sm">
                                            {song.genre}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions (Hover) */}
                                <div className="shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-surface hover:bg-bg-surface-hover text-text-tertiary hover:text-accent-primary transition-colors border border-border-subtle">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-surface hover:bg-bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors border border-border-subtle">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                    </button>
                                </div>
                            </motion.div>
                        </Link>
                    ))}

                    {filteredSongs.length === 0 && (
                        <div className="text-center py-20 text-text-secondary">
                            <p>No songs found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 mb-20 flex justify-center">
                    <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-bg-surface hover:bg-bg-surface-hover border border-border-subtle text-text-secondary hover:text-text-primary transition-all text-sm font-bold tracking-wide shadow-lg">
                        <span>Load More Songs</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
                    </button>
                </div>
            </div>
        </main>
    );
}
