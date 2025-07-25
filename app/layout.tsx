import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/components/header-nav";
import Footer from "@/layouts/components/footer-nav";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased overflow-x-hidden"
      >
        <Header />
        <main className="flex-1 flex flex-col mt-[8rem]">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
