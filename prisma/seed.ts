import { config } from 'dotenv';
import { resolve } from 'path';
import { PrismaClient } from '@prisma/client';

// Load .env file from project root
config({ path: resolve(__dirname, '../.env') });

// Validate environment variables
if (!process.env.DIRECT_URL && !process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URL or DIRECT_URL must be set in .env file');
    console.error('Current env vars:', Object.keys(process.env).filter(k => k.includes('URL')));
    process.exit(1);
}

console.log('✅ Environment loaded, connection URL found');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create demo user
    const user = await prisma.user.upsert({
        where: { email: 'demo@guitart.app' },
        update: {},
        create: {
            email: 'demo@guitart.app',
            name: 'Alex Rodriguez',
            image: null,
        },
    });

    console.log('✅ Created user:', user.email);

    // Sample songs data
    const songsData = [
        {
            title: 'Wonderwall',
            artist: 'Oasis',
            difficulty: 'Easy',
            genre: 'Rock',
            key: 'Em',
            bpm: 87,
            progress: 85,
            tabUrl: 'https://tabs.ultimate-guitar.com/tab/oasis/wonderwall-chords-62918',
            notes: 'Classic beginner song. Focus on smooth chord transitions.',
        },
        {
            title: 'Hotel California',
            artist: 'Eagles',
            difficulty: 'Intermediate',
            genre: 'Rock',
            key: 'Bm',
            bpm: 74,
            progress: 60,
            tabUrl: 'https://tabs.ultimate-guitar.com/tab/eagles/hotel-california-chords-18782',
            notes: 'Working on the solo section. Need to practice bends.',
        },
        {
            title: 'Neon',
            artist: 'John Mayer',
            difficulty: 'Hard',
            genre: 'Pop',
            key: 'C',
            bpm: 145,
            progress: 30,
            tabUrl: 'https://tabs.ultimate-guitar.com/tab/john-mayer/neon-tabs-319011',
            notes: 'Complex fingerstyle pattern. Start slow at 60 BPM.',
        },
        {
            title: 'Blackbird',
            artist: 'The Beatles',
            difficulty: 'Intermediate',
            genre: 'Folk',
            key: 'G',
            bpm: 96,
            progress: 75,
            notes: 'Fingerpicking pattern getting smoother. Practice transitions.',
        },
        {
            title: 'Tears in Heaven',
            artist: 'Eric Clapton',
            difficulty: 'Intermediate',
            genre: 'Ballad',
            key: 'A',
            bpm: 80,
            progress: 50,
            notes: 'Beautiful chord progressions. Focus on dynamics.',
        },
        {
            title: 'Smoke on the Water',
            artist: 'Deep Purple',
            difficulty: 'Easy',
            genre: 'Rock',
            key: 'Gm',
            bpm: 112,
            progress: 95,
            notes: 'Classic riff. Perfect for beginners.',
        },
        {
            title: 'Stairway to Heaven',
            artist: 'Led Zeppelin',
            difficulty: 'Hard',
            genre: 'Rock',
            key: 'Am',
            bpm: 82,
            progress: 40,
            notes: 'Long song with multiple sections. Working on solo.',
        },
        {
            title: 'Cliffs of Dover',
            artist: 'Eric Johnson',
            difficulty: 'Hard',
            genre: 'Rock',
            key: 'G',
            bpm: 168,
            progress: 15,
            notes: 'Extremely fast. Practicing with metronome at 80 BPM.',
        },
        {
            title: 'Nothing Else Matters',
            artist: 'Metallica',
            difficulty: 'Intermediate',
            genre: 'Metal',
            key: 'Em',
            bpm: 70,
            progress: 70,
            notes: 'Fingerpicking intro is smooth now. Working on solo.',
        },
        {
            title: 'Wish You Were Here',
            artist: 'Pink Floyd',
            difficulty: 'Easy',
            genre: 'Rock',
            key: 'G',
            bpm: 60,
            progress: 90,
            notes: 'Great song for practicing bends and sustain.',
        },
        {
            title: 'Little Wing',
            artist: 'Jimi Hendrix',
            difficulty: 'Hard',
            genre: 'Rock',
            key: 'Em',
            bpm: 68,
            progress: 25,
            notes: 'Complex chord voicings. Need to work on timing.',
        },
        {
            title: 'Come As You Are',
            artist: 'Nirvana',
            difficulty: 'Easy',
            genre: 'Grunge',
            key: 'Em',
            bpm: 120,
            progress: 100,
            notes: 'Mastered! Simple but iconic riff.',
        },
    ];

    // Create songs
    for (const songData of songsData) {
        const created = await prisma.song.upsert({
            where: {
                userId_title_artist: {
                    userId: user.id,
                    title: songData.title,
                    artist: songData.artist || '',
                },
            },
            update: {},
            create: {
                userId: user.id,
                ...songData,
                lastPracticed: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
            },
        });
        console.log(`✅ Created song: ${created.title}`);
    }

    // Create practice sessions
    const sessionsData = [
        { duration: 45, focus: 'A Minor Pentatonic - Box 1', daysAgo: 0 },
        { duration: 30, focus: 'Hotel California Solo', daysAgo: 0 },
        { duration: 60, focus: 'Chord Transitions G-C-D', daysAgo: 1 },
        { duration: 40, focus: 'Wonderwall Full Song', daysAgo: 1 },
        { duration: 50, focus: 'Scale Practice', daysAgo: 2 },
        { duration: 35, focus: 'Fingerstyle Patterns', daysAgo: 3 },
        { duration: 45, focus: 'Neon - Slow Practice', daysAgo: 4 },
        { duration: 55, focus: 'Bends and Vibrato', daysAgo: 5 },
        { duration: 40, focus: 'Theory Study', daysAgo: 6 },
    ];

    for (const sessionData of sessionsData) {
        const created = await prisma.practiceSession.create({
            data: {
                userId: user.id,
                duration: sessionData.duration,
                focus: sessionData.focus,
                createdAt: new Date(Date.now() - sessionData.daysAgo * 24 * 60 * 60 * 1000),
            },
        });
        console.log(`✅ Created practice session: ${created.focus}`);
    }

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
