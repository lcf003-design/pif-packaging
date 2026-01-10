"use client";

import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Wine,
  Gem,
  Fingerprint,
  Sparkles,
  Search,
  GlassWater,
} from "lucide-react";
import { useState } from "react";

export default function SpiritsMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "spirits");
  const [sliderValue, setSliderValue] = useState(50); // 0 = Standard Flint, 100 = Super Flint

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-[#0c0a09] min-h-screen font-serif selection:bg-amber-600/30">
      {/* 1. HERO: THE ANGEL'S SHARE */}
      <section className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/spirits_hero_angels_share.png"
            alt="Viscous Gold"
            fill
            className="object-cover opacity-90 scale-105 animate-ken-burns-slow"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-black/40 to-black/60" />
          {/* Cinematic Grain */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1600px] h-full flex flex-col justify-center text-center">
          <Link
            href="/markets"
            className="absolute top-32 left-6 md:left-0 inline-flex items-center gap-2 text-amber-500/50 hover:text-amber-400 transition-colors text-xs font-sans uppercase tracking-[0.3em]"
          >
            <ArrowLeft className="w-3 h-3" /> The Library
          </Link>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-amber-600/30 rounded-full text-amber-500 text-xs font-sans font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md mb-8">
              <Sparkles className="w-3 h-3" />
              <span>Distilled Heritage Series</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-medium text-[#f5f5f0] tracking-tight leading-[0.9]">
              The Angel's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 font-serif italic pr-4">
                Share.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#a8a29e] font-sans font-light tracking-wide max-w-2xl mx-auto leading-relaxed opacity-80">
              When the liquid is precious, the vessel must be worthy. We craft
              heavy-base <strong>Super Flint</strong> glass that captures light
              and commands the top shelf.
            </p>

            <div className="flex justify-center gap-6 pt-8">
              <button className="px-8 py-4 bg-amber-700 hover:bg-amber-600 text-black font-sans font-bold uppercase tracking-widest transition-colors">
                View The Collection
              </button>
              <button className="px-8 py-4 border border-amber-800 text-amber-500 font-sans font-bold uppercase tracking-widest hover:bg-amber-900/20 transition-colors">
                Request Samples
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPTICAL CLARITY: THE REFRACTION TEST */}
      <section className="py-32 bg-[#0c0a09] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Interactive Slider */}
            {/* Interactive Slider */}
            <div
              className="relative group cursor-ew-resize select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(e.clientX - rect.left, rect.width)
                );
                const percentage = (x / rect.width) * 100;
                setSliderValue(percentage);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(e.touches[0].clientX - rect.left, rect.width)
                );
                const percentage = (x / rect.width) * 100;
                setSliderValue(percentage);
              }}
            >
              <div className="aspect-[4/3] relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                {/* Layer 1: Super Flint (Base - Clean) */}
                <Image
                  src="/images/markets/spirits_glass_super.png"
                  alt="Super Flint Crystal"
                  fill
                  className="object-cover"
                />

                {/* Layer 2: Standard Flint (Overlay - Real Photo) */}
                <div
                  className="absolute inset-0 z-10 overflow-hidden"
                  style={{
                    clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`,
                  }}
                >
                  <Image
                    src="/images/markets/spirits_glass_standard.png"
                    alt="Standard Flint"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Slider Handle */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/50 backdrop-blur-md"
                    style={{ left: `${sliderValue}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white bg-black/20 backdrop-blur flex items-center justify-center shadow-lg">
                      <div className="w-0.5 h-3 bg-white/80 rounded-full mx-0.5" />
                      <div className="w-0.5 h-3 bg-white/80 rounded-full mx-0.5" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-6 left-6 z-20 text-xs text-emerald-100 font-sans uppercase tracking-widest font-bold drop-shadow-md">
                  Standard Flint
                </div>
                <div className="absolute bottom-6 right-6 z-20 text-xs text-amber-100 font-sans uppercase tracking-widest font-bold text-right drop-shadow-md">
                  Super Flint Crystal
                </div>
              </div>

              <div className="absolute -bottom-10 left-0 w-full flex justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-sans animate-pulse">
                  Drag to Compare
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gem className="w-5 h-5 text-amber-500" />
                <span className="font-sans text-xs text-amber-600 uppercase tracking-widest">
                  Material Science
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-medium text-white mb-8 leading-tight">
                Clarity is <br />
                <span className="italic text-amber-700">Currency.</span>
              </h2>

              <p className="text-lg text-[#a8a29e] font-sans leading-relaxed mb-8">
                Cheap glass has a green "bloom" and wavy uneven walls that
                distort your product's color. Our <strong>Super Flint</strong>{" "}
                formulation removes iron impurities, resulting in optical
                neutrality that rivals crystal.
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-serif text-white mb-1">
                    98<span className="text-sm align-top">%</span>
                  </div>
                  <div className="text-xs text-neutral-500 font-sans uppercase tracking-widest">
                    Light Transmission
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-white mb-1">
                    0.0<span className="text-sm align-top">%</span>
                  </div>
                  <div className="text-xs text-neutral-500 font-sans uppercase tracking-widest">
                    Iron Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE TOP SHELF (Bar Background) */}
      <section className="py-32 relative bg-[#1c1917]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/spirits_bar_shelf_background.png"
            alt="Speakeasy Bar"
            fill
            className="object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1917] via-[#1c1917]/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <h2 className="text-4xl font-medium text-white mb-16 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-amber-600" />
            The Reserve Collection
          </h2>

          {/* Horizontal Scroll Deck */}
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
            {/* Card 1: The Decanter */}
            <div className="min-w-[350px] bg-black/40 border border-white/5 backdrop-blur-md p-8 group hover:border-amber-600/50 transition-colors snap-center">
              <div className="aspect-[3/5] relative mb-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/markets/spirits_bottle_heavyweight.png"
                    alt="The Heavyweight Bottle"
                    fill
                    className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-500 transform group-hover:-translate-y-2"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">
                The Heavyweight
              </h3>
              <p className="text-sm text-neutral-400 font-sans mb-6">
                Thick 20mm base (punt) for maximum shelf dominance. Ideal for
                Whiskey and Scotch.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  750ml
                </span>
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  GPI 33-400
                </span>
              </div>
            </div>

            {/* Card 2: The Botanical */}
            <div className="min-w-[350px] bg-black/40 border border-white/5 backdrop-blur-md p-8 group hover:border-amber-600/50 transition-colors snap-center">
              <div className="aspect-[3/5] relative mb-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/markets/spirits_bottle_botanical.png"
                    alt="The Botanical Bottle"
                    fill
                    className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-500 transform group-hover:-translate-y-2"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">
                The Botanical
              </h3>
              <p className="text-sm text-neutral-400 font-sans mb-6">
                Pharmacy-style shoulders with high flint clarity. Perfect for
                Gin and Vodka.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  750ml
                </span>
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  Cork Finish
                </span>
              </div>
            </div>

            {/* Card 3: The Artisan */}
            <div className="min-w-[350px] bg-black/40 border border-white/5 backdrop-blur-md p-8 group hover:border-amber-600/50 transition-colors snap-center">
              <div className="aspect-[3/5] relative mb-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/markets/spirits_bottle_artisan.png"
                    alt="The Artisan Bottle"
                    fill
                    className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-500 transform group-hover:-translate-y-2"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">
                The Artisan
              </h3>
              <p className="text-sm text-neutral-400 font-sans mb-6">
                Short, stout, and cubist. A modern statement for Tequila and
                Rum.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  750ml
                </span>
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  Bar Top
                </span>
              </div>
            </div>

            {/* Card 4: The Closure */}
            <div className="min-w-[350px] bg-black/40 border border-white/5 backdrop-blur-md p-8 group hover:border-amber-600/50 transition-colors snap-center">
              <div className="aspect-[3/5] relative mb-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/markets/spirits_closures.png"
                    alt="Bespoke Closures"
                    fill
                    className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-500 transform group-hover:-translate-y-2 scale-110"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">
                Bespoke Closures
              </h3>
              <p className="text-sm text-neutral-400 font-sans mb-6">
                Wood, Zamac, and Glass stoppers. Laser engraved with your
                distillery's insignia.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-wider text-neutral-300">
                  Custom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PROVENANCE REPORT: EDITORIAL SECTION */}
      <section className="py-32 bg-[#0c0a09] relative z-10 overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="max-w-4xl">
            <div className="text-amber-500 font-sans text-xs uppercase tracking-[0.4em] mb-12 font-bold flex items-center gap-4">
              <span className="w-8 h-[1px] bg-amber-500" />
              Expertise Series 004
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-[#f5f5f0] mb-16 leading-[1.1] tracking-tight">
              The Provenance Report: <br />
              <span className="italic text-amber-600/80">
                The Economics of the Shelf.
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div className="space-y-12">
                <div className="group">
                  <h3 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-4 border-b border-amber-900/30 pb-2 group-hover:border-amber-600/50 transition-colors">
                    01. The Psychology of Weight
                  </h3>
                  <p className="text-[#a8a29e] font-sans leading-relaxed text-lg">
                    Neuro-marketing studies confirm that consumers
                    subconsciously equate "physical weight" with "liquid value."
                    A 100g increase in base weight commands a significant retail
                    premium, regardless of the juice inside. We engineer paged
                    bases that provide the requisite "thud" for top-shelf
                    dominance.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-4 border-b border-amber-900/30 pb-2 group-hover:border-amber-600/50 transition-colors">
                    02. Refractive Integrity
                  </h3>
                  <p className="text-[#a8a29e] font-sans leading-relaxed text-lg">
                    Color is the spirit's first communication. Standard glass is
                    a filter that adds a greenish "bloom," distorting the
                    natural amber of a bourbon or the botanicals of a gin. Our
                    Super Flint is a window—optically neutral glass that ensures
                    the true artisanal color is never compromised.
                  </p>
                </div>
              </div>

              <div className="space-y-12 md:pt-24">
                <div className="group">
                  <h3 className="text-white font-sans font-bold uppercase tracking-widest text-sm mb-4 border-b border-amber-900/30 pb-2 group-hover:border-amber-600/50 transition-colors">
                    03. Physical Cryptography
                  </h3>
                  <p className="text-[#a8a29e] font-sans leading-relaxed text-lg">
                    In the secondary market, the bottle is the contract of
                    trust. Bespoke mold design with complex cartouches and
                    intricate textures acts as physical cryptography—making your
                    brand exponentially harder to replicate and securing your
                    value chain from counterfeit.
                  </p>
                </div>

                <div className="p-8 border-l border-amber-700/30 bg-amber-950/5">
                  <p className="italic text-amber-200/60 font-serif text-xl leading-relaxed">
                    "Packaging is the only marketing medium that follows the
                    customer home. In spirits, it is the silent sommelier that
                    speaks from the shelf."
                  </p>
                  <div className="mt-4 text-xs font-sans uppercase tracking-widest text-amber-500/50">
                    — Director of Spirits Strategy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE SOMMELIER'S MANUAL: TECHNICAL LEXICON */}
      <section className="py-32 bg-[#1c1917] relative z-10">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid lg:grid-cols-3 gap-16 border-y border-amber-900/20 py-24">
            <div className="space-y-6">
              <h3 className="text-amber-500 font-sans text-xs uppercase tracking-[0.3em] font-bold">
                Material Integrity
              </h3>
              <h4 className="text-3xl font-serif text-white leading-tight">
                The Sanctuary of <br />
                <span className="italic text-amber-700">Inert Mediums.</span>
              </h4>
              <p className="text-[#a8a29e] font-sans leading-relaxed">
                Glass remains the gold standard of the distilled world.
                Nonporous and impermeable, it acts as an absolute sanctuary,
                shielding precious flavor profiles from oxidation and
                contamination. When the liquid is fragile—like an aged brandy or
                vintage scotch—the vessel must be a vault. For high-velocity
                sectors like airlines and hospitality, our clear resins offer a
                resilient, impact-resistant alternative without compromising
                visual clarity.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-amber-500 font-sans text-xs uppercase tracking-[0.3em] font-bold">
                An Architectural Lexicon
              </h3>
              <h4 className="text-3xl font-serif text-white leading-tight">
                Form as <br />
                <span className="italic text-amber-700">Brand Language.</span>
              </h4>
              <p className="text-[#a8a29e] font-sans leading-relaxed">
                From the classic narrowed bottom of a wine-inspired spirit to
                the stout, cubist authority of a square whiskey decanter, shape
                is the primary dialect of luxury. We offer a library of
                forms—including textured exteriors for enhanced tactile grip and
                vintage bale-wire swing tops—designed to command attention
                during the pour. Every curve and push-up base is a calculated
                decision in brand narrative.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-amber-500 font-sans text-xs uppercase tracking-[0.3em] font-bold">
                The Final Signature
              </h3>
              <h4 className="text-3xl font-serif text-white leading-tight">
                Closures & <br />
                <span className="italic text-amber-700">Security.</span>
              </h4>
              <p className="text-[#a8a29e] font-sans leading-relaxed">
                The relationship between bottle and consumer begins at the
                closure. Whether utilizing bar-top corks for that satisfying
                audible "pop" of quality or employing tin pilfer-proof (RPP)
                caps for absolute tamper-evident security, the closure is the
                final signature of trust. Our ecosystem includes
                precision-pourers and threaded seals that protect the liquid's
                integrity from the first crack to the final drop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DETAIL: BESPOKE EMBOSSING */}
      <section className="py-24 bg-[#0c0a09] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="text-amber-500 font-sans text-xs uppercase tracking-widest mb-4 font-bold">
                Tactile Branding
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">
                Make Your Mark <br />
                <span className="italic text-neutral-500">Permanent.</span>
              </h2>
              <p className="text-lg text-[#a8a29e] font-sans leading-relaxed mb-8">
                Paper labels peel. Embossing is forever. Our mold engineering
                team allows for intricate 360° embossing, debuted cartouches,
                and tactile textures that consumers can feel before they even
                pour.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Fingerprint className="w-6 h-6 text-amber-700 mt-1" />
                  <div>
                    <div className="text-white font-bold font-sans uppercase tracking-wide text-sm">
                      Tactile Memory
                    </div>
                    <div className="text-neutral-500 text-sm">
                      Consumers associate weight and texture with premium value.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Search className="w-6 h-6 text-amber-700 mt-1" />
                  <div>
                    <div className="text-white font-bold font-sans uppercase tracking-wide text-sm">
                      Anti-Counterfeit
                    </div>
                    <div className="text-neutral-500 text-sm">
                      Complex embossing makes your bottle nearly impossible to
                      replicate.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-square">
                <Image
                  src="/images/markets/spirits_embossing_detail.png"
                  alt="Embossing Detail"
                  fill
                  className="object-cover rounded-sm shadow-2xl skew-y-3"
                />
                <div className="absolute -bottom-8 -right-8 bg-amber-600 text-black px-8 py-4 font-bold font-sans uppercase tracking-widest z-20">
                  Custom Mold: Contact Us
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
