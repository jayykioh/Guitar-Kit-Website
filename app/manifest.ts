import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'GuitArt - Interactive Guitar Learning',
        short_name: 'GuitArt',
        description: 'Master the fretboard with interactive tools and backing tracks.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#10B981',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
