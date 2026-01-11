"use client";

import React, { useState, useEffect } from "react";
import { Eye, FileText, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/services/authService";
import { getRecentlyViewed, RecentlyViewedItem } from "@/services/userService";

export default function RecentlyViewedPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getRecentlyViewed(user.uid);
      setItems(data);
    } catch (error) {
      console.error("Failed to load recently viewed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToQuote = (sku: string) => {
    alert(`SKU [${sku}] added to your active Inquiry Draft.`);
  };

  if (loading) {
    return (
      <div className="p-12 flex justify-center text-industrial-400">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-industrial-900 uppercase">
            Recently Viewed
          </h1>
          <p className="text-industrial-500 text-sm mt-1">
            Items you've looked at in the last 30 days.
          </p>
        </div>
      </div>

      {!user ? (
        <div className="bg-yellow-50 p-6 rounded-sm border border-yellow-200 text-yellow-800">
          Please log in to see your recently viewed items.
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-white border border-industrial-100 rounded-sm">
          <p className="text-industrial-500 mb-4">
            No recently viewed items yet.
          </p>
          <Link
            href="/products"
            className="text-berlin-blue font-bold hover:underline"
          >
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.sku}
              className="bg-white border border-industrial-200 rounded-sm p-4 hover:border-berlin-blue transition-colors group flex flex-col"
            >
              <div
                className={`w-full aspect-[3/4] ${
                  item.imageColor || "bg-gray-100"
                } rounded-sm mb-4 relative overflow-hidden flex items-center justify-center`}
              >
                <div className="text-industrial-300">
                  <Eye className="w-8 h-8" />
                </div>
              </div>

              <h3 className="font-bold text-industrial-900 text-sm mb-1 line-clamp-2 min-h-[40px]">
                {item.name}
              </h3>
              <p className="text-xs text-industrial-500 mb-4 font-mono">
                {item.sku}
              </p>

              <div className="mt-auto space-y-2">
                <button
                  onClick={() => handleAddToQuote(item.sku)}
                  className="w-full bg-industrial-900 text-white py-2 rounded-sm font-bold text-xs uppercase hover:bg-berlin-red transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-3 h-3" />
                  Add to Quote
                </button>
                <Link
                  href={`/products/${item.sku}`}
                  className="w-full flex items-center justify-center gap-1 border border-industrial-200 text-industrial-600 py-2 rounded-sm font-bold text-xs uppercase hover:border-berlin-blue hover:text-berlin-blue transition-colors"
                >
                  View Spec
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
