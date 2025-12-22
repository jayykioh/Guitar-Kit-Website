export interface TechnicalSkill {
    title: string;
    desc: string;
    icon: string; // SVG path
}

export interface SongbookItem {
    title: string;
    artist: string;
    diff: 'Easy' | 'Intermediate' | 'Hard';
}

export interface UpcomingEvent {
    month: string;
    day: string;
    title: string;
    desc: string;
    attendeeCount: number;
}

export const MOCK_TECHNICAL_SKILLS: TechnicalSkill[] = [
    {
        title: "Scales & Modes",
        desc: "Master the fretboard with pentatonic drills.",
        icon: "M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2zM7 7h2v2H7zM7 11h2v2H7zM7 15h2v2H7zM15 15h2v2h-2zM15 11h2v2h-2z"
    },
    {
        title: "Backing Tracks",
        desc: "Jam along in any key. Blues, Rock, Jazz.",
        icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
    }
];

export const MOCK_SONGBOOK: SongbookItem[] = [
    {
        title: "Wonderwall",
        artist: "Oasis",
        diff: "Easy"
    },
    {
        title: "Hotel California",
        artist: "Eagles",
        diff: "Intermediate"
    },
    {
        title: "Neon",
        artist: "John Mayer",
        diff: "Hard"
    }
];

export const MOCK_UPCOMING_EVENTS: UpcomingEvent[] = [
    {
        month: "Oct",
        day: "24",
        title: "Live Jam Session",
        desc: "Community event • 8:00 PM",
        attendeeCount: 7
    }
];
