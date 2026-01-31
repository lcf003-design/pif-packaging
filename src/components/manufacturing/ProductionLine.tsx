"use client";

import React from "react";
import Image from "next/image";

export default function ProductionLine() {
  return (
    <section className="bg-neutral-900 pb-24 font-sans">
      {/* 
        REVISED: INDUSTRY STANDARD & AUTHENTIC
        - Copy based on research from top competitors (Berlin, Amcor, TricorBraun).
        - Uses real industry terminology: DFM, Bridge Tooling, ISBM, Biaxial Orientation, IMD.
        - VISUALS: Photorealistic generated assets for authentic representation.
      */}

      {/**
       * STAGE 01: ENGINEERING
       */}
      <div className="sticky top-0 z-10 min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

        <div className="relative container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.85] text-white">
              CUSTOM <br /> <span className="text-blue-500">TOOLING</span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-md font-light">
              Our integrated{" "}
              <span className="text-white font-medium">
                Design for Manufacturing (DFM)
              </span>{" "}
              process optimizes mold performance before metal is cut. We utilize
              comprehensive Moldflow® analysis to validate gate locations and
              cooling efficiency, ensuring high-cavitation production
              reliability.
            </p>

            <div className="border-t border-white/10 pt-8">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">
                Engineering Capabilities
              </p>
              <ul className="grid grid-cols-2 gap-4 text-white font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> DFM
                  & Moldflow® Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{" "}
                  Aluminum Bridge Tooling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{" "}
                  Multi-Axis CNC Machining
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />{" "}
                  Rapid 3D Prototyping
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative">
            {/* Visual: Photorealistic Tooling Image */}
            <div className="relative w-full max-w-md aspect-square rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10" />
              <img
                src="/images/manufacturing/eng_mold_tooling.png"
                alt="Precision Steel Injection Mold Tooling"
                className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-[2s] ease-out grayscale hover:grayscale-0"
              />
              {/* Technical Overlay */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                <div className="bg-blue-600 text-white text-[9px] font-mono px-2 py-1 uppercase tracking-widest">
                  HRC-50 Steel
                </div>
                <div className="bg-black/80 backdrop-blur text-white text-[9px] font-mono px-2 py-1 uppercase tracking-widest">
                  Macro View
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**
       * STAGE 02: MANUFACTURING
       */}
      <div className="sticky top-0 z-20 min-h-screen flex items-center justify-center bg-[#8a1c1c] text-white overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[url('/divisions_hero_collage.png')] opacity-20 bg-cover bg-center mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl lg:order-2">
            <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.85]">
              SCALABLE <br /> PRODUCTION
            </h2>

            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-md font-light">
              We leverage single-stage{" "}
              <span className="text-white font-medium">
                Injection Stretch Blow Molding (ISBM)
              </span>{" "}
              for superior optical clarity and strength. Our process utilizes
              biaxial orientation technology to optimize material distribution,
              reducing weight while maintaining structural integrity.
            </p>

            <div className="border-t border-white/20 pt-8">
              <p className="text-sm text-white/60 uppercase tracking-widest mb-4">
                Production Specs
              </p>
              <ul className="grid grid-cols-2 gap-4 text-white font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />{" "}
                  Single-Stage ISBM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" /> Biaxial
                  Orientation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" /> Preform
                  Conditioning
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" /> Leak
                  Detection QC
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex justify-center lg:order-1">
            {/* Visual: Manufacturing Line Image */}
            <div className="relative w-full max-w-md aspect-square rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/images/manufacturing/mfg_automation_line.png"
                alt="High Speed Automation Line"
                className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply" />

              {/* Live Status Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-white uppercase tracking-wider">
                  Line Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**
       * STAGE 03: DECORATION
       */}
      <div className="sticky top-0 z-30 min-h-screen flex items-center justify-center bg-[#f0f0f0] text-black overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#e5e5e5_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.85]">
              DECORATION <br /> & LABELING
            </h2>

            <p className="text-lg text-neutral-600 leading-relaxed mb-10 max-w-md font-light">
              Enhance shelf presence with our suite of direct-to-shape
              decoration capabilities. From high-durability{" "}
              <span className="text-black font-medium">
                In-Mold Labeling (IML)
              </span>{" "}
              to precision silk screening and hot stamping, we deliver finishes
              that align with premium brand standards.
            </p>

            <div className="border-t border-neutral-200 pt-8">
              <p className="text-sm text-neutral-500 uppercase tracking-widest mb-4">
                Finishing Services
              </p>
              <ul className="grid grid-cols-2 gap-4 text-black font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" /> In-Mold
                  Labeling (IML)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" /> Ceramic
                  Screen Printing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />{" "}
                  Pressure Sensitive Applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" /> Shrink
                  Sleeve Application
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            {/* Visual: Premium Finishing Image */}
            <div className="relative w-full max-w-md aspect-[3/4] bg-white shadow-2xl rounded-sm p-4 rotate-2 hover:rotate-0 transition-all duration-500 ease-out">
              <div className="relative w-full h-full overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src="/images/manufacturing/deco_premium_finish.png"
                  alt="Premium Foil Stamping Detail"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -right-4 top-12 bg-black text-white text-xs font-bold py-1 px-4 rotate-90 origin-bottom-right shadow-lg">
                FINISH: GOLD FOIL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
