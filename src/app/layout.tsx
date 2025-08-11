import type { Metadata } from "next";
import { Chakra_Petch, Questrial } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import LeftSidebar from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

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
  title: "Kris Chase – Portfolio",
  description: "Personal portfolio of Kris Chase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="kris">
      <body className={`${chakra.variable} ${questrial.variable} antialiased`}>
        <div id="__app-root">
          <Providers>
            <LeftSidebar />
            <ThemeToggle />
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
