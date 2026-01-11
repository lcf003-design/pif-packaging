import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Droplet,
  Package,
  Star,
  Box,
  Zap,
  Heart,
} from "lucide-react";

export default function DivisionsPage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: Specialized Intelligence */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-industrial-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-900/60 mix-blend-multiply" />
          <img
            src="/divisions_hero_collage.png"
            alt="Diverse Packaging Formats"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Specialized Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto">
            Deep expertise in every format. Comprehensive solutions for every
            product. We don't just sell packaging; we engineer shelf presence.
          </p>
        </div>
      </section>

      {/* 2. THE DIVISION GRID (2x2) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-industrial-900 uppercase tracking-tight">
              Our Core Divisions
            </h2>
            <div className="w-24 h-1 bg-berlin-red mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Rigid Packaging */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm shadow-xl">
              <img
                src="/division_rigid_bottles.png"
                alt="Rigid Packaging"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-berlin-red p-2 rounded-full text-white">
                    <Box size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                    Rigid Packaging
                  </h3>
                </div>

                <p className="text-gray-200 text-lg mb-6 max-w-md">
                  Glass, Plastic, Metal. The foundation of shelf presence. From
                  amber glass apothecaries to high-density PET jars.
                </p>
                <Link
                  href="/catalog/rigid"
                  className="inline-flex items-center gap-2 text-white font-bold border-b border-white hover:text-berlin-red hover:border-berlin-red transition-colors"
                >
                  Explore Rigid <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Flexible Packaging */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm shadow-xl">
              <img
                src="/division_flexible_pouches.png"
                alt="Flexible Packaging"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-berlin-blue p-2 rounded-full text-white">
                    <Package size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                    Flexible Packaging
                  </h3>
                </div>
                <p className="text-gray-200 text-lg mb-6 max-w-md">
                  Lightweight, sustainable, and canvas-ready. Stand-up pouches,
                  rollstock, and films that reduce shipping weight and maximize
                  graphic impact.
                </p>
                <Link
                  href="/catalog/flexible"
                  className="inline-flex items-center gap-2 text-white font-bold border-b border-white hover:text-berlin-blue hover:border-berlin-blue transition-colors"
                >
                  Explore Flexible <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: Closures & Dispensing */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm shadow-xl">
              <img
                src="/division_closure_macro.png"
                alt="Closures & Dispensing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-berlin-blue p-2 rounded-full text-white">
                    <Droplet size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                    Closures & Dispensing
                  </h3>
                </div>
                <p className="text-gray-200 text-lg mb-6 max-w-md">
                  Functionality meets form. The tactile touchpoint of your
                  product. Precision pumps, fine-mist sprayers, and
                  tamper-evident caps.
                </p>
                <Link
                  href="/catalog/closures"
                  className="inline-flex items-center gap-2 text-white font-bold border-b border-white hover:text-berlin-blue hover:border-berlin-blue transition-colors"
                >
                  Explore Hardware <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 4: Specialty & Custom */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm shadow-xl">
              <img
                src="/division_specialty_custom.png"
                alt="Specialty & Custom"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-berlin-red p-2 rounded-full text-white">
                    <Star size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                    Specialty & Custom
                  </h3>
                </div>
                <p className="text-gray-200 text-lg mb-6 max-w-md">
                  Beyond the catalog. Engineered for your brand. Custom molding,
                  unique decoration, and structural innovation for those who
                  need to stand out.
                </p>
                <Link
                  href="/services/design"
                  className="inline-flex items-center gap-2 text-white font-bold border-b border-white hover:text-berlin-red hover:border-berlin-red transition-colors"
                >
                  Start Custom Project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUSTAINABILITY FEATURE: "The Eco-Standard" */}
      <section className="py-24 bg-industrial-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="text-green-600 w-8 h-8" />
                <span className="text-green-700 font-bold uppercase tracking-widest text-sm">
                  Responsibility
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 leading-tight">
                Sustainability
              </h2>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed">
                We support brands that are exploring more responsible packaging
                by offering options such as recyclable materials, lightweight
                designs, and post-consumer recycled (PCR) plastics.
                Sustainability requirements vary by product and market, and we
                help clients balance environmental goals with functionality,
                compliance, and budget.
              </p>
            </div>
            {/* Image Right */}
            <div className="relative order-1 lg:order-2 h-[500px]">
              <div className="absolute inset-0 bg-green-900/10 rounded-sm transform translate-x-4 translate-y-4"></div>
              <img
                src="/sustainability_minimalist.png"
                alt="Sustainable Packaging"
                className="relative w-full h-full object-cover rounded-sm shadow-2xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. MARKET EXPERTISE STRIP */}
      <section className="py-20 bg-industrial-900 text-white border-t border-industrial-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-industrial-400">
              Market Expertise
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Market 1: Beauty */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-berlin-red transition-colors duration-300">
                <Star className="text-white w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold uppercase mb-2">
                Beauty & Personal Care
              </h4>
              <p className="text-industrial-400 text-sm">
                Aesthetic precision.
              </p>
            </div>
            {/* Market 2: Food & Bev */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-berlin-blue transition-colors duration-300">
                <Droplet className="text-white w-8 h-8" />{" "}
                {/* Using Droplet as proxy for liquid/bev */}
              </div>
              <h4 className="text-lg font-bold uppercase mb-2">
                Food & Beverage
              </h4>
              <p className="text-industrial-400 text-sm">
                Safe & shelf-stable.
              </p>
            </div>
            {/* Market 3: Pharma */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <Heart className="text-white w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold uppercase mb-2">
                Pharma & Nutra
              </h4>
              <p className="text-industrial-400 text-sm">Compliance driven.</p>
            </div>
            {/* Market 4: Industrial */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-600 transition-colors duration-300">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold uppercase mb-2">
                Industrial & Auto
              </h4>
              <p className="text-industrial-400 text-sm">Built tough.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-black text-industrial-900 mb-6 tracking-tight">
            One Partner. All Formats.
          </h2>
          <p className="text-xl text-industrial-600 mb-10 max-w-2xl mx-auto">
            Stop managing five different vendors for one product launch.
            Consolidate and streamline your supply chain with PIF.
          </p>
          <Link
            href="/contact"
            className="bg-berlin-red text-white font-bold py-4 px-12 rounded-sm uppercase tracking-widest hover:bg-red-700 transition-colors inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </main>
  );
}
