import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShieldCheck,
  Stethoscope,
  Leaf,
  PawPrint,
  Truck,
  PackageCheck,
  Recycle,
  Scale,
} from "lucide-react";

export default function PetCareMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "pet-care");

  if (!market) {
    notFound();
  }

  // ASSETS MAPPING
  const ASSETS = {
    suite: [
      {
        title: "Soft-Touch Shampoo",
        image: "/images/markets/pet_shampoo_matte_bottle.png",
        desc: "Velvet-finish HDPE for grip in wet conditions.",
      },
      {
        title: "Vitality Jars",
        image: "/images/markets/pet_supplement_jar_amber.png",
        desc: "UV-blocking amber PET for vitamin stability.",
      },
      {
        title: "Gourmet Tins",
        image: "/images/markets/pet_treat_tin_brushed.png",
        desc: "Brushed aluminum with airtight screw lids.",
      },
      {
        title: "Clinical Dental",
        image: "/images/markets/pet_dental_spray.png",
        desc: "Extended nozzle sprayers for precision aiming.",
      },
      {
        title: "Vet-Grade Droppers",
        image: "/images/markets/pet_vet_dropper.png",
        desc: "Calibrated glass pipettes for exact dosing.",
      },
      {
        title: "Fresh-Lock Pouches",
        image: "/images/markets/pet_food_standup_pouch.png",
        desc: "Matte foil barriers with sensory zippers.",
      },
      {
        title: "Salon Pumps",
        image: "/images/markets/pet_grooming_pump_large.png",
        desc: "High-output dosage for professional grooming.",
      },
      {
        title: "Kennel Bulk",
        image: "/images/markets/pet_bulk_pail_modern.png",
        desc: "Stackable 5-gallon systems for breeders.",
      },
    ],
    // Using Market.image for Hero as requested
    labBg: "/images/markets/pet_vet_lab_abstract.png",
    logisticsBg: "/images/markets/pet_bulk_logistics_bg.png",
    pawPattern: "/images/markets/pawprint_scatter_overlay.png",
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-900 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      {/* PAWPRINT OVERLAY - FIXED BACKGROUND */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url(${ASSETS.pawPattern})`,
          backgroundSize: "400px",
        }}
      />

      {/* 1. HERO SECTION (PRESERVED PORTRAIT) */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image} // PRESERVING USER PORTRAIT
            alt="The Bond"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Intelligence
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-200 text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
              <Heart className="w-4 h-4" />
              <span>Veterinary Care Division</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              Family <br />
              <span className="text-orange-100">Standards.</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 font-light max-w-2xl leading-relaxed">
              We don't package "products." We package the health of a family
              member. Our Human-Grade solutions bring pharmaceutical precision
              to veterinary care.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE CARE SUITE (Grid) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-stone-900 mb-6 tracking-tight uppercase">
              The Care Suite
            </h2>
            <div className="h-1 w-20 bg-orange-400 mx-auto rounded-full" />
            <p className="mt-6 text-stone-500 text-lg max-w-2xl mx-auto">
              From the grooming salon to the vet clinic. A holistic range of
              packaging engineered for biological safety and premium shelf
              appeal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {ASSETS.suite.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100"
              >
                <div className="relative h-56 w-full mb-8 overflow-hidden rounded-2xl bg-stone-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-400 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HUMAN-GRADE NARRATIVE (Banner) */}
      <section className="relative py-32 overflow-hidden bg-white border-y border-stone-200">
        <div className="absolute inset-0 opacity-20">
          {/* Using paw pattern more densely here */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ASSETS.pawPattern})`,
              backgroundSize: "200px",
              opacity: 0.1,
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-0 container mx-auto max-w-7xl relative z-10">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={ASSETS.labBg}
              alt="Vet Lab"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
          </div>

          <div className="flex flex-col justify-center md:pl-20 py-12">
            <div className="flex items-center gap-3 mb-6 text-orange-600 font-bold uppercase tracking-widest text-sm">
              <Stethoscope className="w-5 h-5" />
              Clinical Precision
            </div>
            <h2 className="text-5xl font-black text-stone-900 mb-8 tracking-tighter">
              Human-Grade <br />
              <span className="text-stone-400">Integrity.</span>
            </h2>
            <p className="text-lg text-stone-500 leading-relaxed mb-10">
              The line between "pet" and "person" has blurred. FDA regulation is
              catching up. Our packaging meets human food safety standards (21
              CFR) and strict pharmaceutical compliance for topical and oral
              medications.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-stone-100 rounded-lg font-bold text-stone-700 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" /> BPA Free
              </div>
              <div className="px-6 py-3 bg-stone-100 rounded-lg font-bold text-stone-700 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-orange-500" /> FDA
                Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRESERVATION & LOGISTICS (Split) */}
      <section className="bg-stone-900 text-white">
        <div className="grid md:grid-cols-2">
          {/* Left: Freshness Tech */}
          <div className="p-16 md:p-24 border-r border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <Scale className="w-12 h-12 text-orange-400 mb-8" />
              <h3 className="text-3xl font-bold mb-6">
                Preservation Architecture
              </h3>
              <p className="text-stone-400 text-lg leading-relaxed mb-12">
                Nutrients degrade. Our multi-layer EVOH barriers and
                nitrogen-flush capable structures ensure that the kibble stays
                crisp and the supplements stay potent from factory to bowl.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-stone-300">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  Oxidation Resistance
                </li>
                <li className="flex items-center gap-3 text-stone-300">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  Moisture Lock Barriers
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Bulk Logistics */}
          <div className="relative min-h-[500px] group overflow-hidden">
            <Image
              src={ASSETS.logisticsBg}
              alt="Bulk Logistics"
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-16 md:p-24">
              <div className="inline-flex items-center gap-2 text-orange-400 font-bold uppercase tracking-wider mb-4 text-sm">
                <Truck className="w-5 h-5" /> breeder & Kennel Scale
              </div>
              <h3 className="text-3xl font-bold mb-4">Bulk Logistics</h3>
              <p className="text-stone-300 leading-relaxed max-w-md">
                For high-volume kennels and breeders, we offer pallet-optimized
                square pails and industrial bulk sacks that maximize warehouse
                density without sacrificing seal integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ECO-PAWPRINT (Sustainability) */}
      <section className="py-24 bg-orange-50 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10 rotate-12">
          <PawPrint className="w-96 h-96 text-orange-900" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg text-green-600">
            <Recycle className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-stone-900 mb-6">
            The Eco-Pawprint Initiative
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed mb-12">
            Pets leave pawprints on our hearts, not carbon on our planet.
            Explore our aggressive Post-Consumer Recycled (PCR) roadmap and
            fully recyclable mono-material pouch structures.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
              <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-500" /> Ocean-Bound Plastic
              </h4>
              <p className="text-sm text-stone-500">
                Sourced from waterways, protecting marine life while packaging
                yours.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
              <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Recycle className="w-4 h-4 text-green-500" /> 100% rPET Lines
              </h4>
              <p className="text-sm text-stone-500">
                Fully circular economy jars and bottles generated from recycled
                stock.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
              <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-green-500" />{" "}
                Mono-Material
              </h4>
              <p className="text-sm text-stone-500">
                Single-resin pouches that simplify the recycling stream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center border-t border-stone-200">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-8 tracking-tighter">
            Packaging That <br className="hidden md:block" />
            Speaks <span className="text-orange-500">Human.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-stone-900 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-all shadow-2xl"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
