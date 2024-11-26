import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
import localFont from '@next/font/local'

export const metadata: Metadata = {
  title: "Branch Name Generator",
  description: "Generate standardized branch names and commit messages",
  icons: {
    icon: "/favicon.ico",
  },
};

const Basel = localFont({
  src: [
    {
      path: "../public/fonts/Basel-Grotesk-Book.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Basel-Grotesk-Medium.woff2",
      weight: "400",
    }
  ],
  variable: "--font-basel",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Basel.variable} font-sans`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}