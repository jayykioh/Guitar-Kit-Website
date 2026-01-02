import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://guitarscale-livid.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/dashboard/', '/settings/', '/profile/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
