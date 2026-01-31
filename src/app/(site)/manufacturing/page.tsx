"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Factory, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProductionLine from "@/components/manufacturing/ProductionLine";

export default function ManufacturingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-industrial-900 selection:text-white">
      {/* 1. HERO SECTION: "Factory Direct Control" */}
      <section
        ref={containerRef}
        className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-industrial-900 text-white"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity }}
        >
          {/* Visual Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-industrial-900/30 to-industrial-900 z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/ops_hero_network.png"
            alt="Factory Floor"
            className="w-full h-full object-cover scale-105 saturate-0 contrast-125 opacity-60"
          />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-berlin-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-berlin-red"></span>
              </span>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-200">
                Global Manufacturing Network
              </span>
            </div>

            <h1 className="text-7xl md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.85] text-white mix-blend-overlay opacity-90">
              FACTORY
            </h1>
            <h1 className="text-7xl md:text-[7rem] font-black tracking-tighter mb-12 leading-[0.85] text-white">
              DIRECT <span className="text-berlin-red">CONTROL</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
              We aren't just a catalog. We are your manufacturing partner.{" "}
              <br className="hidden md:block" />
              <strong className="text-white font-semibold">
                Custom tooling.
              </strong>{" "}
              <strong className="text-white font-semibold">
                High-speed automation.
              </strong>{" "}
              <strong className="text-white font-semibold">Zero limits.</strong>
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="group relative bg-berlin-red text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-red-900/20"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 flex items-center gap-3">
                  Start Custom Project <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <Link
                href="/shop-all"
                className="px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/5 border-b border-white/20 hover:border-white transition-all"
              >
                In a rush? View Stock
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PRODUCTION LINE (HORIZONTAL SCROLL) */}
      <ProductionLine />

      {/* 3. THE "HYBRID" ADVANTAGE STRIP */}
      <section className="py-32 bg-industrial-950 text-white relative overflow-hidden">
        {/* Background texture/grid if needed */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-20">
            The Hybrid <span className="text-berlin-red">Model</span>
            <span className="block text-lg md:text-xl font-normal text-gray-400 mt-4 normal-case max-w-2xl mx-auto">
              We decouple manufacturing from logistics. Build globally for cost,
              warehouse domestically for speed.
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 01 */}
            <div className="group p-10 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-baseline gap-4 mb-8">
                <div className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  01
                </div>
                <div className="h-px bg-white/10 flex-1 group-hover:bg-berlin-red/50 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-left group-hover:text-berlin-red transition-colors">
                Global Economics
              </h3>
              <p className="text-gray-500 text-left leading-relaxed group-hover:text-gray-400 transition-colors">
                Access Tier 1 pricing through our network of 45+ ISO-certified
                facilities. High-volume production power without the capital
                expenditure of building your own plant.
              </p>
            </div>

            {/* Card 02 */}
            <div className="group p-10 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-baseline gap-4 mb-8">
                <div className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  02
                </div>
                <div className="h-px bg-white/10 flex-1 group-hover:bg-berlin-red/50 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-left group-hover:text-berlin-red transition-colors">
                Domestic Agility
              </h3>
              <p className="text-gray-500 text-left leading-relaxed group-hover:text-gray-400 transition-colors">
                We hold your inventory in our US warehouses. 48-hour JIT release
                times mean you never wait for a container to clear customs when
                your demand spikes.
              </p>
            </div>

            {/* Card 03 */}
            <div className="group p-10 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-baseline gap-4 mb-8">
                <div className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  03
                </div>
                <div className="h-px bg-white/10 flex-1 group-hover:bg-berlin-red/50 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-left group-hover:text-berlin-red transition-colors">
                Risk Immunity
              </h3>
              <p className="text-gray-500 text-left leading-relaxed group-hover:text-gray-400 transition-colors">
                Redundant tooling and multi-plant validation strategies ensure
                business continuity. We absorb supply chain volatility so your
                production line never stops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-industrial-900 mb-10 max-w-4xl mx-auto leading-[0.9] tracking-tighter">
            Ready to build something <br />
            <span className="text-berlin-red">Real?</span>
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="group bg-industrial-900 text-white px-12 py-6 rounded-sm font-bold text-lg uppercase tracking-widest hover:bg-black transition-all shadow-2xl hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <span className="relative z-10">Start Manufacturing</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
