import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Biasanya path yg ga boleh diakses crawler
                disallow: [
                    '/api/',
                    '/admin/',
                    '/private/',
                    '/*.json$',
                ]
            }
        ],
        // Nanti bisa dibikin sitemap.xml
        sitemap: 'https://kontas.com/sitemap.xml',
        // Ganti dgn domain kamu nanti
        host: 'https://kontas.com'
    }
}
