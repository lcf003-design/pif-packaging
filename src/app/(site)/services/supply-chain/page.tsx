"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Globe,
  Package,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  ClipboardCheck,
  Ship,
  Plane,
  Anchor,
  Box,
  BarChart3,
  Zap,
  FileText,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ASSETS
const ASSETS = {
  hero: "/supply_chain_hero_realistic.png",
  network: "/global_hero_network.png", // New asset replacement
  delivery: "/execution_delivery.png",
};

export default function SupplyChainPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-blue-100 selection:text-berlin-blue">
      {/* 1. HERO SECTION: The Nerve Center */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-neutral-900">
        {/* Cinematic Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src={ASSETS.hero}
            alt="Logistics Command Center"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />
          {/* Abstract Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                  Live Logistics Network
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-berlin-blue"
              >
                PRECISION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  IN MOTION.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-neutral-600 max-w-lg leading-relaxed mb-10 font-medium"
              >
                We handle the global shipping, customs, and storage so you don't
                have to. Simple, reliable logistics that let you focus on
                growing your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button className="bg-berlin-blue text-white px-8 py-4 rounded-full font-bold tracking-tight text-lg hover:bg-berlin-dark-blue transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 group">
                  Start Shipping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-neutral-200 text-berlin-blue rounded-full font-bold tracking-tight text-lg hover:bg-neutral-50 transition-all">
                  How It Works
                </button>
              </motion.div>
            </div>

            {/* Right: Small Business Friendly Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-8 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-700">
                <div className="flex justify-between items-center mb-8 border-b border-neutral-200/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        Simplifying The Process
                      </div>
                      <div className="text-lg font-black text-berlin-blue">
                        LOGISTICS PARTNER
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <ClipboardCheck className="w-3 h-3" />
                      W/ CARE
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <DashboardMetric
                    label="Shipping"
                    value="Done For You"
                    trend="Door-to-Door"
                  />
                  <DashboardMetric
                    label="Questions?"
                    value="Call A Human"
                    trend="No Bots"
                  />
                  <DashboardMetric
                    label="Warehousing"
                    value="Case-by-Case"
                    trend="On Request"
                  />
                  <DashboardMetric
                    label="Paperwork"
                    value="We Handle It"
                    trend="Customs Cleared"
                  />
                </div>

                {/* Simple Trust Visual */}
                <div className="h-20 bg-blue-50/50 rounded-xl border border-blue-100/50 flex items-center justify-center gap-4 px-6">
                  <div className="flex items-center gap-2 text-berlin-blue font-bold opacity-80">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span>We Ship</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                  <div className="flex items-center gap-2 text-berlin-blue font-bold opacity-80">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span>You Grow</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements for Depth */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl blur-xl opacity-20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTROL TOWER (Bento Grid) */}
      <section className="py-24 bg-neutral-50 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-berlin-blue tracking-tight mb-4">
              The Control Tower.
            </h2>
            <div className="w-20 h-1 bg-blue-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Large Main Feature: Inventory Strategy */}
            <BentoCard
              colSpan="md:col-span-2"
              rowSpan="md:row-span-2"
              bg="bg-white"
              icon={BarChart3}
            >
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-berlin-blue mb-4">
                    Inventory Strategy
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-lg mb-8">
                    Avoid stockouts and overstocking. We help you forecast
                    coverage based on your sales cycles and lead times.
                  </p>
                </div>

                {/* Simulated Planning Chart */}
                <div className="h-48 w-full relative pt-8">
                  <div className="absolute inset-0 flex items-end justify-between gap-1">
                    {[35, 42, 38, 55, 62, 58, 75, 85, 80, 95, 90, 100].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: "20%" }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`w-full rounded-t-sm ${
                            i > 7 ? "bg-blue-500" : "bg-blue-100"
                          }`}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Secondary Feature: Active Global Network */}
            <BentoCard
              colSpan="md:col-span-2"
              rowSpan="md:row-span-1"
              bg="bg-blue-600 text-white"
              icon={Globe}
              dark
            >
              <div className="absolute inset-0 z-0 opacity-20 bg-[url('/global_hero_network.png')] bg-cover bg-center mix-blend-overlay" />
              <div className="flex items-center justify-between h-full relative z-10">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    Global Reach
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </h3>
                  <p className="text-blue-100 text-sm max-w-sm">
                    From factory floor to your door. We manage the complex
                    routes so you don't have to.
                  </p>
                </div>
                <div className="hidden sm:block relative">
                  <div className="absolute top-1/2 -left-32 w-24 h-0.5 bg-blue-400/50 overflow-hidden">
                    <motion.div
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-full bg-white blur-md"
                    />
                  </div>
                  <Ship className="w-16 h-16 text-blue-400" />
                </div>
              </div>
            </BentoCard>

            {/* Tertiary Feature 1: Flexible Storage */}
            <BentoCard
              colSpan="md:col-span-1"
              rowSpan="md:row-span-1"
              bg="bg-neutral-900 text-white"
              icon={MapPin}
              dark
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/supply_chain_hero_realistic.png"
                  alt="Warehouse"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-lg font-bold mb-1">Flexible Storage</h3>
                <p className="text-neutral-400 text-xs">
                  Access to partner facilities.
                </p>
              </div>
            </BentoCard>

            {/* Tertiary Feature 2: Compliance */}
            <BentoCard
              colSpan="md:col-span-1"
              rowSpan="md:row-span-1"
              bg="bg-white"
              icon={ClipboardCheck}
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-berlin-blue">
                    Compliance
                  </h3>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-500"
                  >
                    <div className="w-4 h-2 border-l-2 border-b-2 border-green-600 -rotate-45 mb-1" />
                  </motion.div>
                </div>
                <p className="text-neutral-500 text-sm">Paperwork handled.</p>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* 3. THE JOURNEY (Visual Node System) */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Network Graphic - REPLACED ASSET */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
          <Image
            src={ASSETS.network}
            alt="Global Network"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-berlin-blue tracking-tight mb-6">
              The Journey of a <br />
              <span className="text-blue-600">Perfect Package.</span>
            </h2>
          </div>

          {/* Connection Diagram */}
          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-0.5 bg-neutral-200 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <JourneyNode
                step="01"
                title="Consolidation"
                desc="Raw materials gathered. Production runs synchronized."
                icon={Box}
              />
              <JourneyNode
                step="02"
                title="Quality Gate"
                desc="Pre-shipment inspection. Zero defects tolerated."
                icon={ClipboardCheck}
              />
              <JourneyNode
                step="03"
                title="Freight & Clearance"
                desc="Coordinated documentation and customs support designed to help shipments move smoothly through transit."
                icon={Ship}
              />
              <JourneyNode
                step="04"
                title="Final Mile"
                desc="Precision delivery to your facility or partner."
                icon={Truck}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONCIERGE LOGISTICS */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        {/* Glowing line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-6">
              <Zap className="w-5 h-5" />
              <span>CONCIERGE LOGISTICS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              No Portals.
              <br />
              Just People.
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              You don&apos;t need another login to manage. You need answers.
              Your dedicated logistics manager is always text or email away.
            </p>
            <div className="flex gap-4 flex-wrap">
              <TechBadge label="Direct Cell Access" />
              <TechBadge label="Proactive Updates" />
              <TechBadge label="Exception Handling" />
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-transparent">
            {/* Phone Message UI */}
            <div className="w-[320px] mx-auto bg-neutral-100 rounded-[40px] border-8 border-neutral-800 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-neutral-200 p-4 pt-8 flex items-center justify-between border-b border-neutral-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    LM
                  </div>
                  <div className="text-neutral-900 text-xs font-bold">
                    Logistics Manager
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-4 space-y-4 min-h-[300px] bg-neutral-50 relative">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />

                <div className="flex flex-col gap-1 items-start max-w-[85%]">
                  <div className="p-3 bg-neutral-200 rounded-2xl roounded-tl-none text-neutral-800 text-xs leading-relaxed">
                    Hey! Just a heads up, shipment #402 cleared customs early.
                    on track for Tuesday delivery. 📦
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-end ml-auto max-w-[85%]">
                  <div className="p-3 bg-blue-600 rounded-2xl text-white text-xs leading-relaxed text-right">
                    Perfect, thanks for the update!
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start max-w-[85%] pt-4">
                  <div className="p-3 bg-neutral-200 rounded-2xl roounded-tl-none text-neutral-800 text-xs leading-relaxed">
                    <div className="flex items-center gap-2 mb-1 opacity-70">
                      <FileText className="w-3 h-3" />
                      <span>pod_signed.pdf</span>
                    </div>
                    Also attaching the signed POD for your records.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-berlin-blue tracking-tighter mb-8">
            Ready to <span className="text-blue-600">Flow?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-berlin-blue text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
              Lets GO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// SUB-COMPONENTS

