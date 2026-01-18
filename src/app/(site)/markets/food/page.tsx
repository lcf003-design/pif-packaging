"use client";

import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Flame,
  ShieldCheck,
  ThermometerSun,
  Utensils,
  Scale,
} from "lucide-react";

export default function FoodMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "food");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-neutral-50 min-h-screen font-sans selection:bg-orange-500/30">
      {/* 1. HERO: THE HOT FILL PASS */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/food_hot_fill_hero.png"
            alt="Hot Fill Steam"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          {/* Subtle Grain for Cinematic Feel */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1600px] h-full flex flex-col justify-center">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Culinary Logistics
          </Link>

          <div className="grid lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
                <ChefHat className="w-4 h-4" />
                <span>Chef-Grade Packaging</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
                Respect The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                  Recipe.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-2xl leading-relaxed">
                From the pot to the package at 185°F. We engineer Heat-Set PET
                that handles the thermal shock of the kitchen without
                compromising clarity or flavor.
              </p>
            </div>

            {/* HUD Stat Card - Stainless Steel Look */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="bg-[#e2e2e5] border border-white/50 p-8 rounded-sm shadow-2xl max-w-sm w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-multiply" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      Thermal Rating
                    </span>
                    <ThermometerSun className="w-5 h-5 text-red-600 animate-pulse" />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-5xl font-mono text-neutral-900 mb-1 font-bold">
                        185<span className="text-2xl align-top">°F</span>
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider font-bold">
                        Hot Fill Capable
                      </div>
                    </div>
                    <div>
                      <div className="text-5xl font-mono text-neutral-900 mb-1 font-bold">
                        100<span className="text-2xl align-top">x</span>
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider font-bold">
                        Oxygen Barrier (EVOH)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE: THERMAL SHOCK & OXIDATION */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-6 h-6 text-red-600" />
                <span className="font-mono text-xs text-red-600 uppercase tracking-widest">
                  The Kitchen Reality
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tight">
                Don&apos;t Let The <br /> Package Spoil The Sauce.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                In a professional kitchen, speed is everything. Waiting for
                sauces to cool before bottling kills efficiency. But standard
                plastic (&quot;Cold Fill&quot; PET) begins to warp and deform at
                just <strong>140°F</strong>.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Worse, once on the shelf, standard plastic breathes. Oxygen
                seeps in, turning your vibrant red marinara into a dull,
                oxidized brown in weeks.
              </p>

              {/* Technical Accordions */}
              <div className="space-y-4">
                {[
                  {
                    title: "185°F Heat-Set Technology",
                    subtitle: "Thermal Stability Matrix",
                    desc: "Our 'Heat-Set' process crystallizes the resin, allowing it to withstand fill temperatures up to 185°F (85°C) without vacuum paneling or deformation. Pour straight from the kettle.",
                  },
                  {
                    title: "EVOH Oxygen Shield",
                    subtitle: "100x Barrier Performance",
                    desc: "We co-inject a microscopic layer of Ethylene Vinyl Alcohol (EVOH) between PET layers. This blocks oxygen ingress 100 times better than standard PET, preserving color and Vitamin C.",
                  },
                  {
                    title: "Vacuum Panel Base",
                    subtitle: "Cooling Contraction Control",
                    desc: "As hot liquid cools, it contracts, creating internal vacuum. Our specialized base flexes inward to absorb this pressure, keeping the sidewalls perfectly round for labeling.",
                  },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="group border border-neutral-200 bg-neutral-50 rounded-sm overflow-hidden open:bg-white open:shadow-lg transition-all duration-300"
                  >
                    <summary className="flex items-center gap-4 p-4 cursor-pointer select-none list-none hover:bg-neutral-100 transition-colors">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full group-open:scale-125 transition-transform" />
                      <span className="text-sm font-bold text-neutral-700 uppercase tracking-wider flex-1">
                        {item.title}
                      </span>
                      <div className="text-red-500 transform group-open:rotate-180 transition-transform duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </summary>
                    <div className="px-4 pb-4 pl-9">
                      <div className="text-xs font-bold text-red-500 mb-1 uppercase tracking-widest">
                        {item.subtitle}
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* VISUAL COMPARISON: SLIDER CONCEPT SIMULATION via CSS */}
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl group border border-neutral-200">
                {/* 1. FAILURE STATE (Default) */}
                <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 pointer-events-none bg-[#f0f0f0]">
                  <Image
                    src="/images/markets/food_thermal_failure.png"
                    alt="Thermal Failure"
                    fill
                    className="object-cover mix-blend-multiply"
                  />
                  <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-2 border-l-4 border-red-600 shadow-sm">
                    <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
                      Standard PET
                    </div>
                    <div className="text-2xl font-black text-neutral-900">
                      140°F
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      WARPED & OXIDIZED
                    </div>
                  </div>
                </div>

                {/* 2. SUCCESS STATE (Hover) */}
                <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 bg-white">
                  <Image
                    src="/images/markets/food_heat_set_success.png"
                    alt="Heat Set Success"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur px-4 py-2 border-r-4 border-green-600 shadow-sm text-right">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                      PIF Heat-Set
                    </div>
                    <div className="text-2xl font-black text-neutral-900">
                      185°F
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      CRYSTALLINE & VIBRANT
                    </div>
                  </div>

                  {/* Steam Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent mix-blend-overlay pointer-events-none" />
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest pointer-events-none transition-opacity group-hover:opacity-0 backdrop-blur-md">
                  Hover to Apply 185°F Heat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PANTRY (Showroom Grid) */}
      <section className="py-32 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                The Mise en Place.
              </h2>
              <p className="text-neutral-400 max-w-lg">
                A curated selection of thermal-stable vessels for the modern
                larder.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                Collection 2026
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Item 1 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square bg-[#222] rounded-sm overflow-hidden mb-6 border border-white/5 group-hover:border-orange-500/50 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                  {/* Placeholder for Pantry Image if not generated, reusing assets/icons or specific images */}
                  <Image
                    src="/images/markets/food_hot_fill_jar.png"
                    alt="Mason"
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="inline-flex items-center gap-2 bg-orange-600/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                    <Flame className="w-3 h-3" /> 185°F Rated
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                Artisan Mason
              </h3>
              <p className="text-neutral-500 text-sm">
                Classic aesthetic with Heat-Set performance.
              </p>
            </div>

            {/* Item 2 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square bg-[#222] rounded-sm overflow-hidden mb-6 border border-white/5 group-hover:border-orange-500/50 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                  <Image
                    src="/images/markets/food_barrier_squeeze.png"
                    alt="Squeeze"
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="inline-flex items-center gap-2 bg-green-600/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                    <ShieldCheck className="w-3 h-3" /> EVOH Barrier
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                Barrier Squeeze
              </h3>
              <p className="text-neutral-500 text-sm">
                Multi-layer protection for oxygen-sensitive sauces.
              </p>
            </div>

            {/* Item 3 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-square bg-[#222] rounded-sm overflow-hidden mb-6 border border-white/5 group-hover:border-orange-500/50 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                  <Image
                    src="/images/markets/food_spice_grinder.png"
                    alt="Grinder"
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="inline-flex items-center gap-2 bg-neutral-600/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                    <Scale className="w-3 h-3" /> Precision Mill
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                Master Grinder
              </h3>
              <p className="text-neutral-500 text-sm">
                Ceramic core mechanism for consistent grain size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHEF'S KNOWLEDGE (Education) */}
      <section className="py-32 bg-neutral-100 border-t border-neutral-200">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex items-center gap-3 mb-12">
            <ChefHat className="w-6 h-6 text-neutral-400" />
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              Kitchen Intelligence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-24 tracking-tight max-w-4xl">
            Know Your Ingredients. <br />
            <span className="text-neutral-400">And Your Vessels.</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card A: Mise en Place */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-neutral-200 group hover:shadow-xl transition-all duration-500">
              <div className="relative aspect-video mb-8 overflow-hidden bg-neutral-100 rounded-sm">
                <Image
                  src="/images/markets/food_mise_en_place_shapes.png"
                  alt="Mise en Place Shapes"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-mono">
                  A
                </span>
                Mise en Place
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Just as you prep ingredients, we prep vessels. From precision{" "}
                <strong>spice grinders</strong> for finishing salts to{" "}
                <strong>bulk tubs</strong> for heavy prep, our catalog covers
                every station in the kitchen.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                  Precision Dosing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                  Volume Prep
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                  Finishing Touch
                </li>
              </ul>
            </div>

            {/* Card B: Elemental Ingredients */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-neutral-200 group hover:shadow-xl transition-all duration-500">
              <div className="relative aspect-video mb-8 overflow-hidden bg-neutral-100 rounded-sm">
                <Image
                  src="/images/markets/food_material_textures.png"
                  alt="Material Textures"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-mono">
                  B
                </span>
                Active Ingredients
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-6">
                We treat polymers like salt, fat, acid, and heat.{" "}
                <strong>PET</strong> for retail clarity, <strong>PP</strong> for
                microwave durability, and layered <strong>EVOH</strong> for
                oxygen defense.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 font-mono">
                <li className="flex items-center gap-2">
                  <span className="text-neutral-400">Target:</span> Heat
                  Resistance (PP)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-neutral-400">Target:</span> Crystal
                  Clarity (PET)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-neutral-400">Target:</span> Oxygen
                  Barrier (EVOH)
                </li>
              </ul>
            </div>

            {/* Card C: Commissary */}
            <div className="bg-white p-8 rounded-sm shadow-sm border border-neutral-200 group hover:shadow-xl transition-all duration-500">
              <div className="relative aspect-video mb-8 overflow-hidden bg-neutral-100 rounded-sm">
                <Image
                  src="/images/markets/food_commissary_warehouse.png"
                  alt="Commissary Warehouse"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-mono">
                  C
                </span>
                The Commissary
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Your pantry should never run dry. Our{" "}
                <strong>Wholesale Logistics</strong> network operates like a
                master commissary, ensuring your &quot;mise en place&quot; is
                stocked and ready for service, globally.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 font-mono">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" /> ISO
                  Certified Storage
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" /> Cold
                  Chain Capable
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" />{" "}
                  Just-In-Time Prep
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-neutral-900 border-t border-neutral-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Ready to Plate?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-xl"
          >
            Sample Our Kitchen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
