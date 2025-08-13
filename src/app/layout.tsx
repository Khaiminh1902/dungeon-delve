import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dungeon Delve",
  description: "Embark on a thrilling adventure in the depths of the dungeon.",
};

import { Providers } from "./providers";
import PageTransition from "../components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-amber-50 relative overflow-x-hidden`}
      >
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900/20 via-transparent to-purple-900/30 animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"
            style={{ animationDuration: "3s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-32 right-16 w-24 h-24 bg-red-500/10 rounded-full blur-xl animate-pulse"
            style={{ animationDuration: "5s" }}
          ></div>
        </div>

        <div className="min-h-screen w-full relative z-10">
          <Providers>
            <PageTransition>{children}</PageTransition>
          </Providers>
        </div>
      </body>
    </html>
  );
}
