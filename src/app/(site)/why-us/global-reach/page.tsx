import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  TrendingUp,
  Users,
  Factory,
  MapPin,
} from "lucide-react";

export default function GlobalReachPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-berlin-red/10 relative">
      {/* 1. HERO SECTION: Global Capabilities */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-industrial-900 border-b-4 border-berlin-red">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/global-reach/global_reach_hero_network.png"
            alt="Global Network"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-industrial-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-industrial-900/50" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-4 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-berlin-red/30 bg-berlin-red/10 text-berlin-red text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
            <Globe className="w-3 h-3" />
            <span>World-Class Infrastructure</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8 leading-tight uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 drop-shadow-2xl">
            Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-white">
              Capabilities.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-industrial-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 font-light">
            Small team efficiency. Global manufacturing power. We scale with
            you, from prototype to mass production.
          </p>
        </div>
      </section>

      {/* 2. SOURCING: The Architectural Map */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-8 leading-tight">
                Strategic <br />
                <span className="text-berlin-red">Sourcing.</span>
              </h2>
              <div className="prose prose-lg text-industrial-600">
                <p className="mb-6 leading-relaxed">
                  We aren't limited by what is sitting on a shelf in a local
                  warehouse. We go directly to the source. Our vetted partner
                  network spans the globe, ensuring you get exactly what your
                  brand needs, not just what's convenient for a distributor to
                  sell.
                </p>
                <p className="mb-8 leading-relaxed font-bold text-industrial-800 border-l-4 border-berlin-red pl-4">
                  By leveraging our relationships with manufacturers worldwide,
                  we eliminate the middle-man markup and bring you
                  factory-direct pricing with domestic service.
                </p>
              </div>
              <Link
                href="/services/sourcing"
                className="group inline-flex items-center gap-2 text-berlin-red font-bold uppercase tracking-wider text-sm hover:text-industrial-900 transition-colors"
              >
                Explore Sourcing{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Image Right */}
            <div className="relative h-[500px] w-full bg-industrial-50 rounded-sm overflow-hidden border border-industrial-100 group">
              <div className="absolute inset-0 bg-industrial-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src="/images/global-reach/global_reach_sourcing_map.png"
                alt="Global Sourcing Map"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPLY CHAIN: Logistics Mastery */}
      <section className="py-24 bg-industrial-900 text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="relative h-[500px] w-full rounded-sm overflow-hidden border border-industrial-700 group order-2 lg:order-1">
              <div className="absolute inset-0 bg-berlin-red/10 mix-blend-overlay z-10" />
              <Image
                src="/images/global-reach/global_reach_logistics.png"
                alt="Supply Chain Logistics"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              />
            </div>
            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Global <br />
                <span className="text-berlin-red">Supply Chain.</span>
              </h2>
              <div className="prose prose-lg text-industrial-300">
                <p className="mb-6 leading-relaxed">
                  You don't need to own the warehouse to control the inventory.
                  We manage the entire logistics chain—from the factory floor to
                  your loading dock. We handle customs, freight forwarding, and
                  inventory planning.
                </p>
                <p className="mb-8 leading-relaxed font-medium text-white">
                  Our model prioritizes efficiency. We synchronize production
                  with your delivery schedules to provide just-in-time
                  logistics, keeping your floor space clear and unwanted
                  inventory off your books.
                </p>
              </div>
              <Link
                href="/services/supply-chain"
                className="group inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm hover:text-berlin-red transition-colors"
              >
                Let's Get Started{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESIGN: Studio Excellence */}
      <section className="py-24 bg-industrial-50 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-8 leading-tight">
                Enterprise <br />
                <span className="text-berlin-red">Design Studio.</span>
              </h2>
              <div className="prose prose-lg text-industrial-600">
                <p className="mb-6 leading-relaxed">
                  Great design shouldn't be reserved for the biggest brands. We
                  bring enterprise-level structural and graphic design
                  capabilities to your project. Whether it's a custom mold or a
                  unique label, we have the creative resources to make it
                  happen.
                </p>
                <p className="mb-8 leading-relaxed font-bold text-industrial-800">
                  We collaborate with top industrial designers and engineers to
                  ensure your packaging performs on the line and stands out on
                  the shelf.
                </p>
              </div>
              <Link
                href="/services/design"
                className="group inline-flex items-center gap-2 text-berlin-red font-bold uppercase tracking-wider text-sm hover:text-industrial-900 transition-colors"
              >
                See Our Work{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Image Right */}
            <div className="relative h-[500px] w-full bg-white rounded-sm overflow-hidden border border-industrial-200 group shadow-lg">
              <Image
                src="/images/global-reach/global_reach_design_studio.png"
                alt="Design Studio"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACCOUNT MANAGEMENT: Professional Team */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="relative h-[500px] w-full rounded-sm overflow-hidden border border-industrial-100 group order-2 lg:order-1 shadow-2xl">
              <Image
                src="/images/global-reach/global_reach_team.png"
                alt="Global Account Management"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-industrial-900/80 to-transparent p-6">
                <span className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                  <Users className="w-4 h-4" /> Dedicated Support
                </span>
              </div>
            </div>
            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-8 leading-tight">
                Account <br />
                <span className="text-berlin-red">Management.</span>
              </h2>
              <div className="prose prose-lg text-industrial-600">
                <p className="mb-6 leading-relaxed">
                  When you work with large distributors, you're often just an
                  account number. With PIF, you get a dedicated partner who
                  knows your business inside and out. We manage the vendor
                  relationships, the quality control, and the timeline.
                </p>
                <p className="mb-8 leading-relaxed font-bold text-industrial-800 border-l-4 border-berlin-red pl-4">
                  You get the purchasing power of a global corporation with the
                  personal attention of a boutique firm.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-white bg-berlin-red px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-industrial-900 transition-colors shadow-lg shadow-berlin-red/30"
              >
                Let's Talk{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
