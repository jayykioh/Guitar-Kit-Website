import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // 1. Fetch all global songs
    const songs = await prisma.song.findMany({
      orderBy: { title: 'asc' },
      include: {
        backingTracks: true, // Include associated backing tracks
      }
    });

    // 2. Map Songs to unified format
    const formattedSongs = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      difficulty: song.difficulty || 'Beginner',
      genre: song.genre || 'Other',
      key: song.key,
      bpm: song.bpm,
      tabUrl: song.tabUrl,
      audioUrl: song.audioUrl,
      backingTracks: song.backingTracks,
      createdAt: song.createdAt.toISOString(),
      updatedAt: song.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedSongs);
  } catch (error) {
    console.error('Failed to fetch songs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, artist, difficulty, genre, key, bpm, tabUrl, audioUrl } = body;

    if (!title || !artist) {
      return NextResponse.json(
        { error: 'Title and artist are required' },
        { status: 400 }
      );
    }

    const newSong = await prisma.song.create({
      data: {
        title,
        artist,
        difficulty: difficulty || 'Beginner',
        genre: genre || null,
        key: key || null,
        bpm: bpm || null,
        tabUrl: tabUrl || null,
        audioUrl: audioUrl || null,
      },
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    console.error('Failed to create song:', error);
    return NextResponse.json(
      { error: 'Failed to create song' },
      { status: 500 }
    );
  }
}
