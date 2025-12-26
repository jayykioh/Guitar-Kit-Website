import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const sessions = await prisma.practiceSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const formattedSessions = sessions.map((session) => ({
      id: session.id,
      date: session.createdAt.toISOString().split('T')[0],
      duration: session.duration,
      focus: session.focus || 'General practice',
      createdAt: session.createdAt.toISOString(),
    }));
    
    return NextResponse.json(formattedSessions);
  } catch (error) {
    console.error('Failed to fetch practice sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch practice sessions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { userId, duration, focus } = body;
    
    if (!userId || !duration) {
      return NextResponse.json(
        { error: 'userId and duration are required' },
        { status: 400 }
      );
    }

    const newSession = await prisma.practiceSession.create({
      data: {
        userId,
        duration,
        focus: focus || null,
      },
    });
    
    return NextResponse.json(newSession, { status: 201 });
  } catch (error) {
    console.error('Failed to create practice session:', error);
    return NextResponse.json(
      { error: 'Failed to create practice session' },
      { status: 500 }
    );
  }
}
