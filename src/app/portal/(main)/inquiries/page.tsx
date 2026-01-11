"use client";

import React from "react";
import Link from "next/link";
import { Package, Search, Filter, Download } from "lucide-react";

// Mock Data for "Larry Fields"
const MOCK_INQUIRIES = [
  {
    id: "INQ-2026-0891",
    date: "Oct 12, 2026",
    status: "Under Review",
    total: "Pending Quote",
    items: "5 Specs",
    po: "Proj-Summer-26",
  },
  {
    id: "INQ-2026-0742",
    date: "Sep 28, 2026",
    status: "Quoted",
    total: "$8,200.00 (Est)",
    items: "2 Specs",
    po: "Proj-Restock-Q3",
  },
  {
    id: "INQ-2026-0511",
    date: "Aug 15, 2026",
    status: "Production",
    total: "$24,100.00",
    items: "12 Specs",
    po: "PO-9100-Official",
  },
  {
    id: "INQ-2026-0102",
    date: "Jun 02, 2026",
    status: "Delivered",
    total: "$5,600.00",
    items: "3 Specs",
    po: "PO-8221",
  },
];

const STATUS_Styles = {
  "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
  Quoted: "bg-purple-50 text-purple-700 border-purple-200",
  "PO Pending": "bg-orange-50 text-orange-700 border-orange-200",
  Production: "bg-industrial-900 text-white border-industrial-900",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function InquiryLogPage() {
  return (
    <div className="w-full h-full p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-industrial-900 uppercase">
            Inquiry & Quote Log
          </h1>
          <p className="text-industrial-500 text-sm mt-1">
            Track active quotes, RFQs, and production runs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const headers = [
                "Inquiry ID",
                "Date",
                "Status",
                "Est Total",
                "Items",
                "Project Ref",
              ];
              const rows = MOCK_INQUIRIES.map((o) => [
                o.id,
                o.date,
                o.status,
                o.total,
                o.items,
                o.po,
              ]);
              const csvContent = [headers, ...rows]
                .map((e) => e.join(","))
                .join("\n");
              const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
              });
              const link = document.createElement("a");
              if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "inquiry_log.csv");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 rounded-sm text-sm font-bold text-industrial-600 hover:border-berlin-red hover:text-berlin-red transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Log</span>
          </button>

          <Link
            href="/products"
            className="flex items-center gap-2 px-4 py-2 bg-berlin-red text-white border border-berlin-red rounded-sm text-sm font-bold hover:bg-black hover:border-black transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>New Inquiry</span>
          </Link>
        </div>
      </div>

      {/* Filters / Search */}
      <div className="bg-white p-4 rounded-sm border border-industrial-200 mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-industrial-400" />
          <input
            type="text"
            placeholder="Search by Inquiry #, Project Name, or SKU..."
            className="w-full pl-10 pr-4 py-2 border border-industrial-200 rounded-sm text-sm focus:outline-none focus:border-berlin-blue"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 rounded-sm text-sm font-medium text-industrial-600 hover:bg-white transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-sm shadow-sm border border-industrial-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-industrial-50 border-b border-industrial-200 text-xs uppercase tracking-widest text-industrial-500">
                <th className="p-4 font-bold">Inquiry ID</th>
                <th className="p-4 font-bold">Project Ref</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Est. Total</th>
                <th className="p-4 font-bold">Specs</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-100 text-sm">
              {MOCK_INQUIRIES.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="hover:bg-industrial-50/50 transition-colors group"
                >
                  <td className="p-4 font-bold text-berlin-blue hover:underline cursor-pointer">
                    {inquiry.id}
                  </td>
                  <td className="p-4 font-medium text-industrial-600">
                    {inquiry.po}
                  </td>
                  <td className="p-4 text-industrial-500">{inquiry.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        STATUS_Styles[
                          inquiry.status as keyof typeof STATUS_Styles
                        ]
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-industrial-900">
                    {inquiry.total}
                  </td>
                  <td className="p-4 text-industrial-500">{inquiry.items}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/portal/inquiries/${inquiry.id}`}
                      className="text-berlin-red font-bold hover:underline text-xs uppercase tracking-wide"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
