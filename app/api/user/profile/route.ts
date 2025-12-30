import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                favorites: {
                    orderBy: { createdAt: 'desc' }
                },
                savedSongs: {
                    include: {
                        song: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                savedBackingTracks: {
                    include: {
                        backingTrack: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                practiceSessions: {
                    select: { duration: true }
                }
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Calculate stats
        const totalPractice = user.practiceSessions.reduce((acc, curr) => acc + curr.duration, 0);
        const totalSessions = user.practiceSessions.length;

        // Extract relevant profile data
        const profile = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: user.createdAt,
            favorites: user.favorites,
            savedSongs: user.savedSongs.map(s => s.song), // Flatten structure
            savedBackingTracks: user.savedBackingTracks.map(t => t.backingTrack),
            stats: {
                totalPractice,
                totalSessions
            }
        };

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to fetch user profile', details: errorMessage },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { userId, name } = body;

        if (!userId || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Security check: Ensure user is updating their own profile
        if (session.user.id !== userId) {
            return NextResponse.json({ error: 'Forbidden: You can only update your own profile' }, { status: 403 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Failed to update profile:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
