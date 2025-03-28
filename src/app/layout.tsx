import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PokemonProvider } from "@/context/PokemonContext";

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
  title: "Pokédex",
  description: "your the best Pokédex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
