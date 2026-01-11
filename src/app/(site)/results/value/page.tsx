import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Activity,
  BarChart3,
  PieChart,
} from "lucide-react";
import InteractiveValueChain from "@/components/ui/InteractiveValueChain";

export default function QuantifiedValuePage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: The ROI of Precision */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-industrial-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-900/60 mix-blend-multiply" />
          <img
            src="/value_dashboard_hero.png"
            alt="Data Driven ROI"
            className="w-full h-full object-cover opacity-80 animate-pan-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-200 text-sm font-bold mb-8 backdrop-blur-md">
            <TrendingUp size={16} className="text-blue-400" />
            <span>The Empirical Advantage</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            THE ROI OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
              PRECISION.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            We don't just supply packaging. We reduce total landed cost through
            engineered efficiency, faster speed-to-market, and defect
            elimination.
          </p>
        </div>
      </section>

      {/* 2. METRIC STRIP: The PIF Performance Delta */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
              The Performance Delta
            </h2>
            <p className="text-xl text-industrial-600 max-w-2xl mx-auto">
              How the PIF Hybrid model compares to traditional brokerage and
              direct-to-factory sourcing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-industrial-50 p-8 rounded-sm shadow-xl border border-industrial-100">
              <img
                src="/value_comparison_chart.png"
                alt="Benchmark Comparison Chart"
                className="w-full h-auto"
              />
            </div>
            <div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <Clock className="text-berlin-blue w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-industrial-900 mb-2">
                      Speed to Market
                    </h3>
                    <p className="text-industrial-600">
                      <span className="font-bold text-berlin-blue">
                        +40% Faster.
                      </span>{" "}
                      By coordinating closely with our global manufacturing and
                      logistics partners, we help brands plan production and
                      delivery timelines that support faster launches and
                      smoother replenishment—without relying on distributor
                      stock or rigid inventory models.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <Activity className="text-berlin-red w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-industrial-900 mb-2">
                      Defect Reduction
                    </h3>
                    <p className="text-industrial-600">
                      <span className="font-bold text-berlin-red">
                        99.8% Acceptance Rate.
                      </span>{" "}
                      Our multi-step quality review process is designed to
                      identify and address issues early in production—helping
                      reduce defects before products reach your facility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <DollarSign className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-industrial-900 mb-2">
                      Total Landed Cost
                    </h3>
                    <p className="text-industrial-600">
                      <span className="font-bold text-green-600">
                        -15% Average Savings.
                      </span>{" "}
                      We help brands evaluate total landed cost by optimizing
                      material selection, freight efficiency, and packaging
                      design—supporting more informed cost decisions beyond the
                      unit price alone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EFFICIENCY VISUALIZATION: The Unseen Efficiency */}
      <section className="py-24 bg-industrial-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid_pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where the Waste Goes
            </h2>
            <div className="w-24 h-1 bg-berlin-red mx-auto" />
          </div>

          <div className="bg-white p-2 rounded-sm shadow-2xl max-w-6xl mx-auto text-industrial-900">
            <InteractiveValueChain />
          </div>
        </div>
      </section>

      {/* 4. MINI CASE STUDIES */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Case 1 */}
            <div className="bg-white p-8 shadow-lg border-t-4 border-berlin-blue hover:-translate-y-1 transition-transform cursor-default">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Beverage Sector
              </h4>
              <h3 className="text-3xl font-black text-industrial-900 mb-4">
                -40%
              </h3>
              <p className="font-bold text-lg mb-2">Breakage Reduction</p>
              <p className="text-gray-600 text-sm">
                Worked with a beverage brand to improve glass packaging
                performance through structural design adjustments, helping
                reduce breakage while maintaining weight and visual appeal.
              </p>
            </div>

            {/* Case 2 */}
            <div className="bg-white p-8 shadow-lg border-t-4 border-berlin-red hover:-translate-y-1 transition-transform cursor-default">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Cosmetics Sector
              </h4>
              <h3 className="text-3xl font-black text-industrial-900 mb-4">
                3 Days
              </h3>
              <p className="font-bold text-lg mb-2">Lead Time (vs 14 wks)</p>
              <p className="text-gray-600 text-sm">
                Supported a fast-growing skincare brand by improving production
                planning and fulfillment coordination, helping them respond more
                efficiently to demand spikes and promotional activity.
              </p>
            </div>

            {/* Case 3 */}
            <div className="bg-white p-8 shadow-lg border-t-4 border-green-500 hover:-translate-y-1 transition-transform cursor-default">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Nutraceuticals
              </h4>
              <h3 className="text-3xl font-black text-industrial-900 mb-4">
                $1.2M
              </h3>
              <p className="font-bold text-lg mb-2">Freight Savings</p>
              <p className="text-gray-600 text-sm">
                Collaborated with a nutraceutical brand to refine bottle and
                closure specifications, improving pallet efficiency and helping
                lower overall logistics costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-white border-t border-industrial-100 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-industrial-900 mb-6">
            Run the numbers with us.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-industrial-900 text-white px-8 py-4 rounded-sm font-bold hover:bg-berlin-red transition-colors text-lg"
          >
            Request a Cost Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
