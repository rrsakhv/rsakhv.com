import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-about-text",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Ruslan Sakhanov | Portfolio",
    template: "%s | Ruslan Sakhanov",
  },
  description:
    "Portfolio of Ruslan Sakhanov: selected projects, engineering experience and professional journey.",
  metadataBase: new URL("https://rsakhv.com"),
  openGraph: {
    title: "Ruslan Sakhanov | Portfolio",
    description:
      "Selected projects, engineering experience and professional journey.",
    url: "https://rsakhv.com",
    siteName: "Ruslan Sakhanov Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruslan Sakhanov | Portfolio",
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
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
