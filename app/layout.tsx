import "./globals.css";
import type { Metadata, Viewport } from "next";
import { League_Spartan } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

const league = League_Spartan({
  variable: "--font-league",
  subsets: ["latin"],
});

// Metadata utama
export const metadata: Metadata = {
  metadataBase: new URL('https://kontas.id'),
  
  // Basic metadata
  title: {
    default: 'Kontas - The Server Framework that Anyone Can Master',
    template: '%s | Kontas Framework'
  },
  description: 'Kontas adalah framework server minimalis berbasis Bun yg fokus pd kesederhanaan, performa tinggi & pengalaman developer yg menyenangkan. Dibuat utk developer modern dgn syntax yg simpel & dokumentasi lengkap.',
  
  // Keywords berdasarkan fitur & teknologi
  keywords: [
    'kontas', 'bun framework', 'typescript framework',
    'server framework', 'web server', 'api framework',
    'file-based routing', 'hot reload', 'developer experience',
    'high performance', 'minimalist framework', 'modern framework'
  ],
  
  // Info framework
  generator: 'Kontas Framework',
  applicationName: 'Kontas',
  
  // Referrer policy
  referrer: 'origin-when-cross-origin',
  
  // Authors & creator
  authors: [
    { name: 'Hendy Mamusung', url: 'https://kontas.id' }
  ],
  creator: 'Hendy Mamusung',
  
  // Category
  category: 'Technology',

  // Open Graph - sesuai landing page
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://kontas.id',
    siteName: 'Kontas Framework',
    title: 'Kontas - The Server Framework that Anyone Can Master',
    description: 'Framework server minimalis berbasis Bun dgn fokus pd kesederhanaan, performa tinggi & developer experience yg menyenangkan.',
    images: [
      {
        url: '/og-banner.png', // Banner utama dgn preview code & fitur
        width: 1200,
        height: 630,
        alt: 'Kontas Framework Preview'
      },
      {
        url: '/og-logo.png',  // Logo Kontas dgn gradient
        width: 600,
        height: 600,
        alt: 'Kontas Framework Logo'
      }
    ],
  },

  // Twitter card - sesuai branding
  twitter: {
    card: 'summary_large_image',
    title: 'Kontas - The Server Framework that Anyone Can Master',
    description: 'Framework server minimalis berbasis Bun dgn fokus pd kesederhanaan & developer experience.',
    images: ['/twitter-banner.png'], // Banner khusus twitter
    creator: '@KontasFramework'
  },

  // Icons - sesuai brand colors
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },

  // Web manifest
  manifest: '/manifest.json',

  // Canonical URL
  alternates: {
    canonical: 'https://kontas.id'
  }
};

// Viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${league.variable} antialiased`}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
