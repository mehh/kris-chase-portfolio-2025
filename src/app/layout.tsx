import type { Metadata } from "next";
import { Chakra_Petch, Questrial } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import LeftSidebar from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import Saver from '../components/Saver';
import { JsonLd } from '../components/JsonLd';
import PixelTrail from '../components/fancy/background/pixel-trail';

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kris Chase | Ship Faster, Scale Safely, Cut Delivery Costs",
  description: "I take startups from prototype to dependable product—and the team that ships it. Unblock delivery, modernize platforms, and align product roadmaps. 60+ engineers led, 100+ launches, 30% delivery cost reduction.",
  keywords: ["Technical Leadership", "CTO Consultant", "Engineering Excellence", "Startup CTO", "Platform Modernization", "Delivery Optimization", "CI/CD", "Team Scaling", "Technical Diligence", "90-Day Turnarounds"],
  authors: [{ name: "Kris Chase" }],
  creator: "Kris Chase",
  publisher: "Kris Chase",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://krischase.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kris Chase | Ship Faster, Scale Safely, Cut Delivery Costs",
    description: "I take startups from prototype to dependable product—and the team that ships it. Unblock delivery, modernize platforms, align roadmaps. 60+ engineers led, 100+ launches.",
    url: 'https://krischase.com',
    siteName: 'Kris Chase Portfolio',
    images: [
      {
        url: '/api/og-image',
        width: 1200,
        height: 630,
        alt: 'Kris Chase - Technical Leadership & Engineering Excellence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kris Chase | Ship Faster, Scale Safely, Cut Delivery Costs",
    description: "I take startups from prototype to dependable product—and the team that ships it. Unblock delivery, modernize platforms, align roadmaps. 60+ engineers led, 100+ launches.",
    images: ['/api/og-image'],
    creator: '@krischase',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // You'll need to add this
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="kris">
      <body className={`${chakra.variable} ${questrial.variable} antialiased`}>
        <JsonLd />
        <div id="__app-root">
          <Providers>
            <LeftSidebar />
            <ThemeToggle />
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
            <Footer />
          </Providers>
          <Saver />
          {/* Pixel Trail Cursor Effect */}
          <div 
            className="fixed inset-0 pointer-events-none z-40"
            style={{ mixBlendMode: 'difference' }}
          >
            <PixelTrail
              pixelSize={16}
              fadeDuration={800}
              pixelClassName="bg-white"
              className="pointer-events-none"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
