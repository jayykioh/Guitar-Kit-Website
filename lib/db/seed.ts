import { config } from 'dotenv';
config(); // Load .env file

async function main() {
    // Dynamic import to ensure .env is loaded before Prisma client initialization
    const { prisma } = await import('./prisma');

    console.log("🌱 Starting seed...");

    try {
        // Optional: Clean up existing backing tracks to avoid duplicates if re-running
        // await prisma.backingTrack.deleteMany({}); 

        await prisma.backingTrack.createMany({
            data: [
                {
                    name: "A Minor BLUES - Simple Groove",
                    key: "Am", // Normalized to standard notation if needed
                    genre: "Blues",
                    bpm: 80, // Guessing BPM or leaving null if unknown, user didn't provide but schema has it.
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/A%20Minor%20BLUES%20-%20Simple%20Groove%20Backing%20Track.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL0EgTWlub3IgQkxVRVMgLSBTaW1wbGUgR3Jvb3ZlIEJhY2tpbmcgVHJhY2subXAzIiwiaWF0IjoxNzY2OTM1NDc3LCJleHAiOjE3OTg0NzE0Nzd9.gzNPVnzrJHnK2sxmUkhizzwYlSBfn2eEwg7uu2Nqx3g",
                },
                {
                    name: "Ambient Worship Backing Track",
                    key: "A",
                    genre: "Worship",
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Ambient%20%20Worship%20Backing%20Track%20(Key%20of%20A).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL0FtYmllbnQgIFdvcnNoaXAgQmFja2luZyBUcmFjayAoS2V5IG9mIEEpLm1wMyIsImlhdCI6MTc2NjkzNTQ5NCwiZXhwIjoxNzk4NDcxNDk0fQ.y0RqZ9xb2K68aOjVlKVxA4X3NZc6s2-to5k8W-46C4k",
                },
                {
                    name: "Neo-Soul Guitar Jam Track",
                    key: "Em",
                    genre: "Neo-Soul",
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Neo-Soul%20Guitar%20Jam%20Track%20(key%20of%20Em).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL05lby1Tb3VsIEd1aXRhciBKYW0gVHJhY2sgKGtleSBvZiBFbSkubXAzIiwiaWF0IjoxNzY2OTM1NTA2LCJleHAiOjE3OTg0NzE1MDZ9.FQw9qmWsj62zx2zxaYl8pvGJqCLaRId3hrI607PYAAA",
                },
                {
                    name: "Rock Guitar Backing Track",
                    key: "Bm",
                    genre: "Rock",
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Rock%20Guitar%20Backing%20Track%20in%20B%20Minor.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1JvY2sgR3VpdGFyIEJhY2tpbmcgVHJhY2sgaW4gQiBNaW5vci5tcDMiLCJpYXQiOjE3NjY5MzU1MjIsImV4cCI6MTc5ODQ3MTUyMn0.0I_fJGBJovW4yvPsbbPSKoSbbd4HxyTj7ni__a4b0bE",
                },
                {
                    name: "Slow Blues Jam – Sexy Guitar",
                    key: "C",
                    genre: "Blues",
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Slow%20Blues%20Jam%20%20Sexy%20Guitar%20Backing%20Track%20(C).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1Nsb3cgQmx1ZXMgSmFtICBTZXh5IEd1aXRhciBCYWNraW5nIFRyYWNrIChDKS5tcDMiLCJpYXQiOjE3NjY5MzU1MzUsImV4cCI6MTc5ODQ3MTUzNX0.pVXYnXSKM94PmC-tbfgq5PgnDUeOuyOuXgAo_qSRS-c",
                },
                {
                    name: "Smooth R&B Guitar – Night Vibes",
                    key: "E",
                    genre: "R&B",
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Smooth%20R&B%20Guitar%20Backing%20Track%20in%20E%20%20Night%20Vibes.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1Ntb290aCBSJkIgR3VpdGFyIEJhY2tpbmcgVHJhY2sgaW4gRSAgTmlnaHQgVmliZXMubXAzIiwiaWF0IjoxNzY2OTM1NTQ4LCJleHAiOjE3OTg0NzE1NDh9.59pj3P8T1zwUdy58CFaYvR9NNxpakg2srZoLrmsGbQA",
                },
            ],
        });

        console.log("✅ Backing tracks seeded with key & genre");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        if (prisma) await prisma.$disconnect();
    }
}

main().catch(console.error);
