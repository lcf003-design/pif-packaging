import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
