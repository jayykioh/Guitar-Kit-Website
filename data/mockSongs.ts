export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    cover: string;
    genre: string;
    bpm: number;
    key: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    lyrics: { type: 'verse' | 'chorus'; label: string; lines: { chords: { name: string; width: string }[]; text: string }[] }[];
    chords: string[];
}

export const mockSongs: Song[] = [
    {
        id: 'neon-nights',
        title: 'Neon Nights',
        artist: 'The Midnight Travelers',
        album: 'Nocturnal Drive',
        cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop',
        genre: 'Synthwave',
        bpm: 120,
        key: 'Am',
        difficulty: 'Medium',
        chords: ['Am', 'F', 'C', 'G'],
        lyrics: [
            {
                type: 'verse',
                label: 'Verse 1',
                lines: [
                    { chords: [{ name: 'Am', width: '32%' }, { name: 'F', width: '' }], text: "Walking down the boulevard of broken dreams" },
                    { chords: [{ name: 'C', width: '35%' }, { name: 'G', width: '' }], text: "Streetlights painting shadows, nothing's as it seems" },
                    { chords: [{ name: 'Am', width: '32%' }, { name: 'F', width: '' }], text: "I check my watch it's nearly quarter past two" },
                    { chords: [{ name: 'C', width: '35%' }, { name: 'G', width: '' }], text: "All I ever think about is coming back to you" }
                ]
            },
            {
                type: 'chorus',
                label: 'Chorus',
                lines: [
                    { chords: [{ name: 'F', width: '20%' }, { name: 'G', width: '30%' }, { name: 'Am', width: '' }], text: "Oh, these neon nights are calling out your name" },
                    { chords: [{ name: 'F', width: '20%' }, { name: 'G', width: '30%' }, { name: 'C', width: '' }], text: "Driving through the city, playing every game" },
                ]
            }
        ]
    },
    {
        id: 'desert-wind',
        title: 'Desert Wind',
        artist: 'Sarah Jenkins',
        album: 'Dust & Gold',
        cover: 'https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?q=80&w=2544&auto=format&fit=crop',
        genre: 'Country',
        bpm: 95,
        key: 'G',
        difficulty: 'Easy',
        chords: ['G', 'C', 'D', 'Em'],
        lyrics: []
    },
    {
        id: 'midnight-blues',
        title: 'Midnight Blues',
        artist: 'Blue Note Trio',
        album: 'Late Night Sessions',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop',
        genre: 'Jazz',
        bpm: 85,
        key: 'Cm',
        difficulty: 'Hard',
        chords: ['Cm7', 'Fm7', 'G7', 'Bb13'],
        lyrics: []
    }
];
