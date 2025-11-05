import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "90-Day Plan | Head of Engineering, Handoff — Kris Chase",
  description:
    "Kris Chase | 90-day plan for Handoff: scaling the engineering org, increasing delivery speed, and strengthening reliability.",
  alternates: { canonical: "/handoff-90-day-plan" },
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
