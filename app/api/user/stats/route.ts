import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        practiceSessions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        songs: true,
        favorites: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate stats from practice sessions
    const totalPractice = user.practiceSessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );

    const recentSessions = user.practiceSessions.slice(0, 3).map((session) => ({
      date: session.createdAt.toISOString().split('T')[0],
      duration: session.duration,
      focus: session.focus || 'General practice',
    }));

    const stats = {
      userName: user.name || 'Guitarist',
      userEmail: user.email,
      totalPractice,
      totalSongs: user.songs.length,
      totalFavorites: user.favorites.length,
      totalSessions: user.practiceSessions.length,
      recentSessions,
      dailyGoal: 45, // TODO: Make this user-configurable
      dailyProgress: recentSessions[0]?.duration || 0,
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
