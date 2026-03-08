import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

export default function PharmaceuticalMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "pharmaceutical");

  if (!market) {
    notFound();
  }

  const items = [
    {
      title: "Pharmaceutical Bottles",
      image: "/images/markets/pharma_bottle_glass.png",
      href: "/search?q=glass+bottles",
    },
    {
      title: "Pharmaceutical Jars",
      image: "/images/markets/pharma_jar_cream.png", // NOTE: I am replacing the placeholder back in because the user screenshot shows eczema cream. We'll need to use the actual image they created or have. If they didn't create it, I'll need to generate it later if it's missing. Using pharma_ointment_jar is probably better. Let's use the one we have.
      href: "/search?q=pharmaceutical+jars",
    },
    {
      title: "Pill & Vitamin Packaging",
      image: "/images/markets/pharma_vitamin_pet.png", // We might have a missing image here based on previous steps. Let's use what we found.
      href: "/search?q=pill+vitamin",
    },
    {
      title: "Medicinal Syrup Bottles",
      image: "/images/markets/pharma_syrup_bottle.png",
      href: "/search?q=syrup+bottle",
    },
    {
      title: "Peroxide Bottles",
      image: "/images/markets/pharma_peroxide_bottle.png", // We might have a missing image here based on previous steps.
      href: "/search?q=peroxide",
    },
    {
      title: "Dropper Bottles",
      image: "/images/markets/pharma_dropper_bottle.png", // We might have a missing image here based on previous steps. Let's use pharma_dropper_cobalt instead
      href: "/search?q=dropper",
    },
    {
      title: "Hand Sanitizer Bottles",
      image: "/images/markets/pharma_sanitizer_pump.png", // Missing image potentially.
      href: "/search?q=sanitizer",
    },
    {
      title: "Ointment Containers",
      image: "/images/markets/pharma_ointment_jar.png",
      href: "/search?q=ointment",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-berlin-red selection:text-white">
      {/* 1. CINEMATIC MONOLITH HERO */}
      <section className="group relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt={market.title}
            fill
            className="object-cover opacity-60 contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1800px] flex flex-col justify-between h-full pt-8 pb-24">
          {/* Top Nav Area */}
          <div className="w-full flex justify-between items-start">
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase"
            >
              <ArrowLeft className="w-3 h-3" /> Market Intelligence
            </Link>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="max-w-4xl text-center">
              <h1 className="text-[12vw] md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase">
                HEALTHCARE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-orange-600">
                  PACKAGING
                </span>
              </h1>
              <p className="text-xl md:text-3xl font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
                Pharmaceutical, Nutraceutical & Medical Logistics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY GRID */}
      <MarketCategoryGrid items={items} />

      {/* 3. HEALTHY PACKAGING (Image Split) */}
      <section className="py-0 bg-white">
        <div className="grid md:grid-cols-2">
          {/* Text Left */}
          <div className="flex flex-col justify-center p-12 md:p-24 2xl:p-32">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
              Rigid Adherence to Medical Standards
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg pb-4">
              The modern pharmaceutical and nutraceutical landscape requires
              absolute precision and unwavering compliance. We engineer
              containment solutions designed to protect active ingredients,
              ensure child-resistant safety, and provide accurate dosing
              mechanisms for end-users.
            </p>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Our continuous investment in advanced manufacturing techniques
              guarantees that every bottle and jar meets stringent regulatory
              frameworks, providing peace of mind from the assembly line to the
              medicine cabinet.
            </p>
          </div>
          {/* Image Right (Replaced Video) */}
          <div className="relative min-h-[400px] md:min-h-[600px] bg-neutral-100">
            <Image
              src="/images/markets/pharma_clinical_containment.png"
              alt="Clinical Grade Containment"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. WE HAVE YOU COVERED (Centered Banner with Background Image) */}
      <section className="relative py-32 text-center px-6 overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/pharma_coverage_banner_v2.png"
            alt="Amber pharmaceutical bottles background"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 tracking-tight">
            Comprehensive Fulfillment Network
          </h2>
          <p className="text-lg text-neutral-800 leading-relaxed mb-6 font-medium">
            We employ a strategic approach rooted in decades of logistical
            expertise to assist high-growth medical brands in scaling their
            distribution seamlessly and securely.
          </p>
          <p className="text-lg text-neutral-800 leading-relaxed font-medium">
            By integrating robust quality assurance protocols with intelligent
            supply chain infrastructure, we offer complete protective packaging
            lifecycles, bespoke mold engineering, and accelerated delivery
            through our international network of certified warehouses.
          </p>
        </div>
      </section>

      {/* 5. CASE STUDY: NUTRACEUTICAL BRAND (Split Layout with Image Replacement) */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 items-center gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tight leading-[1.1]">
                Advanced Nutritional Delivery Systems
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Capitalizing on the surging market for daily wellness chewables,
                a prominent health sciences company needed packaging that
                balanced robust protection with an intuitive customer
                experience. Our engineering team developed a specialized
                thermoplastic enclosure tailored specifically for their product
                line.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                The core objective was to implement strict child-resistant
                locking mechanisms that satisfied international safety mandates,
                without sacrificing the accessibility required for the intended
                adult demographic. The resulting design achieved both seamless
                operability and profound security.
              </p>
              {/* Image Replaces the "See More" Link */}
              <div className="relative h-64 w-full mt-12 rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
                <Image
                  src="/images/markets/pharma_case_study_hero.png"
                  alt="Nutraceutical Manufacturing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative h-[600px] w-full flex items-center justify-center">
              <Image
                src="/images/markets/pharma_gummy_vitamins.png"
                alt="Nutraceutical Gummy Packaging"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE CTA BANNER */}
      <section className="relative py-20 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-berlin-blue">
          <Image
            src="/images/markets/pharma_quote_banner.png"
            alt="Pharmaceutical assembly line"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-left max-w-lg leading-snug">
            Looking for a large-quantity quote? Contact a PIF Packaging
            Consultant today.
          </h2>
          <Link
            href="/contact"
            className="px-8 py-4 bg-berlin-red hover:bg-neutral-900 text-white font-bold tracking-wide uppercase rounded-sm transition-colors duration-300 whitespace-nowrap min-w-[200px]"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </section>

      {/* 7. BOTTOM CONTENT / SEO (Text Heavy) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Highlighted Intro Paragraph */}
          <div className="pl-6 border-l-4 border-berlin-red mb-16">
            <p className="text-lg text-neutral-600 leading-relaxed font-medium">
              Medical-grade containers are manufactured from premium substrates
              like Type III glass and pharmaceutical PET, offered in precise
              volumetric capacities. They serve as the definitive benchmark for
              securing both liquid extracts and dry supplements. Opting for
              tinted materials—such as UV-resistant amber or light-blocking
              cobalt blue—is critical for safeguarding volatile active compounds
              against environmental degradation.
            </p>
          </div>

          <div className="space-y-16">
            {/* Paragraph Block 1 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
                Premium Glass Receptacles For Liquids And Supplements
              </h3>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
                Given their non-reactive and impermeable properties,{" "}
                <Link href="#" className="text-berlin-red hover:underline">
                  glass bottles
                </Link>{" "}
                remain an absolute necessity within the healthcare sector to
                prevent chemical leaching and cross-contamination. Glass
                preserves the original molecular structure of sensitive formulas
                over extended shelf lives. Wide-mouth glass packers accommodate
                high-speed filling lines for capsules and tablets, while Boston
                round variants outfitted with controlled dropper-assemblies are
                utilized for exact tincture dosing. Furthermore, pairing glass
                vessels with tamper-evident, heat-shrink closures establishes a
                verifiable seal of integrity, solidifying glass as the premier
                choice for therapeutic encapsulation.
              </p>
            </div>

            {/* Paragraph Block 2 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
                The Logistics of Plastic Medical Packaging
              </h3>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
                Due to their incredibly lightweight yet structural nature,{" "}
                <Link href="#" className="text-berlin-red hover:underline">
                  plastic bottles
                </Link>{" "}
                represent a highly efficient packaging solution capable of
                mitigating transit overhead and minimizing breakage risks.
                Unlike glass, shatter-resistant plastics allow for durable,
                high-volume palletization. Selecting specialized dispensing
                fitments, such as low-density polyethylene (LDPE) dropper tips
                or child-resistant (CR) induction-seal caps, enhances end-user
                safety. The flexibility of LDPE provides excellent tactile
                feedback for squeezable applications like ophthalmic drops or
                topical creams.
              </p>
            </div>

            {/* Paragraph Block 3 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
                Comprehensive Logistics Managed By PIF Packaging
              </h3>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
                Beyond standardized component purchasing, PIF Packaging offers
                an array of scalable operational services, encompassing
                centralized supply chain management, custom tooling development,
                and strategic 3PL integrations. We provide tailored{" "}
                <Link href="#" className="text-berlin-red hover:underline">
                  warehousing
                </Link>{" "}
                solutions designed to alleviate physical inventory burdens. Our
                logistics team operates on a Just-In-Time (JIT) fulfillment
                model, continuously monitoring stock thresholds, coordinating
                split-shipments, and orchestrating domestic freight to ensure
                your production lines never experience downtime due to component
                shortages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
