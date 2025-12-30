import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const genre = searchParams.get('genre');

        const whereClause: any = {
            songId: null // Only fetch standalone tracks
        };

        if (genre && genre !== 'all') {
            whereClause.genre = {
                contains: genre,
                mode: 'insensitive'
            };
        }

        const backingTracks = await prisma.backingTrack.findMany({
            where: whereClause,
            orderBy: { name: 'asc' }
        });

        console.log(`[API] Fetching Backing Tracks. Genre: ${genre || 'All'}. Found: ${backingTracks.length}`);

        return NextResponse.json(backingTracks);
    } catch (error) {
        console.error('Failed to fetch backing tracks:', error);
        return NextResponse.json(
            { error: 'Failed to fetch backing tracks' },
            { status: 500 }
        );
    }
}
