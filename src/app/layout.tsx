import type { Metadata } from 'next';
import { Barlow_Condensed, Manrope } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/content/site-config';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-barlow', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name, // page titles are built by src/lib/seo.ts and include the brand suffix
  description: 'Air Pro Solutions provides HVAC service across Southern California.', // TODO(copy): default for pages without their own
  icons: {
    icon: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: { images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }] },
  twitter: { card: 'summary_large_image', images: [siteConfig.ogImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${manrope.variable}`}>
      <body>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
