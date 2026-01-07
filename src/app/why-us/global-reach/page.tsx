import React from "react";
import ContentHero from "@/components/content/ContentHero";
import SectionBlock from "@/components/content/SectionBlock";
import { Globe, MapPin, Plane, Truck } from "lucide-react";

export default function GlobalReachPage() {
  return (
    <main>
      <ContentHero
        title="Our Global Reach"
        subtitle="Sourcing from the best, delivering to you. Anywhere in the world."
        align="center"
      />

      <SectionBlock>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-industrial-800 mb-6">
              A Network Without Borders
            </h2>
            <p className="text-industrial-600 mb-6 leading-relaxed">
              PIF Packaging leverages a vast network of manufacturing partners
              across North America, Europe, and Asia. This global footprint
              ensures that we can source the highest quality materials at the
              most competitive prices, regardless of where they are produced.
            </p>
            <p className="text-industrial-600 mb-8 leading-relaxed">
              Our logistical expertise means that borders are not barriers. We
              handle the complexities of international shipping, customs, and
              warehousing, so you get your packaging when and where you need it.
            </p>

            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-berlin-blue">30+</span>
                <span className="text-sm font-semibold text-industrial-500 uppercase tracking-widest">
                  Countries
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-berlin-blue">
                  100+
                </span>
                <span className="text-sm font-semibold text-industrial-500 uppercase tracking-widest">
                  Warehouses
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold text-berlin-blue">
                  1,700+
                </span>
                <span className="text-sm font-semibold text-industrial-500 uppercase tracking-widest">
                  Suppliers
                </span>
              </div>
            </div>
          </div>

          <div className="relative bg-industrial-900 rounded-lg p-8 aspect-video flex items-center justify-center overflow-hidden">
            {/* Abstract Map Visualization */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-berlin-blue via-industrial-900 to-black"></div>
            <Globe
              className="w-64 h-64 text-berlin-blue opacity-50 absolute"
              strokeWidth={0.5}
            />

            {/* Animated Dots/Planes */}
            <div className="relative z-10 w-full h-full">
              <div className="absolute top-1/4 left-1/4">
                <MapPin className="w-8 h-8 text-white animate-bounce" />
                <span className="text-white text-xs font-bold bg-berlin-blue px-2 py-1 rounded ml-2">
                  Chicago HQ
                </span>
              </div>
              <div className="absolute bottom-1/3 right-1/4">
                <MapPin className="w-6 h-6 text-industrial-400" />
              </div>
              <div className="absolute top-1/3 right-1/3">
                <MapPin className="w-6 h-6 text-industrial-400" />
              </div>
              <div className="absolute bottom-1/4 left-1/3">
                <MapPin className="w-6 h-6 text-industrial-400" />
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock background="gray">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-industrial-800">
            Logistic Capabilities
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-sm shadow-sm text-center">
            <Plane className="w-10 h-10 text-berlin-blue mx-auto mb-4" />
            <h3 className="font-bold text-industrial-800 mb-2">Air Freight</h3>
            <p className="text-sm text-industrial-600">
              Expedited global shipping for urgent needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm text-center">
            <Truck className="w-10 h-10 text-berlin-blue mx-auto mb-4" />
            <h3 className="font-bold text-industrial-800 mb-2">
              Ground Transport
            </h3>
            <p className="text-sm text-industrial-600">
              efficient regional and cross-country distribution.
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm text-center">
            <Globe className="w-10 h-10 text-berlin-blue mx-auto mb-4" />
            <h3 className="font-bold text-industrial-800 mb-2">
              Ocean Freight
            </h3>
            <p className="text-sm text-industrial-600">
              Cost-effective solution for high-volume orders.
            </p>
          </div>
        </div>
      </SectionBlock>
    </main>
  );
}
