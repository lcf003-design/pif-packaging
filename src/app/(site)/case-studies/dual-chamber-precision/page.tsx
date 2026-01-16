"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Settings2,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function DualChamberCaseStudy() {
  return (
    <div className="min-h-screen bg-white text-berlin-blue font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* NAVIGATION STRIP */}
      <nav className="relative px-8 py-6 bg-white border-b border-neutral-100 flex justify-between items-center">
        <Link
          href="/markets/personal-care"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-berlin-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Personal Care
        </Link>
        <div className="text-[10px] font-mono text-neutral-300 uppercase tracking-[0.3em]">
          Case Study: 088-PRECISION
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#fcfcfc]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/case-studies/hero_banner_gold.jpg"
            alt="Dual Chamber Dispense"
            fill
            className="object-cover opacity-100 scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1400px]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 text-rose-500 font-mono text-xs uppercase tracking-widest mb-8 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
              <Zap className="w-3 h-3 fill-rose-500" /> Flagship Project:
              Prestige Skincare
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
              The <br /> Compound <br />{" "}
              <span className="text-rose-500">Interest.</span>
            </h1>
            <p className="text-2xl text-neutral-600 max-w-2xl leading-relaxed font-light mb-12">
              Engineering a 1:1 serum ratio for ingredients that refuse to play
              together. Stabilizing potency through mechanical isolation.
            </p>
            <div className="flex gap-16 border-t border-neutral-100 pt-12">
              {[
                { label: "Duration", value: "14 Weeks" },
                { label: "Tech", value: "Airless Piston" },
                { label: "Material", value: "PETG / PP" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xl font-bold uppercase tracking-tight">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE BRIEF (The Formulation Challenge) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight leading-none">
                The Formulation <br />
                <span className="text-neutral-300">Challenge.</span>
              </h2>
              <p className="text-xl text-neutral-500 leading-relaxed font-light mb-8">
                Prestige actives like Retinol and Vitamin C are notoriously
                volatile. When combined in a single formulation, they often
                degrade each other's efficacy within days of manufacture.
              </p>
              <div className="space-y-6">
                {[
                  "Maintaining high-potency ingredient separation",
                  "Ensuring consumer-grade ease of use",
                  "Preventing oxidation through airless architecture",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 mt-1 shrink-0" />
                    <span className="text-lg text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-12 bg-neutral-50 border border-neutral-100 overflow-hidden group">
              <div className="flex justify-between items-end mb-12">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FlaskConical className="w-8 h-8 text-rose-500" />
                </div>
                <div className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest">
                  Lab Ref: PKG-V-88
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[95%] transition-all duration-1000 group-hover:w-[100%]" />
                </div>
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  <span>Stability Index</span>
                  <span className="text-rose-500">95.4%</span>
                </div>
              </div>
              <div className="mt-12 p-6 bg-white border border-neutral-100 text-sm italic text-neutral-400 border-l-4 border-l-rose-500">
                "Our goal was zero-compromise potency. We needed a mechanical
                solution to a chemical problem."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING PHASE (Internal Architecture) */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                INTERNAL <br /> ARCHITECTURE.
              </h2>
              <p className="text-xl text-neutral-500 font-light">
                We engineered a dual-piston system that allows two separate bulk
                formulations to sit in isolated chambers until the moment of
                dispense.
              </p>
            </div>
            <div className="px-8 py-4 border border-neutral-200 rounded-full font-mono text-xs uppercase tracking-widest text-neutral-400">
              Metering Engine: Dual-Propel 3.0
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 shadow-2xl">
            <div className="relative aspect-square bg-white p-12 overflow-hidden flex items-center justify-center">
              <Image
                src="/images/case-studies/xray_engineering.png"
                alt="Internal Architecture X-Ray"
                fill
                className="object-contain p-24"
              />
            </div>
            <div className="bg-white p-16 flex flex-col justify-center">
              <div className="space-y-12">
                {[
                  {
                    icon: <Settings2 className="w-6 h-6 text-rose-500" />,
                    title: "1:1 Precision Metering",
                    text: "Synchronized dual-actuation ensures exactly 0.5ml + 0.5ml dispense per stroke, regardless of varying viscosity.",
                  },
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
                    title: "Zero-Air Intake",
                    text: "Patented valve logic prevents air backtrack, maintaining the clinical integrity of sensitive formulations.",
                  },
                  {
                    icon: <Cpu className="w-6 h-6 text-rose-500" />,
                    title: "Priming Efficiency",
                    text: "High-vacuum seal achieves full dispense in less than 3 strokes, minimizing product waste.",
                  },
                ].map((feature, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-bold uppercase tracking-tight">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pl-16">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL EVOLUTION (Prototype to Perfection) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black uppercase tracking-widest mb-4">
              Evolution of a System.
            </h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/case-studies/evolution_1_xray_v2.jpg",
                stage: "01. Design",
                label: "CAD Blueprinting",
                desc: "Managing mechanical tolerances to 0.01mm.",
              },
              {
                img: "/images/case-studies/evolution_2_black_cap_v2.jpg",
                stage: "02. Validation",
                label: "SLA Prototyping",
                desc: "Functional testing of vacuum-seal integrity.",
              },
              {
                img: "/images/case-studies/final_product.png",
                stage: "03. Production",
                label: "Final Studio White",
                desc: "Retail-ready mass manufacturing.",
              },
            ].map((step, i) => (
              <div key={i} className="group flex flex-col">
                <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden mb-8 border border-neutral-100">
                  <Image
                    src={step.img}
                    alt={step.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 font-mono text-[10px] bg-white/90 backdrop-blur px-3 py-1 rounded-full text-neutral-400 border border-neutral-100 uppercase tracking-widest">
                    {step.stage}
                  </div>
                </div>
                <h4 className="text-lg font-bold uppercase tracking-tight mb-2">
                  {step.label}
                </h4>
                <p className="text-sm text-neutral-500 font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL OUTCOME SECTION */}
      <section className="py-32 bg-berlin-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 leading-none">
            THE RESULT: <br />
            <span className="text-rose-400">UNCOMPROMISED POTENCY.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 mb-24">
            {[
              { val: "40%", label: "Extended Shelf Life" },
              { val: "98%", label: "Dispense Accuracy" },
              { val: "100%", label: "Active Intake Integrity" },
            ].map((res, i) => (
              <div
                key={i}
                className="p-12 border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-rose-400/50 transition-colors duration-500"
              >
                <div className="text-5xl font-black text-rose-500 mb-4 group-hover:scale-110 transition-transform">
                  {res.val}
                </div>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-blue-200">
                  {res.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/markets/beverage"
            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-berlin-blue font-black text-lg uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-2xl"
          >
            Next Market: Beverage <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-12 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6 flex justify-between items-center opacity-40">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            © 2026 Berlin Packaging | Studio One Eleven
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <span>Forensic Engineering</span>
            <span>Clinical Luxury</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
