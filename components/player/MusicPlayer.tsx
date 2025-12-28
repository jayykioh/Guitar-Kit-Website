'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import AnimatedDropdown from '@/components/ui/AnimatedDropdown';

import { Song } from '@/hooks/useSongs';
import { useBackingTracks, BackingTrack } from '@/hooks/useBackingTracks';

interface MusicPlayerProps {
    activeSong?: Song | null;
    onInteraction?: (isPlaying: boolean) => void;
    isTracking?: boolean;
    formattedTime?: string;
}

export default function MusicPlayer({ activeSong, onInteraction, isTracking, formattedTime = "00:00" }: MusicPlayerProps) {
    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------

    // Internal Player Logic
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7); // Default 70%
    const [isLooping, setIsLooping] = useState(false);

    // External Backing Tracks Logic
    const { tracks, isLoading: isLoadingTracks, selectedGenre, setSelectedGenre } = useBackingTracks();
    const [activeTrack, setActiveTrack] = useState<BackingTrack | null>(null);
    const [showPlaylist, setShowPlaylist] = useState(false);

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
                // We typically auto-play on explicit selection, but check context
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
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            if (onInteraction) onInteraction(false);
        }
    };

    const handlePlayToggle = () => {
        if (!activeTrack?.audioUrl) return;
        const newState = !isPlaying;
        setIsPlaying(newState);
        if (onInteraction) onInteraction(newState);
    }

    const selectTrack = (track: BackingTrack) => {
        setActiveTrack(track);
        setTimeout(() => setIsPlaying(true), 100);
    };

    // -------------------------------------------------------------------------
    // VISUAL DATA
    // -------------------------------------------------------------------------

    const displayTitle = activeTrack ? activeTrack.name : "Select a Track";
    const displaySubtitle = activeTrack
        ? `${activeTrack.genre || 'Unknown Genre'} ${activeTrack.key ? `• Key of ${activeTrack.key}` : ''}`
        : "Open Library to choose";

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
        { value: 'metal', label: 'Metal' },
        { value: 'worship', label: 'Worship' },
        { value: 'neo-soul', label: 'Neo-Soul' },
        { value: 'r&b', label: 'R&B' }
    ];

    return (
        <div className="flex flex-col gap-4 w-full h-full relative font-sans">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                preload="metadata"
            />

            {/* TOP BAR: Header & Library Toggle */}
            <div className="flex items-center justify-between px-1">
                <div className="flex flex-col">
                    <h2 className="text-xs font-bold text-accent-primary uppercase tracking-widest">Session Player</h2>
                </div>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm
                        ${showPlaylist ? 'bg-accent-primary text-white' : 'bg-bg-surface-hover text-text-secondary hover:bg-border-strong'}
                    `}
                    title="Toggle Library"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </motion.button>
            </div>

            {/* MAIN CARD: Glassmorphic Container */}
            <div className="flex-grow w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-surface via-bg-surface to-bg-surface-hover/30 border border-white/5 shadow-2xl flex flex-col justify-between group min-h-[320px]">

                {/* 1. VISUALIZER / COVER ART LAYER */}
                <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out z-0 flex flex-col items-center justify-start pt-8 pb-32 ${showPlaylist ? 'opacity-10 pointer-events-none blur-sm' : 'opacity-100'}`}>
                    {/* Dynamic Gradient Glow behind CD */}
                    <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent-primary/20 rounded-full blur-3xl transition-opacity duration-700 ${isPlaying ? 'opacity-60 scale-110' : 'opacity-20 scale-100'}`}></div>

                    {/* Spinning CD */}
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className={`w-40 h-40 rounded-full shadow-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden ring-1 ring-white/10 z-10 ${isPlaying ? 'bg-gradient-to-tr from-zinc-800 to-black' : 'bg-zinc-900'}`}
                    >
                        {/* CD Texture */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_70deg,white_80deg,transparent_90_360deg)] opacity-10"></div>
                        <div className="absolute inset-0 rounded-full border-[10px] border-zinc-950/50"></div>
                        <div className="absolute inset-14 rounded-full border border-white/5"></div>

                        {/* Inner Label */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeTrack ? 'bg-accent-primary' : 'bg-zinc-800'}`}>
                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        </div>
                    </motion.div>

                    {/* Track Info (Active View) */}
                    <div className="mt-6 text-center px-6 z-10 max-w-full">
                        <h3 className="text-xl font-bold text-white tracking-tight mb-1 truncate leading-tight">
                            {displayTitle}
                        </h3>
                        <p className="text-sm text-text-secondary font-medium truncate">
                            {displaySubtitle}
                        </p>
                    </div>
                </div>

                {/* 2. PLAYLIST LAYER (Overlay) */}
                <AnimatePresence>
                    {showPlaylist && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-0 bg-bg-surface/95 backdrop-blur-xl z-20 flex flex-col"
                        >
                            {/* Filter Header */}
                            <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/5">
                                <span className="text-xs font-bold text-text-tertiary uppercase">Library</span>
                                <div className="flex-grow">
                                    <AnimatedDropdown
                                        label="Genre"
                                        value={selectedGenre}
                                        options={genres}
                                        onChange={setSelectedGenre}
                                        className="w-full text-xs py-1"
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <div className="flex-grow overflow-y-auto p-2 scrollbar-hide">
                                {tracks.map(track => (
                                    <button
                                        key={track.id}
                                        onClick={() => playTrack(track)}
                                        className={`w-full group flex items-center gap-3 p-2.5 rounded-lg mb-1 transition-all ${activeTrack?.id === track.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                    >
                                        <div className={`w-10 h-10 rounded shadow-sm flex items-center justify-center text-xs font-bold transition-colors ${activeTrack?.id === track.id ? 'bg-accent-primary text-white' : 'bg-zinc-800 text-text-tertiary group-hover:bg-zinc-700'}`}>
                                            {activeTrack?.id === track.id && isPlaying ? (
                                                <div className="flex gap-0.5 items-end h-3">
                                                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white rounded-full" />
                                                    <motion.div animate={{ height: [6, 12, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-white rounded-full" />
                                                    <motion.div animate={{ height: [4, 8, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-white rounded-full" />
                                                </div>
                                            ) : (
                                                <span className="opacity-50">{track.id.slice(-2)}</span>
                                            )}
                                        </div>
                                        <div className="flex-grow text-left min-w-0">
                                            <div className={`text-sm font-medium truncate ${activeTrack?.id === track.id ? 'text-accent-primary' : 'text-text-primary'}`}>{track.name}</div>
                                            <div className="text-[10px] text-text-tertiary">{track.genre} • {track.bpm ? `${track.bpm} BPM` : 'Free'}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* 3. BOTTOM CONTROLS (Always on top of bottom area) */}
                <div className="mt-auto relative z-30 p-4 bg-gradient-to-t from-bg-page via-bg-page/95 to-transparent pt-12">

                    {/* Progress Scrubber */}
                    <div className="relative w-full h-8 flex items-center group/scrubber">
                        {/* Time Markers */}
                        <div className="absolute top-[-4px] left-0 w-full flex justify-between text-[9px] font-mono text-text-tertiary opacity-0 group-hover/scrubber:opacity-100 transition-opacity">
                            <span>{formatAudioTime(currentTime)}</span>
                            <span>{formatAudioTime(duration)}</span>
                        </div>

                        <div
                            className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const percent = (e.clientX - rect.left) / rect.width;
                                if (audioRef.current) audioRef.current.currentTime = percent * duration;
                            }}
                        >
                            <motion.div
                                className="h-full bg-accent-primary relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg scale-0 group-hover/scrubber:scale-100 transition-transform"></div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Main Controls Row */}
                    <div className="flex items-center justify-between mt-1">

                        {/* LEFT: Volume (Mini Slider) */}
                        <div className="flex items-center gap-2 w-1/4 group/volume">
                            <button onClick={() => setVolume(v => v === 0 ? 0.7 : 0)} className="text-text-tertiary hover:text-white transition-colors">
                                {volume === 0 ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                )}
                            </button>
                            <div className="h-1 bg-white/10 rounded-full flex-grow relative overflow-hidden cursor-pointer opacity-0 group-hover/volume:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const newVol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                    setVolume(newVol);
                                }}
                            >
                                <div className="h-full bg-white/50" style={{ width: `${volume * 100}%` }}></div>
                            </div>
                        </div>

                        {/* CENTER: Play/Pause */}
                        <div className="flex items-center gap-6">
                            <button className="text-text-secondary hover:text-white transition-colors" onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" /></svg>
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlayToggle}
                                disabled={!activeTrack?.audioUrl}
                                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/20 transition-all ${activeTrack?.audioUrl ? 'bg-white text-black' : 'bg-white/10 text-white/20'}`}
                            >
                                {isPlaying ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M5 3l14 9-14 9V3z" /></svg>
                                )}
                            </motion.button>

                            <button className="text-text-secondary hover:text-white transition-colors" onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" /></svg>
                            </button>
                        </div>

                        {/* RIGHT: Loop / More */}
                        <div className="flex items-center justify-end w-1/4 gap-2">
                            <button
                                onClick={() => setIsLooping(!isLooping)}
                                className={`transition-colors ${isLooping ? 'text-accent-primary' : 'text-text-tertiary hover:text-white'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );

    // Helper for playlist click
    function playTrack(track: BackingTrack) {
        setActiveTrack(track);
        // showPlaylist(false); // Prefer keeping it open? User can toggle.
        setTimeout(() => setIsPlaying(true), 100);
    }
}
