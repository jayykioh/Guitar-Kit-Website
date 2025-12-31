import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const startOfDayParam = searchParams.get('startOfDay');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Determine start of day (Client Time preferred, else Server Time)
    let startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Default server time

    if (startOfDayParam) {
      const clientDate = new Date(startOfDayParam);
      if (!isNaN(clientDate.getTime())) {
        startOfDay = clientDate;
      }
    }

    // Run queries in parallel
    const [
      user,
      lifetimeSessionsCount,
      todayStats,
      recentSessionsData
    ] = await Promise.all([
      // 1. User basic info (Counts optimization)
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          email: true,
          _count: {
            select: { savedSongs: true, favorites: true }
          }
        }
      }),
      // 2. Lifetime Sessions Count
      prisma.practiceSession.count({
        where: { userId }
      }),
      // 3. Today's Practice Sum
      prisma.practiceSession.aggregate({
        where: {
          userId,
          createdAt: { gte: startOfDay }
        },
        _sum: { duration: true }
      }),
      // 4. Recent Sessions
      prisma.practiceSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 3
      })
    ]);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const todayDuration = todayStats._sum.duration || 0;

    const recentSessions = recentSessionsData.map((session) => ({
      date: session.createdAt.toISOString().split('T')[0],
      duration: session.duration,
      focus: session.focusType || 'General practice',
    }));

    const stats = {
      userName: user.name || 'Guitarist',
      userEmail: user.email,
      totalPractice: todayDuration, // User Required: "Total Practice" represents Today's time
      totalSongs: user._count.savedSongs,
      totalFavorites: user._count.favorites,
      totalSessions: lifetimeSessionsCount,
      recentSessions,
      dailyGoal: 45,
      dailyProgress: todayDuration,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user statistics' },
      { status: 500 }
    );
  }
}
