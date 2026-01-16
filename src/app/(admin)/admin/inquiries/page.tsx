"use client";

import { useEffect, useState } from "react";
import {
  getAllInquiries,
  updateInquiryStatus,
} from "@/services/inquiryService";
import { Inquiry } from "@/types";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllInquiries();
        setInquiries(data);
      } catch (error) {
        console.error("Failed to load inquiries", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter Logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sort: New first
  const sortedInquiries = filteredInquiries.sort((a, b) => {
    if (a.status === "new" && b.status !== "new") return -1;
    if (a.status !== "new" && b.status === "new") return 1;
    return 0;
  });

  const handleExportCSV = () => {
    // 1. Define Headers
    const headers = [
      "ID",
      "Status",
      "Customer Name",
      "Email",
      "Company",
      "Items",
      "Submitted At",
    ];

    // 2. Format Rows
    const rows = sortedInquiries.map((inq) => [
      inq.id || "N/A",
      inq.status || "new",
      `"${inq.customer.name}"`, // Quote to handle commas in names
      inq.customer.email,
      `"${inq.customer.company}"`,
      inq.items.length,
      inq.submittedAt?.seconds
        ? new Date(inq.submittedAt.seconds * 1000).toISOString()
        : "N/A",
    ]);

    // 3. Combine
    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    // 4. Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inquiries_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading)
    return (
      <div className="p-12 text-center text-slate-500">
        Loading Inquiry Board...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Inquiry Board
          </h1>
          <p className="text-slate-500">
            Manage incoming quote requests and leads.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white border border-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                <th className="px-6 py-4 font-bold text-slate-700">Customer</th>
                <th className="px-6 py-4 font-bold text-slate-700">Company</th>
                <th className="px-6 py-4 font-bold text-slate-700">Items</th>
                <th className="px-6 py-4 font-bold text-slate-700">
                  Submitted
                </th>
                <th className="px-6 py-4 font-bold text-slate-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedInquiries.length > 0 ? (
                sortedInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      {inq.id && <StatusDropdown inquiry={inq} />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">
                        {inq.customer.name}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {inq.customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                          {inq.customer.company.substring(0, 2)}
                        </div>
                        <span className="font-medium text-slate-700">
                          {inq.customer.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {inq.items.length} Products
                      </div>
                      <div className="text-slate-500 text-xs truncate max-w-[150px]">
                        {inq.items.map((i) => i.product.name).join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {inq.submittedAt?.seconds
                          ? formatDistanceToNow(
                              new Date(inq.submittedAt.seconds * 1000),
                              { addSuffix: true }
                            )
                          : "Just now"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-300" />
                      </div>
                      <p>No inquiries found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {sortedInquiries.length} results</span>
        </div>
      </div>
    </div>
  );
}

function StatusDropdown({ inquiry }: { inquiry: Inquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(inquiry.status || "new");

  const statusConfig = {
    new: {
      label: "New Lead",
      color: "bg-blue-50 text-blue-600 border-blue-100",
      dot: "bg-blue-500",
    },
    contacted: {
      label: "Contacted",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100",
      dot: "bg-yellow-500",
    },
    quoted: {
      label: "Quoted",
      color: "bg-purple-50 text-purple-600 border-purple-100",
      dot: "bg-purple-500",
    },
    closed: {
      label: "Closed",
      color: "bg-green-50 text-green-600 border-green-100",
      dot: "bg-green-500",
    },
  };

  const handleUpdate = async (status: string) => {
    setCurrentStatus(status as any);
    setIsOpen(false);
    if (inquiry.id) {
      await updateInquiryStatus(inquiry.id, status as any);
    }
  };

  const current =
    statusConfig[currentStatus as keyof typeof statusConfig] ||
    statusConfig.new;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all hover:brightness-95 ${current.color}`}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
        {current.label}
        <ChevronDown className="w-3 h-3 opacity-50" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleUpdate(key)}
                className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                {config.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
