"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  MousePointer2,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Box,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PortalPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-neutral-900 selection:bg-blue-100">
      {/* 1. HERO SECTION: The Relief */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-wide uppercase mb-6">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Back Office, Simplified</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-berlin-blue mb-8 leading-[0.9]">
                Stop digging <br />
                through emails <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                  for invoices.
                </span>
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed max-w-xl mb-10">
                Business is hard enough. Ordering packaging shouldn&apos;t be.
                Manage your entire supply chain from one clean, quiet place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-berlin-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2">
                  <span>Log In</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 px-6 text-sm font-medium text-neutral-500">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                      Us
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">
                      You
                    </div>
                  </div>
                  <span>We always one click away.</span>
                </div>
              </div>
            </motion.div>

            {/* Visual: The Clean Desk (Tablet UI) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] bg-neutral-900 p-3 shadow-2xl border border-neutral-800 rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-black rounded-b-xl z-20" />
                <div className="relative rounded-[2rem] overflow-hidden bg-neutral-50 aspect-[4/3] flex flex-col">
                  {/* Simulated Portal Header */}
                  <div className="h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-8">
                    <div className="w-24 h-4 bg-neutral-200 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                  </div>
                  {/* Simulated Body */}
                  <div className="p-8 grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-4">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-neutral-400 font-bold">
                          RECENT ORDERS
                        </div>
                        <div className="text-2xl font-bold text-berlin-blue">
                          3 Active
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-neutral-400 font-bold">
                          QUICK DOCS
                        </div>
                        <div className="text-2xl font-bold text-berlin-blue">
                          Download
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="w-3/4 h-4 bg-neutral-100 rounded" />
                        <div className="w-1/2 h-3 bg-neutral-50 rounded" />
                      </div>
                      <div className="px-4 py-2 bg-berlin-blue text-white text-xs font-bold rounded-full">
                        Reorder
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MINI-APP: INSTANT REORDER */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-100 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="order-2 md:order-1 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-neutral-200 relative group cursor-pointer"
            >
              <div className="aspect-square bg-neutral-100 rounded-2xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                  <Box className="w-24 h-24" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="h-6 w-3/4 bg-neutral-100 rounded" />
                <div className="h-4 w-1/2 bg-neutral-50 rounded" />
              </div>
              <button className="w-full py-4 bg-neutral-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-colors">
                <span>Reorder Now</span>
                <Clock className="w-4 h-4" />
              </button>

              {/* Floating Success Toast */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: -80, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap z-20"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="font-bold">Ordered! Arriving Tuesday.</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black text-berlin-blue mb-6 tracking-tight">
              One-Click <br />
              <span className="text-blue-600">Reordering.</span>
            </h2>
            <p className="text-xl text-neutral-500 leading-relaxed mb-8">
              Liked last month&apos;s boxes? Don&apos;t call us. Don&apos;t
              email us. Just hit the button.
            </p>
            <ul className="space-y-4">
              {[
                "Saved payment methods",
                "Mirror last shipment",
                "Instant confirmation",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-lg font-medium text-neutral-700"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. MINI-APP: THE VAULT */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-berlin-blue mb-6 tracking-tight">
              The Paperwork <br />
              <span className="text-blue-600">Vault.</span>
            </h2>
            <p className="text-xl text-neutral-500 leading-relaxed mb-8">
              Tax season? Audit? Just curious? Every invoice, spec sheet, and
              BOL is stored safely here. Forever.
            </p>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-berlin-blue mb-1">
                  Universal Search
                </h4>
                <p className="text-sm text-blue-700/80">
                  Type "Invoice 2024" or "Glass Specs" to find anything
                  instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            {/* Folder Stack Animation */}
            <div className="relative h-[400px] w-full max-w-sm mx-auto perspective-[1000px]">
              {[2, 1, 0].map((i) => (
                <motion.div
                  key={i}
                  initial={{
                    y: i * -20,
                    scale: 1 - i * 0.05,
                    opacity: 1 - i * 0.2,
                  }}
                  whileInView={{
                    y: i === 0 ? 40 : i * -20, // Pop the front one out
                    rotateX: i === 0 ? -10 : 0,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`absolute inset-x-0 h-64 rounded-xl border border-neutral-200 shadow-xl bg-white p-6 flex flex-col justify-between origin-bottom ${
                    i === 0 ? "z-10 bg-neutral-50" : "z-0 bg-neutral-100"
                  }`}
                  style={{ top: i * 40 }}
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-red-500" />
                      <div>
                        <div className="font-bold text-neutral-900">
                          Invoice #{4020 + i}
                        </div>
                        <div className="text-xs text-neutral-400">
                          Paid • Oct {12 + i}, 2025
                        </div>
                      </div>
                    </div>
                    <div className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer">
                      <Download className="w-5 h-5 text-neutral-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-neutral-100 rounded-full" />
                    <div className="h-2 w-3/4 bg-neutral-100 rounded-full" />
                    <div className="h-2 w-1/2 bg-neutral-100 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MINI-APP: THE CFO DASHBOARD */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />

        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Every penny, <br />
                <span className="text-blue-500">accounted for.</span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                Real-time spend analytics, instant audit reports, and zero
                mystery fees. Your finance team is going to love us.
              </p>
            </div>

            {/* Dashboard Card */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
              {/* Glow Effect */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-colors" />

              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Total Spend */}
                <div>
                  <div className="text-neutral-400 font-bold mb-2 text-sm tracking-wider uppercase">
                    Total Spend (YTD)
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
                    $142,392
                  </div>
                  <div className="inline-flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>On Budget</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  {/* Item 1 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2 text-neutral-300">
                      <span>Primary Packaging</span>
                      <span>62%</span>
                    </div>
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[62%] rounded-full" />
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2 text-neutral-300">
                      <span>Logistics & Freight</span>
                      <span>28%</span>
                    </div>
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-400 w-[28%] rounded-full" />
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2 text-neutral-300">
                      <span>Design Services</span>
                      <span>10%</span>
                    </div>
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-600 w-[10%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  {/* Avatar Group */}
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-neutral-800 bg-neutral-600 flex items-center justify-center text-[10px] font-bold"
                      >
                        {["JD", "MK", "AL"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div className="text-neutral-400 text-sm">
                    <span className="text-white font-bold">Finance Team</span>{" "}
                    has full access
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-400 hover:text-white font-bold transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download 2025 Budget Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA: HUMAN FALLBACK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full mx-auto mb-6 flex items-center justify-center relative">
            <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
            <MessageCircle className="w-8 h-8 text-neutral-400" />
          </div>
          <h2 className="text-4xl font-bold text-berlin-blue tracking-tight mb-4">
            Stuck? Don&apos;t submit a ticket.
          </h2>
          <p className="text-lg text-neutral-500 mb-8">
            Your account manager is actually a person. Call them.
          </p>
          <button className="bg-white border-2 border-neutral-200 text-berlin-blue px-12 py-4 rounded-full font-bold text-lg hover:border-berlin-blue hover:bg-berlin-blue hover:text-white transition-all">
            Chat with Us
          </button>
        </div>
      </section>
    </div>
  );
}
