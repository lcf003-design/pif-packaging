"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Quote,
  Factory,
  TrendingUp,
  Handshake,
  Star,
} from "lucide-react";

// Asset Paths (Generated)
const ASSETS = {
  hero: "/testimonials_hero.png",
  portrait_1: "/testimonial_portrait_1.png", // Procurement
  portrait_2: "/testimonial_portrait_2.png", // Plant Manager
  portrait_3: "/testimonial_portrait_3.png", // Innovation
  portrait_4: "/testimonial_portrait_4.png", // Supply Chain
  case_study: "/logistics_command_hero.png", // Crisis Management Case Study
};

// Data: The Voice of Industry
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "PIF didn't just sell us bottles; they re-engineered our entire filling line strategy. The efficiency gains paid for the packaging in six months.",
    author: "Sarah Jenkins",
    role: "Chief Procurement Officer",
    company: "Apex Pharmaceuticals",
    image: ASSETS.portrait_1,
    category: "Efficiency",
    impact: "40% Cost Reduction",
  },
  {
    id: 2,
    quote:
      "We were facing a 14-week blackout with our previous broker. PIF stepped in, flew stock from their Milan hub, and saved our Q4 launch. They are not a vendor; they are a rescue team.",
    author: "Marcus Thorne",
    role: "Plant Operations Director",
    company: "Nordic Spirits Group",
    image: ASSETS.portrait_2,
    category: "Reliability",
    impact: "Launch Saved",
  },
  {
    id: 3,
    quote:
      "The 'Eco-Standard' program allowed us to switch to 100% PCR without compromising drop-test durability. Finally, sustainability that works on the line.",
    author: "Elena Rodriguez",
    role: "Director of Innovation",
    company: "Velvet Beauty Co.",
    image: ASSETS.portrait_3,
    category: "Sustainability",
    impact: "100% PCR Adoption",
  },
  {
    id: 4,
    quote:
      "I don't need another catalog. I need someone who understands global freight volatility. PIF's predictive logistics model is the only reason my supply chain hasn't broken.",
    author: "David Chen",
    role: "VP of Supply Chain",
    company: "Global Foods Inc.",
    image: ASSETS.portrait_4, // Will update with actual path if needed, but assuming standard naming flow
    category: "Logistics",
    impact: "Zero Stockouts",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 selection:bg-rose-500/30">
      {/* HERO SECTION: Cinematic Industrial */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={ASSETS.hero}
            alt="Industrial Partnership Meeting"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-6 animate-fade-in-up">
            <Handshake className="w-4 h-4" />
            <span>Partnership in Practice</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
            The Voice of <span className="text-white">Industry</span>.
          </h1>

          <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            We don't measure success by pallets shipped. We measure it by the
            growth we unlock for our partners.
          </p>
        </div>
      </section>

      {/* FEATURED STORY: Rapid Response Support */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 text-rose-500 font-bold mb-4 tracking-wider uppercase text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Case Study: Crisis Management</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Rapid Response{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-600">
                  Support
                </span>
                .
              </h2>
              <div className="prose prose-invert prose-lg text-neutral-400 mb-8 border-l-4 border-rose-500/30 pl-6">
                <p className="italic text-xl text-neutral-300 mb-4">
                  Late on a Friday afternoon, a spirits brand learned their
                  original supplier had missed shipment—putting a major product
                  launch at risk.
                </p>
                <p>
                  Working quickly, we coordinated with alternate manufacturing
                  and logistics partners to assess available options and
                  identify the fastest viable path forward. While standard lead
                  times extended weeks, an expedited production and freight
                  solution was put in motion.
                </p>
                <p className="mt-4">
                  Through focused coordination and time-sensitive logistics
                  planning, the packaging was delivered in time to support the
                  scheduled launch—helping the brand avoid costly delays and
                  protect key retail commitments. <strong>Launch saved.</strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">48h</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest">
                    Response Time
                  </div>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">$2M</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest">
                    Revenue Saved
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Abstract */}
            <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/20 to-neutral-800/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />

              <Image
                src={ASSETS.case_study}
                alt="Logistics Command Center - Crisis Management"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-neutral-950 to-transparent z-20">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14">
                    {/* Pulse Animation Ring */}
                    <div className="absolute inset-0 rounded-full bg-rose-500/50 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white shadow-xl z-10">
                      48h
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-bold">
                      Emergency Protocol
                    </div>
                    <div className="text-rose-400 text-sm">
                      Milan to New York
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE VOICE GRID: Masonry Layout */}
      <section className="py-24 bg-neutral-900 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From the Factory Floor to the Boardroom
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Real feedback from the partners who trust us with their critical
              infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="group relative bg-neutral-950 border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/10"
              >
                {/* Category Badge */}
                <div className="absolute top-6 right-6 text-xs font-medium text-neutral-600 uppercase tracking-widest border border-neutral-800 px-2 py-1 rounded group-hover:border-amber-500/30 group-hover:text-amber-500 transition-colors">
                  {t.category}
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-neutral-800 mb-6 group-hover:text-amber-500 transition-colors" />

                {/* Quote Text */}
                <blockquote className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed font-light">
                  "{t.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral-800 group-hover:border-amber-500 transition-colors">
                    <Image
                      src={t.image}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold">{t.author}</div>
                    <div className="text-neutral-500 text-sm">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>

                {/* Impact Metric (Footer of Card) */}
                <div className="mt-6 pt-6 border-t border-neutral-900 flex items-center gap-2 text-rose-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-rose-500" />
                  <span>Impact: {t.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-950 border-t border-amber-500/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to write your success story?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Join the 500+ global brands who shifted from chaos to control with
            PIF Packaging.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/why-us/operations"
              className="px-8 py-4 bg-transparent border border-neutral-800 text-white font-bold rounded-full hover:border-white transition-colors"
            >
              View Operations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
