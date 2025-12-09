import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Kris Chase",
  description: "Engineering leadership, platform modernization, team scaling, and building products that last.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

