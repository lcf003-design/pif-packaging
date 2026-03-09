"use client";

import React, { useEffect, useState } from "react";
import {
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "@/services/inquiryService";
import { UniversalInquiry } from "@/types";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Clock,
  Phone,
  Mail,
  Building2,
  MapPin,
  ClipboardList,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<UniversalInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const success = await deleteInquiry(id);
      if (success) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        if (expandedId === id) setExpandedId(null);
      } else {
        alert("Failed to delete inquiry.");
      }
    }
  };

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
      inq.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
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
      `"${inq.customer.firstName} ${inq.customer.lastName}"`,
      inq.customer.email,
      `"${inq.customer.company || "N/A"}"`,
      inq.sourceType,
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
      `inquiries_export_${new Date().toISOString().split("T")[0]}.csv`,
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm relative">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                <th className="px-6 py-4 font-bold text-slate-700">Customer</th>
                <th className="px-6 py-4 font-bold text-slate-700">Company</th>
                <th className="px-6 py-4 font-bold text-slate-700">Type</th>
                <th className="px-6 py-4 font-bold text-slate-700">Details</th>
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
                  <React.Fragment key={inq.id}>
                    <tr
                      className={`hover:bg-slate-50 transition-colors group cursor-pointer ${
                        expandedId === inq.id ? "bg-slate-50" : ""
                      }`}
                      onClick={() => inq.id && toggleExpand(inq.id)}
                    >
                      <td
                        className="px-6 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {inq.id && <StatusDropdown inquiry={inq} />}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">
                          {inq.customer.firstName} {inq.customer.lastName}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {inq.customer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                            {inq.customer.company
                              ? inq.customer.company.substring(0, 2)
                              : "-"}
                          </div>
                          <span className="font-medium text-slate-700">
                            {inq.customer.company || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {inq.sourceType === "wine_quote" && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-berlin-red/10 text-berlin-red">
                            Wine Quote
                          </span>
                        )}
                        {inq.sourceType === "custom_closure" && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            Custom Closure
                          </span>
                        )}
                        {inq.sourceType === "general_contact" && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            General Info
                          </span>
                        )}
                        {inq.sourceType === "product_inquiry" && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                            Product Inquiry
                          </span>
                        )}
                        {inq.sourceType === "truckload_quote" && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            Truckload Quote
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-500 text-xs truncate max-w-[150px]">
                          {inq.sourceType === "product_inquiry" &&
                          inq.payload.items
                            ? `${inq.payload.items.length} Products`
                            : inq.sourceType === "general_contact"
                              ? inq.payload.message
                              : inq.sourceType === "truckload_quote"
                                ? inq.payload.details
                                : "Custom Quote Request"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {inq.submittedAt?.seconds
                            ? formatDistanceToNow(
                                new Date(inq.submittedAt.seconds * 1000),
                                { addSuffix: true },
                              )
                            : "Just now"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => inq.id && handleDelete(inq.id, e)}
                            className="p-1.5 text-slate-400 hover:text-berlin-red hover:bg-red-50 flex items-center justify-center rounded transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-5 h-5 pointer-events-none" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center rounded transition-colors">
                            {expandedId === inq.id ? (
                              <ChevronUp className="w-5 h-5 pointer-events-none" />
                            ) : (
                              <ChevronDown className="w-5 h-5 pointer-events-none" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Detail Row */}
                    <AnimatePresence>
                      {expandedId === inq.id && (
                        <tr className="bg-slate-50 border-b-0">
                          <td colSpan={7} className="p-0">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-8 border-t border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                  {/* Customer Contact Card */}
                                  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                      <ClipboardList className="w-4 h-4" /> Lead
                                      Data
                                    </h4>
                                    <div className="space-y-3">
                                      <div className="flex items-start gap-3 text-sm">
                                        <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 break-all">
                                          {inq.customer.email}
                                        </span>
                                      </div>
                                      <div className="flex items-start gap-3 text-sm">
                                        <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span className="text-slate-700">
                                          {inq.customer.phone ||
                                            "No phone provided"}
                                        </span>
                                      </div>
                                      <div className="flex items-start gap-3 text-sm">
                                        <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span className="text-slate-700">
                                          {inq.customer.company ||
                                            "No company provided"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Inquiry Specific Payload */}
                                  <div className="md:col-span-2 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                      <ClipboardList className="w-4 h-4" />{" "}
                                      Submission Details
                                    </h4>

                                    {inq.sourceType === "general_contact" && (
                                      <div className="prose prose-sm max-w-none text-slate-700">
                                        <p className="whitespace-pre-wrap">
                                          {inq.payload.message}
                                        </p>
                                      </div>
                                    )}

                                    {inq.sourceType === "wine_quote" && (
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Company Size
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {inq.payload.companySize || "N/A"}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Order Volume
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {inq.payload.orderVolume || "N/A"}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Target Application
                                          </span>
                                          <span className="text-slate-900 font-medium capitalize">
                                            {inq.payload.application || "N/A"}
                                          </span>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />{" "}
                                            Shipping Location
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {inq.payload.address || ""}{" "}
                                            {inq.payload.zipCode
                                              ? `(${inq.payload.zipCode})`
                                              : "N/A"}
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {inq.sourceType === "custom_closure" && (
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Project Name
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {inq.payload.projectName || "N/A"}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Volume
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {inq.payload.volume || "N/A"}
                                          </span>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Requirements
                                          </span>
                                          <p className="text-slate-900 whitespace-pre-wrap">
                                            {inq.payload.requirements ||
                                              "None specified."}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {inq.sourceType === "truckload_quote" && (
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Project Timeframe
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {inq.payload.projectTimeframe ||
                                              "N/A"}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Annual Volume
                                          </span>
                                          <span className="text-slate-900 font-medium whitespace-nowrap">
                                            {inq.payload.annualVolume || "N/A"}
                                          </span>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />{" "}
                                            Shipping Destination
                                          </span>
                                          <span className="text-slate-900 font-medium">
                                            {[
                                              inq.payload.address,
                                              inq.payload.city,
                                              inq.payload.state,
                                              inq.payload.zipCode,
                                              inq.payload.country,
                                            ]
                                              .filter(Boolean)
                                              .join(", ") || "N/A"}
                                          </span>
                                        </div>
                                        <div className="col-span-2 mt-2">
                                          <span className="block text-xs text-slate-400 mb-1">
                                            Project Details
                                          </span>
                                          <p className="text-slate-900 whitespace-pre-wrap bg-slate-50 p-4 border border-slate-100 rounded-lg">
                                            {inq.payload.details ||
                                              "No details provided."}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {inq.sourceType === "product_inquiry" && (
                                      <div className="space-y-3">
                                        {inq.payload.items?.map(
                                          (item: any, idx: number) => (
                                            <div
                                              key={idx}
                                              className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100"
                                            >
                                              <div className="font-medium text-slate-900">
                                                {item.productName}
                                              </div>
                                              <div className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">
                                                {item.sku}
                                              </div>
                                            </div>
                                          ),
                                        )}
                                        {inq.payload.message && (
                                          <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 italic border border-slate-100">
                                            "{inq.payload.message}"
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
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

function StatusDropdown({ inquiry }: { inquiry: UniversalInquiry }) {
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
