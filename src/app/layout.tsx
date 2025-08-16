import type { Metadata } from "next";
import { Chakra_Petch, Questrial } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import LeftSidebar from '../components/Header';
import SiteHeader from '../components/SiteHeader';
// import ThemeToggle from '../components/ThemeToggle'; // Temporarily disabled
import Footer from '../components/Footer';
import Saver from '../components/Saver';
import { JsonLd } from '../components/JsonLd';
import TargetCursor from '../components/TargetCursor';
import GridScrollBackground from '../components/GridScrollBackground';
import MachineOverlay from '../components/machine/MachineOverlay';
import MachineToggle from '../components/machine/MachineToggle';
import Script from "next/script";
// import SplashScreen from "../components/SplashScreen"; // Temporarily disabled
import PageTransition from "../components/PageTransition";
import InitialKCSplash from "../components/InitialKCSplash";

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
  description: "With 20+ years programming and 10+ years leading teams, I build products that last—from smart, app‑enabled devices to ecommerce doing $100M+/yr and SaaS serving thousands of concurrent users. 65+ engineers led, 100+ launches.",
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
    description: "From smart devices to $100M+/yr ecommerce and SaaS with thousands of concurrent users. 65+ engineers led, 100+ launches.",
    url: 'https://krischase.com',
    siteName: 'Kris Chase Portfolio',
    images: ['/images/KrisChase-OG.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kris Chase | Ship Faster, Scale Safely, Cut Delivery Costs",
    description: "From smart devices to $100M+/yr ecommerce and SaaS with thousands of concurrent users. 65+ engineers led, 100+ launches.",
    images: ['/images/KrisChase-OG.png'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        {/* Pre-hydration theme fix to avoid white flash */}
        <Script id="no-fouc-theme" strategy="beforeInteractive">
          {`
            try {
              var t = (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'dark';
              if (t === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              document.documentElement.classList.add('dark');
            }
          `}
        </Script>
        {/* Initial KC splash overlay */}
        <InitialKCSplash />
        {/* Route-change KC overlay */}
        <PageTransition />
        <JsonLd />
        {/* Global animated grid background */}
        <GridScrollBackground />
        <div id="__app-root">
          <Providers>
            <SiteHeader />
            <LeftSidebar />
            {/* <ThemeToggle /> */}
            <main className="relative z-10 min-h-[100dvh] pl-12 sm:pl-16 md:pl-20 lg:pl-0">
              {children}
            </main>
            <Footer />
            {/* Machine View */}
            <MachineOverlay />
            <MachineToggle />
          </Providers>
          <Saver />
          {/* Target Cursor */}
          <TargetCursor 
            targetSelector={"a, button, .cursor-target, [role='button']"}
            spinDuration={6}
            hideDefaultCursor={true}
          />
        </div>
      </body>
    </html>
  );
}
