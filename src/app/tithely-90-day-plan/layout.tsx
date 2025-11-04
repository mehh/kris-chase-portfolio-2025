import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "90-Day Plan | VP of Engineering, Tithely — Kris Chase",
  description:
    "Kris Chase | 90-day plan for Tithely: focused on reliability, delivery speed, and building a strong engineering culture.",
  alternates: { canonical: "/tithely-90-day-plan" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
