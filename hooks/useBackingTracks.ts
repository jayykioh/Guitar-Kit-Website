import { useState, useEffect } from 'react';

export interface BackingTrack {
    id: string;
    name: string;
    bpm: number | null;
    genre: string | null;
    key: string | null;
    audioUrl: string;
}

export function useBackingTracks() {
    const [tracks, setTracks] = useState<BackingTrack[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string>('all');

    useEffect(() => {
        async function fetchTracks() {
            try {
                setIsLoading(true);
                const query = selectedGenre === 'all' ? '' : `?genre=${encodeURIComponent(selectedGenre)}`;

                const res = await fetch(`/api/backing-tracks${query}`, { cache: 'no-store' });

                if (!res.ok) throw new Error('Failed to fetch backing tracks');

                const data = await res.json();
                setTracks(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching backing tracks:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        }

        fetchTracks();
    }, [selectedGenre]);

    return {
        tracks,
        isLoading,
        error,
        selectedGenre,
        setSelectedGenre
    };
}
