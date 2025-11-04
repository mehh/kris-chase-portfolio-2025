import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "90-Day Plan | VP of Engineering, Tithely — Kris Chase",
  description:
    "Kris Chase | 90-day plan for Tithely: focused on reliability, delivery speed, and building a strong engineering culture.",
  alternates: { canonical: "/tithely-90-day-plan" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
