"use client";

import React, { useState } from "react";
import { useInquiry } from "@/context/InquiryContext";
import Link from "next/link";
import { Trash2, ChevronLeft, Send, CheckCircle } from "lucide-react";

export default function QuotePage() {
  const { items, removeItem, clearInquiry, totalItems } = useInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Inquiry Submitted:", {
      customer: formData,
      items: items,
    });

    clearInquiry();
    setIsSuccess(true);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-industrial-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-12 text-center border-t-4 border-action shadow-lg rounded-sm">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-industrial-900 mb-4">
            Request Received
          </h1>
          <p className="text-industrial-600 mb-8 leading-relaxed">
            Thank you for your interest,{" "}
            <span className="font-semibold">{formData.name}</span>. We have
            received your inquiry for{" "}
            <span className="font-bold">{totalItems || "your"} items</span>. A
            dedicated account manager will review your specifications and
            contact you at{" "}
            <span className="font-mono text-industrial-800">
              {formData.email}
            </span>{" "}
            within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-block bg-industrial-900 text-white font-bold py-3 px-8 uppercase tracking-widest text-sm hover:bg-industrial-800 transition-colors"
          >
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-industrial-400 mb-4">
          Your Inquiry Bundle is Empty
        </h1>
        <p className="text-industrial-500 mb-8">
          Browse our catalog to add items to your quote request.
        </p>
        <Link
          href="/products"
          className="bg-berlin-blue text-white py-3 px-6 font-bold uppercase tracking-wider text-sm hover:bg-blue-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-industrial-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-industrial-200">
          <div>
            <div className="flex items-center text-xs text-industrial-500 uppercase tracking-widest mb-2 font-bold">
              <Link
                href="/products"
                className="hover:text-berlin-blue flex items-center"
              >
                <ChevronLeft className="w-3 h-3 mr-1" /> Continue Browsing
              </Link>
            </div>
            <h1 className="text-3xl font-black text-industrial-900 uppercase tracking-tight">
              Request for Quote
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <span className="text-sm font-medium text-industrial-500 block">
              Inquiry Bundle ID
            </span>
            <span className="font-mono text-industrial-900">
              #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-industrial-200 shadow-sm rounded-sm overflow-hidden">
              <div className="bg-industrial-100 px-6 py-3 border-b border-industrial-200 flex justify-between items-center">
                <h2 className="font-bold text-industrial-800 text-sm uppercase tracking-wider">
                  Selected Items ({items.length})
                </h2>
                <button
                  onClick={clearInquiry}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Clear All
                </button>
              </div>
              <div className="divide-y divide-industrial-100">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-6 flex gap-6 group hover:bg-industrial-50 transition-colors"
                  >
                    <div className="w-24 h-24 bg-industrial-50 border border-industrial-100 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-2 mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-berlin-blue uppercase tracking-widest mb-1 block">
                            {item.product.brand}
                          </span>
                          <h3 className="text-lg font-bold text-industrial-900 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-industrial-500 mb-2">
                            {item.product.material} •{" "}
                            {item.product.capacity
                              ? `${item.product.capacity.value}${item.product.capacity.unit}`
                              : ""}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-industrial-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <div className="bg-industrial-100 px-3 py-1 rounded text-industrial-700 font-medium">
                          Qty:{" "}
                          <span className="font-bold">{item.quantity}</span>{" "}
                          Units
                        </div>
                        <div className="text-xs text-industrial-400">
                          Min. Order: {item.product.caseQty || 1} Case
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-sm">
              <h3 className="text-berlin-blue font-bold mb-2 text-sm flex items-center">
                <span className="bg-berlin-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                  i
                </span>
                Wholesale Pricing Note
              </h3>
              <p className="text-sm text-blue-900 leading-relaxed">
                As a high-volume industrial supplier, we provide custom
                tier-based pricing. Submitting this quote request does not lock
                you into a purchase. Our team will return a formal proposal
                including freight estimates and lead times.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border-t-4 border-action shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-industrial-900 mb-6">
                Contact Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1 lg:col-span-2">
                    <label className="block text-xs font-bold text-industrial-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-industrial-300 px-4 py-2 text-sm focus:border-berlin-blue focus:ring-1 focus:ring-berlin-blue outline-none"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 lg:col-span-2">
                    <label className="block text-xs font-bold text-industrial-700 uppercase tracking-wider mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full border border-industrial-300 px-4 py-2 text-sm focus:border-berlin-blue focus:ring-1 focus:ring-berlin-blue outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-industrial-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-industrial-300 px-4 py-2 text-sm focus:border-berlin-blue focus:ring-1 focus:ring-berlin-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-industrial-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-industrial-300 px-4 py-2 text-sm focus:border-berlin-blue focus:ring-1 focus:ring-berlin-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-industrial-700 uppercase tracking-wider mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-industrial-300 px-4 py-2 text-sm focus:border-berlin-blue focus:ring-1 focus:ring-berlin-blue outline-none resize-none"
                    placeholder="Specific delivery requirements, closures needed, etc."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-action hover:bg-action-hover text-white font-bold py-4 uppercase tracking-wider text-sm transition-all flex items-center justify-center ${
                      isSubmitting ? "opacity-75 cursor-wait" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Submit Request <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-industrial-400 text-center mt-3">
                    By submitting this form, you agree to our Terms of Service.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
