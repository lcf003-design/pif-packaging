"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Globe,
  ArrowRight,
  ShieldCheck,
  Building,
  Anchor,
  Compass,
  Factory,
  ScanLine,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CapabilityDeckPage() {
  return (
    <div className="bg-neutral-900 text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* 1. COVER: The Industrial Standard */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          {/* Using the factory floor as a low-opacity bg for the cover to set the mood */}
          <Image
            src="/images/services/capabilities_factory_floor.png"
            alt="Industrial Background"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <div className="inline-flex items-center gap-3 mb-8 border-l-4 border-orange-500 pl-4">
              <span className="text-white font-bold tracking-widest uppercase text-sm">
                Confidential Briefing 2026 // v2.4
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              THE PIF <br />
              STANDARD.
            </h1>
            <p className="text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed">
              A forensic overview of our global engineering, qualification, and
              logistics infrastructure.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 w-full text-center"
        >
          <div className="text-neutral-500 text-xs uppercase tracking-widest mb-2">
            Initiate Breakdown
          </div>
          <ArrowDown className="w-5 h-5 mx-auto text-orange-500 animate-bounce" />
        </motion.div>
      </section>

      {/* 2. ENGINEERING DEEP DIVE */}
      <section className="min-h-screen py-24 flex items-center relative bg-neutral-900 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-orange-500 font-mono text-sm uppercase tracking-widest mb-6">
                <ScanLine className="w-5 h-5" /> Discipline 01
              </div>
              <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-none">
                We Don't Guess. <br />
                <span className="text-neutral-500">We Measure.</span>
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed mb-10">
                Most "packaging companies" are just catalog brokers. They can't
                tell you the difference between a 24-410 and a 24-415 neck
                finish until it leaks. Our engineers validate every tolerance
                before a PO is cut.
              </p>
              <ul className="space-y-6 border-t border-white/10 pt-8">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Compass className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Mold Flow Analysis
                    </h3>
                    <p className="text-sm text-neutral-400">
                      Predicting resin behavior to prevent warping or sink
                      marks.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <ScanLine className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Structural Analysis
                    </h3>
                    <p className="text-sm text-neutral-400">
                      Stress-testing virtual prototypes for drop impact and
                      top-load crush performance.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative h-[600px] w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/services/capabilities_engineering_real.png"
                alt="Engineering Calipers"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOURCING DEEP DIVE */}
      <section className="min-h-screen py-24 flex items-center relative bg-neutral-800 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/services/capabilities_factory_floor.png"
                alt="Factory Floor"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-cyan-500 font-mono text-sm uppercase tracking-widest mb-6">
                <Factory className="w-5 h-5" /> Discipline 02
              </div>
              <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-none">
                The Factory <br />
                <span className="text-neutral-500">Floor.</span>
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed mb-10">
                We have spent years vetting a global network of premier
                manufacturers. These aren't Alibaba vendors; these are the same
                facilities supplying the Fortune 500. We leverage third-party
                auditors to ensure compliance.
              </p>
              <ul className="space-y-6 border-t border-white/10 pt-8">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <ShieldCheck className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">GMP Audits</h3>
                    <p className="text-sm text-neutral-400">
                      Regular, unannounced inspections of cleanliness and
                      process control.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Factory className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Resdiual Capacity Planning
                    </h3>
                    <p className="text-sm text-neutral-400">
                      We book line time in advance to ensure your launch isn't
                      delayed by peak season.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOGISTICS DEEP DIVE */}
      <section className="min-h-screen py-24 flex items-center relative bg-neutral-900 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-emerald-500 font-mono text-sm uppercase tracking-widest mb-6">
                <Anchor className="w-5 h-5" /> Discipline 03
              </div>
              <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-none">
                Command <br />
                <span className="text-neutral-500">Of The Lane.</span>
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed mb-10">
                Freight isn't an afterthought; it's a competitive advantage. We
                leverage our volume contracts to bypass congestion and optimize
                route planning for speed and cost.
              </p>
              <ul className="space-y-6 border-t border-white/10 pt-8">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Building className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Just-In-Time Warehousing
                    </h3>
                    <p className="text-sm text-neutral-400">
                      Strategic domestic hubs in LA, NJ, and Savannah to stage
                      your inventory.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Anchor className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Customs Compliance
                    </h3>
                    <p className="text-sm text-neutral-400">
                      Navigating HTS codes and anti-dumping duties to ensure
                      seamless clearance.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative h-[600px] w-full rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/services/capabilities_port_night.png"
                alt="Port Logistics"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. GLOBAL NETWORK */}
      <section className="min-h-screen py-24 relative flex flex-col items-center justify-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/capabilities_map_clean.png"
            alt="Global Network Map"
            fill
            className="object-contain p-20 opacity-70"
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 p-12 max-w-lg ml-auto rounded-sm shadow-2xl">
            <h3 className="text-3xl font-black mb-6 border-b border-white/10 pb-4">
              Global Footprint
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Partner Factories</span>
                <span className="text-2xl font-bold font-mono">Global</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Shipping Volume</span>
                <span className="text-2xl font-bold font-mono">High Scale</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Quality Rate</span>
                <span className="text-2xl font-bold font-mono text-emerald-500">
                  99.4%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Regions Served</span>
                <span className="text-2xl font-bold font-mono">
                  Multi-Nat'l
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA: THE ASK */}
      <section className="h-[60vh] flex items-center justify-center bg-neutral-900 border-t border-white/10">
        <div className="text-center container mx-auto px-6">
          <ShieldCheck className="w-20 h-20 text-orange-500 mx-auto mb-8" />
          <h2 className="text-6xl font-black mb-8">Execute.</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
            You've seen the infrastructure. Now let's apply it to your project.
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/contact"
              className="px-12 py-6 bg-white text-neutral-900 font-bold text-xl rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-2xl"
            >
              Start Your Project
            </Link>
            <a
              href="/docs/PIF_Capability_Deck_2026.pdf"
              download
              className="px-12 py-6 border border-white/20 text-white font-bold text-xl rounded-full hover:bg-white/10 transition-all flex items-center gap-3"
            >
              <ArrowDown className="w-5 h-5" />
              Download PDF Deck
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
