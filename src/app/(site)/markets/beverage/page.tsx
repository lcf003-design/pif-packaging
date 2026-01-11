"use client";

import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Waves,
  Zap,
  ShieldCheck,
  ThermometerSnowflake,
  FileText,
} from "lucide-react";

export default function BeverageMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "beverage");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-neutral-950 min-h-screen font-sans selection:bg-cyan-500/30">
      {/* 1. HERO: THE PRESSURE CHAMBER */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 bg-[#02040a]">
          <Image
            src={market.image}
            alt="Beverage"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          {/* Deep Ocean Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent" />

          {/* CSS Micro-Bubbles Overlay */}
          <div className="absolute inset-0 opacity-30 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1600px] h-full flex flex-col justify-center">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-cyan-400/50 hover:text-cyan-400 mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Market Intelligence
          </Link>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-900/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Waves className="w-4 h-4" />
                <span>Liquid Dynamics Division</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
                Pressure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-600">
                  Perfect.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-cyan-100/60 font-light tracking-wide max-w-2xl leading-relaxed">
                From 87,000 PSI High Pressure Processing to 5.0 volumes of
                carbonation. We engineer packaging that handles the physics of
                thirst.
              </p>
            </div>

            {/* HUD Stat Card */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-8 rounded-sm max-w-sm">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <span className="text-xs font-mono text-cyan-500/50 uppercase tracking-widest">
                    System Check
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-cyan-500/30 rounded-full" />
                    <div className="w-1 h-1 bg-cyan-500/30 rounded-full" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-mono text-white mb-1">
                      5.0 <span className="text-sm text-neutral-500">VOL</span>
                    </div>
                    <div className="text-xs text-neutral-400 uppercase tracking-wider">
                      CO2 Retention
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-mono text-white mb-1">
                      87k <span className="text-sm text-neutral-500">PSI</span>
                    </div>
                    <div className="text-xs text-neutral-400 uppercase tracking-wider">
                      HPP Crush Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE INTELLIGENCE BRIEF - NEW SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1200px] relative z-20">
          <div className="group relative bg-[#0a101f] border border-cyan-500/20 p-12 lg:p-16 rounded-sm shadow-2xl hover:border-cyan-500/40 transition-all duration-500">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-cyan-500/30 -translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-cyan-500/30 translate-x-1 translate-y-1" />

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="prose prose-invert">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                    Technical Briefing
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Why 87,000 PSI Matters.
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed font-light">
                  <strong className="text-cyan-200">
                    High Pressure Processing (HPP)
                  </strong>{" "}
                  is the gold standard for cold-pressed juices, using immense
                  hydrostatic pressure to neutralize pathogens without heat.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed font-light mt-4">
                  But 87,000 PSI is{" "}
                  <strong className="text-white">six times the pressure</strong>{" "}
                  found at the bottom of the Mariana Trench. Standard bottles
                  collapse instantly. Our "Flex-Bottom" architecture is
                  engineered to compress by volume and then rebound to perfect
                  shape, ensuring your brand survives the chamber.
                </p>
              </div>

              <div className="relative h-64 md:h-full bg-black/50 border border-white/5 rounded-sm p-8 flex flex-col justify-center items-center text-center">
                <div className="text-6xl font-black text-white/10 mb-2 select-none group-hover:text-cyan-500/20 transition-colors">
                  PSI
                </div>
                <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest border-t border-cyan-500/50 pt-4 mt-2">
                  Hydrostatic Load
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE LAB: HPP VISUALIZATION */}
      <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-blue-500">
                  The PIF Solution
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Hydro-Shield <br /> Architecture.
              </h2>
              <p className="text-xl text-neutral-400 leading-relaxed mb-8">
                We don't fight the pressure; we work with it. Our heavy-wall PET
                preforms feature a specialized petaloid base that absorbs the
                15% volume reduction during HPP pasteurization and rebounds
                instantly.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "5.0 Volumes CO2 Rated",
                    subtitle: "Pressure Vessel Certification",
                    desc: "Our bases are reinforced to withstand 5.0 volumes of carbonation at 130°F without stress cracking or 'creep' (base expansion). Essential for high-carb energy drinks and sparkling waters.",
                  },
                  {
                    title: "HPP Elasticity Rebound",
                    subtitle: "Hydrostatic Memory Polymers",
                    desc: "Engineered high-elasticity resin blends allow the bottle to compress by 15% under 87,000 PSI load and instantly return to 100% of its original shape and volume upon depressurization.",
                  },
                  {
                    title: "Cold-Chain Impact Resistant",
                    subtitle: "Cryogenic Toughness",
                    desc: "Specialized PET resin blends prevent brittleness at sub-freezing temperatures. Drop-tested to survive 6ft falls onto concrete at -10°C.",
                  },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="group border border-white/5 bg-white/5 rounded-sm overflow-hidden open:bg-white/10 open:border-blue-500/50 transition-all duration-300"
                  >
                    <summary className="flex items-center gap-4 p-4 cursor-pointer select-none list-none">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] group-open:shadow-[0_0_15px_rgba(59,130,246,1)] group-open:scale-125 transition-all" />
                      <span className="text-sm font-mono text-neutral-300 uppercase tracking-wider group-hover:text-white transition-colors flex-1">
                        {item.title}
                      </span>
                      <div className="text-blue-500 transform group-open:rotate-180 transition-transform duration-300">
                        <Zap className="w-4 h-4" />
                      </div>
                    </summary>
                    <div className="px-4 pb-4 pl-9">
                      <div className="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">
                        {item.subtitle}
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Visual Side */}
            <div className="order-1 lg:order-2 relative aspect-[4/3] bg-neutral-900 border border-white/10 rounded-sm overflow-hidden group cursor-crosshair">
              {/* 1. Crushed State (Visible by default) */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0 pointer-events-none">
                <Image
                  src="/images/markets/beverage_hpp_crushed.png"
                  alt="HPP Failure"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-8 left-8">
                  <div className="font-mono text-xs text-red-500 bg-black/90 px-3 py-1 border border-red-500/50 inline-block mb-2">
                    ⚠️ FAILURE: 87,000 PSI CRUSH
                  </div>
                  <div className="text-white text-sm font-light opacity-80 max-w-xs">
                    Standard PET bottles buckle under hydrostatic load.
                  </div>
                </div>
              </div>

              {/* 2. Pristine State (Visible on Hover) */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <Image
                  src="/images/markets/beverage_hpp_pristine.png"
                  alt="HPP Integrity"
                  fill
                  className="object-cover"
                />
                {/* BUBBLES OVERLAY */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen animate-pulse" />

                <div className="absolute bottom-8 right-8 text-right">
                  <div className="font-mono text-xs text-cyan-400 bg-black/90 px-3 py-1 border border-cyan-500/50 inline-block mb-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    ✓ INTEGRITY: 100% REBOUND
                  </div>
                  <div className="text-white text-sm font-light opacity-80 max-w-xs ml-auto">
                    Hydro-Shield architecture withstands the chamber.
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 font-mono text-xs tracking-[0.3em] pointer-events-none group-hover:opacity-0">
                HOVER TO ACTIVATE HPP SHIELD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SHOWROOM (GRID) */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                The Cold Chain <br />
                <span className="text-neutral-500">Collection.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-12 bg-neutral-800" />
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                Series A // 2026
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-1">
            {/* Card 1 */}
            <div className="group relative aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden">
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-bold text-white">
                    Cold Press
                  </div>
                  <div className="font-mono text-[10px] text-cyan-500 border border-cyan-500/30 px-2 py-1 rounded-full">
                    HPP READY
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm mb-4">
                    Square footprint for max shelf density.
                  </p>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <Image
                src="/images/markets/beverage_cold_press.png"
                alt="Cold Press"
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Card 2 */}
            <div className="group relative aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden">
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-bold text-white">
                    Amber Kombucha
                  </div>
                  <div className="font-mono text-[10px] text-amber-500 border border-amber-500/30 px-2 py-1 rounded-full">
                    UV SHIELD
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm mb-4">
                    Protect live cultures from light strike.
                  </p>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <Image
                src="/images/markets/beverage_kombucha_amber.png"
                alt="Kombucha"
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Card 3 */}
            <div className="group relative aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden">
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-bold text-white">
                    Energy Sleek
                  </div>
                  <div className="font-mono text-[10px] text-purple-500 border border-purple-500/30 px-2 py-1 rounded-full">
                    5.0 VOL CO2
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm mb-4">
                    High-pressure base for carbonation.
                  </p>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <Image
                src="/images/markets/beverage_energy_sleek.png"
                alt="Energy"
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cyan-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Start Your Run.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors"
          >
            Quote This Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </section>
    </div>
  );
}
