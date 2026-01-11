"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Car,
  GlassWater,
  Utensils,
  Wine,
  Beer,
  Sparkles,
  Home,
  TestTube2,
  Pill,
  Leaf,
  Dog,
  Container,
  Flame,
  FlaskConical,
  Beaker,
  Droplets,
  ArrowRight,
  Anchor,
  Box,
  Truck,
  Globe,
  Settings,
} from "lucide-react";
import Image from "next/image";

import { MARKETS_DATA } from "@/data/markets";
import Link from "next/link";

// --- COMPONENT: HERO ---
function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-900/30 to-transparent" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md text-neutral-400 text-sm font-mono tracking-widest uppercase">
            Industry Expertise
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
            We Know <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-200 to-white">
              Your Market.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Every shelf has its own rules. Whether you're filling 50 bottles in
            a garage or 50 million in a plant, we speak your language.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// --- COMPONENT: BENTO GRID ---
function MarketBento() {
  return (
    <section className="bg-neutral-950 pb-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {MARKETS_DATA.map((market, i) => (
            <Link
              key={market.slug}
              href={`/markets/${market.slug}`}
              className={`relative h-[300px] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 ${market.colSpan}`}
            >
              <motion.div
                className="h-full w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={market.image}
                    alt={market.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-90" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-300">
                      <market.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {market.title}
                    </h3>
                    <p className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {market.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- COMPONENT: GROWTH ENGINE (SCROLL VISUALIZATION) ---
function GrowthEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Transform values for "The Box" based on scroll
  const boxScale = useTransform(smoothProgress, [0.2, 0.5, 0.8], [1, 2, 0.5]);
  const boxColor = useTransform(
    smoothProgress,
    [0.2, 0.5, 0.8],
    ["#3b82f6", "#ffffff", "#3b82f6"]
  );
  const boxRotate = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 180, 0]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-berlin-blue tracking-tighter mb-6">
            The Growth Engine.
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Packaging isn't just a box. It's the infrastructure for your scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Stage 1: The Startup */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-50 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-0" />
            <div className="relative bg-white border border-neutral-100 p-8 rounded-3xl shadow-lg h-full flex flex-col items-center text-center hover:border-blue-200 transition-colors">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                <Box className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-berlin-blue mb-2">
                Stage 1: The Startup
              </h3>
              <div className="w-12 h-1 bg-blue-500 rounded-full mb-4" />
              <p className="text-neutral-500 mb-6">
                "I need 500 bottles by Tuesday."
              </p>
              <ul className="text-left space-y-2 text-sm text-neutral-600 w-full">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Low MOQs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Stock Inventory
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Credit Card Ready
                </li>
              </ul>
            </div>
          </div>

          {/* Stage 2: The Scale-Up */}
          <div className="relative group md:-mt-12">
            <div className="absolute inset-0 bg-neutral-900 rounded-3xl transform -rotate-3 transition-transform group-hover:rotate-0" />
            <div className="relative bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl h-full flex flex-col items-center text-center text-white">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white mb-6 border border-white/20">
                <Settings className="w-10 h-10 animate-spin-slow" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Stage 2: The Scale-Up</h3>
              <div className="w-12 h-1 bg-blue-500 rounded-full mb-4" />
              <p className="text-neutral-400 mb-6">
                "We need to cut unit costs by 15%."
              </p>
              <ul className="text-left space-y-2 text-sm text-neutral-300 w-full">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Custom Mold Development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Warehousing Programs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Decorating Services
                </li>
              </ul>
            </div>
          </div>

          {/* Stage 3: The Enterprise */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-50 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-0" />
            <div className="relative bg-white border border-neutral-100 p-8 rounded-3xl shadow-lg h-full flex flex-col items-center text-center hover:border-blue-200 transition-colors">
              <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white mb-6">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-berlin-blue mb-2">
                Stage 3: The Enterprise
              </h3>
              <div className="w-12 h-1 bg-blue-500 rounded-full mb-4" />
              <p className="text-neutral-500 mb-6">
                "We need supply chain resilience."
              </p>
              <ul className="text-left space-y-2 text-sm text-neutral-600 w-full">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Global Sourcing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Dedicated Freight Lines
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  Predictive Analytics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function MarketsPage() {
  return (
    <div className="bg-neutral-950 min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <Hero />
      <MarketBento />
      <div className="bg-white rounded-[3rem] overflow-hidden -mt-16 relative z-20">
        <GrowthEngine />

        {/* Specialty Divisions - Compact Version */}
        <section className="py-24 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-berlin-blue">
                    Dangerous Goods
                  </h4>
                  <p className="text-sm text-neutral-500 mt-1">
                    Certified UN-rated packaging for hazardous materials.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <div className="p-3 bg-cyan-100 text-cyan-600 rounded-lg">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-berlin-blue">
                    Scientific Glass
                  </h4>
                  <p className="text-sm text-neutral-500 mt-1">
                    Lab-grade borosilicate and precision instruments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic CTA */}
        <section className="py-32 bg-berlin-blue text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              Let's build
              <br />
              something real.
            </h2>
            <button className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-berlin-blue bg-white rounded-full overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
