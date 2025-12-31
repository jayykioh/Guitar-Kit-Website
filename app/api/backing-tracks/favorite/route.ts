import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { trackId } = await req.json();
        if (!trackId) {
            return NextResponse.json({ error: 'Track ID required' }, { status: 400 });
        }

        const userId = session.user.id;

        // Check if already favorite (use SavedBackingTrack model)
        const existing = await prisma.savedBackingTrack.findUnique({
            where: {
                userId_backingTrackId: {
                    userId,
                    backingTrackId: trackId
                }
            }
        });

        if (existing) {
            // Toggle OFF
            await prisma.savedBackingTrack.delete({
                where: {
                    userId_backingTrackId: {
                        userId,
                        backingTrackId: trackId
                    }
                }
            });
            return NextResponse.json({ isFavorite: false });
        } else {
            // Toggle ON
            await prisma.savedBackingTrack.create({
                data: {
                    userId,
                    backingTrackId: trackId
                }
            });
            return NextResponse.json({ isFavorite: true });
        }

    } catch (error) {
        console.error('Toggle favorite error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user's saved backing tracks
        const favorites = await prisma.savedBackingTrack.findMany({
            where: { userId: session.user.id },
            select: { backingTrackId: true }
        });

        return NextResponse.json(favorites.map((f: { backingTrackId: string }) => f.backingTrackId));
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
