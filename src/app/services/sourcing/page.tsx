"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Anchor,
  Box,
  Palette,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// ASSETS
const ASSETS = {
  hero: "/sourcing_hero_port.png",
  map: "/sourcing_map_matte.png",
  kitting: "/sourcing_process_kitting.png",
  deco: "/sourcing_process_deco.png",
};

export default function SourcingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const { scrollYProgress } = useScroll({
    target: bottomRef,
    offset: ["start end", "end start"],
  });
  const bottomParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-blue-600/10 relative">
      {/* ARCHITECTURAL GRID OVERLAY - Shared across the page */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px), linear-gradient(to right, #000 0.5px, transparent 0.5px), linear-gradient(to bottom, #000 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
        }}
      />

      {/* HERO SECTION: Global Reach, Personal Scale */}
      <section
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
        ref={containerRef}
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src={ASSETS.hero}
            alt="Global Sourcing Port"
            fill
            className="object-cover opacity-90 scale-105" // 90% opacity as requested
            priority
          />
          {/* Removed obscuring gradient to allow true see-through glass */}
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20">
          <div className="inline-flex flex-col items-center backdrop-blur-xl bg-white/5 p-12 rounded-[3rem] border border-white/20 shadow-xl shadow-white/5">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-600/20 text-blue-600 text-sm font-extrabold uppercase tracking-widest mb-8 animate-fade-in-up shadow-lg shadow-white/50">
              <Globe className="w-4 h-4" />
              <span>Sourcing Without Borders</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight animate-fade-in-up delay-100 drop-shadow-sm">
              Global Reach, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Personal Scale.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-800 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              From boutique launches to enterprise supply chains. We curated the
              world's best manufacturers so you don't have to.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE: The Virtual Procurement Team */}
      <section className="py-32 bg-neutral-50 border-y border-neutral-200 relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Map Visual */}
          <div className="relative aspect-square md:aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 group shadow-2xl shadow-blue-900/10">
            <Image
              src={ASSETS.map}
              alt="Global Sourcing Network"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />

            {/* Interactive Source Nodes */}
            <SourceNode top="30%" left="22%" label="USA (Domestic)" />
            <SourceNode top="35%" left="48%" label="Europe (Premium)" />
            <SourceNode top="42%" left="72%" label="China (Volume)" />
            <SourceNode top="55%" left="68%" label="Vietnam (Alt-Source)" />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Your Virtual <br />
              <span className="text-blue-500">Procurement Team.</span>
            </h2>
            <div className="prose prose-neutral prose-lg text-neutral-600">
              <p className="mb-8">
                We don't just buy; we vet. Whether you need 5,000 units for a
                pilot or 5 million for a national roll-out, we utilize the same
                rigorous engineering standards to ensure your product arrives
                exactly as specified.
              </p>

              <div className="space-y-6">
                <FeatureItem
                  icon={Anchor}
                  title="Agile Sourcing"
                  desc="We match the factory to your scale. Start small with domestic runs, then seamlessly transition to high-volume global production as you grow."
                />
                <FeatureItem
                  icon={ShieldCheck}
                  title="Boots on the Ground"
                  desc="Our engineers are physically present on the factory floor in China, Europe, and Vietnam. We are your eyes and ears overseas."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-32 bg-transparent relative z-10">
        <div className="container mx-auto px-6 text-neutral-900">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 text-neutral-900">
              Beyond the Box
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              Sourcing is just the start. We add value at every touchpoint to
              streamline your operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Kitting */}
            <ServiceCard
              image={ASSETS.kitting}
              title="Scalable Kitting"
              icon={Box}
            >
              <div className="mt-4 text-neutral-400 leading-relaxed">
                <p className="mb-4">
                  We assemble complex packs whether it's for a holiday promo or
                  a permanent SKU. Our kitting teams handle multi-component
                  assembly, labeling, and repacking with speed and precision.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" />{" "}
                    Multi-vendor consolidation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" /> Gift
                    set assembly
                  </li>
                </ul>
              </div>
            </ServiceCard>

            {/* Card 2: Decoration */}
            <ServiceCard
              image={ASSETS.deco}
              title="Bespoke Decoration"
              icon={Palette}
            >
              <div className="mt-4 text-neutral-400 leading-relaxed">
                <p className="mb-4">
                  Elevate your brand with premium finishing. From silk screening
                  on glass to soft-touch coatings on plastics, we ensure your
                  packaging feels as good as it looks.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" /> UV
                    Screen Printing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" /> Custom
                    Color Matching
                  </li>
                </ul>
              </div>
            </ServiceCard>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: Innovation Cross-Link */}
      <section
        ref={bottomRef}
        id="design-services"
        className="relative py-32 overflow-hidden"
      >
        {/* Removed solid bg-blue-50 to allow banner visibility */}
        <motion.div
          className="absolute inset-0 bg-[url('/design_hero_studio.png')] bg-cover bg-center opacity-90 scale-110"
          style={{ y: bottomParallax }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex flex-col items-center backdrop-blur-2xl bg-white/5 p-12 md:p-16 rounded-[4rem] border border-white/20 shadow-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-neutral-900 drop-shadow-sm">
              If We Can't Find It, <br />
              <span className="text-blue-600">We Can Make It.</span>
            </h2>
            <p className="text-xl text-neutral-800 mb-12 max-w-2xl mx-auto font-medium">
              Qualified customers may receive brand and package design support
              as part of an active commercial engagement.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link
                href="/services/design"
                className="px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
              >
                Explore Design Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-blue-600 border border-blue-100 font-bold text-lg rounded-full hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
              >
                Start Sourcing Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// SUB-COMPONENTS

function SourceNode({
  top,
  left,
  label,
}: {
  top: string;
  left: string;
  label: string;
}) {
  return (
    <div
      className="absolute flex items-center justify-center w-6 h-6 group cursor-pointer"
      style={{ top, left }}
    >
      <div className="absolute w-full h-full bg-blue-500 rounded-full animate-ping opacity-60" />
      <div className="relative w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] border border-white" />

      {/* Tooltip */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-neutral-900/95 text-white text-xs font-bold px-3 py-1.5 rounded border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20 shadow-xl">
        {label}
      </div>
    </div>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200">
      <div className="mt-1">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-neutral-900 mb-1">{title}</h3>
        <p className="text-neutral-600 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}

function ServiceCard({
  image,
  title,
  icon: Icon,
  children,
}: {
  image: string;
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-xl rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 group hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        {/* Removed internal gradient to maintain transparency */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}
