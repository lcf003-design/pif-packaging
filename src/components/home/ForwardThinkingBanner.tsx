"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ForwardThinkingBanner() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/forward_thinking_bg.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          Forward Thinking with PIF Design
        </h2>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Package design is a highly effective way to build a brand. Beyond
          increasing brand revenues, effective design can also reduce costs and
          improve productivity. With our design studio, innovating and elevating
          your brand has never been more efficient.
          <br />
          <span className="font-medium text-white block mt-4">
            Don't wait to innovate.
          </span>
        </p>

        <Link
          href="/services/design"
          className="inline-flex items-center gap-2 bg-berlin-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-sm transition-all shadow-lg text-sm uppercase tracking-wider"
        >
          Explore Our Studio
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
