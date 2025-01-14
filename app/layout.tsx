import "./globals.css";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

const league = League_Spartan({
  variable: "--font-league",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kontas",
  description: "The best framework for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${league.variable} antialiased`}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
