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
  CheckCircle2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DeliveryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: Predictive Logistics */}
      <section
        ref={containerRef}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-industrial-900"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-900/60 mix-blend-multiply z-10" />
          <img
            src="/delivery_hero_motion.png"
            alt="Predictive Logistics"
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>

        <div className="relative z-20 text-center max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-berlin-red/90 text-white text-xs font-bold uppercase tracking-wider mb-6 rounded-sm">
            <Clock size={14} /> Reliability
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Predictive Logistics
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto mb-8">
            In a chaotic world, reliability is the ultimate luxury. We don't
            just ship packaging; we engineer the timeline.
          </p>
        </div>
      </section>

      {/* 2. THE PROBLEM: The Broker Loop */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-industrial-900 mb-4">
              The Global Supply Chain is{" "}
              <span className="text-red-600">Chaotic</span>
            </h2>
            <p className="text-lg text-gray-600">
              Traditional brokers rely on a fragile chain of handoffs. One delay
              at a port or a missing document at customs can trigger a 14-week
              blackout.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <AlertTriangle size={32} className="text-red-500" />,
                title: "Blind Hand-offs",
                desc: "Factory to Broker to Agent to Distributor. No one owns the whole chain.",
              },
              {
                icon: <Clock size={32} className="text-red-500" />,
                title: "The 14-Week Gap",
                desc: "Standard lead times leaves you exposed to stockouts and market shifts.",
              },
              {
                icon: <Globe size={32} className="text-red-500" />,
                title: "Customs Limbo",
                desc: "Improper coding or documentation can leave inventory stranded at the port.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-sm shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION: Comparative Timeline */}
      <section className="py-24 bg-industrial-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
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
          <div className="relative border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm p-8 md:p-12">
            {/* Top Track: Traditional */}
            <div className="mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10" />
              <div className="flex justify-between items-center text-sm md:text-base text-gray-400 font-mono relative">
                {/* Node 1 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
                  <span>Order</span>
                </div>
                {/* Node 2 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                  <span className="hidden md:inline">Broker</span>
                </div>
                {/* Node 3 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                  <span className="hidden md:inline">Agent</span>
                </div>
                {/* Node 4 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-600" />
                  <span className="hidden md:inline">Customs</span>
                </div>
                {/* Node 5 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span>Arrival (who knows when)</span>
                </div>
              </div>
              <div className="absolute -top-6 left-0 text-red-400 font-bold text-sm tracking-widest uppercase">
                Traditional Path
              </div>
            </div>

            {/* Bottom Track: PIF Direct */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-berlin-blue to-berlin-red z-0" />
              <div className="flex justify-between items-center z-10 relative">
                {/* Start */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-industrial-800 border-2 border-berlin-blue rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Globe size={20} />
                  </div>
                  <span className="font-bold text-white">Global Stock</span>
                </div>

                {/* Direct Line Text */}
                <div className="bg-industrial-900 px-4 py-1 border border-white/20 rounded-full text-xs font-bold text-blue-200 uppercase tracking-widest">
                  Factory Direct Line
                </div>

                {/* End */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-berlin-red border-2 border-white rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <Truck size={20} />
                  </div>
                  <span className="font-bold text-white">Your Dock</span>
                </div>
              </div>
              <div className="absolute -top-10 left-0 text-berlin-blue font-bold text-sm tracking-widest uppercase">
                PIF Direct
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY BENEFITS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] overflow-hidden rounded-sm shadow-xl group">
              <div className="absolute inset-0 bg-industrial-900/10 group-hover:bg-transparent transition-colors duration-500" />
              <img
                src="/ops_warehouse.png"
                alt="Managed Inventory"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
                Inventory Support{" "}
                <span className="text-berlin-blue">Options</span>
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
              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-berlin-red text-white font-bold hover:bg-red-700 transition-all rounded-sm gap-2"
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
