import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const formattedFavorites = favorites.map((fav) => ({
      id: fav.id,
      scaleId: fav.scaleId,
      key: fav.key,
      tuningId: fav.tuningId,
      notes: fav.notes,
      createdAt: fav.createdAt.toISOString(),
    }));
    
    return NextResponse.json(formattedFavorites);
  } catch (error) {
    console.error('Failed to fetch favorites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { userId, scaleId, key, tuningId, notes } = body;
    
    if (!userId || !scaleId || !key || !tuningId) {
      return NextResponse.json(
        { error: 'userId, scaleId, key, and tuningId are required' },
        { status: 400 }
      );
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        userId,
        scaleId,
        key,
        tuningId,
        notes: notes || null,
      },
    });
    
    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error('Failed to create favorite:', error);
    return NextResponse.json(
      { error: 'Failed to create favorite' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Favorite ID is required' },
        { status: 400 }
      );
    }
    
    // TODO: Delete from database via Prisma
    // Example: await prisma.favorite.delete({ where: { id } })
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete favorite:', error);
    return NextResponse.json(
      { error: 'Failed to delete favorite' },
      { status: 500 }
    );
  }
}
