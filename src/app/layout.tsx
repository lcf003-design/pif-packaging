import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthContext";
import { InquiryProvider } from "@/context/InquiryContext";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pifpackaging.com"),
  title: {
    template: "%s | PIF Packaging",
    default: "PIF Packaging | Industrial Manufacturing & Supply",
  },
  description:
    "Global manufacturer and distributor of industrial packaging and PPE.",
  icons: {
    icon: "/icon.png?v=2", // Cache buster
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pifpackaging.com/",
    siteName: "PIF Packaging",
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
        <InquiryProvider>
          <AuthProvider>
            <Analytics />
            {children}
            <Toaster position="bottom-right" />
          </AuthProvider>
        </InquiryProvider>
      </body>
    </html>
  );
}
