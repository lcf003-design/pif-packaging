"use client";

import { useInquiry } from "@/context/InquiryContext";
import { Trash2, Send, CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { submitInquiry } from "@/services/inquiryService";

export default function InquiryPage() {
  const { items, removeItem, clearInquiry } = useInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const success = await submitInquiry({
      items,
      customer: {
        name: formData.get("name") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        phone: "", // Placeholder, add field if needed
      },
    });

    setLoading(false);
    if (success) {
      setSubmitted(true);
      clearInquiry();
    } else {
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-industrial-900 mb-4">
          Request Received
        </h1>
        <p className="text-industrial-600 mb-8">
          Your inquiry has been routed to our structural engineering team. A
          representative will review your selected SKUs and contact you within
          24 hours with a formal quote.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-industrial-900 text-white font-bold rounded hover:bg-industrial-800 transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto w-16 h-16 bg-industrial-100 rounded-full flex items-center justify-center mb-6">
          <Package className="w-8 h-8 text-industrial-400" />
        </div>
        <h1 className="text-2xl font-bold text-industrial-900 mb-2">
          Your Inquiry Bundle is Empty
        </h1>
        <p className="text-industrial-500 mb-8">
          Start adding products to request a quote.
        </p>
        <Link
          href="/products"
          className="text-action font-bold hover:underline"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-industrial-900 mb-8">
        Project Inquiry (Quote Request)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-industrial-200 rounded-sm">
            <div className="bg-industrial-50 px-6 py-3 border-b border-industrial-200 font-bold text-xs uppercase tracking-wider text-industrial-600 flex justify-between">
              <span>Product Details</span>
              <span>Quantity</span>
            </div>
            <div>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-6 border-b border-industrial-100 last:border-0 flex flex-col md:flex-row gap-6 hover:bg-industrial-50/30 transition-colors"
                >
                  <div className="w-20 h-24 bg-industrial-50 flex-shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-industrial-900">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-industrial-400 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-industrial-500 mb-1">
                      SKU: {item.product.sku}
                    </p>
                    <p className="text-sm text-industrial-500 mb-4">
                      {item.product.material} • {item.product.neckFinish}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-industrial-100 px-3 py-1 rounded text-sm font-mono font-bold">
                      {item.quantity} units
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={clearInquiry}
              className="text-sm text-industrial-500 hover:text-red-600 underline"
            >
              Clear All Items
            </button>
          </div>
        </div>

        {/* Submission Form */}
        <div className="lg:col-span-1">
          <div className="bg-industrial-900 text-white p-8 rounded-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Contact Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-3 text-white focus:outline-none focus:border-action"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-400 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-3 text-white focus:outline-none focus:border-action"
                  placeholder="ACME Corp"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-3 text-white focus:outline-none focus:border-action"
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-400 mb-1">
                  Project Notes
                </label>
                <textarea
                  name="notes"
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-3 text-white focus:outline-none focus:border-action h-24"
                  placeholder="Annual volume requirements, timeline, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 mt-4 font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center ${
                  loading
                    ? "bg-industrial-700 text-industrial-500"
                    : "bg-action hover:bg-action-hover text-white"
                }`}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Submit Request
                  </>
                )}
              </button>

              <p className="text-xs text-industrial-500 text-center mt-4">
                By submitting, you agree to our Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
