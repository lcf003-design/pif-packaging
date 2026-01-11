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
