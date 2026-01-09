"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  Palette,
  Layers,
  Zap,
  Maximize,
  Printer,
  Scan,
  PackageCheck,
  ArrowRight,
  MoveUpRight,
} from "lucide-react";
import Link from "next/link";

// --- COMPONENTS ---

// 3D TILT CARD COMPONENT
const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - left - width / 2);
    y.set(event.clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-linear ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function DecoratingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen font-sans selection:bg-cyan-200 selection:text-berlin-blue"
    >
      {/* 1. KINETIC HERO SECTION (Mouse Parallax) */}
      <section className="relative h-[90vh] overflow-hidden flex items-center bg-white perspective-[1000px]">
        {/* Parallax Background Asset */}
        <motion.div
          style={{ scale: heroScale, y: heroY }}
          className="absolute inset-0 z-0 bg-neutral-900"
        >
          <img
            src="/decorating_hero_screen_print.png"
            alt="High Speed Screen Printing"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Subtle Gradient to fade into white content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:pl-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 shadow-sm">
              <Palette className="w-4 h-4 text-cyan-300" />
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                Decorating & Labeling
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-white drop-shadow-2xl">
              IMPACT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                ON DEMAND
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-lg leading-relaxed mb-10 font-light border-l-2 border-cyan-400 pl-6 drop-shadow-md">
              We’re not a traditional agency built around layers and long
              timelines. We work as a focused partner, supporting projects from
              early-stage runs through scaled production—helping translate
              vision into manufacturable, real-world solutions.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-berlin-blue px-8 py-4 rounded-sm font-bold tracking-tight text-lg flex items-center gap-3 hover:bg-neutral-100 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              Get A Quote
              <ArrowRight className="w-5 h-5 text-cyan-600" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 2. REALITY CHECK: The Process (White Mode) */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-berlin-blue tracking-tight mb-6">
              You Don't Need an{" "}
              <span className="text-cyan-600">Award-Winning Studio.</span>
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              You need a partner who understands how to move ideas into
              production. We help bridge the gap between creative intent and
              manufacturing realities—focused on practical execution, not fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Design Support */}
            <TiltCard className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] group transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8 text-berlin-blue" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                1. Design Support
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Whether you have a fully developed brand or an early concept, we
                provide design support to help prepare artwork for production.
                This includes adapting designs for curved surfaces, material
                characteristics, and manufacturing constraints.
              </p>
            </TiltCard>

            {/* Step 2: Validated Prototypes */}
            <TiltCard className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(250,204,21,0.15)] group transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 border border-yellow-100 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                2. Real Prototypes
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Digital renders only go so far. We help facilitate physical,
                decorated samples so teams can evaluate form, finish, and
                presentation prior to production. Timelines vary based on
                project scope and complexity.
              </p>
            </TiltCard>

            {/* Step 3: Scalable runs */}
            <TiltCard className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)] group transition-all duration-300">
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6 border border-green-100 group-hover:scale-110 transition-transform duration-300">
                <Printer className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                3. Flexible Runs
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                We support a range of production volumes, from early test runs
                to scaled programs. Production minimums and scale are determined
                by product specifications, materials, and manufacturing
                requirements.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 3. TECHNIQUE GALLERY (3D Interactive - White Mode) */}
      <section className="py-32 bg-white text-neutral-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-neutral-200 pb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-cyan-600" />
                <span className="text-cyan-700 font-mono tracking-widest uppercase text-sm font-bold">
                  Capabilities
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-berlin-blue uppercase tracking-tight">
                The Toolbox
              </h2>
            </div>
            <p className="text-neutral-400 max-w-sm text-right font-mono text-sm leading-6">
              // SCROLL FOR OPTIONS
              <br />
              SELECT_METHOD: ACTIVE
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Screen Printing */}
            <TiltCard className="group h-[500px] w-full bg-white rounded-3xl overflow-hidden cursor-pointer relative border border-neutral-200 shadow-xl hover:shadow-2xl transition-all">
              {/* Image Layer - Dark Window */}
              <div className="absolute inset-0 bg-[url('/decorating_hero_screen_print.png')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:bg-white group-hover:text-cyan-600 transition-all text-white">
                <MoveUpRight className="w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 p-10 transform translate-z-20">
                <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  Screen Printing
                </h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-md group-hover:text-white transition-colors">
                  Direct ink-to-surface application. The gold standard for
                  premium feel. <br />
                  <span className="text-cyan-300 text-sm font-mono mt-2 block">
                    &gt; 6+ Colors Available
                  </span>
                </p>
              </div>
            </TiltCard>

            {/* Card 2: Shrink Sleeves */}
            <TiltCard className="group h-[500px] w-full bg-white rounded-3xl overflow-hidden cursor-pointer relative border border-neutral-200 shadow-xl hover:shadow-2xl transition-all">
              {/* Image Layer */}
              <div className="absolute inset-0 bg-[url('/decorating_shrink_sleeve.png')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/80" />

              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:bg-white group-hover:text-orange-600 transition-all text-white">
                <MoveUpRight className="w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                  Shrink Sleeves
                </h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-md group-hover:text-white transition-colors">
                  360-degree graphics that utilize every inch of real estate.
                  Perfect for complex curves. <br />
                  <span className="text-orange-300 text-sm font-mono mt-2 block">
                    &gt; Metallic & Matte Finishes
                  </span>
                </p>
              </div>
            </TiltCard>

            {/* Card 3: Pressure Sensitive Labels */}
            <TiltCard className="group lg:col-span-2 h-[400px] w-full bg-white rounded-3xl overflow-hidden cursor-pointer relative border border-neutral-200 shadow-xl hover:shadow-2xl transition-all">
              {/* Image Layer */}
              <div className="absolute inset-0 bg-[url('/decorating_pressure_sensitive.png')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-bl from-green-900/60 via-black/40 to-blue-900/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:bg-white group-hover:text-green-600 transition-all text-white">
                <MoveUpRight className="w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                  Pressure Sensitive Labels
                </h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-2xl group-hover:text-white transition-colors">
                  The workhorse of the industry. Crisp definition, unlimited
                  textures (foil, embossed, soft-touch), and cost-effective for
                  varied SKUs.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 4. CTA: ACTION ORIENTED (White Mode) */}
      <section className="py-24 bg-berlin-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 lowercase">
            let's make it <span className="text-cyan-300">pop.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-berlin-blue px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
              Start My Project
            </button>
            <button className="border border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-colors">
              Order Samples
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
