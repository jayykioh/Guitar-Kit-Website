'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import AnimatedDropdown from '@/components/ui/AnimatedDropdown';
import { useUser } from '@/hooks/useUser';

import { Song } from '@/hooks/useSongs';
import { useBackingTracks, BackingTrack } from '@/hooks/useBackingTracks';

interface MusicPlayerProps {
    activeSong?: Song | null;
    onInteraction?: (isPlaying: boolean) => void;
    onTrackSelect?: (track: BackingTrack) => void;
    isTracking?: boolean;
    formattedTime?: string;
    isFocusMode?: boolean;
}

export default function MusicPlayer({ activeSong, onInteraction, onTrackSelect, isTracking, formattedTime = "00:00", isFocusMode = false }: MusicPlayerProps) {
    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------

    // UI State
    const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default
    const playerRef = useRef<HTMLDivElement>(null); // For Click Outside

    // Internal Player Logic
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7); // Default 70%
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);

    // External Backing Tracks Logic
    const { tracks, isLoading: isLoadingTracks, selectedGenre, setSelectedGenre } = useBackingTracks();
    const [activeTrack, setActiveTrack] = useState<BackingTrack | null>(null);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // NEW

    useEffect(() => {
        fetch('/api/backing-tracks/favorite').then(res => res.ok ? res.json() : []).then(setFavoriteIds).catch(() => { });
    }, []);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!activeTrack) return;
        const id = activeTrack.id;
        setFavoriteIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
        try {
            await fetch('/api/backing-tracks/favorite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackId: id })
            });
        } catch (e) { console.error(e); }
    };


    // Helper for Playlist Navigation
    const currentIndex = activeTrack ? tracks.findIndex(t => t.id === activeTrack.id) : -1;

    const playRandomTrack = () => {
        if (tracks.length === 0) return;
        const randomIndex = Math.floor(Math.random() * tracks.length);
        playTrack(tracks[randomIndex]);
    };

    const handleNext = () => {
        if (tracks.length === 0) return;
        if (isShuffle) {
            playRandomTrack();
        } else {
            const nextIndex = (currentIndex + 1) % tracks.length;
            playTrack(tracks[nextIndex]);
        }
    };

    const handlePrev = () => {
        if (tracks.length === 0) return;
        if (isShuffle) {
            playRandomTrack();
        } else {
            const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
            playTrack(tracks[prevIndex]);
        }
    };

    // Audio State
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // -------------------------------------------------------------------------
    // EFFECTS
    // -------------------------------------------------------------------------

    // 1. Handle Active Song from Props (Focus Mode) - Overrides current track
    useEffect(() => {
        if (activeSong?.audioUrl) {
            const songTrack: BackingTrack = {
                id: activeSong.id,
                name: activeSong.title,
                bpm: activeSong.bpm,
                genre: activeSong.genre,
                key: activeSong.key,
                audioUrl: activeSong.audioUrl
            };
            setActiveTrack(songTrack);
            setShowPlaylist(false);
        }
    }, [activeSong]);

    // 2. Handle Track Change -> Load Audio
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);

            if (activeTrack?.audioUrl) {
                audioRef.current.src = activeTrack.audioUrl;
                audioRef.current.load();
            }
        }
    }, [activeTrack]);

    // 3. Handle Play/Pause
    useEffect(() => {
        if (!audioRef.current || !activeTrack?.audioUrl) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error("Playback failed:", e);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, activeTrack]);

    // 4. Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // 5. Handle Keyboard Shortcuts (Spacebar & ESC)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Escape to close
            if (e.key === 'Escape') {
                if (isExpanded) {
                    setIsExpanded(false);
                    setShowPlaylist(false);
                }
                return;
            }

            // Spacebar to toggle play
            // Only if Player has a track loaded
            if (!activeTrack?.audioUrl) return;

            // Ignore if user is typing in an input/textarea
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
            if ((e.target as HTMLElement).isContentEditable) return;

            if (e.code === 'Space') {
                e.preventDefault(); // Prevent page scroll
                handlePlayToggle();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTrack, isPlaying, isExpanded]);

    // 6. Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (playerRef.current && !playerRef.current.contains(event.target as Node) && isExpanded) {
                setIsExpanded(false);
                setShowPlaylist(false); // Also close playlist when minimizing
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    // -------------------------------------------------------------------------
    // HANDLERS
    // -------------------------------------------------------------------------

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const curr = audioRef.current.currentTime;
            const dur = audioRef.current.duration;
            if (dur > 0) {
                setCurrentTime(curr);
                setDuration(dur);
                setProgress((curr / dur) * 100);
            }
        }
    };

    const handleEnded = () => {
        if (isLooping && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            // Auto-advance
            handleNext();
        }
    };

    const handlePlayToggle = (e?: React.MouseEvent) => {
        e?.stopPropagation(); // Prevent doc expansion if clicking play
        if (!activeTrack?.audioUrl) {
            // Auto-select random if empty
            if (tracks.length > 0) {
                playRandomTrack();
            } else {
                if (!isExpanded) setIsExpanded(true);
            }
            return;
        }
        const newState = !isPlaying;
        setIsPlaying(newState);
        if (onInteraction) onInteraction(newState);
    }

    // -------------------------------------------------------------------------
    // VISUAL DATA
    // -------------------------------------------------------------------------

    const displayTitle = activeTrack ? activeTrack.name : "Select a Track";
    const displaySubtitle = activeTrack?.genre || 'Backing Tracks Pro';
    const displayKey = activeTrack?.key || '-';
    const displayBpm = activeTrack?.bpm || '-';

    const formatAudioTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const genres = [
        { value: 'all', label: 'All Genres' },
        { value: 'blues', label: 'Blues' },
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'fusion', label: 'Fusion' },
        { value: 'worship', label: 'Worship' },
        { value: 'neo-soul', label: 'Neo-Soul' },
        { value: 'r&b', label: 'R&B' }
    ];

    // Exact styles from reference
    const styles = {
        glassCard: "bg-[linear-gradient(180deg,rgba(30,30,30,0.6)_0%,rgba(10,10,10,0.8)_100%)] backdrop-blur-[40px] border border-white/10 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.8)]",
        controlBtn: "transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-110 hover:bg-white/10 active:scale-95",
        primaryText: "text-[#13ec5b]",
        primaryBg: "bg-[#13ec5b]",
    };

    // -------------------------------------------------------------------------
    // HELPER COMPONENTS
    // -------------------------------------------------------------------------

    function playTrack(track: BackingTrack) {
        setActiveTrack(track);
        // Call callback for parent sync
        if (onTrackSelect) onTrackSelect(track);

        // Keep playlist open so they can switch easily?
        // User can manually close playlist or standard toggle.
        setTimeout(() => setIsPlaying(true), 100);
    }

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                preload="metadata"
            />

            {/* FULL SCREEN OVERLAY CONTAINER (EXPANDED) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto font-display"
                    >
                        {/* Backgrounds (From Reference) */}
                        <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-md" onClick={() => setIsExpanded(false)}></div>
                        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

                        {/* MAIN LAYOUT: Dual Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="flex flex-col md:flex-row items-center md:items-start gap-6 h-full md:h-[640px] z-10 max-w-[1000px] w-full justify-center px-4 relative pt-20 md:pt-0 overflow-y-auto md:overflow-visible"
                        >
                            {/* 1. LEFT CARD: PLAYER */}
                            <div className={`relative w-full md:w-[420px] ${styles.glassCard} rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[500px] md:h-full shrink-0 mb-6 md:mb-0`}>

                                {/* Header */}
                                <div className="flex justify-between items-center text-white/50 shrink-0">
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        aria-label="Minimize"
                                        className={`${styles.controlBtn} p-2 -ml-2 rounded-full hover:text-white group`}
                                    >
                                        <span className="material-symbols-outlined text-3xl group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
                                    </button>
                                    <div className="text-xs font-semibold tracking-widest uppercase text-white/30 pointer-events-none">Now Playing</div>
                                    <button
                                        onClick={() => setShowPlaylist(!showPlaylist)}
                                        aria-label="Library"
                                        className={`${styles.controlBtn} p-2 -mr-2 rounded-full ${showPlaylist ? 'text-[#13ec5b] bg-white/10 shadow-[0_0_15px_rgba(19,236,91,0.15)]' : 'hover:text-white'} ${!activeTrack && !showPlaylist ? 'animate-pulse text-[#13ec5b] shadow-[0_0_10px_rgba(19,236,91,0.4)]' : ''}`}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                    </button>
                                </div>

                                {/* Metric Visualizer */}
                                <div className="w-full h-48 rounded-2xl border border-white/5 bg-black/20 flex items-center justify-around relative overflow-hidden shadow-inner group shrink-0 mt-4">
                                    <div className={`absolute inset-0 bg-gradient-to-br from-[#13ec5b]/5 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-50'}`}></div>

                                    {/* Tempo */}
                                    <div className="flex flex-col items-center justify-center z-10 flex-1">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-2">Tempo</span>
                                        <div className="flex items-baseline gap-1.5 translate-x-1">
                                            <span className="text-6xl font-display font-bold text-[#13ec5b] drop-shadow-[0_0_20px_rgba(19,236,91,0.2)]">
                                                {tracks.find(t => t.id === activeTrack?.id)?.bpm || '--'}
                                            </span>
                                            <span className="text-xs font-bold text-[#13ec5b]/60 uppercase tracking-wider">BPM</span>
                                        </div>
                                    </div>

                                    <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                                    {/* Key */}
                                    <div className="flex flex-col items-center justify-center z-10 flex-1">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-2">Key</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-6xl font-display font-bold text-white drop-shadow-lg">
                                                {tracks.find(t => t.id === activeTrack?.id)?.key?.replace(/m|Maj/, '') || 'E'}
                                            </span>
                                            <span className="text-lg font-medium text-white/40 ml-1">
                                                {tracks.find(t => t.id === activeTrack?.id)?.key?.includes('m') ? 'min' : 'Maj'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Track Info */}
                                <div className="flex flex-col gap-1 items-start mt-4 shrink-0">
                                    <div className="w-full flex justify-between items-start gap-4">
                                        <div className="overflow-hidden">
                                            <h2 className="text-2xl font-bold text-white truncate leading-snug tracking-tight">
                                                {activeTrack?.name || "Select Track"}
                                            </h2>
                                            <span
                                                onClick={() => setShowPlaylist(true)}
                                                className="text-[#13ec5b] hover:text-[#0fa842] transition-colors font-medium text-sm truncate block mt-0.5 cursor-pointer"
                                            >
                                                Backing Track Collection
                                            </span>
                                        </div>

                                        <button
                                            onClick={toggleFavorite}
                                            className={`${styles.controlBtn} shrink-0 size-10 rounded-full flex items-center justify-center mt-1 ${favoriteIds.includes(activeTrack?.id || '') ? 'text-[#13ec5b] bg-white/10' : 'text-white/40 hover:text-[#13ec5b] hover:bg-white/5'}`}
                                        >
                                            {favoriteIds.includes(activeTrack?.id || '') ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60 border border-white/5 uppercase tracking-wider">
                                            {activeTrack?.genre || "Genre"}
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60 border border-white/5 uppercase tracking-wider">
                                            Studio
                                        </span>
                                    </div>
                                </div>

                                {/* Scrubber */}
                                <div className="group py-4 shrink-0">
                                    <div
                                        className="relative h-1.5 w-full bg-white/10 rounded-full cursor-pointer overflow-visible"
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const percent = (e.clientX - rect.left) / rect.width;
                                            if (audioRef.current) audioRef.current.currentTime = percent * duration;
                                        }}
                                    >
                                        <div className="absolute h-full bg-[#13ec5b] rounded-full shadow-[0_0_20px_rgba(19,236,91,0.3)]" style={{ width: `${progress}%` }}></div>
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-200"
                                            style={{ left: `${progress}%`, marginLeft: '-8px' }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs font-medium font-mono text-white/40 group-hover:text-white/60 transition-colors select-none">
                                        <span>{formatAudioTime(currentTime)}</span>
                                        <span>{formatAudioTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-6 mt-1 shrink-0">
                                    <button
                                        aria-label="Shuffle"
                                        onClick={() => setIsShuffle(!isShuffle)}
                                        className={`${styles.controlBtn} p-2 ${isShuffle ? 'text-[#13ec5b]' : 'text-white/40 hover:text-white'}`}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg>
                                    </button>
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={handlePrev}
                                            className={`${styles.controlBtn} text-white hover:text-white p-2 rounded-full`}
                                        >
                                            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                                        </button>
                                        <button
                                            onClick={handlePlayToggle}
                                            className={`${styles.controlBtn} size-20 flex items-center justify-center rounded-full bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all`}
                                        >
                                            {isPlaying ? (
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className={`${styles.controlBtn} text-white hover:text-white p-2 rounded-full`}
                                        >
                                            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setIsLooping(!isLooping)}
                                        className={`${styles.controlBtn} p-2 relative ${isLooping ? 'text-[#13ec5b]' : 'text-white/40 hover:text-white'}`}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v6z" /></svg>
                                        {isLooping && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#13ec5b]"></div>}
                                    </button>
                                </div>

                                {/* Volume Footer */}
                                <div className="flex items-center gap-4 mt-6 px-2 shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M11 5L6 9H2v6h4l5 4V5z" /></svg>
                                    <div
                                        className="relative flex-1 h-1 bg-white/10 rounded-full group cursor-pointer"
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const newVol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                            setVolume(newVol);
                                        }}
                                    >
                                        <div className="absolute h-full bg-white/50 group-hover:bg-white rounded-full transition-colors" style={{ width: `${volume * 100}%` }}></div>
                                    </div>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                </div>

                            </div>

                            {/* 2. RIGHT CARD: LIBRARY (Conditional) */}
                            <AnimatePresence>
                                {showPlaylist && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0, x: -20 }}
                                        animate={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 360, opacity: 1, x: 0 }}
                                        exit={{ width: 0, opacity: 0, x: -20 }}
                                        className={`relative h-[500px] md:h-full w-full md:w-[360px] ${styles.glassCard} rounded-[2.5rem] flex flex-col overflow-hidden shrink-0`}
                                    >
                                        {/* Library Header */}
                                        <div className="p-6 pb-2 shrink-0 bg-gradient-to-b from-black/20 to-transparent">
                                            <div className="flex justify-between items-center mb-5">
                                                <h3 className="text-xl font-bold text-white tracking-tight">Library</h3>
                                                <button className="text-white/40 hover:text-white transition-colors">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>
                                                </button>
                                            </div>
                                            <div className="relative mb-6">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                                </div>
                                                <input
                                                    className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:ring-1 focus:ring-[#13ec5b]/50 focus:border-[#13ec5b]/50 transition-all outline-none"
                                                    placeholder="Search tracks..."
                                                    type="text"
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2 pb-4">
                                                {genres.map(g => (
                                                    <button
                                                        key={g.value}
                                                        onClick={() => setSelectedGenre(g.value)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${selectedGenre === g.value ? 'bg-[#13ec5b] text-black shadow-[0_0_10px_rgba(19,236,91,0.2)]' : 'bg-white/5 hover:bg-white/10 border border-white/5 text-white/60 hover:text-white'}`}
                                                    >
                                                        {g.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Library List */}
                                        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide space-y-0.5">
                                            {tracks.map((track, index) => {
                                                const isActive = activeTrack?.id === track.id;
                                                return (
                                                    <button
                                                        key={track.id}
                                                        onClick={() => playTrack(track)}
                                                        className={`
                                                            w-full group flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
                                                            text-left relative
                                                            ${isActive ? 'bg-white/10' : 'hover:bg-white/5 bg-transparent'}
                                                        `}
                                                    >
                                                        {/* Strat Layout: Icon/Index */}
                                                        <div className="relative size-8 shrink-0 flex items-center justify-center">
                                                            {isActive ? (
                                                                isPlaying ? (
                                                                    <div className="text-[#13ec5b] animate-pulse">
                                                                        <span className="material-symbols-outlined text-[20px]">equalizer</span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="material-symbols-outlined text-[20px] text-[#13ec5b]">pause</span>
                                                                )
                                                            ) : (
                                                                <>
                                                                    <span className="text-white/30 font-medium text-xs font-mono group-hover:hidden">
                                                                        {(index + 1).toString().padStart(2, '0')}
                                                                    </span>
                                                                    <span className="hidden group-hover:block text-white">
                                                                        <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Middle: Info */}
                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                            <span className={`text-sm font-semibold truncate leading-tight transition-colors ${isActive ? 'text-[#13ec5b]' : 'text-white/90 group-hover:text-white'}`}>
                                                                {track.name}
                                                            </span>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className={`text-[11px] font-medium truncate ${isActive ? 'text-white/70' : 'text-white/40 group-hover:text-white/50'}`}>
                                                                    {track.genre}
                                                                </span>
                                                                <span className="text-white/20 text-[10px]">•</span>
                                                                <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded bg-white/5 ${isActive ? 'text-white/70' : 'text-white/40 group-hover:text-white/50'}`}>
                                                                    {track.bpm} BPM
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* End: Duration */}
                                                        <span className="text-xs font-medium text-white/20 group-hover:text-white/40 transition-colors pr-2">
                                                            4:12
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* COLLAPSED DOCK (MINI CAPSULE) */}
            <AnimatePresence>
                {!isExpanded && (
                    <motion.div
                        layoutId="player-dock"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{
                            opacity: isFocusMode ? 0.3 : 1,
                            y: 0,
                            scale: isFocusMode ? 0.9 : 1,
                            filter: isFocusMode ? 'grayscale(100%)' : 'grayscale(0%)'
                        }}
                        whileHover={{
                            opacity: 1,
                            scale: isFocusMode ? 0.95 : 1.05,
                            filter: 'grayscale(0%)'
                        }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`fixed bottom-6 right-6 z-40 bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-2 pr-6 flex items-center gap-3 cursor-pointer group hover:border-[#13ec5b]/50 transition-colors ${isFocusMode ? 'hover:opacity-100' : ''}`}
                        onClick={() => setIsExpanded(true)}
                    >
                        <div className="relative size-12 rounded-full overflow-hidden shrink-0 bg-black border border-white/10 flex items-center justify-center">
                            {isPlaying ? (
                                <div className="flex gap-0.5 items-end h-4">
                                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-[#13ec5b] rounded-full" />
                                    <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-[#13ec5b] rounded-full" />
                                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-[#13ec5b] rounded-full" />
                                </div>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white truncate max-w-[120px]">{activeTrack ? activeTrack.name : 'Backing Track'}</span>
                            <span className="text-[10px] text-white/50 truncate uppercase tracking-wider">{isPlaying ? 'Now Playing' : 'Click to Resume'}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
