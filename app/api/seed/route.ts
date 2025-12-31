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

        // Create sample songs (Song model doesn't have userId - it's a global catalog)
        const songs = [
            { title: 'Wonderwall', artist: 'Oasis', difficulty: 'Beginner', genre: 'Rock', key: 'Em', bpm: 87 },
            { title: 'Hotel California', artist: 'Eagles', difficulty: 'Intermediate', genre: 'Rock', key: 'Bm', bpm: 74 },
            { title: 'Neon', artist: 'John Mayer', difficulty: 'Advanced', genre: 'Pop', key: 'C', bpm: 145 },
        ];

        const createdSongs = [];
        for (const songData of songs) {
            const song = await prisma.song.upsert({
                where: {
                    id: `seed-${songData.title.toLowerCase().replace(/\s+/g, '-')}`
                },
                update: songData,
                create: {
                    id: `seed-${songData.title.toLowerCase().replace(/\s+/g, '-')}`,
                    ...songData,
                },
            });
            createdSongs.push(song);
        }

        // Create practice sessions (use focusType instead of focus)
        const sessions = [
            { duration: 45, focusType: 'SCALES', daysAgo: 0 },
            { duration: 30, focusType: 'SONGS', daysAgo: 1, songId: createdSongs[1]?.id },
            { duration: 60, focusType: 'TECHNIQUE', daysAgo: 2 },
        ];

        for (const sessionData of sessions) {
            await prisma.practiceSession.create({
                data: {
                    userId: user.id,
                    duration: sessionData.duration,
                    focusType: sessionData.focusType,
                    songId: sessionData.songId || null,
                    notes: null,
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
