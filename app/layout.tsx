import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ToolAtlas — Your map to the AI ecosystem',
  description: 'Find the right AI tool fast with map and search.',
  icons: { icon: '/brand/toolatlas/symbol.svg', apple: '/brand/toolatlas/symbol.svg' },
  openGraph: { title: 'ToolAtlas', description: 'Your map to the AI ecosystem', images: ['/brand/toolatlas/og-cover.png'] }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
