'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: string;
  genre: string;
  key: string | null;
  bpm: number | null;
  progress: number;
  lastPracticed: string;
  notes: string | null;
  audioUrl: string | null;
  tabUrl: string | null;
}

export function useSongs() {
  const { user } = useUser();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/songs?userId=${user.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }

        const data = await response.json();
        setSongs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSongs();
  }, [user]);

  return { songs, isLoading, error };
}
