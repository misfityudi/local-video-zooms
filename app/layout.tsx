import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { VideoProvider } from "@/contexts/VideoContext";
import { ZoomBlockProvider } from "@/contexts/ZoomBlockContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trupeer",
  description: "AI-Powered Product Videos & Docs in Minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ZoomBlockProvider>
          <VideoProvider>{children}</VideoProvider>
        </ZoomBlockProvider>
      </body>
    </html>
  );
}
