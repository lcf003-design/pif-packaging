import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CatalogPrime",
    default: "CatalogPrime | Industrial Packaging Solutions",
  },
  description: "High-end B2B packaging showroom.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://catalogprime.web.app/",
    siteName: "PIF Packaging",
    images: [
      {
        url: "/pif-og-image.png",
        width: 1200,
        height: 630,
        alt: "PIF Packaging Global Network",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      suppressHydrationWarning={true}
    >
      <body
        className={`antialiased min-h-screen flex flex-col font-sans`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
