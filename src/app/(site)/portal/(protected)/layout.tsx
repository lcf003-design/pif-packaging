"use client";

import PortalAuthGuard from "@/components/auth/PortalAuthGuard";
import PortalSidebar from "@/components/portal/PortalSidebar";

export default function ProtectedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalAuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <PortalSidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto w-full">
          {children}
        </div>
      </div>
    </PortalAuthGuard>
  );
}
