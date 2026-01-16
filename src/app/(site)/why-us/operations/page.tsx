"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Activity,
  Award,
  CheckCircle,
  Database,
  BarChart,
  ArrowRight,
  Zap,
  Target,
  FileSearch,
  Lock,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function OperationsPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const iconVariants = {
    heartbeat: {
      animate: {
        scale: [1, 1.1, 1],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
    drive: {
      hover: {
        x: [0, 8, 0],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
    pop: {
      hover: {
        scale: 1.2,
        rotate: 5,
        transition: { type: "spring" as const, stiffness: 300 },
      },
    },
    shine: {
      animate: {
        scale: [1, 1.15, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
  };

  const performanceMetrics = [
    {
      title: "Anticipatory Support",
      icon: (isActive: boolean) => (
        <motion.div
          variants={iconVariants.heartbeat}
          animate={isActive ? "animate" : "initial"}
          whileHover="animate"
        >
          <Activity size={48} />
        </motion.div>
      ),
      description:
        "PIF Packaging is backed by a dedicated team that provides proactive support, helping strengthen consistency.",
      deepDive: {
        tag: "Support Initiatives",
        details:
          "Ongoing supply chain monitoring to identify and resolve potential issues early. We focus on clear communication through every phase of the project.",
        stats: ["Proactive Problem Solving", "Direct Project Updates"],
        accent: <Zap size={20} className="text-blue-600" />,
      },
    },
    {
      title: "On-Time Delivery",
      icon: (isActive: boolean) => (
        <motion.div
          variants={iconVariants.drive}
          whileHover="hover"
          animate={isActive ? "hover" : "initial"}
        >
          <Truck size={48} />
        </motion.div>
      ),
      description:
        "Timing matters. Leveraging our logistics network, we work to execute deliveries that align with your production timelines.",
      deepDive: {
        tag: "Logistics Coordination",
        details:
          "Coordination with select freight carriers to monitor status. We strive to maintain launch schedules through reliable logistics partnerships.",
        stats: ["Carrier Performance Reviews", "Route Optimization"],
        accent: <Target size={20} className="text-blue-600" />,
      },
    },
    {
      title: "In-Spec Assurance",
      icon: (isActive: boolean) => (
        <motion.div
          variants={iconVariants.pop}
          whileHover="hover"
          animate={isActive ? "hover" : "initial"}
        >
          <CheckCircle size={48} />
        </motion.div>
      ),
      description:
        "Quality is the baseline. With careful controls, we work to ensure every shipment meets agreed-upon specifications.",
      deepDive: {
        tag: "Quality Verifications",
        details:
          "Careful review against technical specifications. We use standard testing protocols to verify that your packaging requirements are met.",
        stats: ["Detailed Spec Reviews", "Consistent Sample Testing"],
        accent: <FileSearch size={20} className="text-blue-600" />,
      },
    },
    {
      title: "Rigorous Standards",
      icon: (isActive: boolean) => (
        <motion.div
          variants={iconVariants.shine}
          animate={isActive ? "animate" : "initial"}
          whileHover="animate"
        >
          <Award size={48} />
        </motion.div>
      ),
      description:
        "We maintain quality oversight across our supply network, working with vendors who share our commitment to excellence.",
      deepDive: {
        tag: "Quality Governance",
        details:
          "Regular vendor reviews and quality documentation management. We help manage the details of compliance to support consistent delivery.",
        stats: ["Vendor Qualification", "Process Documentation"],
        accent: <Lock size={20} className="text-blue-600" />,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-blue-600/10 relative">
      {/* ARCHITECTURAL GRID OVERLAY - Shared across the page */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] scale-105"
        style={{
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px), linear-gradient(to right, #000 0.5px, transparent 0.5px), linear-gradient(to bottom, #000 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
        }}
      />

      {/* 1. HERO SECTION: Operational Precision */}
      <section
        ref={containerRef}
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src="/ops_hero_network.png"
            alt="Global Logistics Network"
            className="w-full h-full object-cover opacity-90 scale-105"
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-20">
          <div className="inline-flex flex-col items-center backdrop-blur-2xl bg-white/90 p-12 rounded-[3rem] border border-white/40 shadow-2xl shadow-black/5">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-600/20 text-blue-600 text-sm font-extrabold uppercase tracking-widest mb-8 animate-fade-in-up shadow-lg shadow-white/50 focus-within:ring-2 ring-blue-600/20 ring-offset-2">
              <Activity className="w-4 h-4" />
              <span>Operational Excellence</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight animate-fade-in-up delay-100 drop-shadow-sm">
              Operational <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Precision.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-800 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              A culture where quality is the baseline and execution is the
              product. We scale with your ambition.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUALITY POLICY: Strategic Excellence */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10 overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text Left */}
            <div>
              <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                <div className="bg-blue-600 p-2 rounded-lg text-white inline-flex shadow-lg shadow-blue-600/20">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                  Our Quality Policy
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Increasing Revenue. <br />
                <span className="text-blue-600">Improving Velocity.</span>
              </h2>
              <div className="prose prose-neutral prose-lg text-neutral-600">
                <p className="mb-6 leading-relaxed">
                  We strive to have a positive impact on the income of our
                  customers. This isn't just a slogan; it's a metric we track.
                  Through rigorous vendor auditing, on-site testing, and
                  proactive issue resolution, we ensure that the packaging you
                  receive builds your brand rather than delaying your launch.
                </p>
                <p className="mb-8 leading-relaxed font-medium text-neutral-800">
                  We are committed to providing accurate and timely information
                  and product while continuously looking for ways to improve our
                  processes.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group text-lg"
              >
                Let's Partner{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image/Badge Right */}
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
              <img
                src="/ops_quality_seal_custom.png"
                alt="Premium Quality Assurance"
                className="relative z-10 w-64 h-64 md:w-[400px] md:h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. PERFORMANCE GRID: Execution metrics */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-neutral-900">
              Execution is <span className="text-blue-600">Everything.</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Regardless of the industry, our main focus is unlocking profits by
              growing your sales and decreasing your costs through operational
              excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                layout
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                className={`cursor-pointer transition-all duration-500 backdrop-blur-xl border p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col ${
                  activeCard === idx
                    ? "bg-white/10 border-blue-600 shadow-blue-600/20 lg:scale-[1.02]"
                    : "bg-white/5 border-white/20 shadow-white/5 hover:bg-white/10 hover:border-blue-600/30 hover:shadow-blue-600/10"
                }`}
              >
                <motion.div
                  layout
                  className={`mb-8 ${
                    activeCard === idx
                      ? "text-blue-600"
                      : "text-blue-600/60 transition-colors duration-500"
                  }`}
                >
                  {metric.icon(activeCard === idx)}
                </motion.div>

                <motion.h3
                  layout
                  className="text-xl font-bold mb-4 text-neutral-900"
                >
                  {metric.title}
                </motion.h3>

                <motion.p
                  layout
                  className="text-neutral-600 text-sm leading-relaxed mb-4"
                >
                  {metric.description}
                </motion.p>

                <AnimatePresence>
                  {activeCard === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-blue-600/20"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-blue-600/10 rounded-lg">
                          {metric.deepDive.accent}
                        </div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.15em]">
                          {metric.deepDive.tag}
                        </span>
                      </div>

                      <p className="text-neutral-800 text-sm font-medium leading-relaxed mb-6">
                        {metric.deepDive.details}
                      </p>

                      <div className="grid grid-cols-1 gap-3">
                        {metric.deepDive.stats.map((stat, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-center gap-3 bg-neutral-900/5 p-3 rounded-2xl border border-neutral-900/5"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                              {stat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!activeCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="mt-auto pt-6 text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center justify-between"
                  >
                    <span>Click for Deep Dive</span>
                    <ArrowRight size={12} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. VISUAL BREAK: Studio Insights */}
      <section className="grid md:grid-cols-2 min-h-[500px] relative z-10 px-6 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          <img
            src="/ops_warehouse.png"
            alt="Warehouse"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/20 transition-colors duration-500" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="font-bold uppercase tracking-[0.2em] text-xs mb-4 opacity-80">
              Logistics
            </p>
            <h3 className="text-4xl font-bold mb-4">Strategic Inventory.</h3>
            <div className="w-12 h-1 bg-blue-600 rounded-full transition-all duration-500 group-hover:w-24" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          <img
            src="/ops_quality_lab.png"
            alt="Quality Lab"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/20 transition-colors duration-500" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="font-bold uppercase tracking-[0.2em] text-xs mb-4 opacity-80">
              Quality Control
            </p>
            <h3 className="text-4xl font-bold mb-4">Precision Testing.</h3>
            <div className="w-12 h-1 bg-blue-600 rounded-full transition-all duration-500 group-hover:w-24" />
          </div>
        </motion.div>
      </section>

      {/* 5. TECH FOOTER: Infrastructure */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 bg-transparent relative z-10"
      >
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-2 min-h-[600px]">
            <div className="p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Database className="text-white w-6 h-6" />
                </div>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                  Enterprise Infrastructure
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                Modern <br />
                <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Operational Stack.
                </span>
              </h2>
              <div className="prose prose-neutral prose-lg text-neutral-600">
                <p className="mb-6 leading-relaxed">
                  PIF Packaging operates with a digitally driven infrastructure
                  designed to support visibility, coordination, and
                  accountability across the supply chain. Our systems help track
                  order progress, manage documentation, and support quality
                  oversight throughout the manufacturing process.
                </p>
                <p className="mb-0 leading-relaxed font-medium text-neutral-800">
                  By leveraging reliable operational tools and continuous
                  process improvements, we enable clear communication, informed
                  decision-making, and consistent execution from project kickoff
                  through delivery.
                </p>
              </div>
            </div>
            <div className="relative min-h-[400px] border-l border-white/10">
              <img
                src="/ops_tech_dashboard.png"
                alt="Enterprise Dashboard"
                className="w-full h-full object-cover absolute inset-0 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-blue-600/5 lg:hidden" />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
