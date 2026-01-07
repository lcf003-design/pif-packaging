import type { Metadata } from "next";
import "./globals.css";
// import Navbar from "@/components/layout/Navbar"; // Replaced by new system
import TopUtilityBar from "@/components/layout/TopUtilityBar";
import MainNavBar from "@/components/layout/MainNavBar";
import Footer from "@/components/layout/Footer";
import { InquiryProvider } from "@/context/InquiryContext";

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
        <InquiryProvider>
          <div className="flex flex-col">
            <TopUtilityBar />
            <MainNavBar />
          </div>
          <main className="flex-grow">{children}</main>
          <Footer />
        </InquiryProvider>
      </body>
    </html>
  );
}
