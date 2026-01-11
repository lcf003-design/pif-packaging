import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Quote, Target, Users } from "lucide-react";

export default function StoryPage() {
  return (
    <main className="bg-white">
      {/* 1. HERO SECTION: The Hidden Engine */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-industrial-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-industrial-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-industrial-900/50 to-industrial-900" />
          <img
            src="/story_hero_engine.png"
            alt="The Hidden Engine"
            className="w-full h-full object-cover opacity-60 animate-pan-slow"
          />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-800/50 border border-industrial-700 text-industrial-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-berlin-red animate-pulse" />
            Operating in the Background
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            THE HIDDEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-industrial-400">
              ENGINE.
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            You've held our work a thousand times. <br />
            You just didn't know it.
          </p>
        </div>
      </section>

      {/* 2. THE ORIGIN: The Gap We Saw */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image (Sketch) */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gray-100 transform -rotate-2 rounded-sm -z-10" />
              <img
                src="/story_origin_sketch.png"
                alt="The Original Concept Sketch"
                className="w-full h-auto shadow-2xl rounded-sm transform rotate-1 hover:rotate-0 transition-transform duration-700"
              />
            </div>

            {/* Narrative Text */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-8 leading-tight">
                The Gap in the Market.
              </h2>
              <div className="prose prose-lg text-industrial-600">
                <p className="lead text-2xl font-medium text-industrial-800 mb-6">
                  We built the partner we wished we had.
                </p>
                <p className="mb-6">
                  Ten years ago, the packaging landscape was broken. Brands
                  faced a binary choice:
                </p>
                <ul className="space-y-4 mb-8 list-none pl-0">
                  <li className="flex gap-4 items-start">
                    <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1 flex-shrink-0">
                      <Users size={16} />
                    </div>
                    <span>
                      <strong>The Giants:</strong> Massive scale, but you were
                      just an account number. Innovation was slow, and "custom"
                      meant "millions of units."
                    </span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1 flex-shrink-0">
                      <Target size={16} />
                    </div>
                    <span>
                      <strong>The Brokers:</strong> Agile and friendly, but
                      powerless. They didn't own the factories, so quality and
                      timelines were a gamble.
                    </span>
                  </li>
                </ul>
                <p>
                  We saw a gap for a <strong>Hybrid Model</strong>. One that
                  combined the personal obsession of a boutique studio with the
                  raw manufacturing muscle of a global enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT SCROLL: Silent Partner */}
      <section className="py-32 bg-industrial-950 text-white relative overflow-hidden">
        {/* Background Silhouettes */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/story_impact_silhouettes.png"
            className="w-full h-full object-cover mix-blend-screen"
            alt="Product Silhouettes"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Quote className="w-16 h-16 text-industrial-700 mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-serif italic text-gray-300 max-w-4xl mx-auto leading-tight mb-12">
            "We operate in the shadows so your brand can shine in the light. Our
            name isn't on the bottle, but our engineering is in the glass."
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 font-bold uppercase tracking-widest text-sm md:text-base">
            <span>Personal Care</span>
            <span>•</span>
            <span>Spirits</span>
            <span>•</span>
            <span>Pharmaceutical</span>
            <span>•</span>
            <span>Food & Bev</span>
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY: Boutique Soul, Enterprise Scale */}
      <section className="py-24 bg-industrial-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-industrial-900 mb-6">
                Boutique Soul. <br />
                <span className="text-berlin-red">Enterprise Scale.</span>
              </h2>
              <p className="text-xl text-industrial-600 mb-8 leading-relaxed">
                We are a team of obsessed packaging nerds. We don't have call
                centers; we have experts who answer their own phones.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed">
                But behind that personal touch is a network of 900+ qualified
                manufacturing partners and a logistics engine that moves
                millions of units across oceans every month. It's the best of
                both worlds.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 font-bold text-industrial-900 border-b-2 border-industrial-900 pb-1 hover:text-berlin-red hover:border-berlin-red transition-all"
              >
                Meet the Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Visual: Team Candid */}
            <div className="relative h-[500px] overflow-hidden rounded-sm group">
              <img
                src="/story_team_candid.png"
                alt="Our Team at Work"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-berlin-blue/20 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <BookOpen className="w-12 h-12 text-industrial-300 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black text-industrial-900 mb-8 tracking-tight">
            Ready to write your chapter?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-industrial-900 text-white px-8 py-4 rounded-sm font-bold tracking-wide hover:bg-berlin-red transition-colors text-lg"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
