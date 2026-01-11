import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Megaphone,
  PiggyBank,
  Zap,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Target,
} from "lucide-react";

export default function MissionPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO: Boutique Agility */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-industrial-900 border-b-4 border-berlin-red">
        {/* Background Texture (Abstract) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mission/mission_hero_agility_power.png"
            alt="Boutique Agility vs Enterprise Power"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-industrial-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-industrial-900/50" />
        </div>

        <div className="absolute top-24 left-0 right-0 z-20 text-center px-4">
          <span className="text-berlin-red font-bold text-sm tracking-[0.3em] uppercase block animate-in fade-in slide-in-from-bottom-4 duration-700">
            Our Promise
          </span>
        </div>

        <div className="absolute bottom-12 left-0 right-0 z-20 text-center px-4">
          <p className="text-xl text-industrial-300 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            We are a lean, obsessed team delivering packaging solutions for
            everyone—from local artisans to national giants.
          </p>
        </div>
      </section>

      {/* 2. THE TRIAD: The Growth Engine */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-industrial-900 mb-4">
              The Growth Engine
            </h2>
            <p className="text-industrial-500">
              How we fuel your business expansion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-industrial-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-berlin-red transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-industrial-50 rounded-full flex items-center justify-center mb-6 text-industrial-900 group-hover:bg-berlin-red group-hover:text-white transition-colors duration-300">
                <Megaphone className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                Amplify Your Brand
              </h3>
              <p className="text-industrial-600 leading-relaxed mb-6">
                Shelf presence that competes with the big guys. We source
                premium materials that make your product impossible to ignore.
              </p>
              <div className="flex items-center text-xs font-bold text-berlin-red uppercase tracking-wider">
                <Target className="w-4 h-4 mr-2" /> Differentiate & Win
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-industrial-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-berlin-red transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-industrial-50 rounded-full flex items-center justify-center mb-6 text-industrial-900 group-hover:bg-berlin-red group-hover:text-white transition-colors duration-300">
                <PiggyBank className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                Maximize Your Budget
              </h3>
              <p className="text-industrial-600 leading-relaxed mb-6">
                Smart sourcing strategies that keep cash in your pocket. We
                navigate global supply chains to find the efficiency you need.
              </p>
              <div className="flex items-center text-xs font-bold text-berlin-red uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 mr-2" /> Optimize Cash Flow
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-industrial-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-berlin-red transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-industrial-50 rounded-full flex items-center justify-center mb-6 text-industrial-900 group-hover:bg-berlin-red group-hover:text-white transition-colors duration-300">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                Simplify Your Ops
              </h3>
              <p className="text-industrial-600 leading-relaxed mb-6">
                We handle the logistics so you can focus on your product.
                Just-in-time delivery and inventory management solutions.
              </p>
              <div className="flex items-center text-xs font-bold text-berlin-red uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 mr-2" /> Streamline Logistics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX BANNER */}
      <section className="bg-industrial-900 py-32 relative overflow-hidden group">
        <div className="absolute inset-0">
          <Image
            src="/images/mission/mission_growth_engine_abstract.png"
            alt="Growth Engine Abstract"
            fill
            className="object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-900 via-industrial-900/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 drop-shadow-lg">
            "Packaging is the first
            <br />
            handshake with your customer."
          </h2>
          <div className="w-24 h-1 bg-berlin-red mx-auto shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
        </div>
      </section>

      {/* 4. DIFFERENTIATION: Why We Win */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-industrial-900 mb-4">
              Why We Are Different
            </h2>
            <p className="text-industrial-500 max-w-2xl mx-auto">
              We offer hands-on, efficient, and personalized service. We
              understand that reputation is everything, so we treat your
              business like it's our own family legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Diff Card 1 */}
            <div className="bg-white rounded-sm shadow-sm border border-industrial-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-industrial-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                  src="/images/mission/mission_diff_results.png"
                  alt="Results Obsessed"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-industrial-900 mb-3">
                  Results Obsessed
                </h3>
                <p className="text-industrial-600 text-sm leading-relaxed mb-6">
                  We don't just count outputs. We count outcomes. We track your
                  savings and growth to ensure every package drives your bottom
                  line.
                </p>
                <div className="text-berlin-red font-bold text-xs uppercase tracking-wider">
                  Learn More
                </div>
              </div>
            </div>

            {/* Diff Card 2 */}
            <div className="bg-white rounded-sm shadow-sm border border-industrial-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-industrial-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                  src="/images/mission/mission_diff_evolution.png"
                  alt="Continuous Evolution"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-industrial-900 mb-3">
                  Continuous Evolution
                </h3>
                <p className="text-industrial-600 text-sm leading-relaxed mb-6">
                  We are never satisfied. We constantly scour the globe for
                  better materials, faster routes, and smarter designs to keep
                  you ahead.
                </p>
                <div className="text-berlin-red font-bold text-xs uppercase tracking-wider">
                  Learn More
                </div>
              </div>
            </div>

            {/* Diff Card 3 */}
            <div className="bg-white rounded-sm shadow-sm border border-industrial-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-industrial-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                  src="/images/mission/mission_diff_values.png"
                  alt="Values Driven"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-industrial-900 mb-3">
                  Values Driven
                </h3>
                <p className="text-industrial-600 text-sm leading-relaxed mb-6">
                  Agile service, gracious partners. We treat your business like
                  family. No red tape, just real people solving real problems.
                </p>
                <div className="text-berlin-red font-bold text-xs uppercase tracking-wider">
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACT STATS: 500+ Partners */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <div className="text-center md:text-right">
              <span className="block text-8xl font-black text-industrial-900 leading-none">
                500<span className="text-berlin-red">+</span>
              </span>
              <span className="text-lg font-bold text-industrial-500 uppercase tracking-widest">
                Partners Inc.
              </span>
            </div>

            <div className="max-w-md border-l-4 border-industrial-100 pl-8">
              <h3 className="text-2xl font-bold text-industrial-900 mb-4">
                From Kitchen Table to Boardroom
              </h3>
              <p className="text-industrial-600 leading-relaxed text-lg">
                We have the personal touch for startups and the supply chain
                muscle for the majors. Whether you need 500 units or 5 million,
                we treat your business like it’s our own.
              </p>
              <Link
                href="/contact"
                className="mt-8 text-berlin-red font-bold uppercase tracking-wider text-sm flex items-center hover:underline"
              >
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
