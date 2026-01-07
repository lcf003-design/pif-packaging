import React from "react";
import { Archive } from "lucide-react"; // Using Archive as a generic "Bottle/Container" icon placeholder if needed, acting as the center icon

const ValuePropBanner = () => {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="max-w-2xl z-10">
            <h2 className="text-3xl lg:text-4xl font-black text-industrial-900 leading-tight mb-6">
              PIF Packaging is a Unique Small Business Partner
            </h2>
            <div className="space-y-6 text-industrial-700 leading-relaxed">
              <p>
                PIF Packaging supplies plastic, glass, and metal containers,
                closures and dispensing systems to customers of all types.
              </p>
              <p>
                <strong className="text-industrial-900">
                  Unique Small Business Partner
                </strong>{" "}
                means we bring together the best elements of packaging
                manufacturing, distribution, and income-boosting services. We
                offer a comprehensive array of products and solutions to
                streamline packaging supply chains and grow your profits.
              </p>
              <p className="font-bold text-berlin-blue text-lg">
                With PIF Packaging, one call brings it all!
              </p>
            </div>
          </div>

          {/* Right: Venn Diagram Graphic */}
          <div className="relative flex justify-center items-center h-[400px] w-full select-none">
            {/* Circle 1: Manufacturing (Top) */}
            <div className="absolute top-0 transform -translate-y-6">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-action mix-blend-multiply opacity-90 flex items-start justify-center pt-8 shadow-xl">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[120%] h-[120%] absolute top-[-10%] left-[-10%] pointer-events-none overflow-visible"
                >
                  <path
                    id="curve-top"
                    d="M 10, 50 A 40,40 0 0,1 90,50"
                    fill="transparent"
                  />
                  <text className="fill-blue-900 opacity-40 font-bold text-[9px] md:text-xs tracking-widest uppercase">
                    <textPath
                      href="#curve-top"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      Manufacturing
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Circle 2: Distribution (Bottom Left) */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-[75%] translate-y-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-action mix-blend-multiply opacity-90 flex items-center justify-start pl-4 shadow-xl">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[120%] h-[120%] absolute top-[-10%] left-[-10%] pointer-events-none overflow-visible -rotate-120 origin-center"
                >
                  <path
                    id="curve-left"
                    d="M 10, 50 A 40,40 0 0,1 90,50"
                    fill="transparent"
                  />
                  <text className="fill-blue-900 opacity-40 font-bold text-[9px] md:text-xs tracking-widest uppercase">
                    <textPath
                      href="#curve-left"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      Distribution
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Circle 3: Services (Bottom Right) */}
            <div className="absolute bottom-0 right-1/2 transform translate-x-[75%] translate-y-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-action mix-blend-multiply opacity-90 flex items-center justify-end pr-4 shadow-xl">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[120%] h-[120%] absolute top-[-10%] left-[-10%] pointer-events-none overflow-visible rotate-120 origin-center"
                >
                  <path
                    id="curve-right"
                    d="M 10, 50 A 40,40 0 0,1 90,50"
                    fill="transparent"
                  />
                  <text className="fill-blue-900 opacity-40 font-bold text-[9px] md:text-xs tracking-widest uppercase">
                    <textPath
                      href="#curve-right"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      Services
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Center Icon */}
            <div className="relative z-20 bg-white p-4 rounded-lg shadow-sm">
              <Archive
                className="w-12 h-12 text-industrial-400"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropBanner;
