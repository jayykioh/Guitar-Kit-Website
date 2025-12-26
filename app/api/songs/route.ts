import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const songs = await prisma.song.findMany({
      where: { userId },
      orderBy: { lastPracticed: 'desc' },
    });

    const formattedSongs = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist || 'Unknown',
      difficulty: song.difficulty || 'Beginner',
      genre: song.genre || 'Other',
      key: song.key,
      bpm: song.bpm,
      progress: song.progress || 0,
      lastPracticed: song.lastPracticed
        ? song.lastPracticed.toISOString().split('T')[0]
        : song.createdAt.toISOString().split('T')[0],
      notes: song.notes,
      audioUrl: song.audioUrl,
      tabUrl: song.tabUrl,
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

    const { userId, title, artist, difficulty, genre, key, bpm, notes, tabUrl, audioUrl } = body;

    if (!userId || !title || !artist) {
      return NextResponse.json(
        { error: 'userId, title, and artist are required' },
        { status: 400 }
      );
    }

    const newSong = await prisma.song.create({
      data: {
        userId,
        title,
        artist,
        difficulty: difficulty || 'Beginner',
        genre: genre || null,
        key: key || null,
        bpm: bpm || null,
        notes: notes || null,
        tabUrl: tabUrl || null,
        audioUrl: audioUrl || null,
        progress: 0,
      },
    });

    const formattedSong = {
      id: newSong.id,
      title: newSong.title,
      artist: newSong.artist,
      difficulty: newSong.difficulty,
      genre: newSong.genre,
      key: newSong.key,
      bpm: newSong.bpm,
      progress: newSong.progress,
      lastPracticed: newSong.createdAt.toISOString().split('T')[0],
      notes: newSong.notes,
      audioUrl: newSong.audioUrl,
      tabUrl: newSong.tabUrl,
    };

    return NextResponse.json(formattedSong, { status: 201 });
  } catch (error) {
    console.error('Failed to create song:', error);
    return NextResponse.json(
      { error: 'Failed to create song' },
      { status: 500 }
    );
  }
}
