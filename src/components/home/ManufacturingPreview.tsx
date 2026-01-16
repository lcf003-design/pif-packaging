"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Settings, Cpu, PenTool } from "lucide-react";
import { motion } from "framer-motion";

export default function ManufacturingPreview() {
  return (
    <section className="py-24 bg-white border-b border-industrial-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left: Text & Pitch */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-berlin-red/10 border border-berlin-red/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-berlin-red rounded-full animate-pulse" />
              <span className="text-xs font-bold text-berlin-red uppercase tracking-widest">
                Capabilities
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 leading-tight">
              We Don't Just Distribute. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-red-900">
                We Build.
              </span>
            </h2>

            <p className="text-lg text-industrial-600 mb-10 max-w-xl leading-relaxed">
              PIF Packaging bridges the gap between catalog distribution and
              custom manufacturing. Leverage our in-house engineering and global
              facility network for projects that require more than
              "off-the-shelf."
            </p>

            <div className="grid grid-cols-1 gap-6 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-sm border border-industrial-100 hover:border-berlin-red/30 transition-colors bg-industrial-50/50">
                <div className="bg-white p-2 rounded-md shadow-sm">
                  <Settings className="w-6 h-6 text-industrial-900" />
                </div>
                <div>
                  <h4 className="font-bold text-industrial-900">
                    Custom Tooling
                  </h4>
                  <p className="text-xs text-industrial-500">
                    Proprietary molds & shapes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-sm border border-industrial-100 hover:border-berlin-red/30 transition-colors bg-industrial-50/50">
                <div className="bg-white p-2 rounded-md shadow-sm">
                  <Cpu className="w-6 h-6 text-industrial-900" />
                </div>
                <div>
                  <h4 className="font-bold text-industrial-900">
                    High-Speed Automation
                  </h4>
                  <p className="text-xs text-industrial-500">
                    50M+ unit capacity
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-2 text-berlin-red font-bold uppercase tracking-widest hover:gap-4 transition-all"
            >
              Explore Manufacturing <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="flex-1 w-full relative h-[500px] rounded-sm overflow-hidden group">
            {/* Background Image of Factory/Machine */}
            <div className="absolute inset-0 bg-[url('/divisions_hero_collage.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/90 via-transparent to-transparent" />

            {/* Stat Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-4 text-white text-center divide-x divide-white/20">
                <div>
                  <div className="text-3xl font-black mb-1">45+</div>
                  <div className="text-[10px] uppercase opacity-70 tracking-widest">
                    Global Facilities
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">24/7</div>
                  <div className="text-[10px] uppercase opacity-70 tracking-widest">
                    Production
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">ISO</div>
                  <div className="text-[10px] uppercase opacity-70 tracking-widest">
                    Certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
