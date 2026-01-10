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
                Amber glass filters 99.9% of UV wavelengths, preventing
                "skunking" and preserving hop integrity specifically for IPAs
                and Lagers.
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
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="px-8 py-4 bg-white text-neutral-900 font-bold uppercase tracking-wider hover:bg-berlin-red hover:text-white transition-colors">
                      Configure
                    </button>
                  </div>
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

      {/* 5. ENGINEERED COMPLIANCE (Technical Standards) */}
      <section className="py-24 border-t border-neutral-200 bg-white">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Technical Specifications
              </h3>
              <h2 className="text-4xl font-black text-neutral-900 tracking-tight mb-8">
                ENGINEERED FOR <br />
                CONSISTENCY.
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed mb-8">
                Every can, bottle, and keg we supply meets rigorous ISO 9001
                standards. We don't deal in "seconds" or "near-misses." Your
                liquid deserves a container that performs.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-neutral-100/50 border border-neutral-200 rounded text-xs font-mono uppercase tracking-wider text-neutral-600">
                  ISO 9001:2015
                </div>
                <div className="px-4 py-2 bg-neutral-100/50 border border-neutral-200 rounded text-xs font-mono uppercase tracking-wider text-neutral-600">
                  BPANI Lining
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {market.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-neutral-50 border border-neutral-100 hover:border-berlin-blue/30 transition-colors"
                >
                  <span className="font-bold text-neutral-700">{feature}</span>
                  <ShieldCheck className="w-5 h-5 text-berlin-blue" />
                </div>
              ))}
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
