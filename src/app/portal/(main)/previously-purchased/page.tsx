"use client";

import React, { useState, useEffect } from "react";
import { FileText, Repeat, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/services/authService";
import { getPastOrders, Order } from "@/services/userService";

export default function PastProductionsPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
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
      const data = await getPastOrders(user.uid);
      setOrders(data);
    } catch (error) {
      console.error("Failed to load past orders", error);
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
            Past Productions
          </h1>
          <p className="text-industrial-500 text-sm mt-1">
            Reference specs from your previous manufacturing runs.
          </p>
        </div>
      </div>

      {!user ? (
        <div className="bg-yellow-50 p-6 rounded-sm border border-yellow-200 text-yellow-800">
          Please log in to see your past productions.
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white border border-industrial-100 rounded-sm">
          <p className="text-industrial-500">No past productions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders
            .flatMap((order) =>
              order.items.map((item) => ({
                ...item,
                orderDate: order.date,
                orderId: order.id,
                status: order.status,
              }))
            )
            .map((item, idx) => (
              <div
                key={`${item.orderId}-${item.sku}-${idx}`}
                className="bg-white border border-industrial-200 rounded-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div
                  className={`w-full aspect-square bg-blue-50 rounded-sm mb-4 flex items-center justify-center relative overflow-hidden`}
                >
                  <Repeat className="w-12 h-12 text-industrial-300 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold uppercase text-industrial-500 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />{" "}
                    {item.status}
                  </div>
                </div>

                <h3 className="font-bold text-industrial-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-industrial-500 mb-4">
                  SKU: {item.sku}
                </p>

                <div className="flex items-center justify-between text-sm mb-4 border-t border-industrial-50 pt-3">
                  <span className="text-industrial-600">Last Run:</span>
                  <span className="font-bold text-industrial-900">
                    {item.orderDate}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToQuote(item.sku)}
                  className="w-full bg-industrial-900 text-white py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-berlin-red transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Add to Quote</span>
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
