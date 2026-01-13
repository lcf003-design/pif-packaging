"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Zap,
  Cpu,
  Settings,
  PenTool,
  Truck,
  ArrowRight,
  CheckCircle,
  Factory,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ManufacturingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-industrial-900 selection:text-white">
      {/* 1. HERO SECTION: "Factory Direct Control" */}
      <section
        ref={containerRef}
        className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-industrial-900 text-white"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          {/* Placeholder for Factory Video/Image */}
          <div className="absolute inset-0 bg-industrial-900/60 z-10" />
          <img
            src="/ops_hero_network.png" // Reusing network image for now, user to replace with factory footage
            alt="Factory Floor"
            className="w-full h-full object-cover opacity-50 scale-105 grayscale"
          />
        </motion.div>

        <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
              <Factory className="w-4 h-4 text-berlin-red" />
              <span className="text-sm font-bold tracking-widest uppercase">
                Global Manufacturing & Supply
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
              Factory Direct <br />
              <span className="text-berlin-red">Control.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              We aren't just a catalog. We are your manufacturing partner. From
              custom tooling to high-speed automation, we build what you need.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-berlin-red text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors w-full md:w-auto"
              >
                Start Custom Project
              </Link>
              <Link
                href="/shop-all"
                className="px-8 py-4 rounded-sm font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 transition-colors w-full md:w-auto"
              >
                View Stock Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CAPABILITIES GRID: "Industrial Armor" Style */}
      <section className="py-32 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* Left: Text & Pitch */}
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-black mb-8 leading-tight text-industrial-900">
                Limitless <br />
                <span className="text-berlin-red">Capabilities.</span>
              </h2>
              <p className="text-lg text-industrial-600 mb-12 leading-relaxed">
                Why compromise with off-the-shelf? Our manufacturing
                capabilities allow you to dictate the exact specifications of
                your packaging. We handle the entire lifecycle from engineering
                diagrams to the final production run.
              </p>

              <div className="grid gap-8">
                {/* Capability 1 */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 bg-industrial-50 rounded-lg flex items-center justify-center group-hover:bg-industrial-900 transition-colors duration-300 flex-shrink-0">
                    <Settings className="w-6 h-6 text-industrial-900 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Custom Mold Building
                    </h3>
                    <p className="text-industrial-500 text-sm leading-relaxed">
                      In-house engineering teams to design and cut manufacturing
                      molds for proprietary bottle and jar shapes.
                    </p>
                  </div>
                </div>

                {/* Capability 2 */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 bg-industrial-50 rounded-lg flex items-center justify-center group-hover:bg-berlin-red transition-colors duration-300 flex-shrink-0">
                    <Cpu className="w-6 h-6 text-industrial-900 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      High-Speed Automation
                    </h3>
                    <p className="text-industrial-500 text-sm leading-relaxed">
                      Automated production lines capable of scaling from pilot
                      runs of 5,000 units to global rollouts of 50 million+.
                    </p>
                  </div>
                </div>

                {/* Capability 3 */}
                <div className="flex gap-4 group">
                  <div className="w-12 h-12 bg-industrial-50 rounded-lg flex items-center justify-center group-hover:bg-berlin-blue transition-colors duration-300 flex-shrink-0">
                    <PenTool className="w-6 h-6 text-industrial-900 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Decoration & Labeling
                    </h3>
                    <p className="text-industrial-500 text-sm leading-relaxed">
                      Silk screening, hot stamping, pressure-sensitive labeling,
                      and shrink sleeving applied directly on the line.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Block */}
            <div className="relative min-h-[600px] bg-industrial-900 rounded-sm overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/divisions_hero_collage.png')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-12 left-12 right-12">
                <div className="border-l-4 border-berlin-red pl-6">
                  <p className="text-white/60 font-mono text-sm mb-2">
                    CASE STUDY: AUTO-X
                  </p>
                  <h3 className="text-white text-3xl font-bold">
                    "We needed a custom neck finish for a proprietary pump. They
                    built the tool in 4 weeks."
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE "HYBRID" ADVANTAGE STRIP */}
      <section className="py-24 bg-industrial-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-16">
            The Hybrid Advantage
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="p-8 border border-white/10 bg-white/5 rounded-sm hover:bg-white/10 transition-colors">
              <div className="font-black text-6xl text-white/10 mb-6">01</div>
              <h3 className="text-xl font-bold text-berlin-red mb-4">
                Stock Catalog
              </h3>
              <p className="text-gray-400">
                Need it fast? We inventory millions of units of standard bottles
                and jars, ready to ship from domestic warehouses.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-white/5 rounded-sm hover:bg-white/10 transition-colors">
              <div className="font-black text-6xl text-white/10 mb-6">02</div>
              <h3 className="text-xl font-bold text-white mb-4">Custom Mfg</h3>
              <p className="text-gray-400">
                Need it unique? We engage our global manufacturing network to
                build proprietary molds and run custom production.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-white/5 rounded-sm hover:bg-white/10 transition-colors">
              <div className="font-black text-6xl text-white/10 mb-6">03</div>
              <h3 className="text-xl font-bold text-berlin-blue mb-4">
                Supply Chain
              </h3>
              <p className="text-gray-400">
                We handle the freight, customs, and warehousing. You get a
                single invoice and "Just-In-Time" delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black text-industrial-900 mb-8 max-w-3xl mx-auto leading-tight">
            Ready to build something{" "}
            <span className="text-berlin-red">Real?</span>
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-industrial-900 text-white px-10 py-5 rounded-sm font-bold text-lg uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Start Manufacturing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
