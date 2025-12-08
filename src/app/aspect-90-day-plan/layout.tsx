import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "90-Day Plan | VP of Engineering, Aspect Software",
  description:
    "How I'd lead modernization, reliability, and velocity as VP of Engineering at Aspect Software over the first 90 days.",
  alternates: { canonical: "/aspect-90-day-plan" },
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

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

