import type { Metadata } from "next";
import "./globals.css";
import TopUtilityBar from "@/components/layout/TopUtilityBar";
import MainNavBar from "@/components/layout/MainNavBar";
import Footer from "@/components/layout/Footer";
import { InquiryProvider } from "@/context/InquiryContext";
import { InquirySidebar } from "@/components/layout/InquirySidebar";

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
          <div className="flex bg-white relative z-50 border-b border-industrial-200">
            {/* FULL CORNER BRAND BOX */}
            <a
              href="/"
              className="bg-berlin-red text-white w-56 shrink-0 flex flex-col items-center justify-center hover:bg-red-700 transition-all duration-300 z-50 group"
            >
              <span className="font-black text-6xl leading-none tracking-tighter group-hover:scale-110 transition-transform duration-300 ease-out">
                PIF
              </span>
              <span className="text-base font-bold tracking-widest uppercase mt-1 group-hover:tracking-[0.2em] transition-all duration-300 ease-out">
                Packaging
              </span>
            </a>

            {/* RIGHT COLUMN: Utility + Nav */}
            <div className="flex flex-col flex-1 min-w-0">
              <TopUtilityBar />
              <MainNavBar />
            </div>
          </div>
          <main className="flex-grow">{children}</main>
          <InquirySidebar />
          <Footer />
        </InquiryProvider>
      </body>
    </html>
  );
}
