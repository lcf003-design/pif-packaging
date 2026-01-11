"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Users,
  Briefcase,
  Globe,
  Award,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <div className="bg-white text-industrial-900 font-sans selection:bg-berlin-red/20 overflow-x-hidden">
      {/* 1. HERO: The Architects of Containment */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/about_hero_architect.png"
            alt="PIF Design Studio"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-8 bg-white/80 backdrop-blur-md border border-industrial-200 px-6 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-berlin-red animate-pulse" />
              <span className="text-industrial-600 font-bold uppercase text-xs tracking-widest">
                Established 2014
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-industrial-900 mb-8 tracking-tighter leading-[0.9]">
              ARCHITECTS OF <br />
              CONTAINMENT.
            </h1>
            <p className="text-xl md:text-2xl text-industrial-600 max-w-2xl mx-auto font-medium leading-relaxed">
              We are not brokers. We are the engineering layer between{" "}
              <br className="hidden md:block" />
              your brand's vision and the factory floor.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 w-full text-center z-10"
        >
          <div className="text-industrial-400 text-xs uppercase tracking-widest mb-2">
            The Origin Story
          </div>
          <ChevronDown className="w-5 h-5 mx-auto text-industrial-400 animate-bounce" />
        </motion.div>
      </section>

      {/* 2. THE ORIGIN: The Broker Blackout */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] w-full rounded-sm overflow-hidden border border-industrial-100 shadow-2xl bg-industrial-900">
              {/* Abstract conceptual graphic representing the 'Gap' - using CSS pattern or placeholder until specific asset needed. 
                   For now, we can use a high-contrast typography block or the map cut. 
                   Let's use a typography layout. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="text-white/20 text-9xl font-black absolute top-0 left-0 leading-none -translate-x-12 -translate-y-12">
                  VS
                </div>
                <h3 className="text-3xl font-black text-white mb-12 relative z-10">
                  The Market Gap
                </h3>

                <div className="flex gap-8 w-full">
                  <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-sm text-left">
                    <div className="text-berlin-red font-bold mb-2 uppercase tracking-widest text-xs">
                      The Giant
                    </div>
                    <p className="text-industrial-400 text-sm">
                      "You are Account #8492. Minimum order: 5 million units.
                      Lead time: 18 months."
                    </p>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-sm text-left">
                    <div className="text-berlin-red font-bold mb-2 uppercase tracking-widest text-xs">
                      The Broker
                    </div>
                    <p className="text-industrial-400 text-sm">
                      "I know a guy who knows a guy. I can't guarantee quality,
                      but the price is cheap."
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-white text-industrial-900 p-6 rounded-sm w-full relative z-20 shadow-xl transform scale-105 border-t-4 border-berlin-red">
                  <div className="text-berlin-blue font-bold mb-2 uppercase tracking-widest text-xs">
                    The PIF Hybrid
                  </div>
                  <p className="text-industrial-800 font-bold">
                    "Boutique attention. Enterprise scale. We own the tooling,
                    you own the market."
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold text-berlin-red uppercase tracking-widest mb-4">
                The Origin
              </h2>
              <h2 className="text-5xl font-black text-industrial-900 mb-8 leading-tight">
                The "Broker Blackout" <br />
                Ends Here.
              </h2>
              <div className="prose prose-lg text-industrial-600 md:pr-12">
                <p className="text-xl font-medium text-industrial-800 mb-6">
                  We built the partner we wished we had.
                </p>
                <p className="mb-6">
                  Ten years ago, the packaging landscape was broken. Brands
                  faced a binary choice: the <strong>Global Giant</strong> (who
                  didn't care about your startup) or the
                  <strong>Local Broker</strong> (who had no control over the
                  factory).
                </p>
                <p className="mb-6">
                  We created a third path. A <strong>Hybrid Model</strong> that
                  combines the hyper-responsive service of a creative studio
                  with the raw manufacturing muscle of a Fortune 500 supplier.
                </p>
                <p>
                  We don't just "source" packaging. We engineer it. We validate
                  it. We ship it. And we answer our own phones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE METHODOLOGY: No Salespeople */}
      <section className="py-24 bg-industrial-50 border-y border-industrial-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-sm font-bold text-berlin-blue uppercase tracking-widest mb-4">
                The Methodology
              </h2>
              <h2 className="text-5xl font-black text-industrial-900 mb-8 leading-tight">
                No Salespeople. <br />
                Only Partners.
              </h2>
              <p className="text-xl text-industrial-600 mb-8 leading-relaxed">
                At most agencies, you meet the "A Team" during the pitch, and
                then you're handed off to a junior account manager.
              </p>
              <p className="text-lg text-industrial-600 mb-8 leading-relaxed">
                At PIF, your point of contact is a Technical Lead. Someone who
                knows neck finishes, resin grades, and freight lanes. We believe
                that competence is the best form of customer service.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-berlin-red" />
                  <span className="font-bold text-industrial-800">
                    Technical Obsession
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-berlin-red" />
                  <span className="font-bold text-industrial-800">
                    Direct Factory Access
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Briefcase className="w-6 h-6 text-berlin-red" />
                  <span className="font-bold text-industrial-800">
                    Radical Transparency
                  </span>
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative h-[600px] w-full rounded-sm overflow-hidden shadow-2xl border border-white">
              <Image
                src="/images/about/about_philosophy_worktable.png"
                alt="Engineer Hands"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL BACKBONE - Light Mode */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-industrial-900 mb-4">
              Global Reach. Local Touch.
            </h2>
            <p className="text-xl text-industrial-500">
              Infrastructure that spans 14 countries, managed from our US
              Headquarters.
            </p>
          </div>

          <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto mb-16">
            <Image
              src="/images/about/about_map_light.png"
              alt="Global Network Map"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 border border-industrial-100 rounded-sm bg-industrial-50">
              <div className="text-4xl font-black text-berlin-blue mb-2">
                Global
              </div>
              <div className="text-xs uppercase font-bold text-industrial-400 tracking-widest">
                Manufacturing Network
              </div>
            </div>
            <div className="text-center p-8 border border-industrial-100 rounded-sm bg-industrial-50">
              <div className="text-4xl font-black text-berlin-blue mb-2">
                14
              </div>
              <div className="text-xs uppercase font-bold text-industrial-400 tracking-widest">
                Countries Served
              </div>
            </div>
            <div className="text-center p-8 border border-industrial-100 rounded-sm bg-industrial-50">
              <div className="text-4xl font-black text-berlin-blue mb-2">
                High
              </div>
              <div className="text-xs uppercase font-bold text-industrial-400 tracking-widest">
                Volume Capability
              </div>
            </div>
            <div className="text-center p-8 border border-industrial-100 rounded-sm bg-industrial-50">
              <div className="text-4xl font-black text-berlin-blue mb-2">
                10+
              </div>
              <div className="text-xs uppercase font-bold text-industrial-400 tracking-widest">
                Years of Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MANIFESTO / CTA */}
      <section className="py-32 bg-industrial-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <BookOpen className="w-16 h-16 text-berlin-red mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
            "Packaging is the last physical touchpoint in a digital world."
          </h2>
          <p className="text-xl text-industrial-400 mb-12 max-w-2xl mx-auto">
            Don't let your product fail at the finish line. Partner with
            architects who care about the details.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="px-10 py-5 bg-berlin-red text-white font-bold text-lg rounded-sm hover:bg-red-700 transition-all shadow-lg hover:shadow-berlin-red/20 shadow-berlin-red/10"
            >
              Start Your Project
            </Link>
            <Link
              href="/capabilities"
              className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-lg rounded-sm hover:bg-white/10 transition-all"
            >
              View Capabilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
