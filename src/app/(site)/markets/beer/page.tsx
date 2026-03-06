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
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

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
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center container mx-auto px-6 pb-24 max-w-[1800px]">
          <div className="max-w-4xl text-center">
            <h1 className="text-[12vw] md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter mb-8">
              BREWED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-orange-600">
                FOR THE BOLD
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              From mobile canning runs to regional distribution, we engineer
              packaging that keeps the taproom flowing and the shelves stocked.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE SHOWROOM (Grid) - Moved to top */}
      <MarketCategoryGrid
        title="Beer Packaging"
        items={[
          {
            title: "Beer Bottles & Growlers",
            image: "/beer_bottles_growlers_white_1771839208618.png",
            href: "/products?category=Bottles",
          },
          {
            title: "Beer Caps and Closures",
            image: "/beer_caps_closures_white_1771839241876.png",
            href: "/products?category=Closures",
          },
          {
            title: "Beer Cans",
            image: "/beer_cans_white_1771839268701.png",
            href: "/products?category=Cans",
          },
          {
            title: "Stock Mold Brochure",
            image: "/beer_brochure_mockup_white_1771839306715.png",
            href: "/downloads/beer-brochure.pdf",
          },
        ]}
      />

      {/* 3. QUALITY & PROTECTION */}
      <section className="py-32 bg-white text-neutral-900 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              QUALITY <br />
              BY DESIGN.
            </h2>
            <p className="text-xl md:text-2xl text-neutral-500 font-light leading-relaxed">
              Precision containers engineered to respect the craft.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-10 bg-neutral-50 border border-neutral-100 hover:border-berlin-red transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-berlin-red/5 flex items-center justify-center text-berlin-red">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Flavor Protection</h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                Our amber glass filters harmful UV rays that cause "skunking,"
                ensuring your recipe stays true from the brewery to the glass.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-10 bg-neutral-50 border border-neutral-100 hover:border-berlin-blue transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-berlin-blue/5 flex items-center justify-center text-berlin-blue">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Taste Integrity</h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                High-performance liners prevent metallic taste migration,
                keeping your carbonation and flavor profile consistent.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-10 bg-neutral-50 border border-neutral-100 hover:border-neutral-900 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-neutral-200 flex items-center justify-center text-neutral-900">
                <Box className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Supply Chain Optimized
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                Reinforced designs minimize loss during high-speed filling and
                rough transport, protecting your bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUALITY & STANDARDS: EDITORIAL SECTION */}
      <section className="py-32 bg-white relative z-10 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-neutral-900 mb-16 text-center leading-[0.9] tracking-tighter">
              SIMPLY <br />
              <span className="text-neutral-300">SUPERIOR.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div className="space-y-12">
                <div>
                  <h3 className="text-neutral-900 font-bold uppercase tracking-widest text-sm mb-4 border-b border-neutral-200 pb-2">
                    01. Light Protection
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-lg">
                    We use specific amber glass chemistry that blocks light
                    waves responsible for skunking. It's built-in protection for
                    every bottle.
                  </p>
                </div>

                <div>
                  <h3 className="text-neutral-900 font-bold uppercase tracking-widest text-sm mb-4 border-b border-neutral-200 pb-2">
                    02. Oxygen Barriers
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-lg">
                    Our closures and liners are tested for maximum seal
                    integrity. We keep oxygen out so your beer stays fresh on
                    the shelf longer.
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-neutral-900 font-bold uppercase tracking-widest text-sm mb-4 border-b border-neutral-200 pb-2">
                    03. Filling Efficiency
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed text-lg">
                    Uniform bottle dimensions mean fewer jams and higher speeds
                    on your packaging line. Consistency is our standard.
                  </p>
                </div>

                <div className="p-8 border-l-4 border-berlin-red bg-neutral-50">
                  <p className="italic text-neutral-500 font-serif text-xl leading-relaxed">
                    "The container is the final ingredient. It must protect the
                    chemistry of the brew."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 bg-white text-center border-t border-neutral-200 text-neutral-900">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
            Ready to <span className="text-berlin-red">Upgrade?</span>
          </h2>
          <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Browse our catalog of premium beer packaging or speak with a
            specialist to find the perfect vessel for your brew.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/products?market=Beer"
              className="px-10 py-5 bg-neutral-900 text-white font-bold text-lg hover:bg-berlin-red transition-colors duration-300 w-full sm:w-auto"
            >
              Browse Catalog
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-white text-neutral-900 border-2 border-neutral-200 font-bold text-lg hover:border-neutral-900 transition-colors duration-300 w-full sm:w-auto"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
