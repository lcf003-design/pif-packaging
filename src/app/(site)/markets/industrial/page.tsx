import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  TriangleAlert,
  Droplets,
  Truck,
  ShieldCheck,
  Factory,
  Gauge,
  Container,
  Atom,
  Maximize,
  PenTool,
} from "lucide-react";

export default function IndustrialMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "industrial");

  if (!market) {
    notFound();
  }

  // ASSETS MAPPING
  const ASSETS = {
    arsenal: [
      {
        title: "F-Style Bottles",
        image: "/images/markets/industrial_f_style_bottle.png",
        desc: "High-density space saving design.",
      },
      {
        title: "Industrial Pails",
        image: "/images/markets/industrial_pail_gray.png",
        desc: "5-Gallon utility with gasket seal.",
      },
      {
        title: "Labware",
        image: "/images/markets/industrial_lab_bottle.png",
        desc: "Precision chemical dosing.",
      },
      {
        title: "Utility Jugs",
        image: "/images/markets/industrial_utility_jug.png",
        desc: "Heavy-duty transport.",
      },
      {
        title: "Solvent Cans",
        image: "/images/markets/industrial_metal_f_style.png",
        desc: "Tinplate barrier for volatiles.",
      },
      {
        title: "Paint Cans",
        image: "/images/markets/industrial_paint_can.png",
        desc: "Double-friction seal.",
      },
      {
        title: "Steel Drums",
        image: "/images/markets/industrial_drum_steel.png",
        desc: "55-Gallon bulk storage.",
      },
      {
        title: "UN-Rated Jerricans",
        image: "/images/markets/industrial_jerrican_blue.png",
        desc: "Hazardous material certified.",
      },
    ],
    hazmatBanner: "/images/markets/industrial_hazmat_banner.png",
    logistics: "/images/markets/industrial_warehouse_logistics.png",
    refinery: "/images/markets/industrial_refinery_worker.png",
  };

  return (
    <div className="bg-white min-h-screen font-sans text-neutral-900 selection:bg-orange-100 selection:text-orange-900">
      {/* 1. HERO SECTION: Aggressive Chemistry */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt="Industrial Chemistry"
            fill
            className="object-cover opacity-40 grayscale contrast-125"
            priority
          />
          {/* Technician Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Intelligence
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
              <TriangleAlert className="w-4 h-4" />
              <span>Heavy Industry Division</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              Aggressive <br /> Chemistry.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed">
              Volatile compounds require absolute containment. We engineer
              packaging that withstands the most corrosive environments on
              earth.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE ARSENAL (Grid) */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-neutral-900 mb-4 tracking-tight uppercase">
                The Arsenal
              </h2>
              <p className="text-neutral-500 max-w-md">
                Deployable hardware for every state of matter. From lab-scale
                precision to bulk industrial transport.
              </p>
            </div>
            <div className="hidden md:block w-32 h-1 bg-orange-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ASSETS.arsenal.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 w-full mb-6 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HAZMAT ARCHITECTURE (Banner) */}
      <section className="relative py-32 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.hazmatBanner}
            alt="Hazardous Material"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl text-white">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
              Dangerous <br /> Goods? <br />
              <span className="text-orange-500">Decoded.</span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-10">
              Navigating 49 CFR and UN packaging groups is not for the timid.
              Our hazardous materials experts ensure your documentation,
              labeling, and certification prevents your shipment from being
              impounded at the port.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                <span className="font-bold tracking-wide text-sm">
                  UN Certified
                </span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <Droplets className="w-5 h-5 text-orange-500" />
                <span className="font-bold tracking-wide text-sm">
                  Fluorination
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEAVY INDUSTRY LOGISTICS (Narrative Split) */}
      <section className="py-0 bg-white border-b border-neutral-100">
        <div className="grid md:grid-cols-2 min-h-[700px]">
          <div className="flex flex-col justify-center p-12 md:p-24">
            <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 tracking-tighter uppercase leading-[0.9]">
              Stability & <br /> Speed.
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-md">
              In the industrial sector, reliability is currency. We leverage an
              agile network of manufacturing partners to ensure continuity of
              supply, adapting to demand surges without the overhead of static
              warehousing.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-xl font-black text-orange-600 mb-1 uppercase">
                  Strategic
                </div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  Sourcing Sytems
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-orange-600 mb-1 uppercase">
                  Rapid
                </div>
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  Response Logistics
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-neutral-100 min-h-[500px]">
            <Image
              src={ASSETS.logistics}
              alt="Warehouse Logistics"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. GLOBAL SUPPLY (Use Case Split) */}
      <section className="py-0 bg-neutral-50 border-b border-neutral-100">
        <div className="grid md:grid-cols-2 min-h-[700px]">
          <div className="relative bg-neutral-200 min-h-[500px] order-2 md:order-1">
            <Image
              src={ASSETS.refinery}
              alt="Refinery Operations"
              fill
              className="object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-24 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tight uppercase">
              Verified <br /> Performance.
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mb-8">
              We partner with proven manufacturers who prioritize structural
              integrity. When you buy PIF Industrial, you aren't just buying a
              bucket; you're securing a container engineered to perform under
              the rigors of heavy industry.
            </p>
            <ul className="space-y-4 font-bold text-neutral-900">
              <li className="flex items-center gap-3">
                <Factory className="w-5 h-5 text-orange-500" /> Factory-Direct
                Access
              </li>
              <li className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-orange-500" /> Performance
                Verified
              </li>
              <li className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-500" /> Efficient
                Logistics
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. ENGINEERING OF CONTAINMENT (Technical Specs) */}
      <section className="py-24 bg-neutral-100 border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-neutral-900 mb-6 uppercase tracking-tight">
              The Engineering of <br />{" "}
              <span className="text-orange-600">Containment.</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl text-lg leading-relaxed">
              We match the vessel to the chemistry. From impact-resistant
              polymers to evaporation-proof closures, our catalog is curated for
              hazardous integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1: Polymer Logic */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center text-white mb-6">
                <Atom className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase">
                Impact Architecture
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Shatter-proof HDPE and Co-Ex structures prevent catastrophic
                failure on the factory floor. For extreme durability, we deploy
                heavy-gauge steel and tinplate lining that withstands drop-tests
                and puncture risks inherent in industrial environments.
              </p>
            </div>

            {/* Feature 2: Functional Geometry */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center text-white mb-6">
                <Maximize className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase">
                Functional Geometry
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Smart bottles do the work for you. <strong>Twin-neck</strong>{" "}
                calibration chambers allow for precise field-dosing without
                secondary tools. <strong>Interlocking base-to-neck</strong>{" "}
                architecture maximizes pallet density and warehouse verticality.
              </p>
            </div>

            {/* Feature 3: Application Precision */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
              <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center text-white mb-6">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase">
                Application Precision
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                We solve viscosity challenges. From plunger-driven{" "}
                <strong>caulking tubes</strong> and grease cartridges to{" "}
                <strong>dauber-cap</strong> solvent applicators. We ensure your
                product can be applied with the same precision it was
                manufactured with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TECHNICAL LEXICON (Footer) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Col 1 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-6 uppercase flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-orange-600" /> UN Ratings
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Deciphering the code (e.g., 1A1/Y1.8/100) is critical. We ensure
                your package is rated for the correct Packing Group (I, II, or
                III) based on your product's specific gravity and vapor
                pressure.
              </p>
            </div>
            {/* Col 2 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-6 uppercase flex items-center gap-3">
                <Droplets className="w-6 h-6 text-orange-600" /> Resin
                Compatibility
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Hydrocarbons eat standard polyethylene. We deploy fluorinated
                HDPE and barrier-layers (EVOH) to prevent paneling and product
                loss for aggressive solvents.
              </p>
            </div>
            {/* Col 3 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-6 uppercase flex items-center gap-3">
                <Container className="w-6 h-6 text-orange-600" /> Bulk Logistics
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We optimize intermediate bulk containers (IBCs) and drum pallets
                for maximum shipping density, reducing your freight cost per
                gallon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900 text-white text-center">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight uppercase">
            Ready to <br className="hidden md:block" />
            <span className="text-orange-500">Scale Up?</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-neutral-900 font-bold text-lg rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-2xl"
          >
            Contact Heavy Industry Team
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
