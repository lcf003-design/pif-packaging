import React from "react";
import Image from "next/image";
import {
  Factory,
  Truck,
  Users,
  ArrowRight,
  Package,
  PenTool,
  Search,
  BadgeCheck,
  DollarSign,
  Layers,
} from "lucide-react";
import IndustryGrid from "@/components/home/IndustryGrid"; // Repurchasing the component

export default function HybridModelPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO: The Hybrid Advantage */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-industrial-900 border-b-4 border-berlin-red">
        {/* Deep Industrial Blue Texture */}
        <div className="absolute inset-0 bg-blue-950 opacity-80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay grayscale" />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <span className="bg-blue-900/50 border border-blue-500/50 text-blue-200 font-bold text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-6 inline-block backdrop-blur-sm">
            The PIF Advantage
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-none">
            We Are a Hybrid <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
              Packaging Partner
            </span>
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
            Best-of-breed manufacturing power met with the soul of a local
            studio.
          </p>
        </div>
      </section>

      {/* 2. THE TRIAD: Core Pillars */}
      <section className="py-24 bg-white relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Manufacturing Power */}
            <div className="bg-white p-2 rounded-sm shadow-xl">
              <div className="h-48 bg-industrial-100 overflow-hidden relative mb-6">
                <img
                  src="/manufacturing_power.png"
                  alt="Factory"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-industrial-900 text-white p-2">
                  <Factory className="w-6 h-6" />
                </div>
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                  Manufacturing Power
                </h3>
                <p className="text-industrial-600 leading-relaxed text-sm mb-4">
                  Global sourcing. Unlimited capacity. Low cost. We use our
                  scale to drive down unit variance, giving you the best price
                  on the market without sacrificing quality.
                </p>
                <a
                  href="#"
                  className="text-action font-bold text-xs uppercase tracking-wider hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Distribution Speed */}
            <div className="bg-white p-2 rounded-sm shadow-xl">
              <div className="h-48 bg-industrial-100 overflow-hidden relative mb-6">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
                  alt="Warehouse"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-industrial-900 text-white p-2">
                  <Truck className="w-6 h-6" />
                </div>
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                  Distribution Speed
                </h3>
                <p className="text-industrial-600 leading-relaxed text-sm mb-4">
                  900+ Suppliers. Inbound/Outbound logistics. We hold the
                  inventory so you don't have to. Just-in-time delivery that
                  keeps your cash flow healthy.
                </p>
                <a
                  href="#"
                  className="text-action font-bold text-xs uppercase tracking-wider hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Boutique Service */}
            <div className="bg-white p-2 rounded-sm shadow-xl border-t-4 border-berlin-blue">
              <div className="h-48 bg-industrial-100 overflow-hidden relative mb-6">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
                  alt="Meeting"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-berlin-blue text-white p-2">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                  Boutique Service
                </h3>
                <p className="text-industrial-600 leading-relaxed text-sm mb-4">
                  The Extra Mile. We don't just ship; we strategize. We sit at
                  the table with you, treating your business like family. No
                  corporate red tape.
                </p>
                <a
                  href="#"
                  className="text-action font-bold text-xs uppercase tracking-wider hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK: Text Break */}
      <section className="bg-industrial-50 py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-industrial-900 mb-6 leading-tight">
            "We aren't just a distributor. We aren't just a consultancy.{" "}
            <br className="hidden md:block" />
            <span className="text-berlin-blue">We are everything at once.</span>
            "
          </h2>
          <div className="w-24 h-1 bg-industrial-200 mx-auto" />
        </div>
      </section>

      {/* 4. PRODUCT STRIP: Visual Break */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-4xl font-bold text-industrial-900">
            Packaging of All Types
          </h2>
          <p className="text-industrial-500 mt-4">
            If it holds a product, we can make it.
          </p>
        </div>

        <div className="relative h-64 md:h-80 w-full">
          {/* Cinematic Strip Image */}
          <div className="absolute inset-0 bg-[url('/frost_byte_hd.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-20" />

          {/* Overlay Labels */}
          <div className="container mx-auto h-full flex items-center justify-around relative z-10 px-4">
            {[
              "Bottles",
              "Cans & Tins",
              "Closures",
              "Dispensing Systems",
              "Tubes",
              "Supplies",
            ].map((item) => (
              <div
                key={item}
                className="hidden md:flex bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-3 rounded-sm hover:bg-white/20 transition-all cursor-default"
              >
                {item}
              </div>
            ))}

            {/* Browse Products CTA */}
            <a
              href="/products"
              className="hidden md:flex bg-berlin-red text-white font-bold px-8 py-3 rounded-sm hover:bg-red-700 transition-all shadow-lg items-center gap-2 border border-transparent"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </a>
            {/* Mobile Only Scroller Hint */}
            <div className="md:hidden text-white font-bold bg-black/50 px-4 py-2 rounded">
              Explore Catalog
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICE SUITE: Wrapped in Service */}
      <section className="py-24 bg-industrial-50 border-t border-industrial-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-industrial-900 mb-4">
              Wrapped in Service
            </h2>
            <p className="text-industrial-500">
              Comprehensive support from concept to shelf.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {[
              { icon: PenTool, label: "Design" },
              { icon: Search, label: "Sourcing" },
              { icon: BadgeCheck, label: "Quality" },
              { icon: Layers, label: "Decorating" },
              { icon: Truck, label: "Supply Chain" },
              { icon: Package, label: "Inventory" },
              { icon: DollarSign, label: "Financing" },
            ].map((service) => (
              <div
                key={service.label}
                className="bg-white border border-industrial-200 px-8 py-4 rounded-sm flex items-center gap-3 hover:border-berlin-blue hover:text-berlin-blue transition-colors cursor-default shadow-sm group"
              >
                <service.icon className="w-5 h-5 text-industrial-400 group-hover:text-berlin-blue" />
                <span className="font-bold text-industrial-700 group-hover:text-berlin-blue uppercase tracking-wider text-sm">
                  {service.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRY REUSE */}
      <div className="border-t border-industrial-200">
        <IndustryGrid />
      </div>
    </main>
  );
}
