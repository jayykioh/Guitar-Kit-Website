import { config } from 'dotenv';
config(); // Load .env file

async function main() {
    // Dynamic import to ensure .env is loaded before Prisma client initialization
    const { prisma } = await import('./prisma');

    console.log("🌱 Starting seed...");

    try {
        // Clean up existing backing tracks to avoid duplicates
        await prisma.backingTrack.deleteMany({});
        console.log("Deleted existing backing tracks.");

        await prisma.backingTrack.createMany({
            data: [
                // --- Existing Working Tracks ---
                {
                    name: "A Minor BLUES - Simple Groove",
                    key: "Am",
                    genre: "Blues",
                    bpm: 80,
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
                {
                    name: "Spacey Fusion Guitar Groove",
                    key: "E",
                    genre: "Fusion",
                    bpm: 80,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Spacey%20Fusion%20Guitar%20Backing%20Track.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1NwYWNleSBGdXNpb24gR3VpdGFyIEJhY2tpbmcgVHJhY2subXAzIiwiaWF0IjoxNzY2OTg5OTY5LCJleHAiOjE3OTg1MjU5Njl9.iSYYX6iQ3XPF6LvOsoV5oEpMrQfuFVRrzWO6P749L_0",
                },
                {
                    name: "A Minor 12 Bar Blues",
                    key: "Am",
                    genre: "Blues",
                    bpm: 50,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Minor%20Blues%20Backing%20Track%20%20in%20A%20minor%20%2012%20Bar%20Blues.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL01pbm9yIEJsdWVzIEJhY2tpbmcgVHJhY2sgIGluIEEgbWlub3IgIDEyIEJhciBCbHVlcy5tcDMiLCJpYXQiOjE3NjY5OTAwMzcsImV4cCI6MTc5ODUyNjAzN30.NRtonk1JP6Dm7RCO-HPLlZXTPTU6ZN0Qsb354LiN_mA",
                },
                {
                    name: "Mellow Fusion Guitar Flow",
                    key: "E",
                    genre: "Fusion",
                    bpm: 87,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Mellow%20Fusion%20Guitar%20Backing%20Track%20in%20E%20major.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL01lbGxvdyBGdXNpb24gR3VpdGFyIEJhY2tpbmcgVHJhY2sgaW4gRSBtYWpvci5tcDMiLCJpYXQiOjE3NjY5OTAxMDcsImV4cCI6MTc5ODUyNjEwN30.SeCUMGpOJbtMY8vp4B-WMz31U4zfGQhPHj08_xdyvMw",
                },

                // --- Updated / New User Provided Tracks ---
                {
                    name: "Neo Soul Groove Jam",
                    key: "E",
                    genre: "Neo-Soul / R&B",
                    bpm: 80,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/RnB%20Backing%20Track%20E%20major%20Neo%20Soul%20%20Groove%20Guitar%20Jam%20%2080%20%20.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1JuQiBCYWNraW5nIFRyYWNrIEUgbWFqb3IgTmVvIFNvdWwgIEdyb292ZSBHdWl0YXIgSmFtICA4MCAgLm1wMyIsImlhdCI6MTc2NzA4MzA3NCwiZXhwIjoxNzk4NjE5MDc0fQ.Jekyq0CP9wl1peEclJJ85k0i4Vsll-FgAfEdB-imBIY",
                },
                {
                    name: "Neo Soul Pocket Groove",
                    key: "C / Am",
                    genre: "Neo-Soul / R&B",
                    bpm: 84,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/R&B%20Neo%20Soul%20Backing%20Track%20in%20C%20Major%20%20A%20minor,%2084%20bpm.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1ImQiBOZW8gU291bCBCYWNraW5nIFRyYWNrIGluIEMgTWFqb3IgIEEgbWlub3IsIDg0IGJwbS5tcDMiLCJpYXQiOjE3NjcwODMwNjYsImV4cCI6MTc5ODYxOTA2Nn0.RVQ-I99JRrM_YS0kYGFLPtFNb8Kuscf-DdI70V5tfks",
                },
                {
                    name: "Smooth R&B Vibes Backing Track",
                    key: "Gm",
                    genre: "R&B",
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Smooth%20R&B%20Vibes%20Backing%20Track%20in%20Gm.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1Ntb290aCBSJkIgVmliZXMgQmFja2luZyBUcmFjayBpbiBHbS5tcDMiLCJpYXQiOjE3NjcwODMwOTUsImV4cCI6MTc5ODYxOTA5NX0.ub9YNU0db5RPNEWGl8l9WFdV3XfLyZXNtlQyHFJKkg0",
                },
                {
                    name: "Gravity – Blues Feel (John Mayer Style)",
                    key: "G",
                    genre: "Blues",
                    bpm: 72,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Gravity%20(Live)%20%20Backing%20Track%20%20John%20Mayer.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL0dyYXZpdHkgKExpdmUpICBCYWNraW5nIFRyYWNrICBKb2huIE1heWVyLm1wMyIsImlhdCI6MTc2NzA4MzIwMSwiZXhwIjoxNzk4NjE5MjAxfQ.NBBUvZmUsJITg6MorqjOKNMHamlL7C6HxPvDYH7ugrQ",
                },
                {
                    name: "Epic Melodic Rock",
                    key: "Em",
                    genre: "Rock",
                    bpm: 120,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Epic%20Melodic%20Rock%20Guitar%20Backing%20Track%20in%20E%20Minor.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL0VwaWMgTWVsb2RpYyBSb2NrIEd1aXRhciBCYWNraW5nIFRyYWNrIGluIEUgTWlub3IubXAzIiwiaWF0IjoxNzY3MDgzMjY1LCJleHAiOjE3OTg2MTkyNjV9.SDEiiOByfmSXBpID_dgYqAt7z1KCqzPojRy2m9S7yeY",
                },
                {
                    name: "Smooth Jazz Flow",
                    key: "C",
                    genre: "Jazz",
                    bpm: 60,
                    audioUrl:
                        "https://wiepgwzjsvvwvcydwzjp.supabase.co/storage/v1/object/sign/Backing%20Track/Smooth%20Jazz%20Backing%20Track%20in%20C%20Major%20%2060%20bpm.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jM2QxZjlhOS1jN2ZiLTRmMGQtOTY2OS1hYjUxZTJiMmM0NjgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCYWNraW5nIFRyYWNrL1Ntb290aCBKYXp6IEJhY2tpbmcgVHJhY2sgaW4gQyBNYWpvciAgNjAgYnBtLm1wMyIsImlhdCI6MTc2NzA4MzIyNSwiZXhwIjoxNzk4NjE5MjI1fQ.6NEAmL4Vgx_lhhl2G3vDZNPkN516pWLsNOra-eZltZM",
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
