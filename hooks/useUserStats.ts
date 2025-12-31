'use client';

import { useState, useEffect, useRef } from 'react';
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

  // Track the date of the last fetch to detect day changes
  const lastFetchDateRef = useRef<string>('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function fetchStats() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Calculate Client Start of Day to ensure "Today" means "User's Today"
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const startOfDayISO = now.toISOString();

        // Update reference date
        lastFetchDateRef.current = new Date().toDateString();

        const response = await fetch(`/api/user/stats?userId=${user.id}&startOfDay=${startOfDayISO}`);

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

    // Check for day change every minute
    intervalId = setInterval(() => {
      const today = new Date().toDateString();
      // If the day logic string is different from the last fetch, refresh
      if (lastFetchDateRef.current && today !== lastFetchDateRef.current) {
        fetchStats();
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [user?.id]);


  return { stats, isLoading, error };
}
