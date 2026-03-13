"use client";

import Image from "next/image";
import QuoteSidebarCard from "@/components/markets/QuoteSidebarCard";
import { useState } from "react";
import { submitQuoteRequest } from "@/services/inquiryService";
import { Loader2 } from "lucide-react";

export default function WineQuotePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    phone: "",
    email: "",
    company: "",
    website: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [botChecked, setBotChecked] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botChecked) {
      setError("Please verify you are not a robot.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const success = await submitQuoteRequest({
      type: "wine-bulk",
      ...formData,
    });

    if (success) {
      setIsSuccess(true);
    } else {
      setError("Failed to submit request. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8 max-w-lg">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Request Received
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Thank you for reaching out. A specialized PIF Packaging account
            manager will review your wine quote request and be in touch shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block border-2 border-neutral-900 px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/markets/wine_quote_hero.png"
          alt="Wine Quote"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-lg mb-4">
            Wine
          </h1>
          <p className="text-xl md:text-2xl text-white font-bold tracking-tight drop-shadow-md">
            Get a quote for bulk and case pack wine bottles and supplies.
          </p>
        </div>
      </section>

      {/* 2. MAIN LAYOUT (Form + Sidebar) */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN: THE FORM */}
          <div className="w-full lg:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 lg:p-12 border border-neutral-200 shadow-sm relative"
            >
              {/* 1. YOUR INFORMATION */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Your Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 2. COMPANY INFORMATION */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter a location"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none bg-white"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="IT">Italy</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none bg-white"
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="OR">Oregon</option>
                      <option value="WA">Washington</option>
                      <option value="NY">New York</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Zip Code/Postal Code *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Legal & Submit */}
              <div className="pt-6 border-t border-neutral-200">
                <p className="text-sm font-bold text-slate-900 mb-6">
                  By clicking Submit, I agree to the{" "}
                  <span className="text-berlin-blue hover:underline cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span className="text-berlin-blue hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>
                  .
                </p>

                {/* Mock reCAPTCHA */}
                <div className="mb-6 inline-flex border border-neutral-300 bg-neutral-50 px-4 py-3 items-center gap-4 rounded-sm">
                  <input
                    type="checkbox"
                    checked={botChecked}
                    onChange={(e) => setBotChecked(e.target.checked)}
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm">I'm not a robot</span>
                  <div className="ml-8 flex flex-col items-center">
                    <Image
                      src="/images/logo.png"
                      alt="recaptcha"
                      width={24}
                      height={24}
                      className="opacity-50 grayscale"
                    />
                    <span className="text-[8px] text-neutral-500 uppercase mt-1">
                      reCAPTCHA
                    </span>
                  </div>
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-bold mb-4">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block w-32 bg-berlin-red text-white font-bold py-3 hover:bg-red-800 transition-colors disabled:opacity-70 flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: INFORMATIONAL SIDEBAR */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-slate-900 p-8 border border-slate-800">
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                Global Glass Allocation
              </h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                During tight harvest seasons, securing the exact glass shape and
                tint is critical. PIF Packaging’s continuous predictive sourcing
                network guarantees your estate has access to premium allocations
                exactly when the vintage demands it.
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-berlin-red relative">
              <div className="absolute top-0 right-0 w-8 h-8 bg-berlin-red flex items-center justify-center">
                <span className="text-white text-xs font-bold leading-none">
                  +
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                Bespoke Structural Engineering
              </h3>
              <p className="text-neutral-600 font-medium leading-relaxed">
                From heavy-wall punts to intricate embossing and specialized
                bore profiles, our industrial design team engineers custom molds
                that capture your terroir. We don't just supply bottles; we
                architect your brand's physical presence.
              </p>
            </div>

            <div className="bg-[#f8f8f8] p-8 border border-neutral-100">
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                Rigorous Quality Assurance
              </h3>
              <p className="text-neutral-600 font-medium leading-relaxed">
                A faulty closure or inconsistent pressure threshold can ruin
                years of maturation. Our dedicated quality control division
                physically audits manufacturing lines to ensure perfect pressure
                resistance and flawless glass distribution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
