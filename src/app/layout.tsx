import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Shynar Bolatova | Portfolio",
    template: "%s | Shynar Bolatova",
  },
  description:
    "Portfolio of Shynar Bolatova: selected projects, engineering experience and professional journey.",
  metadataBase: new URL("https://rsakhv.com"),
  openGraph: {
    title: "Shynar Bolatova | Portfolio",
    description:
      "Selected projects, engineering experience and professional journey.",
    url: "https://rsakhv.com",
    siteName: "Shynar Bolatova Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shynar Bolatova | Portfolio",
    description:
      "Selected projects, engineering experience and professional journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
