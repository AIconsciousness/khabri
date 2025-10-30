import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khabri - Your Trusted News Source",
  description: "Stay updated with the latest news from India and around the world. Breaking news, politics, sports, entertainment, technology, and more.",
  keywords: "news, breaking news, India news, world news, politics, sports, entertainment",
  authors: [{ name: "Khabri News" }],
  openGraph: {
    title: "Khabri - Your Trusted News Source",
    description: "Stay updated with the latest news from India and around the world.",
    type: "website",
    locale: "en_IN",
    siteName: "Khabri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khabri - Your Trusted News Source",
    description: "Stay updated with the latest news from India and around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
