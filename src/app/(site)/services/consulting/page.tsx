"use client";

import Link from "next/link";

import React from "react";
import Image from "next/image";
import {
  BrainCircuit,
  Lightbulb,
  ArrowRight,
  FileText,
  Users,
  Presentation,
  CheckCircle2,
  Rocket,
  TrendingUp,
  Building2,
  Layers,
  FlaskConical,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-berlin-blue/10">
      {/* 1. HERO: "THE ARCHITECT'S TABLE" */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/consulting_hero_blueprint.png"
            alt="Packaging Engineering Blueprint"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-berlin-blue/20 border border-berlin-blue/40 text-berlin-blue text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                <BrainCircuit className="w-4 h-4" />
                Expert Support Division
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Your Product.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Our Engineering.
                </span>
              </h1>
              <p className="text-xl text-neutral-300 leading-relaxed mb-10 font-light max-w-2xl">
                We don't just sell containers; we architect supply chains. From
                the garage startup to the global enterprise, we provide the
                technical "brain" behind your brand's physical presence.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-neutral-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-lg flex items-center gap-3">
                  Start Engineering <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE SCALABILITY SPECTRUM */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-neutral-900 mb-6">
              Partnership at Every Scale
            </h2>
            <div className="h-1 w-20 bg-berlin-blue mx-auto rounded-full" />
            <p className="mt-6 text-neutral-500 max-w-2xl mx-auto text-lg">
              We act as your fractional packaging department, scaling our
              involvement as your volume grows.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* STARTUP */}
            <div className="group border border-neutral-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:border-berlin-blue/30 bg-neutral-50">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Launch Phase</h3>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">
                Small Business
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Access to Stock Program (Low MOQs)</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span> rapid Label & Decorating</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>"Kickstarter-Ready" Rendering</span>
                </li>
              </ul>
            </div>

            {/* GROWTH */}
            <div className="group border-2 border-berlin-blue rounded-3xl p-8 shadow-2xl relative translate-y-0 lg:-translate-y-4 bg-white z-10">
              <div className="absolute top-0 right-0 bg-berlin-blue text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-xl uppercase tracking-wider">
                Most Popular
              </div>
              <div className="w-16 h-16 bg-berlin-blue rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Scale Phase</h3>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">
                Mid-Market
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-neutral-700 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-berlin-blue shrink-0" />
                  <span>Custom Mold Development</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-700 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-berlin-blue shrink-0" />
                  <span>Just-In-Time (JIT) Warehousing</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-700 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-berlin-blue shrink-0" />
                  <span>Freight Negotiation & Logistics</span>
                </li>
              </ul>
            </div>

            {/* ENTERPRISE */}
            <div className="group border border-neutral-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:border-berlin-blue/30 bg-neutral-50">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Optimize Phase</h3>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6">
                Enterprise
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                  <span>Global Supply Base Diversification</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                  <span>Sustainability (PCR) Integration</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                  <span>Cost-Takeout Engineering</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 rounded-2xl overflow-hidden relative h-64 border border-neutral-200">
            <Image
              src="/images/services/consulting_scale_spectrum.png"
              alt="Scale Spectrum"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </section>

      {/* 3. MATERIAL LIBRARY - VISUAL FEATURE */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider mb-6 text-sm">
                <Layers className="w-5 h-5" />
                Material Science
              </div>
              <h2 className="text-5xl font-black mb-6">
                The Global Substrate Library.
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Why limit your brand to "standard white plastic"? We open the
                vault to the world's most advanced materials. From heavyweight
                cosmetic flint glass to soft-touch automotive-grade polymers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                  <div className="font-bold mb-1">Post-Consumer Recycled</div>
                  <div className="text-xs text-neutral-400">
                    rPET, rHDPE, Ocean Bound
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                  <div className="font-bold mb-1">Specialty Glass</div>
                  <div className="text-xs text-neutral-400">
                    Opal, Violet UV, Heavyweight
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                  <div className="font-bold mb-1">Metal Fabrication</div>
                  <div className="text-xs text-neutral-400">
                    Aluminum, Tinplate, Embossing
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                  <div className="font-bold mb-1">Decoration</div>
                  <div className="text-xs text-neutral-400">
                    Soft-Touch, Silk Screen, Hot Stamp
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-full border border-white/10 p-8 animate-[spin_60s_linear_infinite]">
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[pulse_4s_ease-in-out_infinite]" />
              <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-neutral-800 shadow-2xl">
                <Image
                  src="/images/services/consulting_material_swatches.png"
                  alt="Material Library"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COLLABORATION / CTA */}
      <section className="py-24 bg-berlin-blue relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/consulting_meeting_collaboration.png"
            alt="Collaboration"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-berlin-blue via-berlin-blue/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="w-20 h-20 bg-white text-berlin-blue rounded-full mx-auto flex items-center justify-center mb-8 shadow-xl">
            <FlaskConical className="w-10 h-10" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-black mb-8 tracking-tight">
            Let's Engineer <br />
            <span className="text-cyan-400">Your Growth.</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Whether you need a single winning SKU or a global supply chain
            overhaul, our engineers are ready to draw the blueprints.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-white text-berlin-blue font-bold rounded-full hover:bg-neutral-100 transition-colors shadow-2xl">
              Book Discovery Call
            </button>
            <Link
              href="/capabilities"
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors inline-block"
            >
              View Capability Deck
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
