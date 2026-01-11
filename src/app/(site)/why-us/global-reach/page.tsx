"use client";

import React, { useRef } from "react";
import { ArrowRight, Globe, TrendingUp, Users, Factory } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalReachPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-blue-600/10 relative">
      {/* ARCHITECTURAL GRID OVERLAY - Shared across the page */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px), linear-gradient(to right, #000 0.5px, transparent 0.5px), linear-gradient(to bottom, #000 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
        }}
      />

      {/* 1. HERO SECTION: Global Capabilities */}
      <section
        ref={containerRef}
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="/global_hero_network.png"
            alt="Global Network"
            className="w-full h-full object-cover opacity-90 scale-105"
          />
          {/* Removed obscuring gradients for true glass feel */}
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20">
          <div className="inline-flex flex-col items-center backdrop-blur-xl bg-white/5 p-12 rounded-[3rem] border border-white/20 shadow-xl shadow-white/5">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-600/20 text-blue-600 text-sm font-extrabold uppercase tracking-widest mb-8 animate-fade-in-up shadow-lg shadow-white/50">
              <Globe className="w-4 h-4" />
              <span>World-Class Infrastructure</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight animate-fade-in-up delay-100 drop-shadow-sm">
              Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Capabilities.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-800 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Small team efficiency. Global manufacturing power. We scale with
              you, from prototype to mass production.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SOURCING: The Architectural Map */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Strategic <br />
                <span className="text-blue-600">Sourcing.</span>
              </h2>
              <div className="prose prose-neutral prose-lg text-neutral-600">
                <p className="mb-6 leading-relaxed">
                  We aren't limited by what is sitting on a shelf in a local
                  warehouse. We go directly to the source. Our vetted partner
                  network spans the globe, ensuring you get exactly what your
                  brand needs, not just what's convenient for a distributor to
                  sell.
                </p>
                <p className="mb-8 leading-relaxed font-medium text-neutral-800">
                  By leveraging our relationships with manufacturers worldwide,
                  we eliminate the middle-man markup and bring you
                  factory-direct pricing with domestic service.{" "}
                  <span className="text-blue-600 font-bold">
                    We search the world so you don't have to.
                  </span>
                </p>
              </div>
              <Link
                href="/services/sourcing"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
              >
                Explore Sourcing{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Image Right */}
            <div className="relative">
              <img
                src="/global_map_red_custom.png"
                alt="Global Sourcing Map"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700 opacity-90"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. SUPPLY CHAIN: Logistics Mastery */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image Left */}
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl order-2 lg:order-1 border border-neutral-200">
              <img
                src="/logistics_port.png"
                alt="Supply Chain Logistics"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Global <br />
                <span className="text-blue-600">Supply Chain.</span>
              </h2>
              <div className="prose prose-neutral prose-lg text-neutral-600">
                <p className="mb-6 leading-relaxed">
                  You don't need to own the warehouse to control the inventory.
                  We manage the entire logistics chain—from the factory floor to
                  your loading dock. We handle customs, freight forwarding, and
                  inventory planning.
                </p>
                <p className="mb-8 leading-relaxed font-bold text-neutral-800">
                  Our model prioritizes efficiency. We synchronize production
                  with your delivery schedules to provide just-in-time
                  logistics, keeping your floor space clear and unwanted
                  inventory off your books.
                </p>
              </div>
              <Link
                href="/services/supply-chain"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
              >
                Let's Get Started{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. DESIGN: Studio Excellence */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Enterprise <br />
                <span className="text-blue-600">Design Studio.</span>
              </h2>
              <div className="prose prose-neutral prose-lg text-neutral-600">
                <p className="mb-6 leading-relaxed">
                  Great design shouldn't be reserved for the biggest brands. We
                  bring enterprise-level structural and graphic design
                  capabilities to your project. Whether it's a custom mold or a
                  unique label, we have the creative resources to make it
                  happen.
                </p>
                <p className="mb-8 leading-relaxed font-medium text-neutral-800">
                  We collaborate with top industrial designers and engineers to
                  ensure your packaging performs on the line and stands out on
                  the shelf.{" "}
                  <span className="text-blue-600 font-bold">
                    World-class creativity, accessible to you.
                  </span>
                </p>
              </div>
              <Link
                href="/services/design"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
              >
                See Our Work{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Image Right */}
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl border border-neutral-200">
              <img
                src="/design_studio_sketch.png"
                alt="Design Studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 shadow-inner"
              />
              <div className="absolute bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Factory className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. ACCOUNT MANAGEMENT: Professional Team */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image Left */}
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl order-2 lg:order-1 border border-neutral-200">
              <img
                src="/account_management_team.png"
                alt="Global Account Management"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Account <br />
                <span className="text-blue-600">Management.</span>
              </h2>
              <div className="prose prose-neutral prose-lg text-neutral-600">
                <p className="mb-6 leading-relaxed">
                  When you work with large distributors, you're often just an
                  account number. With PIF, you get a dedicated partner who
                  knows your business inside and out. We manage the vendor
                  relationships, the quality control, and the timeline.
                </p>
                <p className="mb-8 leading-relaxed font-bold text-neutral-800">
                  You get the purchasing power of a global corporation with the
                  personal attention of a boutique firm.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
              >
                Let's Talk{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
