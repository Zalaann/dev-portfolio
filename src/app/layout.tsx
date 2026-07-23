import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const glasstty = localFont({
  src: "./fonts/Glass_TTY_VT220.ttf",
  variable: "--font-glasstty",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ibrahim Tariq · Portfolio",
  description:
    "Muhammad Ibrahim Tariq. Software engineer in Manchester. Cofounder at Intellectrax. Brutalist portfolio built with Next.js and Remotion.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={[
        geistSans.variable,
        geistMono.variable,
        spaceGrotesk.variable,
        jetbrains.variable,
        glasstty.variable,
      ].join(" ")}
    >
      <body className="min-h-screen bg-white text-black">{children}</body>
    </html>
  );
}
