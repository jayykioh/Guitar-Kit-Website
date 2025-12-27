'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

interface Stats {
  userName: string;
  userEmail: string;
  totalPractice: number;
  totalSongs: number;
  totalFavorites: number;
  totalSessions: number;
  recentSessions: Array<{
    date: string;
    duration: number;
    focus: string;
  }>;
  dailyGoal: number;
  dailyProgress: number;
}

export function useUserStats() {
  const { user } = useUser();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/user/stats?userId=${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user stats');
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [user?.id]); // Only re-fetch when user ID changes, not when user object reference changes


  return { stats, isLoading, error };
}
