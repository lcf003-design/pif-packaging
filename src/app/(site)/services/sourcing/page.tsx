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
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-blue-100 selection:text-berlin-blue relative">
      {/* ARCHITECTURAL GRID OVERLAY */}
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
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20">
          <div className="inline-flex flex-col items-center backdrop-blur-md bg-white/60 p-12 rounded-[3rem] border border-white/50 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-berlin-blue text-sm font-extrabold uppercase tracking-widest mb-8 shadow-sm">
              <Globe className="w-4 h-4" />
              <span>Sourcing Without Borders</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-berlin-blue">
              Global Reach, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-berlin-blue">
                Personal Scale.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium">
              From boutique launches to enterprise supply chains. We curated the
              world's best manufacturers so you don't have to.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE: The Virtual Procurement Team */}
      <section className="py-32 bg-neutral-50 border-y border-neutral-100 relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Map Visual - Refined Container */}
          <div className="relative aspect-square md:aspect-video bg-white rounded-2xl overflow-hidden border border-neutral-200 group shadow-2xl shadow-neutral-200">
            <Image
              src={ASSETS.map}
              alt="Global Sourcing Network"
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Interactive Source Nodes - Adjusted colors for light map */}
            <SourceNode top="30%" left="22%" label="USA (Domestic)" />
            <SourceNode top="35%" left="48%" label="Europe (Premium)" />
            <SourceNode top="42%" left="72%" label="China (Volume)" />
            <SourceNode top="55%" left="68%" label="Vietnam (Alt-Source)" />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-berlin-blue tracking-tight">
              Your Virtual <br />
              <span className="text-blue-600">Procurement Team.</span>
            </h2>
            <div className="prose prose-neutral prose-lg text-neutral-600">
              <p className="mb-8 font-medium leading-relaxed">
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
      <section className="py-32 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl font-black mb-6 text-berlin-blue uppercase tracking-tight">
              Beyond the Box
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Sourcing is just the start. We add value at every touchpoint to
              streamline your operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Kitting */}
            <ServiceCard
              image={ASSETS.kitting}
              title="Scalable Kitting"
              icon={Box}
            >
              <div className="mt-4 text-neutral-500 leading-relaxed text-sm">
                <p className="mb-4">
                  We assemble complex packs whether it's for a holiday promo or
                  a permanent SKU. Our kitting teams handle multi-component
                  assembly, labeling, and repacking with speed and precision.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Multi-vendor consolidation
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Gift set assembly
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
              <div className="mt-4 text-neutral-500 leading-relaxed text-sm">
                <p className="mb-4">
                  Elevate your brand with premium finishing. From silk screening
                  on glass to soft-touch coatings on plastics, we ensure your
                  packaging feels as good as it looks.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    UV Screen Printing
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Custom Color Matching
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
        className="relative py-32 overflow-hidden border-t border-neutral-100 bg-neutral-50"
      >
        <motion.div
          className="absolute inset-0 bg-[url('/design_hero_studio.png')] bg-cover bg-center opacity-10 mix-blend-multiply"
          style={{ y: bottomParallax }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex flex-col items-center bg-white p-12 md:p-16 rounded-[3rem] border border-neutral-100 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-berlin-blue tracking-tight">
              If We Can't Find It, <br />
              <span className="text-blue-600">We Can Make It.</span>
            </h2>
            <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto font-medium">
              Qualified customers may receive brand and package design support
              as part of an active commercial engagement.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link
                href="/services/design"
                className="px-10 py-5 bg-berlin-blue text-white font-bold text-lg rounded-full hover:bg-berlin-dark-blue transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Explore Design Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-berlin-blue border border-neutral-200 font-bold text-lg rounded-full hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
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
      <div className="relative w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)] border border-white" />

      {/* Tooltip */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white text-berlin-blue text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-100 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20 shadow-xl">
        {label}
        {/* Little carrot arrow */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-neutral-100" />
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
    <div className="flex gap-5 p-5 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
      <div className="mt-1 bg-blue-50 p-3 rounded-xl h-fit">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-berlin-blue mb-2">{title}</h3>
        <p className="text-neutral-500 leading-relaxed text-sm">{desc}</p>
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
    <div className="bg-white border border-neutral-200 shadow-lg rounded-2xl overflow-hidden hover:border-blue-200 transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}
