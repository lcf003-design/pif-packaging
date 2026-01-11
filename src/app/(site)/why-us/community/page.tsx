import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Heart,
  Users,
  MapPin,
  Handshake,
} from "lucide-react";

export default function CommunityPage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: The Human Element */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-industrial-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-900/30 mix-blend-multiply" />
          <img
            src="/community_hero_portrait.png"
            alt="The Human Element of Manufacturing"
            className="w-full h-full object-cover opacity-80 animate-pan-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-md">
            <Heart
              size={16}
              className="text-berlin-red fill-current animate-pulse"
            />
            <span>People, Not Just Parts</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight shadow-xl">
            THE HUMAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-paper-yellow to-white">
              ELEMENT.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            A package travels through a hundred hands before it reaches the
            shelf. We care about every single pair.
          </p>
        </div>
      </section>

      {/* 2. GLOBAL TIER: Our Global Neighborhood */}
      <section className="py-24 bg-industrial-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
              Our Global Neighborhood
            </h2>
            <p className="text-xl text-industrial-600 max-w-2xl mx-auto">
              We treat our supply chain like a community. That means fair labor,
              strict ethical auditing, and partnerships that last decades, not
              just contracts.
            </p>
          </div>

          <div className="relative bg-white rounded-sm shadow-2xl overflow-hidden border border-industrial-100">
            {/* Map Visualization */}
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-industrial-900 mb-6 flex items-center gap-3">
                  <Globe className="text-berlin-blue" />
                  Ethical Sourcing
                </h3>
                <ul className="space-y-6 text-lg text-industrial-600">
                  <li className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-700 mt-1">
                      <Users size={18} />
                    </div>
                    <span>
                      <strong>Worker Welfare:</strong> Every factory in our
                      network undergoes rigorous SMETA and SQP audits to ensure
                      safe, dignified working conditions.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                      <Handshake size={18} />
                    </div>
                    <span>
                      <strong>Long-Term Partners:</strong> We don't chase the
                      lowest bidder. We build 10+ year relationships that allow
                      factories to invest in their people.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative min-h-[400px] bg-industrial-50">
                <img
                  src="/community_global_map.png"
                  alt="Global Ethical Network"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:via-white/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCAL TIER: Our Local Roots */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-paper-yellow/20 rounded-full blur-3xl -z-10" />
              <div className="relative rounded-sm overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-all duration-700">
                <img
                  src="/community_local_initiative.png"
                  alt="Volunteering in the Community"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-white font-bold text-lg flex items-center gap-2">
                    <MapPin size={18} className="text-berlin-red" />• Community
                    Action Day
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 text-berlin-red font-bold uppercase tracking-widest mb-4">
                <Heart size={20} fill="currentColor" />
                <span>Our Local Roots</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 leading-tight">
                Success means nothing if we don't share it.
              </h2>
              <p className="text-xl text-industrial-600 mb-6 leading-relaxed font-medium">
                We are proud to call this city our home.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed">
                From local food banks to youth arts programs, we believe a
                business should be a good neighbor. We pledge 1% of our annual
                studio hours to pro-bono design work for local non-profits.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-industrial-50 p-6 rounded-sm border-l-4 border-berlin-red">
                  <span className="block text-4xl font-black text-industrial-900 mb-1">
                    1%
                  </span>
                  <span className="text-sm font-bold text-industrial-500 uppercase">
                    Pro-Bono Hours
                  </span>
                </div>
                <div className="bg-industrial-50 p-6 rounded-sm border-l-4 border-berlin-blue">
                  <span className="block text-4xl font-black text-industrial-900 mb-1">
                    50+
                  </span>
                  <span className="text-sm font-bold text-industrial-500 uppercase">
                    Local Partners
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA: Join the Movement */}
      <section className="py-24 bg-industrial-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid_pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            Join the movement.
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Whether you're a potential partner, a future employee, or a local
            organization, we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 bg-berlin-red text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-red-700 transition-colors text-lg"
            >
              View Careers <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-white hover:text-industrial-900 transition-colors text-lg"
            >
              Partner With Us <Handshake className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
