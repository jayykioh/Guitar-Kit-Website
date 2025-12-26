import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// Development-only endpoint to create seed data
export async function POST() {
    try {
        // Check if we're in development
        if (process.env.NODE_ENV !== 'development') {
            return NextResponse.json(
                { error: 'Seed endpoint only available in development' },
                { status: 403 }
            );
        }

        // Create or update user
        const user = await prisma.user.upsert({
            where: { id: 'cm5akc7wt0000r4u2oo8kgbxl' },
            update: {
                email: 'demo@guitart.app',
                name: 'Alex Rodriguez',
            },
            create: {
                id: 'cm5akc7wt0000r4u2oo8kgbxl',
                email: 'demo@guitart.app',
                name: 'Alex Rodriguez',
                image: null,
            },
        });

        // Create sample songs
        const songs = [
            { title: 'Wonderwall', artist: 'Oasis', difficulty: 'Easy', genre: 'Rock', key: 'Em', bpm: 87, progress: 85 },
            { title: 'Hotel California', artist: 'Eagles', difficulty: 'Intermediate', genre: 'Rock', key: 'Bm', bpm: 74, progress: 60 },
            { title: 'Neon', artist: 'John Mayer', difficulty: 'Hard', genre: 'Pop', key: 'C', bpm: 145, progress: 30 },
        ];

        for (const songData of songs) {
            await prisma.song.upsert({
                where: {
                    userId_title_artist: {
                        userId: user.id,
                        title: songData.title,
                        artist: songData.artist,
                    },
                },
                update: {},
                create: {
                    userId: user.id,
                    ...songData,
                },
            });
        }

        // Create practice sessions
        const sessions = [
            { duration: 45, focus: 'A Minor Pentatonic', daysAgo: 0 },
            { duration: 30, focus: 'Hotel California Solo', daysAgo: 1 },
            { duration: 60, focus: 'Chord Transitions', daysAgo: 2 },
        ];

        for (const sessionData of sessions) {
            await prisma.practiceSession.create({
                data: {
                    userId: user.id,
                    duration: sessionData.duration,
                    focus: sessionData.focus,
                    createdAt: new Date(Date.now() - sessionData.daysAgo * 24 * 60 * 60 * 1000),
                },
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            user: { id: user.id, email: user.email, name: user.name },
            songsCreated: songs.length,
            sessionsCreated: sessions.length,
        });

    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { error: 'Failed to seed database', details: String(error) },
            { status: 500 }
        );
    }
}
