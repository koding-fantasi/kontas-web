import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://kontas.id',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1
        }
    ]
} 