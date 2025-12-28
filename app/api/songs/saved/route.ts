import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET: Fetch user's saved songs
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        const savedSongs = await prisma.savedSong.findMany({
            where: { userId },
            include: {
                song: true, // Include the actual song data
            },
            orderBy: { createdAt: 'desc' },
        });

        // Flatten structure so frontend receives a list of Songs with a "savedAt" property maybe?
        // Or just return the relationship. returning the relationship is flexible.
        return NextResponse.json(savedSongs);
    } catch (error) {
        console.error('Failed to fetch saved songs:', error);
        return NextResponse.json({ error: 'Failed to fetch saved songs' }, { status: 500 });
    }
}

// POST: Save a song
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, songId } = body;

        if (!userId || !songId) {
            return NextResponse.json({ error: 'userId and songId required' }, { status: 400 });
        }

        const saved = await prisma.savedSong.create({
            data: {
                userId,
                songId
            }
        });

        return NextResponse.json(saved, { status: 201 });
    } catch (error) {
        console.error('Failed to save song:', error);
        return NextResponse.json({ error: 'Failed to save song' }, { status: 500 });
    }
}

// DELETE: Unsave a song
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const songId = searchParams.get('songId');

        if (!userId || !songId) {
            return NextResponse.json({ error: 'userId and songId required' }, { status: 400 });
        }

        await prisma.savedSong.delete({
            where: {
                userId_songId: {
                    userId,
                    songId
                }
            }
        });

        return NextResponse.json({ message: 'Song unsaved' });
    } catch (error) {
        console.error('Failed to unsave song:', error);
        return NextResponse.json({ error: 'Failed to unsave song' }, { status: 500 });
    }
}
