import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Search,
  FileText,
  Clock,
} from "lucide-react";

// Status Steps for B2B Deal Flow
const INQUIRY_STEPS = [
  "Submitted",
  "Under Review",
  "Quote Ready",
  "PO Pending",
  "Production",
];

const STATUS_ICONS = {
  Submitted: CheckCircle,
  "Under Review": Search,
  "Quote Ready": FileText,
  "PO Pending": Clock,
  Production: Package,
};

// Mock Status for this demo (Change this to test different states)
const CURRENT_STATUS = "Under Review";

export default async function InquiryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Calculate Progress Logic
  const currentStepIndex = INQUIRY_STEPS.indexOf(CURRENT_STATUS);
  const progressWidth = (currentStepIndex / (INQUIRY_STEPS.length - 1)) * 100;

  return (
    <div className="w-full h-full p-8 max-w-5xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href="/portal/inquiries"
          className="flex items-center text-industrial-500 hover:text-berlin-red transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Inquiry Log
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-industrial-900 uppercase">
            Inquiry #{id}
          </h1>
          <p className="text-industrial-500 mt-1">
            Submitted on October 12, 2026 • Proj-Summer-26
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold uppercase text-xs tracking-wider">
            {CURRENT_STATUS}
          </span>
          <Link
            href="/products"
            className="px-6 py-2 bg-industrial-900 text-white rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-berlin-red transition-colors shadow-lg"
          >
            Clone / Re-Quote
          </Link>
        </div>
      </div>

      {/* Dynamic Progress Tracker */}
      <div className="bg-white border border-industrial-200 rounded-sm p-8 mb-8">
        <div className="relative flex justify-between">
          {/* Background Bar */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-industrial-100 -z-10 -translate-y-1/2" />

          {/* Active Progress Bar (Dynamic Width) */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-berlin-blue -z-10 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          />

          {/* Steps Logic */}
          {INQUIRY_STEPS.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = STATUS_ICONS[step as keyof typeof STATUS_ICONS];

            return (
              <div
                key={step}
                className="flex flex-col items-center gap-2 relative"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 z-10 ${
                    isCompleted
                      ? "bg-berlin-blue text-white"
                      : "bg-white border-2 border-industrial-200 text-industrial-300"
                  } ${isCurrent ? "ring-4 ring-blue-50" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-xs font-bold uppercase transition-colors ${
                    isCompleted ? "text-industrial-900" : "text-industrial-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content (Specs) */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-industrial-900 uppercase tracking-widest border-b border-industrial-200 pb-2">
            Specifications in Quote
          </h2>

          {/* Mock Items */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-white border border-industrial-200 rounded-sm"
            >
              <div className="w-20 h-20 bg-industrial-50 rounded-sm flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold text-industrial-900">
                  100ml PET Spray Bottle (Amber)
                </h4>
                <p className="text-sm text-industrial-500">
                  SKU: PET-100-AMB-SPR
                </p>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="font-medium text-industrial-700">
                    Est. Qty: 5,000
                  </span>
                  <span className="font-medium text-industrial-700">
                    Target Price: $0.45
                  </span>
                </div>
              </div>
              <div className="text-right font-bold text-industrial-900">
                PENDING
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar (Summary) */}
        <div className="space-y-6">
          <div className="bg-white border border-industrial-200 rounded-sm p-6">
            <h3 className="font-bold text-industrial-900 uppercase tracking-widest mb-4 text-sm">
              Quote Summary
            </h3>
            <p className="text-sm text-industrial-500 mb-4 italic">
              Pricing is being calculated by your account manager.
            </p>
            <div className="space-y-2 text-sm border-b border-industrial-100 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-industrial-600">Freight Profile</span>
                <span className="font-medium text-industrial-900">
                  LTL (Calculated)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-industrial-600">Tooling Cost</span>
                <span className="font-medium text-industrial-900">$0.00</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-black text-industrial-900">
              <span>Est. Total</span>
              <span>Pending</span>
            </div>
          </div>

          <div className="bg-white border border-industrial-200 rounded-sm p-6">
            <h3 className="font-bold text-industrial-900 uppercase tracking-widest mb-4 text-sm">
              Project Details
            </h3>
            <p className="text-sm font-bold text-industrial-900 mb-1">
              Larry Fields
            </p>
            <p className="text-sm text-industrial-600 mb-4">
              Fields Cosmetics, LLC
              <br />
              Project: Summer 2026 Launch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
