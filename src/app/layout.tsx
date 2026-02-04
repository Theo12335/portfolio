import type { Metadata, Viewport } from "next";
import { Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import InteractiveStarryBg from "@/app/components/stars";
import SmoothScroll from "@/app/components/smooth-scroll";

// Configure Playfair Display with display swap for better performance
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

// Keep Geist_Mono with display swap
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020617',
};

export const metadata: Metadata = {
  title: "Theodore Romeo Bascon | Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in Next.js, React, and TypeScript. Building high-performance web applications with modern technologies. View my projects and get in touch.",
  keywords: ["Full Stack Developer", "Next.js", "React", "TypeScript", "Web Developer", "Software Engineer", "Portfolio"],
  authors: [{ name: "Theodore Romeo Bascon" }],
  creator: "Theodore Romeo Bascon",
  metadataBase: new URL('https://theobascon.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: "Theodore Romeo Bascon | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, and TypeScript. Building high-performance web applications.",
    siteName: "Theo's Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Theodore Romeo Bascon | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, and TypeScript.",
    creator: "@rhoetheo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch and preconnect for external resources */}
        <link rel="dns-prefetch" href="https://hubspot-credentials-na1.s3.amazonaws.com" />
        <link rel="preconnect" href="https://hubspot-credentials-na1.s3.amazonaws.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://drive.google.com" />
        {/* Optimize rendering */}
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        suppressHydrationWarning
        className={`
          ${playfair.variable}
          ${geistMono.variable}
          font-sans
          bg-gradient-to-br
          from-[#020617] from-[0%]
          via-[#0c1929] via-[50%]
          to-[#0a192f] to-[100%]
          bg-fixed
        `}
      >
        <InteractiveStarryBg />
        <SmoothScroll>
          <main className="relative z-[1]">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}