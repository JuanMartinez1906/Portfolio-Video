import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Martinez — Video Editor",
  description:
    "Video editor specializing in short-form vertical content, creator content, and Meta Ad creatives. 1.7M+ followers built through the power of editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="font-grotesk antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
