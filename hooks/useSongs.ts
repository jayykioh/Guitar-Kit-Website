import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: string;
  genre: string;
  key: string | null;
  bpm: number | null;
  tabUrl: string | null;
  audioUrl: string | null;
  // Computed property for UI
  isSaved?: boolean;
}

export function useSongs() {
  const { user } = useUser();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // 1. Fetch Global Songs
        const songsRes = await fetch('/api/songs', { cache: 'no-store' });
        if (!songsRes.ok) throw new Error('Failed to fetch songs');
        const songsData: Song[] = await songsRes.json();

        // 2. Fetch Saved Songs (if user exists)
        let savedSongIds = new Set<string>();
        if (user) {
          const savedRes = await fetch(`/api/songs/saved?userId=${user.id}`);
          if (savedRes.ok) {
            const savedData = await savedRes.json();
            savedData.forEach((item: any) => savedSongIds.add(item.songId));
          }
        }

        // 3. Merge
        const mergedSongs = songsData.map(song => ({
          ...song,
          isSaved: savedSongIds.has(song.id)
        }));

        setSongs(mergedSongs);
        setError(null);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user?.id]);

  const toggleSave = async (songId: string) => {
    if (!user) return; // Or show auth modal

    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const isCurrentlySaved = song.isSaved;

    // Optimistic Update
    setSongs(prev => prev.map(s => s.id === songId ? { ...s, isSaved: !isCurrentlySaved } : s));

    try {
      if (isCurrentlySaved) {
        // Unsave
        await fetch(`/api/songs/saved?userId=${user.id}&songId=${songId}`, { method: 'DELETE' });
      } else {
        // Save
        await fetch('/api/songs/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, songId })
        });
      }
    } catch (error) {
      // Revert on error
      setSongs(prev => prev.map(s => s.id === songId ? { ...s, isSaved: isCurrentlySaved } : s));
      console.error('Failed to toggle save', error);
    }
  };

  return { songs, isLoading, error, toggleSave };
}
