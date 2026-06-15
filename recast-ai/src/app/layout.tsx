import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RecastAI — Turn Any Content Into Every Format",
  description:
    "Paste a blog post, YouTube link, or podcast transcript. Get LinkedIn posts, Twitter threads, newsletters, and more — instantly, powered by AI.",
  keywords: ["AI content repurposing", "content marketing", "LinkedIn posts", "Twitter threads"],
  openGraph: {
    title: "RecastAI",
    description: "Turn any long-form content into every format, instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
