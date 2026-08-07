import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PulseBoard | Next.js Learning SaaS",
    template: "%s | PulseBoard",
  },
  description:
    "Production-grade Next.js App Router learning project covering SSR, SSG, ISR, CSR, API routes, auth, middleware, and performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global providers belong in root layout so state survives route transitions. */}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
