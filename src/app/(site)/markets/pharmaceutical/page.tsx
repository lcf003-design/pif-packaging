import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  Activity,
  Lock,
  Sun,
  Droplets,
  Microscope,
  FileCheck,
  Baby,
} from "lucide-react";

export default function PharmaceuticalMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "pharmaceutical");

  if (!market) {
    notFound();
  }

  // ASSETS MAPPING
  const ASSETS = {
    formulary: [
      {
        title: "Amber Glass",
        image: "/images/markets/pharma_amber_packer_glass.png",
        desc: "UV-secure packer architecture.",
      },
      {
        title: "HDPE Packers",
        image: "/images/markets/pharma_hdpe_packer_white.png",
        desc: "Matte-finish sterile containment.",
      },
      {
        title: "Cobalt Droppers",
        image: "/images/markets/pharma_dropper_cobalt.png",
        desc: "Precision serum dispensing.",
      },
      {
        title: "PET Liquids",
        image: "/images/markets/pharma_syrup_bottle.png",
        desc: "Impact-resistant oral dosing.",
      },
      {
        title: "Oingment Systems",
        image: "/images/markets/pharma_ointment_jar.png",
        desc: "Low-profile topical jars.",
      },
      {
        title: "Reversible Tech",
        image: "/images/markets/pharma_reversible_cap.png",
        desc: "Dual-mode CR/Non-CR closures.",
      },
      {
        title: "Nasal Delivery",
        image: "/images/markets/pharma_nasal_spray.png",
        desc: "Metered-dose aerosol systems.",
      },
      {
        title: "Sterile Injectables",
        image: "/images/markets/pharma_vaccine_vial.png",
        desc: "Crimp-seal vaccine vials.",
      },
    ],
    heroBg: "/images/markets/pharma_hero_background.png",
    complianceBanner: "/images/markets/pharma_compliance_banner.png",
    labSetting: "/images/markets/pharma_lab_setting.png",
  };

  return (
    <div className="bg-white min-h-screen font-sans text-neutral-900 selection:bg-teal-100 selection:text-teal-900">
      {/* 1. HERO SECTION: Bio-Secure Architecture */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <Image
            src={ASSETS.heroBg}
            alt="Bio-Secure Architecture"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Clinical Overlay */}
          <div className="absolute inset-0 bg-white/40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-teal-600 mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Intelligence
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-600 text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
              <Activity className="w-4 h-4" />
              <span>Life Sciences Division</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-neutral-900 mb-8 tracking-tighter leading-[1.1]">
              Clinical Precision. <br />
              <strong className="font-black text-teal-700">
                Patient Protection.
              </strong>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-500 font-light max-w-2xl leading-relaxed">
              We engineer containment for the cure. From UV-blocking amber glass
              to certified Child-Resistant closures, our packaging is the final
              line of defense for your active pharmaceutical ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE FORMULARY (Grid) */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-neutral-900 mb-4 tracking-tight uppercase">
                The Formulary
              </h2>
              <p className="text-neutral-500 max-w-md">
                Sterile, compliant, and consistently sourced. A curated index of
                packaging formats for solid dose, liquids, and topicals.
              </p>
            </div>
            <div className="hidden md:block w-32 h-1 bg-teal-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ASSETS.formulary.map((item, i) => (
              <div
                key={i}
                className="group bg-slate-50 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 w-full mb-6 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-teal-600 transition-colors tracking-tight">
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

      {/* 3. REGULATORY ARCHITECTURE (Banner) */}
      <section className="relative py-32 overflow-hidden bg-slate-100">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.complianceBanner}
            alt="Compliance Standards"
            fill
            className="object-cover opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-100/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-8 tracking-tighter">
              The Science of <br />
              <strong className="font-black text-teal-600">Adherence.</strong>
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed mb-10">
              Compliance isn't just about the FDA. It's about the grandmother
              taking her medicine. We rigorously test our Senior-Friendly and
              Child-Resistant closures to ensure safety never compromises
              accessibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-neutral-200 shadow-sm">
                <Baby className="w-5 h-5 text-teal-600" />
                <span className="font-bold tracking-wide text-sm text-neutral-700">
                  CPSC Tested
                </span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-neutral-200 shadow-sm">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <span className="font-bold tracking-wide text-sm text-neutral-700">
                  USP 661/671
                </span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-neutral-200 shadow-sm">
                <FlaskConical className="w-5 h-5 text-teal-600" />
                <span className="font-bold tracking-wide text-sm text-neutral-700">
                  Type III Glass
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPONENT ARCHITECTURE (Technical Specs) */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-neutral-900 mb-6 uppercase tracking-tight">
              Component Architecture
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Every polymer and glass type is selected for its specific barrier
              properties. We don't guess; we engineer for stability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1: Photostability */}
            <div className="bg-slate-50 p-10 rounded-3xl">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-8">
                <Sun className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Photostability
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Active ingredients degrade under UV. Our amber glass and cobalt
                blue Packers filter out harmful wavelengths while maintaining
                shelf appeal, ensuring potency from the pharmacy shelf to the
                patient's home.
              </p>
            </div>

            {/* Feature 2: Moisture Defense */}
            <div className="bg-slate-50 p-10 rounded-3xl">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-8">
                <Droplets className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Moisture Defense
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Hydroscopy kills efficacy. We deploy high-density HDPE and
                desiccant-integrated closures to create a hermetic seal, locking
                out humidity and preserving the structural integrity of tablets
                and capsules.
              </p>
            </div>

            {/* Feature 3: Biocompatibility */}
            <div className="bg-slate-50 p-10 rounded-3xl">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-8">
                <Microscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Biocompatibility
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Interaction is failure. Our Type III soda-lime glass and
                medical-grade resins are chemically inert, preventing leaching
                or adsorption that could alter your drug's chemical profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PATIENT TRUST (Visual Split) */}
      <section className="py-0 bg-neutral-900">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          <div className="relative min-h-[500px]">
            <Image
              src={ASSETS.labSetting}
              alt="Pharmaceutical Quality Control"
              fill
              className="object-cover opacity-90"
            />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-24 bg-neutral-900 text-white">
            <Lock className="w-12 h-12 text-teal-500 mb-8" />
            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">
              Protecting the <br />
              <strong className="font-bold text-teal-500">Cure.</strong>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-md">
              Your patients trust you with their lives. You can trust us with
              your packaging. From audit-ready documentation (DMFs) to rapid
              prototype validation, we operate at the speed of biotech.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-teal-900 text-white text-center">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">
            Ready for <br className="hidden md:block" />
            <span className="font-bold text-emerald-400">Clinical Scale?</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-teal-900 font-bold text-lg rounded-full hover:bg-emerald-400 hover:text-teal-950 transition-all shadow-2xl"
          >
            Consult Life Sciences
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
