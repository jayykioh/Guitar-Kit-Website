import { prisma } from './prisma';
import { SCALE_FORMULAS } from '@/lib/music/scales';
import { STANDARD_TUNINGS } from '@/lib/music/fretboard';

/**
 * Seed the database with initial scale and tuning data
 * Run with: npx tsx lib/db/seed.ts
 */
export async function seedDatabase() {
    console.log('🌱 Seeding database...');

    // Seed scales
    console.log('📊 Seeding scales...');
    const scaleData = Object.values(SCALE_FORMULAS).map(scale => ({
        id: scale.id,
        name: scale.name,
        intervals: scale.intervals,
        formula: scale.formula,
        category: scale.category,
        description: scale.description || ''
    }));

    for (const scale of scaleData) {
        await prisma.scale.upsert({
            where: { id: scale.id },
            update: scale,
            create: scale
        });
    }
    console.log(`✅ Seeded ${scaleData.length} scales`);

    // Seed tunings
    console.log('🎸 Seeding tunings...');
    const tuningData = Object.values(STANDARD_TUNINGS).map(tuning => ({
        id: tuning.id,
        name: tuning.name,
        notes: tuning.notes,
        isStandard: tuning.isStandard
    }));

    for (const tuning of tuningData) {
        await prisma.tuning.upsert({
            where: { id: tuning.id },
            update: tuning,
            create: tuning
        });
    }
    console.log(`✅ Seeded ${tuningData.length} tunings`);

    console.log('🎉 Database seeding complete!');
}

// Run if called directly
if (require.main === module) {
    seedDatabase()
        .catch((e) => {
            console.error('❌ Seeding failed:', e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
