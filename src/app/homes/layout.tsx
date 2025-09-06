import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homes | Precision Engineered, High Performance Homes",
  description: "Discover our climate-resilient, high-performance homes built with advanced manufacturing and environmentally responsible practices. Built to last 100 years with cutting-edge materials and processes.",
  keywords: ["High Performance Homes", "Climate Resilient", "Advanced Manufacturing", "Environmentally Responsible", "Precision Engineered", "Steel Frame Construction", "Passive House Standards"],
};

export default function HomesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
