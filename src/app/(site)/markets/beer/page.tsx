import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Droplets,
  Box,
  Factory,
} from "lucide-react";

export default function BeerMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "beer");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-berlin-red selection:text-white">
      {/* 1. CINEMATIC MONOLITH HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-neutral-950 flex flex-col justify-between">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt="Craft Beer Brewing"
            fill
            className="object-cover opacity-60 grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950/90" />
        </div>

        {/* Top Nav Area */}
        <div className="relative z-10 w-full p-8 flex justify-between items-start">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Market Intelligence
          </Link>
          <div className="hidden md:block font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
            Sector ID: 005-BEER
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pb-24 max-w-[1800px]">
          <div className="max-w-4xl">
            <h1 className="text-[12vw] md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter mb-8">
              BREWED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-orange-600">
                FOR THE BOLD
              </span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 md:items-end">
              <p className="text-xl md:text-2xl text-white/80 max-w-xl font-light leading-relaxed border-l-2 border-berlin-red pl-6">
                From mobile canning runs to regional distribution, we engineer
                packaging that keeps the taproom flowing and the shelves
                stocked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PEACE TREE SPOTLIGHT (Asymmetrical Layout) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Image Side - Unconstrained */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <Image
                  src="https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?q=80&w=2671&auto=format&fit=crop"
                  alt="Peace Tree Brewing Case Study"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                {/* Floating Badge */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 border border-white/20 shadow-2xl">
                  <span className="block font-mono text-xs text-neutral-400 uppercase tracking-widest mb-1">
                    Featured Partner
                  </span>
                  <span className="block font-bold text-xl text-berlin-blue">
                    Peace Tree Brewing
                  </span>
                </div>
              </div>
            </div>

            {/* Content Side - Typography Focused */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-6xl font-black text-neutral-900 tracking-tighter leading-[0.9]">
                  THE STOCK <br />
                  <span className="text-berlin-red">SHORTAGE.</span>
                </h2>
                <p className="text-xl text-neutral-500 font-light leading-relaxed">
                  When spot market aluminum shortages threatened to halt
                  production, Peace Tree needed a miracle. We didn't just find
                  cans; we secured a dedicated manufacturing lane.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 pt-8">
                <div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">
                    100%
                  </div>
                  <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                    Allocation Secured
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">
                    &lt; 48hr
                  </div>
                  <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                    Emergency Delivery
                  </div>
                </div>
              </div>

              <Link
                href="/case-studies/peace-tree"
                className="inline-flex items-center gap-3 text-lg font-bold text-berlin-blue hover:text-berlin-red transition-colors group"
              >
                Read the Case Study
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "DRINK IT IN" FEATURE (Dark Mode Break) */}
      <section className="py-32 bg-neutral-950 text-white relative isolate overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-berlin-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-berlin-red/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              DRINK IT IN.
            </h2>
            <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
              Packaging that preserves flavor profile, carbonation, and head
              retention. Engineering that respects the craft.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-berlin-blue/10 rounded-full flex items-center justify-center text-berlin-blue group-hover:bg-berlin-blue group-hover:text-white transition-colors">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                UV Protection
              </h3>
              <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                Amber glass filters 99.9% of harmful UV wavelengths below 400nm,
                preventing "skunking" and protecting the sensitive riboflavin
                chemistry of your hops.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-berlin-red/10 rounded-full flex items-center justify-center text-berlin-red group-hover:bg-berlin-red group-hover:text-white transition-colors">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                Liner Tech
              </h3>
              <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                BPA-NI interior liners ensure zero flavor scalping. What you
                brew is exactly what they taste, with no metallic migration.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                <Box className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                Logistics Ready
              </h3>
              <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                Reinforced chime designs on our kegs and cans reduce denting
                during transport, minimizing loss and maximizing shelf appeal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SHOWROOM (Grid) */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-4">
                THE SHOWROOM
              </h2>
              <p className="text-lg text-neutral-500 max-w-md">
                curated hardware for the modern brewery.
              </p>
            </div>
            <Link
              href="/catalog"
              className="text-berlin-blue font-bold hover:text-berlin-red transition-colors uppercase tracking-widest text-sm"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {market.gallery.map((item, i) => (
              <div key={i} className="group perspective-1000">
                <div className="relative aspect-square bg-white shadow-xl hover:shadow-2xl transition-all duration-500 mb-8 overflow-hidden transform-gpu group-hover:rotate-1">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover ${
                      item.imagePosition || "object-center"
                    } group-hover:scale-110 transition-transform duration-700`}
                  />
                </div>
                <div className="flex justify-between items-start border-t border-neutral-200 pt-6">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 font-mono text-sm">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-neutral-300 group-hover:text-berlin-red transition-colors">
                    <Factory className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE BREWMASTER'S INTELLIGENCE: EDITORIAL SECTION */}
      <section className="py-32 bg-white relative z-10 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="max-w-4xl">
            <div className="text-berlin-red font-mono text-xs uppercase tracking-[0.4em] mb-12 font-bold flex items-center gap-4">
              <span className="w-8 h-[1px] bg-berlin-red" />
              Technical Brief 012
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-neutral-900 mb-16 leading-[0.9] tracking-tighter">
              THE BREWMASTER'S <br />
              <span className="text-neutral-400">INTELLIGENCE.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div className="space-y-12">
                <div className="group">
                  <h3 className="text-neutral-900 font-mono font-bold uppercase tracking-widest text-sm mb-4 border-b border-neutral-200 pb-2 group-hover:border-berlin-red transition-colors">
                    01. The UV Fortress
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-lg">
                    IPAs and hop-forward lagers are chemically vulnerable to
                    wavelengths between 350-500nm. This exposure triggers a
                    reaction between riboflavin and iso-alpha acids, producing
                    3-methyl-2-butene-1-thiol—the compound responsible for
                    "skunking." Our amber glass isn't just a color choice; it's
                    a specific chemical filter engineered to preserve the hop
                    integrity of your most sensitive boils.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-neutral-900 font-mono font-bold uppercase tracking-widest text-sm mb-4 border-b border-neutral-200 pb-2 group-hover:border-berlin-red transition-colors">
                    02. The DO Zero Protocol
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-lg">
                    Dissolved Oxygen (DO) is the primary enemy of shelf life.
                    Even micro-migration through closure liners can turn a
                    bright, citrusy profile into wet cardboard. We employ BPA-NI
                    liners with extreme seal-integrity physics, ensuring that
                    packaged oxygen remains below 50ppb from production to
                    puncture.
                  </p>
                </div>
              </div>

              <div className="space-y-12 md:pt-24">
                <div className="group">
                  <h3 className="text-neutral-900 font-mono font-bold uppercase tracking-widest text-sm mb-4 border-b border-neutral-200 pb-2 group-hover:border-berlin-red transition-colors">
                    03. Equilibrium Path
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-lg">
                    High-speed filling operates at the edge of carbonation
                    physics. Managing strike temperature while maintaining CO2
                    solubility requires vessels with absolute geometric
                    consistency. Our pressure-rated profiles facilitate
                    carbonation up to 5.0 volumes for Belgian-style specialties
                    and 3.5 volumes for standard longnecks without structural
                    risk.
                  </p>
                </div>

                <div className="p-8 border-l-4 border-berlin-red bg-neutral-50">
                  <p className="italic text-neutral-600 font-serif text-xl leading-relaxed">
                    "The container is the final ingredient in the brew. If it
                    cannot protect the chemistry, the art is lost."
                  </p>
                  <div className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-400">
                    — Senior Packaging Engineer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE DRAFTING TABLE (Vessel Library Overhaul) */}
      <section className="py-32 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl">
              <div className="text-berlin-red font-mono text-xs uppercase tracking-[0.4em] mb-6 font-bold flex items-center gap-4">
                <span className="w-8 h-[1px] bg-berlin-red" />
                Technical Specifications
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-6">
                THE DRAFTING TABLE.
              </h2>
              <p className="text-xl text-neutral-500 font-light max-w-2xl">
                Precision-engineered glass profiles designed for high-speed
                filling lines and optimal thermal mass.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right font-mono text-xs text-neutral-400 uppercase tracking-widest">
                Scale: 1:1 <br />
                Units: Imperial/Metric
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Longneck */}
            <div className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-berlin-blue/50 transition-colors duration-500">
              {/* Technical Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative aspect-[3/5] p-8 flex items-center justify-center">
                <Image
                  src="/images/markets/beer_amber_bottle.png"
                  alt="Longneck"
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Blueprint Overlay (Visible on Hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {/* Dimensions Lines */}
                  <div className="absolute top-[10%] bottom-[10%] left-4 border-l border-dashed border-berlin-blue flex items-center pl-2">
                    <span className="font-mono text-[10px] text-berlin-blue -rotate-90 whitespace-nowrap">
                      229mm Height
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-[20%] right-[20%] border-t border-dashed border-berlin-blue flex justify-center pt-1">
                    <span className="font-mono text-[10px] text-berlin-blue">
                      60mm Dia
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-white relative z-10">
                <h3 className="font-bold text-neutral-900 text-lg uppercase tracking-wide mb-4">
                  Standard Longneck
                </h3>
                <div className="space-y-2 font-mono text-xs text-neutral-500">
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Capacity</span>
                    <span className="text-neutral-900">355ml / 12oz</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Finish</span>
                    <span className="text-neutral-900">26mm Crown</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="text-neutral-900">198g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Heritage */}
            <div className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-berlin-blue/50 transition-colors duration-500">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative aspect-[3/5] p-8 flex items-center justify-center">
                <Image
                  src="/images/markets/beer_stubby.png"
                  alt="Heritage Stubby"
                  fill
                  className="object-contain p-8 scale-90 group-hover:scale-95 transition-transform duration-700"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-[25%] bottom-[10%] left-4 border-l border-dashed border-berlin-blue flex items-center pl-2">
                    <span className="font-mono text-[10px] text-berlin-blue -rotate-90 whitespace-nowrap">
                      164mm Height
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-[15%] right-[15%] border-t border-dashed border-berlin-blue flex justify-center pt-1">
                    <span className="font-mono text-[10px] text-berlin-blue">
                      66mm Dia
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-white relative z-10">
                <h3 className="font-bold text-neutral-900 text-lg uppercase tracking-wide mb-4">
                  Heritage Stubby
                </h3>
                <div className="space-y-2 font-mono text-xs text-neutral-500">
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Capacity</span>
                    <span className="text-neutral-900">355ml / 12oz</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Finish</span>
                    <span className="text-neutral-900">26mm Crown</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="text-neutral-900">180g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Bomber */}
            <div className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-berlin-blue/50 transition-colors duration-500">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative aspect-[3/5] p-8 flex items-center justify-center">
                <Image
                  src="/images/markets/beer_bomber.png"
                  alt="Bomber"
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-[5%] bottom-[10%] left-4 border-l border-dashed border-berlin-blue flex items-center pl-2">
                    <span className="font-mono text-[10px] text-berlin-blue -rotate-90 whitespace-nowrap">
                      280mm Height
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-[20%] right-[20%] border-t border-dashed border-berlin-blue flex justify-center pt-1">
                    <span className="font-mono text-[10px] text-berlin-blue">
                      74mm Dia
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-white relative z-10">
                <h3 className="font-bold text-neutral-900 text-lg uppercase tracking-wide mb-4">
                  The Bomber
                </h3>
                <div className="space-y-2 font-mono text-xs text-neutral-500">
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Capacity</span>
                    <span className="text-neutral-900">650ml / 22oz</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Finish</span>
                    <span className="text-neutral-900">26mm Crown</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="text-neutral-900">350g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Growler */}
            <div className="group relative bg-white border border-neutral-200 overflow-hidden hover:border-berlin-blue/50 transition-colors duration-500">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative aspect-[3/5] p-8 flex items-center justify-center">
                <Image
                  src="/images/markets/beer_growler.png"
                  alt="Growler"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-[10%] bottom-[10%] left-4 border-l border-dashed border-berlin-blue flex items-center pl-2">
                    <span className="font-mono text-[10px] text-berlin-blue -rotate-90 whitespace-nowrap">
                      280mm Height
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-[10%] right-[10%] border-t border-dashed border-berlin-blue flex justify-center pt-1">
                    <span className="font-mono text-[10px] text-berlin-blue">
                      127mm Dia
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-100 bg-white relative z-10">
                <h3 className="font-bold text-neutral-900 text-lg uppercase tracking-wide mb-4">
                  Taproom Growler
                </h3>
                <div className="space-y-2 font-mono text-xs text-neutral-500">
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Capacity</span>
                    <span className="text-neutral-900">1.89L / 64oz</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-1">
                    <span>Finish</span>
                    <span className="text-neutral-900">38mm Screw</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="text-neutral-900">1120g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE METROLOGY LAB (Enterprise Grade) */}
      <section className="py-0 bg-neutral-100/50 text-neutral-900 border-t border-neutral-200 relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
        {/* Visual Side */}
        <div className="w-full md:w-1/2 relative min-h-[400px] bg-white border-r border-neutral-200">
          <Image
            src="/images/markets/beer_metrology.png"
            alt="Video Microscope Metrology"
            fill
            className="object-cover p-12"
          />

          {/* Technical Watermark */}
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-neutral-300 uppercase tracking-widest">
            ENTERPRISE GRADE LAB <br />
            ID: QC-ZEISS-04
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-white relative">
          <div className="text-berlin-blue font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Quality Control Protocol
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-none text-neutral-900">
            VIDEO MICROSCOPE <br />
            METROLOGY.
          </h2>
          <p className="text-neutral-500 text-lg font-light leading-relaxed mb-12 max-w-xl">
            We utilize advanced video metrology to inspect sealing surfaces and
            thread profiles with 20MP resolution. This ensures 100% seal
            integrity on high-speed capping lines.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group border-b border-neutral-100 pb-6 last:border-0">
              <div className="w-16 font-mono text-2xl font-bold text-neutral-300 group-hover:text-berlin-blue transition-colors">
                0.05
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">
                  Millimeter Defect Detection
                </h4>
                <p className="text-neutral-500 text-sm">
                  Identifying checks, stones, and blisters invisible to the
                  naked eye.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 group border-b border-neutral-100 pb-6 last:border-0">
              <div className="w-16 font-mono text-2xl font-bold text-neutral-300 group-hover:text-berlin-blue transition-colors">
                100%
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">
                  Finish Integrity
                </h4>
                <p className="text-neutral-500 text-sm">
                  Automated analysis of sealing surface flatness for reliable
                  carbonation retention.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 group border-b border-neutral-100 pb-6 last:border-0">
              <div className="w-16 font-mono text-2xl font-bold text-neutral-300 group-hover:text-berlin-blue transition-colors">
                ISO
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">
                  Rigorous Standards
                </h4>
                <p className="text-neutral-500 text-sm">
                  Full traceability from furnace to filler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 bg-berlin-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            READY TO SCALE?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Secure your allocation for Q3 & Q4 now. Don't let supply chain gaps
            drain your tanks.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-6 bg-white text-berlin-blue font-black text-lg uppercase tracking-widest hover:bg-berlin-red hover:text-white transition-colors duration-300"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
