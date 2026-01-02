import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Configuration
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://guitarscale-livid.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GuitArt | Interactive Guitar Learning Platform",
    template: "%s | GuitArt"
  },
  description: "Master the fretboard with interactive tools. Practice scales, modes, visualize patterns, and jam with backing tracks in a premium, focus-first environment.",
  keywords: ["guitar", "learning", "scales", "modes", "fretboard", "practice", "music theory", "interactive", "tools"],
  authors: [{ name: "GuitArt Team" }],
  creator: "GuitArt",
  publisher: "GuitArt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "GuitArt | Interactive Guitar Learning Platform",
    description: "Master the fretboard with interactive tools. Practice scales, modes, visualize patterns, and jam with backing tracks.",
    siteName: "GuitArt",
    images: [
      {
        url: "/og-image.jpg", // We should ensure this image exists or add a placeholder task
        width: 1200,
        height: 630,
        alt: "GuitArt Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GuitArt | Interactive Guitar Learning Platform",
    description: "Master the fretboard with interactive tools. Practice scales, modes, visualize patterns, and jam with backing tracks.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-page text-text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
