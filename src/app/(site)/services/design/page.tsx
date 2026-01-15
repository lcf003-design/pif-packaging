"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PenTool,
  Cpu,
  Cuboid,
  Zap,
  MoveHorizontal,
} from "lucide-react";

// ASSETS
const ASSETS = {
  hero: "/design_hero_studio.png",
  sketch: "/client_bottle_sketch.jpg",
  render: "/client_bottle_render.jpg",
};

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-amber-100 selection:text-berlin-blue">
      {/* HERO SECTION: The Studio */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background - Light Mode */}
        <div className="absolute inset-0 z-0">
          {/* Light background base */}
          <div className="absolute inset-0 bg-neutral-50" />
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

          <Image
            src={ASSETS.hero}
            alt="Industrial Design Studio"
            fill
            className="object-cover opacity-20 mix-blend-multiply grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mb-6 shadow-sm">
            <PenTool className="w-4 h-4" />
            <span>Structured for Creativity</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-berlin-blue">
            From Blueprint <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
              to Reality.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium">
            We don't just supply packaging. We engineer the artifacts that carry
            your brand's soul.
          </p>
        </div>
      </section>

      {/* INTERACTIVE FEATURE: The Reality Slider */}
      <section className="py-24 bg-white relative overflow-hidden border-y border-neutral-100">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-berlin-blue tracking-tight">
            Engineering That Performs
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-lg">
            Drag the slider to reveal how our technical precision translates
            into physical luxury.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <ComparisonSlider
            beforeImage={ASSETS.sketch}
            afterImage={ASSETS.render}
            beforeLabel="Technical Specification"
            afterLabel="Physical Reality"
          />
        </div>
      </section>

      {/* PROCESS GRID */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessCard
              icon={PenTool}
              step="01"
              title="Ideation"
              desc="Pencil meets paper. We explore form, function, and ergonomic storytelling."
            />
            <ProcessCard
              icon={Cpu}
              step="02"
              title="Engineering"
              desc="Volume verification, neck finish logic, and manufacturing feasibility checks."
            />
            <ProcessCard
              icon={Cuboid}
              step="03"
              title="Prototyping"
              desc="Prototype development to evaluate form and functionality prior to tooling. Timelines vary by project."
            />
            <ProcessCard
              icon={Zap}
              step="04"
              title="Production"
              desc="Production support through vetted manufacturing partners, focused on consistency and quality oversight at scale."
            />
          </div>
        </div>
      </section>

      {/* NEW SECTION: The Manufacturing Advantage (Dark Mode / Premium) */}
      <section className="py-32 bg-neutral-950 text-white relative overflow-hidden">
        {/* Background Grid & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-8">
                <Zap className="w-4 h-4" />
                <span>Direct-to-Mold Workflow</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                We don't just draw it. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  We engineer it.
                </span>
              </h2>
              <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-lg">
                Stop handing pretty sketches to factories only to hear "it can't
                be done." Our designers work in <strong>SolidWorks</strong>, not
                Photoshop. Every curve is verified for draft angles, wall
                thickness, and volume displacement before you ever see a render.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-widest font-medium">
                    Moldable Geometries
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">-30%</div>
                  <div className="text-sm text-neutral-500 uppercase tracking-widest font-medium">
                    Time to Market
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image (Engineering Schematic) */}
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] w-full rounded-none overflow-hidden border border-white/10 bg-neutral-900 group">
                <Image
                  src="/images/steel_injection_mold_closeup.png"
                  alt="Steel Injection Mold Tooling"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />

                {/* Floating UI Element */}
                <div className="absolute bottom-8 left-8 right-8 bg-neutral-900/90 backdrop-blur-xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-indigo-400 uppercase">
                      Tooling Verification
                    </span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-indigo-500/30" />
                      <div className="w-2 h-2 rounded-full bg-indigo-500/30" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Innovation (Brand) */}
      <section className="py-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
          {/* Image Half */}
          <div className="relative min-h-[500px] lg:min-h-auto group overflow-hidden">
            <Image
              src="/images/pcr_plastic_bottle_render.png"
              alt="Sustainable PCR Packaging"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>

          {/* Content Half */}
          <div className="bg-amber-400 flex flex-col justify-center p-12 lg:p-24 relative overflow-hidden">
            {/* Abstract Texture */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

            <h2 className="text-5xl md:text-7xl font-black text-neutral-900 mb-8 tracking-tighter relative z-10">
              Green is <br />
              <span className="text-white">Gold.</span>
            </h2>
            <p className="text-xl text-neutral-800 font-medium mb-12 max-w-md leading-relaxed relative z-10">
              Sustainability isn't a badge; it's a competitive advantage. We
              design for the circular economy using 100% PCR (Post-Consumer
              Recycled) plastics and monomaterial closures.
            </p>

            <ul className="space-y-6 relative z-10">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-amber-500 flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-xl font-bold text-neutral-900">
                    Lightweighting
                  </h4>
                  <p className="text-neutral-800/80">
                    Reduce shipping costs and carbon footprint.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-amber-500 flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-xl font-bold text-neutral-900">
                    PCR Integration
                  </h4>
                  <p className="text-neutral-800/80">
                    FDA-approved recycled resins that look virgin.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white relative">
        {/* Abstract Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-amber-50 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="container mx-auto px-6 text-center z-10 relative">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-berlin-blue tracking-tighter">
            Have a vision?
          </h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto font-medium">
            Let's build the mold. Our engineering team is ready to review your
            sketches.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-5 bg-berlin-blue text-white font-bold text-lg rounded-full hover:bg-berlin-dark-blue transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Engineering <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// SUB-COMPONENTS

function ProcessCard({
  icon: Icon,
  step,
  title,
  desc,
}: {
  icon: any;
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group p-8 rounded-2xl bg-white border border-neutral-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-neutral-300 select-none group-hover:text-amber-500 transition-colors">
        {step}
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-neutral-50 flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors">
          <Icon className="w-6 h-6 text-neutral-400 group-hover:text-amber-600 transition-colors" />
        </div>

        <h3 className="text-xl font-bold text-berlin-blue mb-3">{title}</h3>
        <p className="text-neutral-500 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}

function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified pointer move handler
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  // Pointer events for robust touch/mouse handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    containerRef.current?.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[2/1] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-neutral-200 shadow-2xl touch-none bg-neutral-100"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* AFTER IMAGE (Background - The Reality) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-900 border border-white/20 z-10 shadow-lg">
          {afterLabel}
        </div>
      </div>

      {/* BEFORE IMAGE (Foreground - The Sketch - Clipped) */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-lg z-10 border border-white/20">
          {beforeLabel}
        </div>
      </div>

      {/* SLIDER HANDLE */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-500 cursor-ew-resize z-20 hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center border border-neutral-200 hover:scale-110 transition-transform">
          <MoveHorizontal className="w-5 h-5 text-amber-600" />
        </div>
      </div>
    </div>
  );
}
