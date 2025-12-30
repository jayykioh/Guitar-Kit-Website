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
            } as any,
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // TypeScript workaround: Prisma include types not always recognized
        const userWithIncludes = user as any;

        // Calculate stats
        const totalPractice = userWithIncludes.practiceSessions.reduce((acc: number, curr: any) => acc + curr.duration, 0);
        const totalSessions = userWithIncludes.practiceSessions.length;

        // Extract and flatten related data
        const profile = {
            id: userWithIncludes.id,
            name: userWithIncludes.name,
            email: userWithIncludes.email,
            image: userWithIncludes.image,
            createdAt: userWithIncludes.createdAt,
            favorites: userWithIncludes.favorites,
            savedSongs: userWithIncludes.savedSongs.map((s: any) => s.song),
            savedBackingTracks: userWithIncludes.savedBackingTracks.map((t: any) => t.backingTrack),
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