function DashboardMetric({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  // Trend is always positive for these descriptive capabilities
  return (
    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
      <div className="text-xs text-neutral-500 mb-1 text-center font-bold tracking-wide uppercase">
        {label}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold text-berlin-blue leading-none">
          {value}
        </div>
        <div className="text-xs font-bold text-green-600">{trend}</div>
      </div>
    </div>
  );
}

function BentoCard({
  children,
  colSpan,
  rowSpan,
  bg,
  icon: Icon,
  dark = false,
}: any) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${colSpan} ${rowSpan} ${bg} rounded-3xl p-8 shadow-lg relative overflow-hidden border ${
        dark ? "border-transparent" : "border-neutral-100"
      } group`}
    >
      <div
        className={`absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20`}
      >
        <Icon
          className={`w-24 h-24 ${dark ? "text-white" : "text-berlin-blue"}`}
        />
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

function JourneyNode({ step, title, desc, icon: Icon }: any) {
  return (
    <div className="flex flex-col items-center __text-center relative group">
      <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-2 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-100 group-hover:border-blue-200 transition-colors">
          <Icon className="w-10 h-10 text-berlin-blue group-hover:text-blue-600 transition-colors" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
          {step}
        </div>
      </div>

      <h3 className="text-xl font-bold text-berlin-blue mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm text-center max-w-xs">{desc}</p>
    </div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold text-blue-200 backdrop-blur-sm">
      {label}
    </div>
  );
}
