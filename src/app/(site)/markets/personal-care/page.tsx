"use client";

import { MARKETS_DATA, Market } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Sparkles,
  Repeat,
  Palette,
  ScanFace,
  Fingerprint,
} from "lucide-react";

export default function PersonalCareMarketPage() {
  const market = MARKETS_DATA.find((m: Market) => m.slug === "personal-care");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-rose-100 selection:text-berlin-blue">
      {/* 1. HERO: THE RITUAL - HIGH KEY STUDIO */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt="Beauty & Personal Care"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1600px] text-center">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-xs font-mono tracking-[0.3em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> CatalogPrime Intelligence
          </Link>

          <h1 className="text-7xl md:text-[9rem] font-black text-white mb-6 tracking-tighter leading-[0.85] uppercase">
            Beauty & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">
              Personal Care.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 font-light tracking-wide max-w-3xl mx-auto leading-relaxed mb-12">
            Where clinical efficacy meets luxury shelf appeal. We engineer
            medical-grade dispensing systems wrapped in award-winning
            aesthetics.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-berlin-blue font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors shadow-2xl">
              Start Your Project
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white/30 font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
              Request Samples
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE TRIAD OF DISTINCTION (Capabilities) */}
      <section className="py-32 bg-white relative z-10">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-berlin-blue mb-4 tracking-tight uppercase">
              Strategic Capabilities
            </h2>
            <div className="w-24 h-1 bg-rose-300 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Bespoke */}
            <div className="group relative h-[500px] bg-white overflow-hidden border border-neutral-100 transition-all duration-500 hover:border-rose-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-900/5">
              {/* Text Section - Top 40% */}
              <div className="absolute top-0 left-0 right-0 h-[40%] p-10 z-10 flex flex-col justify-start gap-4 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-berlin-blue mb-2 uppercase tracking-tighter">
                    Bespoke <br /> Development
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px]">
                    From napkin sketch to rapid prototype in 72 hours.
                  </p>
                </div>
              </div>
              {/* Image Section - Bottom 60% */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%]">
                <Image
                  src="/images/markets/personal_care_bespoke.png"
                  alt="Bespoke Development"
                  fill
                  className="object-contain object-bottom p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>

            {/* Card 2: Refill */}
            <div className="group relative h-[500px] bg-white overflow-hidden border border-neutral-100 transition-all duration-500 hover:border-rose-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-900/5">
              <div className="absolute top-0 left-0 right-0 h-[40%] p-10 z-10 flex flex-col justify-start gap-4 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Repeat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-berlin-blue mb-2 uppercase tracking-tighter">
                    Reuse & Refill <br /> Systems
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px]">
                    Loop-ready architectures and intuitive refill cartridges.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[60%]">
                <Image
                  src="/images/markets/personal_care_refill.png"
                  alt="Refill Systems"
                  fill
                  className="object-contain object-bottom p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>

            {/* Card 3: Decoration */}
            <div className="group relative h-[500px] bg-white overflow-hidden border border-neutral-100 transition-all duration-500 hover:border-rose-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-rose-900/5">
              <div className="absolute top-0 left-0 right-0 h-[40%] p-10 z-10 flex flex-col justify-start gap-4 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-berlin-blue mb-2 uppercase tracking-tighter">
                    Decoration & <br /> Finishing
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px]">
                    Soft-touch coatings, hot-stamping, and metallic gradients.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[60%]">
                <Image
                  src="/images/markets/personal_care_decoration.png"
                  alt="Decoration"
                  fill
                  className="object-contain object-bottom p-4 transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORM & FUNCTION (Primary vs Secondary) */}
      <section className="py-24 bg-[#f8f8f8] border-y border-neutral-200">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Primary Packaging - Function */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-white rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <ScanFace className="w-5 h-5 text-rose-500" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Primary Packaging
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-berlin-blue mb-6 tracking-tight">
                  Airless <br /> Architecture.
                </h2>
                <div className="relative aspect-square bg-white border border-neutral-200 mb-8 p-12 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/markets/personal_care_airless_xray.png"
                    alt="Airless Pump Mechanism"
                    fill
                    className="object-contain p-12 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Tech Specs Overlay */}
                  <div className="absolute top-6 right-6 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      Dosage
                    </div>
                    <div className="text-xl font-bold text-berlin-blue">
                      0.20cc
                    </div>
                  </div>
                </div>
                <p className="text-lg text-neutral-500 leading-relaxed font-light">
                  When it touches the skin, it must be pure. Our airless systems
                  prevent oxidation of sensitive retinols and Vitamin C serums,
                  ensuring the formula works as hard as the package looks.
                </p>
                <div className="mt-8">
                  <Link
                    href="/catalog/airless"
                    className="text-berlin-blue font-bold uppercase tracking-widest text-xs border-b-2 border-rose-300 hover:border-berlin-blue transition-colors pb-1"
                  >
                    View The Catalog
                  </Link>
                </div>
              </div>
            </div>

            {/* Secondary Packaging - Experience */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-white rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Fingerprint className="w-5 h-5 text-rose-500" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Secondary Packaging
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-berlin-blue mb-6 tracking-tight">
                  The Unboxing <br /> Experience.
                </h2>
                <div className="relative aspect-square bg-white border border-neutral-200 mb-8 p-12 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/markets/personal_care_unboxing.png"
                    alt="Secondary Packaging"
                    fill
                    className="object-contain p-12 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      Finish
                    </div>
                    <div className="text-xl font-bold text-berlin-blue">
                      Soft-Touch
                    </div>
                  </div>
                </div>
                <p className="text-lg text-neutral-500 leading-relaxed font-light">
                  The first physical touchpoint of your brand. Rigid setup
                  boxes, intricate folding cartons, and textured substrates that
                  create anticipation before the product is even revealed.
                </p>
                <div className="mt-8">
                  <Link
                    href="/services/design"
                    className="text-berlin-blue font-bold uppercase tracking-widest text-xs border-b-2 border-rose-300 hover:border-berlin-blue transition-colors pb-1"
                  >
                    Explore Studio Design
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE APOTHECARY (Category Grid) */}
      {market.browseCategories && (
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 max-w-[1600px]">
            <div className="mb-24 flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-black text-berlin-blue mb-4 tracking-tight uppercase">
                  The Apothecary
                </h2>
                <p className="text-neutral-500">
                  Curated vessels for every formulation type.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                Live Inventory
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100">
              {market.browseCategories.map(
                (item: { title: string; image: string }, i: number) => (
                  <div
                    key={i}
                    className="group bg-white p-8 md:p-12 hover:z-10 relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[3/4] mb-8 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-berlin-blue mb-2 group-hover:text-rose-500 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-mono text-neutral-400 uppercase">
                        View Catalog
                      </span>
                      <ArrowRight className="w-4 h-4 text-rose-500" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. INNOVATION SPOTLIGHT (Flagship Project) */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest mb-8 border border-rose-400/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Flagship Project
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">
                Dual-Chamber <br /> Precision.
              </h2>
              <p className="text-xl text-neutral-400 leading-relaxed font-light mb-8">
                For formulations that require mixing at the moment of
                application. We engineered a custom 30ml dual-chamber airless
                system that dispenses two viscous serums in a perfect 1:1 ratio
                with a single actuation.
              </p>
              <div className="grid grid-cols-3 gap-8 mb-12 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">1:1</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">
                    Ratio Accuracy
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">
                    100<span className="text-sm">%</span>
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">
                    Airless Seal
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">
                    2<span className="text-sm">x</span>
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">
                    Shelf Life
                  </div>
                </div>
              </div>
              <Link
                href="/case-studies/dual-chamber-precision"
                className="inline-block text-white border-b border-rose-400 pb-1 hover:text-rose-400 transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Read The Case Study
              </Link>
            </div>
            <div className="relative aspect-square bg-[#1a1a1a] rounded-full overflow-hidden border border-white/5 shadow-2xl">
              <Image
                src="/images/markets/1personal_care_dual_chamber.png"
                alt="Dual Chamber Innovation"
                fill
                className="object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. GLOBAL INFRASTRUCTURE (Services) */}
      {/* 
          Note: This would typically be an accordion component, 
          but for simplicity in this view we'll use a static grid layout
          that mimics the structure of the Service Layer plan. 
      */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid md:grid-cols-4 gap-12 border-t border-neutral-200 pt-16">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-black text-berlin-blue uppercase tracking-tight">
                Global <br /> Infrastructure
              </h2>
            </div>
            <div className="md:col-span-3 grid md:grid-cols-3 gap-8">
              <div className="group">
                <h3 className="text-lg font-bold text-berlin-blue mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-400 rounded-full" />
                  Design & Innovation
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  Studio One Eleven comprises industrial designers, engineers,
                  and brand strategists. We don&apos;t just design bottles; we
                  design user experiences.
                </p>
                <Link
                  href="/services/design"
                  className="text-xs font-bold text-neutral-400 uppercase tracking-widest group-hover:text-berlin-blue transition-colors"
                >
                  Explore Studio &rarr;
                </Link>
              </div>
              <div className="group">
                <h3 className="text-lg font-bold text-berlin-blue mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-400 rounded-full" />
                  Global Sourcing
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  With feet on the ground in China, Europe, and the Americas, we
                  navigate the geopolitical landscape to secure the best cost of
                  goods without compromising quality.
                </p>
                <Link
                  href="/services/sourcing"
                  className="text-xs font-bold text-neutral-400 uppercase tracking-widest group-hover:text-berlin-blue transition-colors"
                >
                  View Network &rarr;
                </Link>
              </div>
              <div className="group">
                <h3 className="text-lg font-bold text-berlin-blue mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-400 rounded-full" />
                  Quality Assurance
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  Regulatory grade. Our labs test for chemically aggressive
                  bulk, vacuum leakage, and drop-test durability before a single
                  unit ships.
                </p>
                <Link
                  href="/services/quality"
                  className="text-xs font-bold text-neutral-400 uppercase tracking-widest group-hover:text-berlin-blue transition-colors"
                >
                  See The Lab &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-24 bg-rose-50 text-berlin-blue relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
            Elevate Your Brand.
          </h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto font-light">
            Ready to disrupt the shelf? Let&apos;s engineer a packaging program
            that performs as beautifully as it looks.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-berlin-blue text-white font-bold text-lg uppercase tracking-widest hover:bg-neutral-900 transition-colors shadow-2xl"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
