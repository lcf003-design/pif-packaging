"use client";

import { useAuth } from "@/context/AuthContext";
import { getRecentlyViewed, RecentlyViewedItem } from "@/services/userService";
import { useEffect, useState } from "react";
import { Clock, Eye, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HistoryPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) return;
      try {
        const data = await getRecentlyViewed(user.uid);
        setItems(data);
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadHistory();
    }
  }, [user]);

  if (loading && !items.length) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading History...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recently Viewed</h1>
        <p className="text-gray-500 text-sm mt-1">
          Your browsing history from the last 30 days.
        </p>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No history found
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mt-2">
            Items you browse will show up here for easy access.
          </p>
          <Link
            href="/shop-all"
            className="inline-block mt-4 text-black font-medium hover:underline"
          >
            Browse Catalog &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.sku}
              href={`/product/${item.sku}`} // Assuming SKU maps to ID for now, ideally store ID
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Fallback Image Placeholder since we haven't stored image URLs yet */}
              <div className="aspect-square bg-gray-100 relative flex items-center justify-center">
                {/* 
                   In a real app, we'd store the image URL in RecentlyViewedItem. 
                   For now, using a placeholder logic.
                */}
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.viewedAt?.seconds
                    ? new Date(
                        item.viewedAt.seconds * 1000,
                      ).toLocaleDateString()
                    : "Just now"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
