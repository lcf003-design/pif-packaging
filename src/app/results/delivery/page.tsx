"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Truck,
  Globe,
  AlertTriangle,
  TrendingDown,
  Anchor,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// ASSETS
const ASSETS = {
  hero: "/delivery_hero_motion.png",
  warehouse: "/ops_warehouse.png",
};

export default function DeliveryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: Predictive Logistics */}
      <section
        ref={containerRef}
        className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-industrial-950"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-900/40 to-transparent z-10" />
          <Image
            src={ASSETS.hero}
            alt="Predictive Logistics"
            fill
            className="object-cover opacity-70"
            priority
          />
        </motion.div>

        <div className="relative z-20 text-center max-w-4xl px-6 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-berlin-red/10 border border-berlin-red/20 text-berlin-red text-sm font-bold uppercase tracking-widest mb-8 rounded-full animate-fade-in-up">
            <Clock size={16} />
            <span>Reliability Engineered</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight animate-fade-in-up delay-100">
            Predictive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Logistics.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-industrial-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            In a chaotic world, consistency is the ultimate currency. We
            organize the global timeline so you don't have to.
          </p>
        </div>
      </section>

      {/* 2. THE PROBLEM: The Broker Loop */}
      <section className="py-32 bg-industrial-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 mb-6">
              The Global Supply Chain is{" "}
              <span className="text-berlin-red underline decoration-4 decoration-berlin-red/20 underline-offset-4">
                Broken
              </span>
              .
            </h2>
            <p className="text-xl text-industrial-500 max-w-2xl mx-auto">
              Traditional brokers rely on a fragile chain of handoffs. One
              custom's delay or missing document creates a cascading blackout.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ProblemCard
              icon={AlertTriangle}
              title="Blind Hand-offs"
              desc="Factory → Broker → Agent → Distributor. Four separate entities, zero shared accountability."
            />
            <ProblemCard
              icon={Clock}
              title="The 14-Week Gap"
              desc="Standard manufacturing lead times leave you exposed to 3 months of market volatility."
            />
            <ProblemCard
              icon={Anchor}
              title="Customs Limbo"
              desc="Improper classification codes that leave inventory stranded at the port for weeks."
            />
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION: Comparative Timeline */}
      <section className="py-32 bg-industrial-950 text-white overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
                <span className="border-b-4 border-berlin-red pb-2">Chaos</span>{" "}
                <span className="text-gray-500 mx-1">vs.</span>{" "}
                <span className="border-b-4 border-berlin-blue pb-2">
                  Control
                </span>
              </h2>
            </div>
            <p className="text-xl text-blue-200 max-w-lg">
              Smarter inventory planning. Coordinated freight. More consistent
              outcomes.
            </p>
          </div>

          {/* Timeline Visual */}
          <div className="relative border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-8 md:p-16">
            {/* Top Track: Traditional */}
            <div className="mb-24 relative group">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-industrial-800 -z-10" />
              <div className="flex justify-between items-center text-sm md:text-base text-industrial-500 font-mono relative uppercase tracking-wider">
                <TimelineNode color="red" label="Order" />
                <TimelineNode color="gray" label="Broker" delay />
                <TimelineNode color="gray" label="Agent" delay />
                <TimelineNode color="gray" label="Customs" delay />
                <TimelineNode color="red" label="Arrival (?)" />
              </div>
              <div className="absolute -top-10 left-0 text-berlin-red font-bold text-xs tracking-[0.2em] border border-berlin-red/30 px-2 py-1 rounde">
                TRADITIONAL PATH
              </div>
            </div>

            {/* Bottom Track: PIF Direct */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-berlin-blue to-emerald-500 z-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
              <div className="flex justify-between items-center z-10 relative">
                {/* Global Stock */}
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-industrial-900 border-2 border-berlin-blue rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] z-10">
                    <Globe size={28} className="text-berlin-blue" />
                  </div>
                  <span className="font-bold text-white text-lg">
                    Global Stock
                  </span>
                </div>

                {/* Direct Line Text */}
                <div className="bg-industrial-950 px-6 py-2 border border-berlin-blue/30 rounded-full text-xs font-bold text-blue-200 uppercase tracking-widest shadow-xl z-10">
                  Direct Line
                </div>

                {/* Your Dock */}
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-500 border-4 border-industrial-900 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10">
                    <Truck size={28} className="text-industrial-950" />
                  </div>
                  <span className="font-bold text-white text-lg">
                    Your Dock
                  </span>
                </div>
              </div>

              <div className="absolute -top-10 left-0 text-berlin-blue font-bold text-xs tracking-[0.2em] border border-berlin-blue/30 px-2 py-1 rounded">
                PIF DIRECT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY BENEFITS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
              <div className="absolute inset-0 bg-industrial-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src={ASSETS.warehouse}
                alt="Managed Inventory"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-berlin-blue font-bold mb-6 uppercase tracking-wider text-sm">
                <ShieldCheck size={18} />
                <span>Risk Mitigation</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-10 leading-tight">
                Inventory Strategies <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-blue to-industrial-600">
                  That Absorb Shock.
                </span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="min-w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full text-industrial-900">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-industrial-900">
                      Vendor Managed Inventory (VMI)
                    </h4>
                    <p className="text-gray-600">
                      For select programs, we work with clients to analyze usage
                      patterns and explore inventory strategies that support
                      continuity of supply. Inventory structures are tailored by
                      project and aligned with demand, timing, and operational
                      needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="min-w-12 h-12 bg-gray-100 flex items-center justify-center rounded-full text-industrial-900">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-industrial-900">
                      Freight Strategy Support
                    </h4>
                    <p className="text-gray-600">
                      We help brands navigate freight planning by coordinating
                      with global logistics partners and leveraging informed
                      routing and timing decisions to manage cost and
                      volatility.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-industrial-100">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-berlin-red text-white font-bold hover:bg-red-700 transition-all rounded-full gap-3 shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
                >
                  Secure Your Supply Chain <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// SUB-COMPONENTS

function ProblemCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-10 rounded-xl shadow-lg border border-industrial-100 hover:shadow-xl hover:border-berlin-red/30 transition-all group">
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-berlin-red group-hover:text-white transition-colors duration-300">
        <Icon
          size={24}
          className="text-berlin-red group-hover:text-white transition-colors"
        />
      </div>
      <h3 className="text-xl font-bold text-industrial-900 mb-4">{title}</h3>
      <p className="text-industrial-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineNode({
  color,
  label,
  delay = false,
}: {
  color: "red" | "gray";
  label: string;
  delay?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-4 group cursor-default">
      <div
        className={`
        w-4 h-4 rounded-full border-2 transition-all duration-300 relative
        ${
          color === "red"
            ? "bg-berlin-red border-berlin-red"
            : "bg-industrial-800 border-industrial-600"
        }
        ${
          delay
            ? "group-hover:scale-125 group-hover:bg-berlin-red group-hover:border-berlin-red"
            : ""
        }
      `}
      >
        {delay && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-red-500 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            DELAY
          </div>
        )}
      </div>
      <span
        className={`text-sm tracking-widest ${
          color === "red"
            ? "text-white font-bold"
            : "text-industrial-600 group-hover:text-white transition-colors"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function BenefitRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-6 items-start">
      <div className="min-w-14 h-14 bg-blue-50 flex items-center justify-center rounded-2xl text-berlin-blue">
        <Icon size={28} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-industrial-900 mb-2">{title}</h4>
        <p className="text-industrial-600 leading-relaxed text-lg">{desc}</p>
      </div>
    </div>
  );
}
