"use client";

import { useEffect, useState } from "react";
import { getUserInquiries } from "@/services/inquiryService";
import { useAuth } from "@/context/AuthContext";
import { Inquiry } from "@/types";
import { Package, Clock, CalendarDays, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function MyInquiriesPage() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user?.email) return;
      try {
        const data = await getUserInquiries(user.email);
        setInquiries(data);
      } catch (error) {
        console.error("Failed to load user inquiries", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const statusConfig = {
    new: {
      label: "Request Received",
      color: "bg-blue-50 text-blue-600 border-blue-100",
      dot: "bg-blue-500",
    },
    contacted: {
      label: "In Review",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100",
      dot: "bg-yellow-500",
    },
    quoted: {
      label: "Quoted",
      color: "bg-purple-50 text-purple-600 border-purple-100",
      dot: "bg-purple-500",
    },
    closed: {
      label: "Completed",
      color: "bg-green-50 text-green-600 border-green-100",
      dot: "bg-green-500",
    },
  };

  if (loading)
    return (
      <div className="p-12 text-center text-slate-500">
        Loading your history...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Quote Requests</h1>
        <p className="text-slate-500 mt-2">
          Track the status of your sourcing inquiries.
        </p>
      </div>

      {inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            const status = statusConfig[inq.status || "new"];
            return (
              <div
                key={inq.id}
                className="bg-white border border-slate-200 rounded-xl p-6 transition-all hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {inq.id?.slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="w-4 h-4" />
                    {inq.submittedAt?.seconds
                      ? formatDistanceToNow(
                          new Date(inq.submittedAt.seconds * 1000),
                          { addSuffix: true },
                        )
                      : "Just now"}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg hidden sm:block">
                    <Package className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {inq.items.length} Item{inq.items.length !== 1 ? "s" : ""}{" "}
                      Requested
                    </h3>
                    <div className="text-sm text-slate-600 space-y-1">
                      {inq.items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between border-b last:border-0 border-slate-100 py-1"
                        >
                          <span>{item.product.name}</span>
                          <span className="font-medium text-slate-900">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">
            No Inquiries Found
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            You haven't submitted any quote requests yet. Browse our catalog to
            get started.
          </p>
          <a
            href="/markets"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Browse Catalog
          </a>
        </div>
      )}
    </div>
  );
}
