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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://catalogprime.web.app/", // Placeholder until custom domain
    siteName: "CatalogPrime",
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
