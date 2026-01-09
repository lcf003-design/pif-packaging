"use client";

import React, { useState } from "react";
import {
  Play,
  ShieldCheck,
  Microscope,
  Star,
  ArrowRight,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QualityPage() {
  const capabilities = [
    "Rapid waste reduction assessment",
    "Direct supplier performance monitoring",
    "Cost-efficiency analysis",
    "Production workflow optimization",
    "Inventory organization consulting",
    "Quality checkpoint implementation",
    "Continuous improvement workshops",
    "Root cause analysis & resolution",
    "Manufacturability design review",
    "Risk assessment & prevention",
    "Pre-shipment inspection planning",
    "Statistical consistency checks",
    "Hands-on implementation support",
    "Rapid problem solving",
    "Fit & function verification",
    "Technical spec development",
    "Returns & warranty analysis",
    "Regulatory guidance (FDA/ISO)",
    "Safety compliance review",
  ];

  const labTests = [
    { name: "Precision metrology", type: "Dimensional Check" },
    { name: "Seal integrity", type: "Vacuum Decay" },
    { name: "Material durability", type: "Stress Testing" },
    { name: "Drop simulation", type: "Impact Resistance" },
    { name: "Transit vibration", type: "Shipping Integrity" },
    { name: "Induction seal verification", type: "Bond Strength" },
    { name: "Cap torque analysis", type: "Closure Security" },
    { name: "Full specification review", type: "Compliance Audit" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-berlin-red/10">
      {/* 1. HERO: The "Process Control" Media Center */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Authority Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-black text-neutral-900 tracking-tight mb-8 leading-[1.1]">
                Quality without <br />
                <span className="text-berlin-red">Compromise.</span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl font-medium">
                We bridge the gap between boutique agility and enterprise
                standards. You get the robust quality controls of a major
                player, with the speed and personal attention only a dedicated
                partner can provide.
              </p>
              <div className="pl-6 border-l-4 border-berlin-red">
                <p className="text-neutral-500 italic">
                  "Our approach is simple: We treat your product like it's our
                  own. We utilize enterprise-grade tools to verify consistency,
                  but we keep the process lean and responsive."
                </p>
              </div>
            </motion.div>

            {/* Right: Simulated Video Interface */}
            <VideoPlayer />
          </div>
        </div>
      </section>

      {/* 2. FEATURE STRIPE: "Dedicated Experts" */}
      <section className="bg-berlin-blue py-16 relative overflow-hidden">
        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="relative w-full lg:w-1/2 h-64 lg:h-80 rounded-sm overflow-hidden border-4 border-white/10 shadow-2xl">
              <img
                src="/execution_quality.png"
                alt="Close up inspection"
                className="w-full h-full object-cover grayscale mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
            </div>

            <div className="w-full lg:w-1/2 text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-berlin-red" />
                Agile Expertise
              </h2>
              <p className="text-white/80 text-lg leading-relaxed font-light mb-8">
                We believe you shouldn't have to choose between speed and
                reliability. Our team brings decades of hands-on experience with
                glass, plastic, and metal substrates. We don't just pass along
                specs from a factory; we verify them. We are your technical
                firewall, ensuring what you ordered is exactly what arrives.
              </p>
              <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white border-b border-berlin-red pb-1 hover:text-berlin-red transition-colors">
                Meet The Quality Team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES MATRIX: The Registry */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12 border-l-4 border-berlin-blue pl-6">
            <h2 className="text-4xl font-bold text-neutral-900 mb-2">
              Technical Capabilities
            </h2>
            <p className="text-neutral-500 font-medium">
              Comprehensive oversight from design to delivery.
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-10 rounded-sm">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {capabilities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-berlin-red transition-colors" />
                  <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {cap}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAB SECTION: "The Testing Bench" */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Tabulated Data */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-10">
                <Microscope className="w-8 h-8 text-berlin-red" />
                <h2 className="text-3xl font-bold">On-Site Verification</h2>
              </div>
              <p className="text-neutral-400 mb-10 text-lg">
                Third-party labs are great, but sometimes you need answers now.
                We maintain internal testing protocols to provide immediate
                feedback and rapid troubleshooting.
              </p>

              <div className="border-t border-white/10">
                {labTests.map((test, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-4 border-b border-white/10 hover:bg-white/5 transition-colors px-4 -mx-4"
                  >
                    <span className="font-bold text-neutral-200">
                      {test.name}
                    </span>
                    <span className="text-sm font-mono text-berlin-red uppercase tracking-wider">
                      {test.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tech Visual */}
            <div className="lg:col-span-5 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-berlin-red/20 blur-[100px]" />
              <img
                src="/ops_quality_lab.png"
                alt="Lab Equipment"
                className="w-full rounded-sm border border-white/10 shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="mt-6 flex justify-end">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 border border-neutral-800 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  STATUS: CALIBRATED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER: Passion for Quality Badge */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block relative mb-10"
          >
            <Star className="w-32 h-32 text-berlin-red fill-current drop-shadow-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl font-black text-neutral-900 mb-6">
            Our Promise
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            We are passionate about getting it right. It's not just about
            ticking boxes; it's about ensuring your product performs in the real
            world. We act as your advocate, ensuring your requirements are
            clearly understood and met by every manufacturer we work with.
          </p>

          <button className="bg-berlin-blue text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-berlin-dark-blue transition-colors flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
            Download Our Standards Guide{" "}
            <FileText className="w-4 h-4 opacity-70" />
          </button>
        </div>
      </section>
    </div>
  );
}

function VideoPlayer() {
  return (
    <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden shadow-2xl ring-1 ring-black/10">
      <img
        src="/quality_hero_manual_inspection.jpg"
        alt="Manual Precision Inspection"
        className="w-full h-full object-cover"
      />
      {/* Subtle Gradient Overlay for Text Readability if needed, or just clean */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Static Label - Simple and Professional */}
      <div className="absolute bottom-4 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-berlin-red" />
        <span className="text-white/90 text-xs font-mono tracking-widest uppercase">
          Manual Precision Inspection
        </span>
      </div>
    </div>
  );
}
