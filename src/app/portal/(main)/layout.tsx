import TopUtilityBar from "@/components/layout/TopUtilityBar";
import MainNavBar from "@/components/layout/MainNavBar";
import PortalSidebar from "@/components/portal/PortalSidebar";
import Footer from "@/components/layout/Footer"; // Assuming we want footer here? Screenshot didn't show it but good to have?
// No, user said "the account page we need to replicate... analys this attatchement". Attachement has header, sidebar, content. No footer specificied but usually dashboard has one.
// Standard B2B dashboards often have a simplified footer or none.
// My previous POA said "I will omit (the marketing footer)". So let's OMIT it.

import { InquiryProvider } from "@/context/InquiryContext";
import PortalAuthGuard from "@/components/auth/PortalAuthGuard";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InquiryProvider>
      <PortalAuthGuard>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* HEADER SECTION (Sticky?) */}
          <div className="sticky top-0 z-50 bg-white border-b border-industrial-200">
            {/* FULL CORNER BRAND BOX Logic - Simplified for dashboard? 
                 Actually the screenshot shows a standard header with "Berlin Packaging" logo.
                 So reusing the (site) logic is best. */}

            <div className="flex">
              <a
                href="/"
                className="hidden md:flex bg-berlin-red text-white w-56 shrink-0 flex-col items-center justify-center hover:bg-red-700 transition-all duration-300 group"
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
          </div>

          {/* MAIN CONTENT ROW */}
          <div className="flex flex-1">
            {/* SIDEBAR */}
            <PortalSidebar />

            {/* PAGE CONTENT */}
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
          </div>
        </div>
      </PortalAuthGuard>
    </InquiryProvider>
  );
}
