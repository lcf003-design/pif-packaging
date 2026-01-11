import React from "react";
import Link from "next/link";
import { Package } from "lucide-react";

export default function PortalDashboardPage() {
  return (
    <div className="w-full h-full p-8">
      {/* Welcome / Dashboard Header (Optional but good UX) */}
      {/* Screenshot didn't show a header here, just the card immediately. 
          But the tab is "Home". Let's stick to the card. */}

      <div className="bg-white rounded-sm shadow-sm border border-industrial-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        {/* Empty State Icon */}
        <div className="w-16 h-16 bg-industrial-50 rounded-full flex items-center justify-center mb-6">
          <Package className="w-8 h-8 text-industrial-400" />
        </div>

        <h3 className="text-xl font-bold text-industrial-800 mb-4">
          No Active Inquiries
        </h3>

        <p className="text-industrial-500 mb-8 max-w-md">
          <Link
            href="/products"
            className="text-berlin-blue hover:underline font-bold"
          >
            Click here
          </Link>{" "}
          to browse the specification library and request details.
        </p>

        <Link
          href="/products"
          className="bg-berlin-red text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20"
        >
          Start New Project
        </Link>
      </div>
    </div>
  );
}
