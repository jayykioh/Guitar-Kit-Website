'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Song {
    id: string;
    title: string;
    artist: string;
    difficulty: string;
    genre: string;
}

interface BackingTrack {
    id: string;
    name: string;
    bpm: number;
    genre: string | null;
    key: string | null;
    audioUrl: string;
}

interface UserProfile {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: string;
    favorites: any[];
    savedSongs: Song[];
    savedBackingTracks: BackingTrack[];
    stats: {
        totalPractice: number;
        totalSessions: number;
    };
}

const ProfileSkeleton = () => (
    <main className="min-h-screen bg-bg-page pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-sans animate-pulse">
        <header className="flex flex-col md:flex-row items-end gap-8 pb-8 border-b border-border-subtle/50">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-bg-surface-hover border-4 border-bg-surface"></div>
            <div className="flex-1 flex flex-col gap-4 mb-2 w-full">
                <div className="h-4 w-24 bg-bg-surface-hover rounded-full"></div>
                <div className="h-12 md:h-16 w-3/4 max-w-md bg-bg-surface-hover rounded-lg"></div>
                <div className="flex gap-6 mt-2">
                    <div className="h-4 w-24 bg-bg-surface-hover rounded-full"></div>
                    <div className="h-4 w-24 bg-bg-surface-hover rounded-full"></div>
                    <div className="h-4 w-32 bg-bg-surface-hover rounded-full"></div>
                </div>
            </div>
        </header>
        <div className="flex flex-col gap-6">
            <div className="h-8 w-48 bg-bg-surface-hover rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-bg-surface-hover rounded-xl border border-border-subtle"></div>
                ))}
            </div>
        </div>
    </main>
);

export default function ProfilePage() {
    const { user, update } = useUser();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        if (!user?.id) return;

        fetch(`/api/user/profile?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setNewName(data.name || '');
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [user?.id]);

    const handleSaveName = async () => {
        if (!user?.id) return;
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, name: newName })
            });
            if (res.ok) {
                const updated = await res.json();
                setProfile(prev => prev ? { ...prev, name: updated.name } : null);
                await update({ name: updated.name }); // Sync session
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to update name', error);
        }
    };

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) return `${hours}h ${mins}m`;
        return `${mins}m`;
    };

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    if (!profile) {
        return (
            <div className="min-h-screen pt-24 flex justify-center text-text-secondary font-medium">
                Profile not found
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-bg-page pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12 font-sans">

            {/* Header / Hero Section - Apple Music Style */}
            <header className="flex flex-col md:flex-row items-start md:items-end gap-8 pb-8 border-b border-border-subtle/50">
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-40 h-40 md:w-52 md:h-52 rounded-full shadow-2xl overflow-hidden bg-gradient-to-br from-bg-surface-hover to-bg-surface flex items-center justify-center text-6xl font-black text-text-tertiary select-none ring-4 ring-bg-surface"
                >
                    {profile.image ? (
                        <img src={profile.image} alt={profile.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                        <span>{(profile.name || profile.email).charAt(0).toUpperCase()}</span>
                    )}
                </motion.div>

                <div className="flex-1 flex flex-col gap-2 mb-2 w-full">
                    <span className="text-sm font-bold uppercase tracking-widest text-text-tertiary">Profile</span>

                    {isEditing ? (
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="text-4xl md:text-6xl font-black bg-transparent border-b-2 border-accent-primary focus:outline-none text-text-primary w-full max-w-lg"
                                autoFocus
                            />
                            <button onClick={handleSaveName} className="px-5 py-2 bg-accent-primary text-white rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all">Save</button>
                            <button onClick={() => setIsEditing(false)} className="px-5 py-2 bg-bg-surface text-text-primary rounded-full text-sm font-bold border border-border-subtle hover:bg-bg-surface-hover transition-all">Cancel</button>
                        </div>
                    ) : (
                        <h1
                            className="text-4xl md:text-7xl font-black tracking-tight text-text-primary group cursor-pointer flex items-center gap-4 w-fit"
                            onClick={() => setIsEditing(true)}
                            title="Click to edit name"
                        >
                            {profile.name || 'Guitarist'}
                            <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-50 transition-opacity text-text-secondary hover:text-accent-primary">edit</span>
                        </h1>
                    )}

                    <div className="flex flex-wrap items-center gap-6 text-text-secondary mt-3 text-sm md:text-base font-medium">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">schedule</span>
                            <span>{formatDuration(profile.stats.totalPractice)} Practiced</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">auto_graph</span>
                            <span>{profile.stats.totalSessions} Sessions</span>
                        </div>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-text-tertiary"></div>
                        <span>Member since {new Date(profile.createdAt).getFullYear()}</span>
                    </div>
                </div>
            </header>

            {/* Content Tabs/Grid */}
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">Saved Songs</h2>
                    <Link href="/songs" className="text-sm font-bold text-accent-primary hover:underline">See All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {profile.savedSongs.length > 0 ? (
                        profile.savedSongs.map(song => (
                            <Link key={song.id} href={`/songs/${song.id}`}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="group bg-bg-surface/50 p-4 rounded-xl border border-border-subtle hover:border-accent-primary/30 hover:bg-bg-surface-hover transition-all cursor-pointer flex items-center gap-4"
                                >
                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-text-tertiary shadow-inner">
                                        <span className="material-symbols-outlined">music_note</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-text-primary truncate">{song.title}</h3>
                                        <p className="text-sm text-text-secondary truncate">{song.artist}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-bg-page border border-border-subtle text-text-tertiary">
                                                {song.difficulty}
                                            </span>
                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-bg-page border border-border-subtle text-text-tertiary">
                                                {song.genre}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border bordered border-border-subtle rounded-2xl border-dashed bg-bg-surface/20">
                            <p className="text-text-secondary mb-4">No saved songs yet.</p>
                            <Link href="/songs">
                                <button className="px-6 py-2 bg-accent-primary text-white rounded-full font-bold text-sm shadow-glow hover:brightness-110 transition-all">Browse Songs</button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Favorite Backing Tracks */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-text-primary">Favorite Backing Tracks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {profile.savedBackingTracks?.length > 0 ? (
                            profile.savedBackingTracks.map(track => (
                                <Link key={track.id} href="/practice">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="group bg-bg-surface/50 p-4 rounded-xl border border-border-subtle hover:border-[#13ec5b]/30 hover:bg-bg-surface-hover transition-all cursor-pointer flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-900/40 to-black flex items-center justify-center text-[#13ec5b] shadow-inner border border-[#13ec5b]/20">
                                            <span className="material-symbols-outlined text-xl">play_arrow</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-text-primary truncate">{track.name}</h3>
                                            <p className="text-xs text-text-secondary truncate">{(track.genre || 'Unknown')} • {track.bpm} BPM</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-8 text-center border bordered border-border-subtle rounded-xl border-dashed opacity-50">
                                <p className="text-text-secondary">No favorite backing tracks yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Favorites Section (Scales/Modes placeholder if schema is complex) */}
                <div className="flex items-center justify-between mt-8">
                    <h2 className="text-2xl font-bold text-text-primary">Favorites</h2>
                    <span className="text-sm text-text-tertiary">Coming soon</span>
                </div>
                <div className="p-8 rounded-2xl bg-bg-surface/30 border border-border-subtle text-center">
                    <p className="text-text-secondary">Your favorite scales and exercises will live here.</p>
                </div>

            </div>
        </main>
    );
}
