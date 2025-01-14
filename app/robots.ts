import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/*'],
                crawlDelay: 2
            }
        ],
        sitemap: 'https://kontas.id/sitemap.xml',
        host: 'https://kontas.id'
    }
}
