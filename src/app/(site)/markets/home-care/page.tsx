import { MARKETS_DATA, Market } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

export default function HomeCareMarketPage() {
  const market = MARKETS_DATA.find((m: Market) => m.slug === "home-care");

  if (!market) {
    notFound();
  }

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
                HOME CARE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-orange-600">
                  PACKAGING
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                Hospital-grade hygiene meets premium retail aesthetics. We
                engineer structural deployment systems that conquer the shelf
                and dominate the mess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT GRID */}
      <MarketCategoryGrid
        title="Home Care Packaging"
        items={[
          {
            title: "Utility Jugs",
            image: "/home_care_utility_jug_white_1772804989509.png",
            href: "/products?category=Bottles",
          },
          {
            title: "Cleaning Bottles",
            image: "/home_care_cleaning_bottle_white_1772805006158.png",
            href: "/products?category=Bottles",
          },
          {
            title: "Spray Bottles",
            image: "/home_care_spray_bottle_white_1772805021627.png",
            href: "/products?category=Bottles",
          },
          {
            title: "Buckets & Pails",
            image: "/home_care_bucket_pail_white_1772805034331.png",
            href: "/products?category=Pails",
          },
        ]}
      />

      {/* 3. Specialized Dispensing Banner */}
      <section className="bg-black text-white border-t-4 border-berlin-red">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid md:grid-cols-2 items-center">
            {/* Content Left */}
            <div className="py-24 pr-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Precision Dispensing Technology
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                From foaming triggers to child-resistant caps, PIF Packaging
                provides the advanced closure systems your formulations require
                to deliver the perfect dose, every time.
              </p>
            </div>
            {/* Image Right */}
            <div className="relative h-full w-full min-h-[400px] hidden md:block">
              <Image
                src="/dispensing_tech_1772806725803.png"
                alt="Precision Dispensing Technology"
                fill
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. We Have You Covered Split */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/home_care_lifestyle_1772806141670.png"
                alt="Woman cleaning home kitchen counter"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Right */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tighter">
                Protecting the Modern Home
              </h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                <p>
                  From gleaming countertops to spotless floors, modern consumers
                  demand home care products that perform flawlessly. At PIF
                  Packaging, we understand that exceptional formulations require
                  exceptional deployment systems. We supply premium bottles,
                  jugs, and pails designed to withstand rigorous daily use while
                  maintaining retail-ready aesthetics on the shelf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Honest Company Case Study Split */}
      <section className="py-24 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 tracking-tighter">
                Elevating the Everyday
              </h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                <p>
                  When developing premium dish care lines, brands require
                  packaging that balances aesthetic elegance with functional
                  ergonomics. Our elongated PET carafe solutions offer the
                  crystal clarity of glass with the shatter-resistant durability
                  of advanced polymers.
                </p>
                <p>
                  The meticulously engineered shoulder geometry ensures a
                  comfortable grip, while the precision pump dispenser delivers
                  perfect portion control—elevating a daily chore into a premium
                  experience. PIF Packaging provides the structural foundation
                  your brand needs to stand out in a crowded market.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/products?category=Bottles"
                  className="text-[#E31837] font-bold text-sm tracking-wide hover:text-red-700 transition-colors"
                >
                  Explore Bottle Solutions &rarr;
                </Link>
              </div>
            </div>

            {/* Image Right */}
            <div className="order-1 md:order-2 relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-neutral-50 flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                <Image
                  src="/dish_soap_trio_1772806165321.png"
                  alt="Honest Company Dish Soap Redesign"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Blue CTA Banner */}
      <section className="bg-[#006BB6] text-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Content Left */}
            <div className="py-24">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                Ready to Scale Your Production?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-light">
                Partner with a PIF Packaging Consultant today to secure your
                domestic supply chain and engineer your next market success.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-[#E31837] hover:bg-red-700 text-white font-bold rounded-sm transition-colors tracking-widest uppercase shadow-xl shadow-black/20"
              >
                Request a Consultation
              </Link>
            </div>

            {/* Image Right */}
            <div className="relative h-full w-full min-h-[400px] hidden md:block rounded-l-3xl overflow-hidden shadow-2xl my-12">
              <Image
                src="/packaging_consultant_1772806740444.png"
                alt="PIF Packaging Consultant"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer Informational Sections */}
      <section className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Intro Text */}
          <p className="text-neutral-600 mb-16 leading-relaxed text-lg text-center font-light text-balance">
            Whether you're packaging commercial descalers or organic surface
            sprays, PIF Packaging provides the structural foundation your brand
            needs. Our extensive catalog of commercial-grade polymers and
            specialized closures ensures your formulations remain secure,
            shelf-stable, and ready for deployment.
          </p>

          <div className="grid gap-16">
            {/* Section 1 */}
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                Container Architecture
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Bulk industrial cleaners and granulated products perform best in
                our heavy-duty pails, while precision surface cleaners demand
                the targeted delivery of our engineered spray bottles. For
                concentrated liquids requiring dilution, our F-Style jugs and{" "}
                <Link
                  href="/products?category=Industrial"
                  className="text-[#006BB6] hover:underline"
                >
                  industrial cylinders
                </Link>{" "}
                offer superior chemical resistance and spill-free pouring. Pair
                any vessel with our commercial-grade trigger sprayers,
                dispensing pumps, or child-resistant closures for a complete
                packaging solution.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                Material Engineering
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                We offer an extensive range of commercial-grade polymers to
                match your specific chemical requirements. Crystal-clear PET
                provides premium retail visibility for gentle formulations,
                while high-density polyethylene (HDPE) offers the robust
                chemical resistance necessary for harsh solvents and industrial
                cleaners. For products requiring extreme durability and heat
                resistance, our PP{" "}
                <Link
                  href="/products?category=Bottles"
                  className="text-[#006BB6] hover:underline"
                >
                  bottle options
                </Link>{" "}
                deliver uncompromising performance.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                Supply Chain Dominance
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                PIF Packaging combines domestic manufacturing power with
                international distribution flexibility. Beyond simply supplying
                containers, we offer comprehensive inventory management, custom
                tooling for proprietary bottle shapes, and strategic logistics
                planning. We ensure your production lines never wait on{" "}
                <Link
                  href="/services"
                  className="text-[#006BB6] hover:underline"
                >
                  packaging components
                </Link>
                , securing your brand's presence from the factory floor to the
                retail shelf.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
