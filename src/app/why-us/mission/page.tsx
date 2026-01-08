import React from "react";
import {
  Megaphone,
  PiggyBank,
  Zap,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function MissionPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO: Boutique Agility */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-industrial-900 border-b-4 border-berlin-red">
        {/* Background Texture (Abstract) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-industrial-800 to-industrial-950 opacity-100" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <span className="text-berlin-red font-bold text-sm tracking-[0.3em] uppercase mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
            Our Promise
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Boutique Agility.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-action to-white">
              Enterprise Power.
            </span>
          </h1>
          <p className="text-xl text-industrial-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
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
            <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-industrial-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <Megaphone className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                Amplify Your Brand
              </h3>
              <p className="text-industrial-600 leading-relaxed mb-6">
                Shelf presence that competes with the big guys. We source
                premium materials that make your product impossible to ignore.
              </p>
              <div className="flex items-center text-xs font-bold text-green-700 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 mr-2" /> Differentiate & Win
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-industrial-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <PiggyBank className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                Maximize Your Budget
              </h3>
              <p className="text-industrial-600 leading-relaxed mb-6">
                Smart sourcing strategies that keep cash in your pocket. We
                navigate global supply chains to find the efficiency you need.
              </p>
              <div className="flex items-center text-xs font-bold text-blue-700 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 mr-2" /> Optimize Cash Flow
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-industrial-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-3">
                Simplify Your Ops
              </h3>
              <p className="text-industrial-600 leading-relaxed mb-6">
                We handle the logistics so you can focus on your product.
                Just-in-time delivery and inventory management solutions.
              </p>
              <div className="flex items-center text-xs font-bold text-amber-700 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 mr-2" /> Streamline Logistics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX BANNER */}
      <section className="bg-industrial-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2000&auto=format&fit=crop')] bg-fixed bg-cover bg-center opacity-10 grayscale" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8">
            "Packaging is the first
            <br />
            handshake with your customer."
          </h2>
          <div className="w-24 h-1 bg-berlin-red mx-auto" />
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
              We offer swift, efficient, and gracious service. We treat your
              business like it's our own family legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Diff Card 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                  alt="Results Obsessed"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="text-action font-bold text-xs uppercase tracking-wider">
                  Learn More
                </div>
              </div>
            </div>

            {/* Diff Card 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                  alt="Continuous Evolution"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="text-action font-bold text-xs uppercase tracking-wider">
                  Learn More
                </div>
              </div>
            </div>

            {/* Diff Card 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-industrial-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
                  alt="Values Driven"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="text-action font-bold text-xs uppercase tracking-wider">
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
                500<span className="text-action">+</span>
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
              <button className="mt-8 text-action font-bold uppercase tracking-wider text-sm flex items-center hover:underline">
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
