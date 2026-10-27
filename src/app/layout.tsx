import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Weblog',
    template: '%s | Weblog',
  },
  description: 'A modern, fast weblog built with Next.js and MDX. Write in Markdown, deploy to GitHub Pages.',
  keywords: ['blog', 'weblog', 'nextjs', 'mdx', 'markdown', 'writing'],
  authors: [{ name: 'Author' }],
  creator: 'Author',
  publisher: 'Weblog',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourusername.github.io/weblog',
    siteName: 'Weblog',
    title: 'Weblog',
    description: 'A modern, fast weblog built with Next.js and MDX.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Weblog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weblog',
    description: 'A modern, fast weblog built with Next.js and MDX.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="alternate" type="application/rss+xml" title="Weblog RSS Feed" href="/rss.xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-20" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}