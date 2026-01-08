import React from "react";
import { ArrowRight, Globe, TrendingUp, Users, Factory } from "lucide-react";
import Link from "next/link";

export default function GlobalReachPage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: Global Network */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-industrial-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-berlin-blue/20 mix-blend-overlay" />
          <img
            src="/global_hero_network.png"
            alt="Global Network"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Global Capabilities
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto">
            Small team efficiency. Global manufacturing power.
          </p>
        </div>
      </section>

      {/* 2. SOURCING: The Red Map */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
                Sourcing
              </h2>
              <p className="text-lg text-industrial-600 mb-6 leading-relaxed">
                We aren't limited by what is sitting on a shelf in a local
                warehouse. We go directly to the source. Our vetted partner
                network spans the globe, ensuring you get exactly what your
                brand needs, not just what's convenient for a distributor to
                sell.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed font-medium">
                By leveraging our relationships with manufacturers worldwide, we
                eliminate the middle-man markup and bring you factory-direct
                pricing with domestic service.{" "}
                <span className="text-berlin-red font-bold">
                  We search the world so you don't have to.
                </span>
              </p>
              <Link
                href="/services/sourcing"
                className="text-berlin-blue font-bold text-sm uppercase tracking-wider hover:text-berlin-dark-blue flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Image Right */}
            <div className="relative">
              <img
                src="/global_map_red_custom.png"
                alt="Global Sourcing Map"
                className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPLY CHAIN: Cinematic Logistics */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="relative h-[400px] overflow-hidden rounded-sm shadow-2xl order-2 lg:order-1">
              <img
                src="/logistics_port.png"
                alt="Supply Chain Logistics"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 bg-berlin-blue p-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
                Supply Chain
              </h2>
              <p className="text-lg text-industrial-600 mb-6 leading-relaxed">
                You don't need to own the warehouse to control the inventory. We
                manage the entire logistics chain—from the factory floor to your
                loading dock. We handle customs, freight forwarding, and
                inventory planning.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed">
                Our model prioritizes efficiency. We synchronize production with
                your delivery schedules to provide just-in-time logistics,
                keeping your floor space clear and unwanted inventory off your
                books.
                <span className="font-bold block mt-4 text-industrial-800">
                  Global reach with the agility of a dedicated partner. We make
                  the world feel small.
                </span>
              </p>
              <Link
                href="/services/supply-chain"
                className="text-berlin-blue font-bold text-sm uppercase tracking-wider hover:text-berlin-dark-blue flex items-center gap-2"
              >
                Let's Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESIGN: Studio Excellence */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
                Design
              </h2>
              <p className="text-lg text-industrial-600 mb-6 leading-relaxed">
                Great design shouldn't be reserved for the biggest brands. We
                bring enterprise-level structural and graphic design
                capabilities to your project. Whether it's a custom mold or a
                unique label, we have the creative resources to make it happen.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed font-medium">
                We collaborate with top industrial designers and engineers to
                ensure your packaging performs on the line and stands out on the
                shelf.{" "}
                <span className="text-berlin-red font-bold">
                  World-class creativity, accessible to you.
                </span>
              </p>
              <Link
                href="/services/design"
                className="text-berlin-blue font-bold text-sm uppercase tracking-wider hover:text-berlin-dark-blue flex items-center gap-2"
              >
                See Our Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Image Right */}
            <div className="relative h-[400px] overflow-hidden rounded-sm shadow-2xl">
              <img
                src="/design_studio_sketch.png"
                alt="Design Studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 right-0 bg-berlin-red p-4">
                <Factory className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACCOUNT MANAGEMENT: Professional Team */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="relative h-[400px] overflow-hidden rounded-sm shadow-2xl order-2 lg:order-1">
              <img
                src="/account_management_team.png"
                alt="Global Account Management"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 bg-industrial-900 p-4">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
                Account Management
              </h2>
              <p className="text-lg text-industrial-600 mb-6 leading-relaxed">
                When you work with large distributors, you're often just an
                account number. With PIF, you get a dedicated partner who knows
                your business inside and out. We manage the vendor
                relationships, the quality control, and the timeline.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed font-bold text-industrial-800">
                You get the purchasing power of a global corporation with the
                personal attention of a boutique firm.
              </p>
              <Link
                href="/contact"
                className="text-berlin-blue font-bold text-sm uppercase tracking-wider hover:text-berlin-dark-blue flex items-center gap-2"
              >
                Take a Look <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
