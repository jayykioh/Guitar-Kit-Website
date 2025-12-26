import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});

/**
 * Seed database with test data
 * Tests all models: User, Favorite, PracticeSession, Song
 */
async function main() {
    console.log('🌱 Seeding database...');

    // 1. Create test user
    const user = await prisma.user.upsert({
        where: { email: 'test@guitarart.com' },
        update: {},
        create: {
            email: 'test@guitarart.com',
            name: 'Test User',
            image: null,
        },
    });
    console.log('✅ Created user:', user.email);

    // 2. Create favorite scales
    await prisma.favorite.upsert({
        where: {
            userId_scaleId_key_tuningId: {
                userId: user.id,
                scaleId: 'minor-pentatonic',
                key: 'A',
                tuningId: 'standard',
            },
        },
        update: {},
        create: {
            userId: user.id,
            scaleId: 'minor-pentatonic',
            key: 'A',
            tuningId: 'standard',
            notes: 'My favorite scale for rock solos',
        },
    });
    console.log('✅ Created favorite: A Minor Pentatonic');

    // 3. Create practice session (minimal)
    await prisma.practiceSession.create({
        data: {
            userId: user.id,
            duration: 45,
            focus: 'Scales',
        },
    });
    console.log('✅ Created practice session (45 min)');

    // 4. Create songs
    const existingSong = await prisma.song.findFirst({
        where: {
            userId: user.id,
            title: 'Wonderwall',
        },
    });

    if (!existingSong) {
        await prisma.song.create({
            data: {
                userId: user.id,
                title: 'Wonderwall',
                artist: 'Oasis',
                difficulty: 'Beginner',
                genre: 'Rock',
                key: 'Em',
                bpm: 87,
                progress: 85,
                notes: 'Chords: Em, G, D, A7sus4',
                lastPracticed: new Date(),
            },
        });
        console.log('✅ Created song: Wonderwall');
    } else {
        console.log('✅ Song already exists: Wonderwall');
    }

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log('  - 1 User');
    console.log('  - 1 Favorite scale');
    console.log('  - 1 Practice session');
    console.log('  - 1 Song');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
