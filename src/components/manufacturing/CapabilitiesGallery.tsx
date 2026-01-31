"use client";

import React, { useState } from "react";
import { Settings, Cpu, PenTool, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const capabilities = [
  {
    id: "mold",
    title: "Custom Mold Building",
    description:
      "In-house engineering teams to design and cut manufacturing molds for proprietary bottle and jar shapes.",
    icon: Settings,
    color: "bg-industrial-900",
    image: "/ops_hero_network.png", // Placeholder
    filter: "blueprint", // CSS class or style for blueprint look
  },
  {
    id: "automation",
    title: "High-Speed Automation",
    description:
      "Automated production lines capable of scaling from pilot runs of 5,000 units to global rollouts of 50 million+.",
    icon: Cpu,
    color: "bg-berlin-red",
    image: "/divisions_hero_collage.png",
    filter: "scale",
  },
  {
    id: "decor",
    title: "Decoration & Labeling",
    description:
      "Silk screening, hot stamping, pressure-sensitive labeling, and shrink sleeving applied directly on the line.",
    icon: PenTool,
    color: "bg-berlin-blue",
    image: "/ops_hero_network.png",
    filter: "texture",
  },
];

export default function CapabilitiesGallery() {
  const [activeId, setActiveId] = useState(capabilities[0].id);

  const activeCapability =
    capabilities.find((c) => c.id === activeId) || capabilities[0];

  return (
    <section className="py-32 bg-white relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-stretch">
          {/* Left: Text & Pitch */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-black mb-8 leading-tight text-industrial-900">
              Limitless <br />
              <span className="text-berlin-red">Capabilities.</span>
            </h2>
            <p className="text-lg text-industrial-600 mb-12 leading-relaxed">
              Why compromise with off-the-shelf? Our manufacturing capabilities
              allow you to dictate the exact specifications of your packaging.
              We handle the entire lifecycle from engineering diagrams to the
              final production run.
            </p>

            <div className="grid gap-6">
              {capabilities.map((cap) => (
                <div
                  key={cap.id}
                  onMouseEnter={() => setActiveId(cap.id)}
                  className={`relative p-6 rounded-lg transition-all duration-300 cursor-pointer border ${
                    activeId === cap.id
                      ? "bg-industrial-50 border-industrial-200 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div className="flex gap-6 items-start">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        activeId === cap.id ? cap.color : "bg-industrial-100"
                      }`}
                    >
                      <cap.icon
                        className={`w-6 h-6 ${
                          activeId === cap.id
                            ? "text-white"
                            : "text-industrial-900"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors ${
                          activeId === cap.id
                            ? "text-industrial-900"
                            : "text-gray-600"
                        }`}
                      >
                        {cap.title}
                      </h3>
                      <p className="text-industrial-500 text-sm leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeId === cap.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-berlin-red rounded-l-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Visual Block */}
          <div className="relative min-h-[600px] bg-industrial-900 rounded-sm overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <img
                  src={activeCapability.image}
                  alt={activeCapability.title}
                  className={`w-full h-full object-cover opacity-60 mix-blend-overlay ${
                    activeCapability.id === "mold"
                      ? "sepia contrast-125"
                      : activeCapability.id === "automation"
                        ? "grayscale brightness-75"
                        : "hue-rotate-15 saturate-150"
                  }`}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-industrial-900/50 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-12 left-12 right-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span
                        className={`h-8 w-1 ${activeCapability.id === "mold" ? "bg-berlin-red" : activeCapability.id === "automation" ? "bg-white" : "bg-berlin-blue"}`}
                      />
                      <span className="text-white/60 font-mono text-sm tracking-widest uppercase">
                        Feature Visualization
                      </span>
                    </div>
                    <h3 className="text-white text-3xl font-bold max-w-lg leading-tight">
                      {activeCapability.id === "mold" &&
                        "Precision Engineering & CAD Output"}
                      {activeCapability.id === "automation" &&
                        "High-Volume Production Lines"}
                      {activeCapability.id === "decor" &&
                        "Premium Finishing & Applications"}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
