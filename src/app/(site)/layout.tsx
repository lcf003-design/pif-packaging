import TopUtilityBar from "@/components/layout/TopUtilityBar";
import MainNavBar from "@/components/layout/MainNavBar";
import Footer from "@/components/layout/Footer";
import { InquiryProvider } from "@/context/InquiryContext";
import { InquirySidebar } from "@/components/layout/InquirySidebar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InquiryProvider>
      <div className="flex bg-white relative z-50">
        {/* FULL CORNER BRAND BOX - Replicating the logic from the original layout */}
        <a
          href="/"
          className="bg-berlin-red text-white w-56 shrink-0 hidden md:flex flex-col items-center justify-center hover:bg-red-700 transition-all duration-300 z-50 group"
        >
          <span className="relative font-black text-6xl leading-none tracking-tighter group-hover:scale-110 transition-transform duration-300 ease-out">
            PIF
            <span className="absolute top-1 -right-5 text-[0.6rem] font-bold tracking-normal opacity-80">
              TM
            </span>
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
  );
}
