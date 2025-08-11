import type { Metadata } from "next";
import { Chakra_Petch, Questrial } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import LeftSidebar from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import Saver from '../components/Saver';
import { JsonLd } from '../components/JsonLd';

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
  title: "Kris Chase | Technical Leadership & Engineering Excellence",
  description: "I take startups from prototype to dependable product—and the team that ships it. Technical leadership, platform modernization, and delivery optimization for CTOs, founders, and engineering teams.",
  keywords: ["Technical Leadership", "CTO", "Engineering", "Startups", "Platform Architecture", "Team Building", "Delivery Optimization", "CI/CD", "Scale", "Innovation"],
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
    title: "Kris Chase | Technical Leadership & Engineering Excellence",
    description: "I take startups from prototype to dependable product—and the team that ships it. Technical leadership, platform modernization, and delivery optimization.",
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
    title: "Kris Chase | Technical Leadership & Engineering Excellence",
    description: "I take startups from prototype to dependable product—and the team that ships it. Technical leadership, platform modernization, and delivery optimization.",
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
        </div>
      </body>
    </html>
  );
}
