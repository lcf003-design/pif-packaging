"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Users,
  Factory,
  Zap,
  History,
  TrendingUp,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StoryPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main className="bg-white selection:bg-berlin-red selection:text-white">
      {/* 1. HERO: "Built, Not Just Bought" */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-industrial-950 text-white">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
          <div className="absolute inset-0 bg-industrial-950/60 z-10" />
          <img
            src="/story_hero_engine.png"
            alt="Factory Engineering"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
        </motion.div>

        <div className="relative z-20 text-center max-w-5xl px-4 animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-berlin-red animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">
              Est. 2014 &bullet; Los Angeles
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.9]">
            BUILT, NOT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
              JUST BOUGHT.
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            From a garage in LA to a global manufacturing network. <br />
            <span className="text-white font-medium">
              This is the story of obsession.
            </span>
          </p>
        </div>
      </section>

      {/* 2. THE SOUL (Preserved Content, Enhanced UI) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-industrial-900 mb-8 leading-none">
                Boutique Soul. <br />
                <span className="text-berlin-red">Enterprise Scale.</span>
              </h2>

              <div className="prose prose-lg text-industrial-600 prose-headings:font-bold prose-headings:text-industrial-900">
                <p className="text-xl leading-relaxed font-medium text-industrial-800">
                  Founded in{" "}
                  <span className="text-berlin-blue">Los Angeles in 2014</span>,
                  PIF has evolved from a local distributor into a leader in
                  pharmaceutical, nutraceutical, and highly regulated industries
                  across North America.
                </p>
                <p>
                  As a global company, we are proud to have bases in the US,
                  Asia, and Europe. But we haven't lost our roots. We are a team
                  of{" "}
                  <strong className="text-industrial-900 bg-industrial-100 px-1">
                    Obsessed Packaging Nerds
                  </strong>
                  .
                </p>
                <p>
                  We don't have call centers; we have experts who answer their
                  own phones. The 2026 Licensing Scheme means a major regulatory
                  change for the UK, and we are proud to be at the forefront of
                  affordable, sustainable, and compliant solutions.
                </p>
              </div>

              <div className="mt-10 flex gap-6">
                <Link
                  href="/why-us/mission"
                  className="font-bold text-industrial-900 border-b-2 border-industrial-900 hover:text-berlin-red hover:border-berlin-red transition-all pb-1"
                >
                  Our Mission
                </Link>
                <Link
                  href="/manufacturing"
                  className="font-bold text-industrial-900 border-b-2 border-industrial-900 hover:text-berlin-red hover:border-berlin-red transition-all pb-1"
                >
                  See Capabilities
                </Link>
              </div>
            </div>

            {/* Enhanced Visual Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-industrial-100 transform rotate-2 rounded-sm -z-10 group-hover:rotate-1 transition-transform duration-500" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="/story_team_candid.png"
                  alt="The PIF Team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/60 to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-sm font-bold uppercase tracking-widest mb-1 opacity-80">
                    The Team
                  </div>
                  <div className="text-2xl font-bold">
                    Real Humans. Real Experts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE GAP (Preserved Content, New Container) */}
      <section className="py-24 bg-industrial-50 border-y border-industrial-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black text-industrial-900 mb-6">
              The Gap in the Market.
            </h2>
            <p className="text-xl text-industrial-600">
              We built the partner that we wished we had. <br />
              Ten years ago, the landscape was broken into two extremes:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Giants */}
            <div className="bg-white p-10 rounded-sm shadow-sm border border-industrial-100 hover:border-berlin-red/30 transition-colors group">
              <div className="w-14 h-14 bg-industrial-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-berlin-red group-hover:text-white transition-colors">
                <Factory className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-4">
                The Giants
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Massive scale, but you were just an account number. Innovation
                was slow, and "custom" meant you had to buy millions of units or
                get in line.
              </p>
            </div>

            {/* The Brokers */}
            <div className="bg-white p-10 rounded-sm shadow-sm border border-industrial-100 hover:border-berlin-blue/30 transition-colors group">
              <div className="w-14 h-14 bg-industrial-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-berlin-blue group-hover:text-white transition-colors">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-4">
                The Brokers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Friendly and agile, but powerless. They didn't own the
                factories, so quality control and timelines were always a
                gamble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE EVOLUTION TIMELINE (Bridging Story to Manufacturing) */}
      <section className="py-32 bg-industrial-900 text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <div className="sticky top-32">
                <h2 className="text-5xl font-black mb-6">
                  A Decade of <br />
                  <span className="text-berlin-red">Evolution.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  What started as a distribution company has evolved into a
                  vertically integrated manufacturing powerhouse.
                </p>
                <Link
                  href="/manufacturing"
                  className="px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-sm font-bold uppercase text-sm tracking-widest"
                >
                  View Today's Capabilities
                </Link>
              </div>
            </div>

            <div className="md:w-2/3 border-l border-white/10 pl-8 md:pl-16 relative space-y-20">
              {/* Timeline Items */}
              {[
                {
                  year: "2014",
                  title: "The Beginning",
                  desc: "Founded in Los Angeles with a focus on premium glass sourcing.",
                  icon: <History />,
                },
                {
                  year: "2017",
                  title: "Engineering First",
                  desc: "Opened our first in-house engineering studio for 3D prototyping.",
                  icon: <Zap />,
                },
                {
                  year: "2020",
                  title: "Global Custom Tooling",
                  desc: "Partnered with dedicated facilities to launch our proprietary mold program.",
                  icon: <Factory />,
                },
                {
                  year: "2024",
                  title: "The Hybrid Model",
                  desc: "Fully integrated manufacturing and distribution supply chain for true end-to-end control.",
                  icon: <TrendingUp />,
                },
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 rounded-full bg-industrial-800 border-2 border-industrial-600 group-hover:border-berlin-red group-hover:bg-berlin-red transition-all" />
                  <div className="text-berlin-red font-black text-6xl opacity-20 mb-2 group-hover:opacity-100 transition-opacity">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-8 max-w-3xl mx-auto leading-tight">
            We are just getting started. <br />
            <span className="text-berlin-blue">Be part of the story.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-industrial-900 text-white px-10 py-5 rounded-sm font-bold text-lg uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:translate-y-[-2px]"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
