import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Activity,
  Award,
  CheckCircle,
  Database,
  BarChart,
  ArrowRight,
} from "lucide-react";

export default function OperationsPage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: Operational Precision */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-industrial-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-900/60 mix-blend-multiply" />
          <img
            src="/ops_hero_network.png"
            alt="Global Logistics Network"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Operational Precision
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
            A culture where quality is the baseline and execution is the
            product.
          </p>
        </div>
      </section>

      {/* 2. QUALITY POLICY & ISO */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-berlin-red p-2 rounded-sm text-white inline-flex">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-berlin-red font-bold uppercase tracking-widest text-sm">
                  Our Quality Policy
                </span>
              </div>
              <h2 className="text-4xl font-black text-industrial-900 mb-8 leading-tight">
                Increasing revenue. <br />
                Decreasing costs. <br />
                <span className="text-industrial-400">
                  Improving productivity.
                </span>
              </h2>
              <p className="text-lg text-industrial-600 mb-6 leading-relaxed">
                We strive to have a positive impact on the income of our
                customers. This isn't just a slogan; it's a metric we track.
                Through rigorous vendor auditing, on-site testing, and proactive
                issue resolution, we ensure that the packaging you receive
                builds your brand rather than delaying your launch.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed font-medium">
                We are committed to providing accurate and timely information
                and product while continuously looking for ways to improve our
                processes.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-industrial-900 font-bold border-b-2 border-industrial-900 hover:text-berlin-red hover:border-berlin-red transition-colors text-lg"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Image/Badge Right */}
            <div className="relative flex justify-center items-center rounded-sm">
              <img
                src="/ops_quality_seal_custom.png"
                alt="Premium Quality Assurance"
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE GRID */}
      <section className="py-24 bg-industrial-900 text-white relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="/ops_warehouse.png"
            className="w-full h-full object-cover grayscale"
            alt="Warehouse texture"
          />
        </div>
        <div className="absolute inset-0 bg-industrial-900/90" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
              Execution is Everything
            </h2>
            <p className="text-industrial-300 max-w-2xl mx-auto text-lg">
              Regardless of the industry, our main focus is unlocking profits by
              growing your sales and decreasing your costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Support */}
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
              <div className="mb-6 text-berlin-red">
                <Activity size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Anticipatory Support</h3>
              <p className="text-industrial-300 text-sm leading-relaxed">
                PIF Packaging is backed by a dedicated quality team that
                provides proactive and responsive support, helping strengthen
                quality and consistency throughout your supply chain.
              </p>
            </div>

            {/* Card 2: Logistics */}
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
              <div className="mb-6 text-blue-400">
                <Truck size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">99% On-Time Delivery</h3>
              <p className="text-industrial-300 text-sm leading-relaxed">
                Timing matters. Leveraging our global logistics network and
                manufacturing relationships, we help brands plan and execute
                deliveries that align with their production and launch
                schedules.
              </p>
            </div>

            {/* Card 3: Quality */}
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
              <div className="mb-6 text-green-400">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">In-Spec Assurance</h3>
              <p className="text-industrial-300 text-sm leading-relaxed">
                Quality is job #1. With strong controls and our on-site testing
                laboratory, we ensure every shipment meets strict specifications
                before it ever reaches your filling line.
              </p>
            </div>

            {/* Card 4: Standards */}
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
              <div className="mb-6 text-yellow-400">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Rigorous Standards</h3>
              <p className="text-industrial-300 text-sm leading-relaxed">
                We maintain strict quality oversight across our entire supply
                network. We measure ourselves against specific objectives to
                deliver process excellence every single day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL BREAK: Warehouse/Lab Split */}
      <section className="grid md:grid-cols-2 h-[400px]">
        <div className="relative group overflow-hidden">
          <img
            src="/ops_warehouse.png"
            alt="Warehouse"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-industrial-900/30 group-hover:bg-industrial-900/10 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="font-bold uppercase tracking-widest text-sm mb-2">
              Logistics
            </p>
            <h3 className="text-3xl font-black">Strategic Inventory</h3>
          </div>
        </div>
        <div className="relative group overflow-hidden">
          <img
            src="/ops_quality_lab.png"
            alt="Quality Lab"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-industrial-900/30 group-hover:bg-industrial-900/10 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="font-bold uppercase tracking-widest text-sm mb-2">
              Quality Control
            </p>
            <h3 className="text-3xl font-black">Precision Testing</h3>
          </div>
        </div>
      </section>

      {/* 5. TECH FOOTER */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-sm shadow-xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Database className="text-blue-600" />
                <span className="text-blue-900 font-bold uppercase tracking-widest text-sm">
                  Enterprise System
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-industrial-900 mb-6">
                Modern Infrastructure
              </h2>
              <p className="text-lg text-industrial-600 mb-6 leading-relaxed">
                PIF Packaging operates with a digitally driven infrastructure
                designed to support visibility, coordination, and accountability
                across the supply chain. Our systems help track order progress,
                manage documentation, and support quality oversight throughout
                the manufacturing and logistics process.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed">
                By leveraging reliable operational tools and continuous process
                improvements, we enable clear communication, informed
                decision-making, and consistent execution from project kickoff
                through delivery.
              </p>
            </div>
            <div className="relative min-h-[400px]">
              <img
                src="/ops_tech_dashboard.png"
                alt="Enterprise Dashboard"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:hidden" />
              {/* Gradient only on mobile to text readability if needed, though split layout handles it. kept for safety */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
