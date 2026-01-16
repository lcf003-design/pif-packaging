"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Palette, Zap, Printer, ArrowRight, MoveUpRight } from "lucide-react";

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

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "10%"]);

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen font-sans selection:bg-cyan-100 selection:text-berlin-blue text-neutral-900"
    >
      {/* 1. STUDIO WHITE HERO SECTION */}
      <section className="relative h-[90vh] overflow-hidden flex items-center bg-white perspective-[1000px]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 bg-white">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-neutral-50/50 skew-x-12 transform origin-top-right translate-x-32" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:pr-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-xs font-bold tracking-widest text-neutral-600 uppercase">
                Decorating & Labeling
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-berlin-blue">
              IMPACT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-berlin-blue">
                ON DEMAND
              </span>
            </h1>

            <p className="text-xl text-neutral-600 max-w-lg leading-relaxed mb-10 font-medium border-l-4 border-cyan-500 pl-6">
              We’re not a traditional agency built around layers and long
              timelines. We work as a focused partner, supporting projects from
              early-stage runs through scaled production—helping translate
              vision into manufacturable, real-world solutions.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-berlin-blue text-white px-8 py-4 rounded-sm font-bold tracking-tight text-lg flex items-center gap-3 hover:bg-berlin-dark-blue transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get A Quote
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Hero Graphic / Parallax */}
          <motion.div
            style={{ scale: heroScale, y: heroY }}
            className="hidden lg:block relative h-[600px] w-full"
          >
            {/* Using a composed abstract graphic instead of a simple image to fit "Studio White" */}
            <div className="absolute inset-0 bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-700">
              <img
                src="/decorating_hero_screen_print.png"
                alt="Screen Printing Detail"
                className="w-full h-full object-cover opacity-80 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-berlin-blue/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. REALITY CHECK: The Process (Clean Grid) */}
      <section className="py-24 bg-white border-y border-neutral-100 relative">
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
            {/* Step 1 */}
            <TiltCard className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-cyan-200 hover:bg-white transition-colors duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                <Palette className="w-7 h-7 text-cyan-700" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                1. Design Support
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                Whether you have a fully developed brand or an early concept, we
                provide design support to help prepare artwork for production.
                This includes adapting designs for curved surfaces, material
                characteristics, and manufacturing constraints.
              </p>
            </TiltCard>

            {/* Step 2 */}
            <TiltCard className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-yellow-200 hover:bg-white transition-colors duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                2. Real Prototypes
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                Digital renders only go so far. We help facilitate physical,
                decorated samples so teams can evaluate form, finish, and
                presentation prior to production. Timelines vary based on
                project scope and complexity.
              </p>
            </TiltCard>

            {/* Step 3 */}
            <TiltCard className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-green-200 hover:bg-white transition-colors duration-300 group">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform">
                <Printer className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                3. Flexible Runs
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm">
                We support a range of production volumes, from early test runs
                to scaled programs. Production minimums and scale are determined
                by product specifications, materials, and manufacturing
                requirements.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 3. TECHNIQUE GALLERY (3D Interactive) */}
      <section className="py-32 bg-white text-neutral-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-neutral-200 pb-8">
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
            <TiltCard className="group h-[500px] w-full bg-neutral-100 rounded-2xl overflow-hidden cursor-pointer relative border border-neutral-200 shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-[url('/decorating_hero_screen_print.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 group-hover:bg-cyan-500 group-hover:border-cyan-400 text-white transition-all">
                <MoveUpRight className="w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 p-10 transform translate-z-20">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Screen Printing
                </h3>
                <p className="text-neutral-200 text-lg group-hover:text-white transition-colors">
                  Direct ink-to-surface application. The gold standard for
                  premium feel. <br />
                  <span className="text-cyan-300 text-sm font-mono mt-2 block">
                    &gt; 6+ Colors Available
                  </span>
                </p>
              </div>
            </TiltCard>

            {/* Card 2: Shrink Sleeves */}
            <TiltCard className="group h-[500px] w-full bg-neutral-100 rounded-2xl overflow-hidden cursor-pointer relative border border-neutral-200 shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-[url('/decorating_shrink_sleeve.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 group-hover:bg-orange-500 group-hover:border-orange-400 text-white transition-all">
                <MoveUpRight className="w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Shrink Sleeves
                </h3>
                <p className="text-neutral-200 text-lg group-hover:text-white transition-colors">
                  360-degree graphics that utilize every inch of real estate.
                  Perfect for complex curves. <br />
                  <span className="text-orange-300 text-sm font-mono mt-2 block">
                    &gt; Metallic & Matte Finishes
                  </span>
                </p>
              </div>
            </TiltCard>

            {/* Card 3: PSL */}
            <TiltCard className="group lg:col-span-2 h-[400px] w-full bg-neutral-100 rounded-2xl overflow-hidden cursor-pointer relative border border-neutral-200 shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-[url('/decorating_pressure_sensitive.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 group-hover:bg-green-500 group-hover:border-green-400 text-white transition-all">
                <MoveUpRight className="w-6 h-6" />
              </div>

              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Pressure Sensitive Labels
                </h3>
                <p className="text-neutral-200 text-lg max-w-xl group-hover:text-white transition-colors">
                  The workhorse of the industry. Crisp definition, unlimited
                  textures (foil, embossed, soft-touch), and cost-effective for
                  varied SKUs.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 4. CTA: ACTION ORIENTED */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden border-t border-neutral-200">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-berlin-blue tracking-tighter mb-8 lowercase">
            let's make it <span className="text-cyan-600">pop.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-berlin-blue text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
              Start My Project
            </button>
            <button className="bg-white border border-neutral-200 text-berlin-blue px-12 py-5 rounded-full font-bold text-xl hover:bg-neutral-50 transition-colors shadow-sm">
              Order Samples
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
