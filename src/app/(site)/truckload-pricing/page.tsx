"use client";

import React, { useState } from "react";
import Link from "next/link";
import { submitTruckloadQuote } from "@/services/inquiryService";
import { TruckloadQuoteRequest } from "@/types";
import { CheckCircle, Loader2 } from "lucide-react";

export default function TruckloadPricingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<TruckloadQuoteRequest>({
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
    projectTimeframe: "",
    annualVolume: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitTruckloadQuote(formData);

    setLoading(false);
    if (result) {
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setSuccess(false);
        setFormData({
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
          projectTimeframe: "",
          annualVolume: "",
          details: "",
        });
      }, 5000);
    } else {
      alert(
        "Something went wrong submitting your quote request. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* 1. HERO BANNER */}
      <section className="bg-berlin-red py-12 relative overflow-hidden">
        {/* Subtle patterned background overlay for the red banner */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/pattern-dots.png')",
            backgroundSize: "100px",
          }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm mb-2">
            Get a Quote for Bulk Packaging Purchases
          </h1>
        </div>
      </section>

      {/* 2. SUBHEADER WRAPPER */}
      <section className="bg-white py-6 border-b border-neutral-200">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <p className="font-bold text-slate-800 text-lg md:text-xl">
            Looking for recurring shipments or bulk packaging orders of $5,000
            or greater?
          </p>
          <p className="font-bold text-slate-800 text-lg md:text-xl">
            Complete the form below and a Packaging Consultant will contact you
            within 1 business day
          </p>
        </div>
      </section>

      {/* 3. MAIN CONTENT (Form + Sidebar) */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN: THE FORM */}
          <div className="w-full lg:w-2/3">
            {success ? (
              <div className="bg-white p-12 border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">
                  Request Received
                </h2>
                <p className="text-slate-600 max-w-md mx-auto text-lg">
                  Thank you for submitting your truckload pricing request. A
                  dedicated Packaging Consultant will review your details and
                  contact you within 1 business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-12 border border-neutral-200 shadow-sm"
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
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
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
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
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
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Enter a location"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors placeholder:text-neutral-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors bg-white appearance-none"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors bg-white appearance-none"
                      >
                        <option value="">Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Zip Code/Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. PROJECT INFORMATION */}
                <div className="mb-12">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                    Project Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Project Timeframe *
                      </label>
                      <select
                        name="projectTimeframe"
                        required
                        value={formData.projectTimeframe}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors bg-white appearance-none"
                      >
                        <option value="">Select Project Timeframe</option>
                        <option value="Under 6 Months">Under 6 Months</option>
                        <option value="6-12 Months">6-12 Months</option>
                        <option value="1-2 Years">1-2 Years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Annual Packaging Purchase Volume *
                      </label>
                      <select
                        name="annualVolume"
                        required
                        value={formData.annualVolume}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors bg-white appearance-none"
                      >
                        <option value="">
                          Select Annual Packaging Purchase Volume
                        </option>
                        <option value="Less than $10k">Less than $10k</option>
                        <option value="$10k - $50k">$10k - $50k</option>
                        <option value="$50k - $100k">$50k - $100k</option>
                        <option value="$100k - $250k">$100k - $250k</option>
                        <option value="$250k - $500k">$250k - $500k</option>
                        <option value="$500k - $1MM">$500k - $1MM</option>
                        <option value="$1MM - $5MM">$1MM - $5MM</option>
                        <option value="$5MM - $10MM">$5MM - $10MM</option>
                        <option value="Over $10MM">Over $10MM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2">
                        Tell us more *
                      </label>
                      <textarea
                        name="details"
                        required
                        rows={6}
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full border border-neutral-300 px-4 py-3 focus:border-berlin-red focus:ring-1 focus:ring-berlin-red outline-none transition-colors resize-y"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* TERMS AND SUBMIT BUTTON */}
                <div className="pt-6 border-t border-neutral-200">
                  <p className="text-sm font-bold text-slate-800 mb-6">
                    By clicking Submit, I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-berlin-red hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms"
                      className="text-berlin-red hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-berlin-red hover:bg-black text-white font-bold uppercase tracking-wide px-10 py-4 transition-colors duration-300 shadow-md flex items-center justify-center min-w-[160px]"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: THE SIDEBAR WIDGETS */}
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
            {/* Widget 1 */}
            <div className="bg-neutral-100 p-8 border border-neutral-200">
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                Shop Our Product Selection
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                Looking to purchase product today? Visit our{" "}
                <Link
                  href="/shop-all"
                  className="text-berlin-red font-bold hover:underline"
                >
                  online store
                </Link>{" "}
                to view a wide variety of packaging options and place your
                order.
              </p>
            </div>

            {/* Widget 2 */}
            <div className="bg-neutral-100 p-8 border border-neutral-200">
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                Request a Catalog
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                Be the first to see new products and industry trends.
              </p>
              <Link
                href="/contact"
                className="text-berlin-red font-bold text-sm hover:underline"
              >
                Sign Up
              </Link>
            </div>

            {/* Widget 3 */}
            <div className="bg-neutral-100 p-8 border border-neutral-200">
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                Need Information about an Order You Have Already Placed?
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                Contact our Customer Care Department during regular business
                hours by chat or phone at{" "}
                <span className="text-berlin-red font-bold">323.364.6911</span>.
                Or send us an{" "}
                <Link
                  href="mailto:support@pifpackaging.com"
                  className="text-berlin-red font-bold hover:underline"
                >
                  email
                </Link>{" "}
                and we will get back to you within 2 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
