import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('[API POST /practice/sessions] Received body:', body);
        const { userId, duration, focusType, songId, notes } = body;

        if (!userId || !duration || !focusType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate user existence to prevent Foreign Key errors
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return NextResponse.json({ error: 'User not found. Please log out and log in again.' }, { status: 404 });
        }

        const session = await prisma.practiceSession.create({
            data: {
                userId,
                duration,
                focusType,
                songId: songId || null,
                notes: notes || null
            }
        });

        // Update song stats if songId is present
        // (Optional: Implement LastPracticed update on Song if we want to track that)
        // Since Global Songs don't store User Progress directly, we assume that is done via Analytics queries
        // or we could add a `UserSongProgress` model later. For now, just recording the session is enough.

        return NextResponse.json(session, { status: 201 });
    } catch (error) {
        console.error('Failed to create practice session:', error);
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'userId required' }, { status: 400 });
        }

        const sessions = await prisma.practiceSession.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: { song: true }
        });

        return NextResponse.json(sessions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
    }
}
