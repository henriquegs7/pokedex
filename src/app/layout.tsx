import type { Metadata } from "next";
import { PokemonProvider } from "@/context/PokemonContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Melhor escolha do deu dia!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
