import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://guitarscale-livid.vercel.app';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/practice`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/songs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/dashboard`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8, // Protected but often main entry for users
        },
    ];
}
