import { NextResponse } from 'next/server';
import { getAllScales } from '@/lib/music/scales';

export async function GET() {
  try {
    // Return hardcoded scales from music library
    // No database needed - these are static reference data
    const scales = getAllScales();
    
    return NextResponse.json(scales);
  } catch (error) {
    console.error('Failed to fetch scales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scales' },
      { status: 500 }
    );
  }
}
