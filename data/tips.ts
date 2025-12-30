export interface ProTip {
    id: string;
    content: string;
    category: 'Technique' | 'Theory' | 'Mindset' | 'Gear';
    highlight?: string;
}

export const TIPS: ProTip[] = [
    {
        id: '1',
        content: 'Relax your fretting hand. Tension kills speed. Try playing with the lightest touch possible today.',
        category: 'Technique',
        highlight: 'lightest touch possible'
    },
    {
        id: '2',
        content: 'Practice slowly. If you can\'t play it slow, you can\'t play it fast. Speed is a byproduct of accuracy.',
        category: 'Technique',
        highlight: 'byproduct of accuracy'
    },
    {
        id: '3',
        content: 'Learn the major scale on one string first. It helps visualize intervals better than box shapes.',
        category: 'Theory',
        highlight: 'one string first'
    },
    {
        id: '4',
        content: 'Record yourself playing. It’s the fastest way to spot mistakes you miss in the moment.',
        category: 'Mindset',
        highlight: 'Record yourself'
    },
    {
        id: '5',
        content: 'Use a metronome for everything. Rhythm is more important than notes.',
        category: 'Technique',
        highlight: 'Rhythm is more important'
    },
    {
        id: '6',
        content: 'Listen to genres you don\'t usually play. Inspiration comes from unexpected places.',
        category: 'Mindset',
        highlight: 'unexpected places'
    },
    {
        id: '7',
        content: 'Change your strings. Dead strings kill your tone and sustain.',
        category: 'Gear',
        highlight: 'Change your strings'
    },
    {
        id: '8',
        content: 'Understand the CAGED system to unlock the entire fretboard in any key.',
        category: 'Theory',
        highlight: 'CAGED system'
    },
    {
        id: '9',
        content: 'Alternate picking is efficient, but economy picking can be smoother for certain lines.',
        category: 'Technique',
        highlight: 'economy picking'
    },
    {
        id: '10',
        content: 'Don\'t just practice scales up and down. Create melodies with them.',
        category: 'Mindset',
        highlight: 'Create melodies'
    }
];
