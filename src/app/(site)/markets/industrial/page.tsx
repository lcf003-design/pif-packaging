import Image from "next/image";
import Link from "next/link";
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

export default function IndustrialMarketPage() {
  const industrialItems = [
    {
      title: "Industrial & Chemical Bottles",
      image: "/images/markets/ind_bottles.png",
      href: "/search?q=industrial+bottles",
    },
    {
      title: "Buckets",
      image: "/images/markets/ind_buckets.png",
      href: "/search?q=buckets",
    },
    {
      title: "Leakproof Bottles",
      image: "/images/markets/ind_leakproof.png",
      href: "/search?q=leakproof",
    },
    {
      title: "Utility Jugs",
      image: "/images/markets/ind_jugs.png",
      href: "/search?q=jugs",
    },
    {
      title: "Industrial Cans",
      image: "/images/markets/ind_cans.png",
      href: "/search?q=cans",
    },
    {
      title: "Paint Cans",
      image: "/images/markets/ind_paint.png",
      href: "/search?q=paint+cans",
    },
    {
      title: "Drums",
      image: "/images/markets/ind_drums.png",
      href: "/search?q=drums",
    },
    {
      title: "UN Rated Packaging",
      image: "/images/markets/ind_un_rated.png",
      href: "/search?q=un+rated",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-neutral-900">
      {/* 1. HERO SECTION */}
      <section className="relative h-[250px] md:h-[400px] flex items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/ind_hero.png"
            alt="Industrial Chemical Plant"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
            Industrial Chemical Packaging
          </h1>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="py-16 bg-neutral-100/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <MarketCategoryGrid items={industrialItems} />
        </div>
      </section>

      {/* 3. CUSTOMER ORIENTED BANNER */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/ind_understanding_banner.png"
            alt="Customer Oriented Banner"
            fill
            className="object-cover"
          />
          {/* A slight dark overlay to ensure text readability against the gold */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
            Strategic Containment Partnerships
          </h2>
          <p className="text-base md:text-lg mb-10 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
            At PIF Packaging, we don't just supply containers—we engineer
            solutions tailored to your specific operational hazards and retail
            ambitions. Whether securing clearance for international hazmat
            transit or standing out on the shelves of industrial supply centers,
            our strategic consultants ensure your product is protected and
            presented flawlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-[#e31837] text-white font-bold rounded hover:bg-red-700 transition-colors shadow-md"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIAL-STRENGTH SOLUTIONS (Split) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">
                Industrial-Strength Solutions
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base">
                The industrial sector demands resilient and specialized
                packaging. From heavy-duty lubricants to volatile solvents, the
                materials running our modern infrastructure require precision
                engineering. We provide containers built to handle the rigorous
                demands of raw material processing, manufacturing, and mass
                distribution.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-lg border border-neutral-100">
              <Image
                src="/images/markets/ind_solutions_image.png"
                alt="Industrial warehouse strength solutions"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. WE HAVE YOU COVERED (Split) */}
      <section className="py-16 bg-neutral-100/50 border-t border-neutral-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-lg border border-neutral-100 order-2 md:order-1">
              <Image
                src="/images/markets/ind_lifestyle.png"
                alt="PIF Packaging industrial expert"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">
                We Have You Covered
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base mb-6">
                PIF Packaging brings decades of dedicated focus to the complex
                requirements of the chemicals, coatings, and industrial fluids
                sectors. Whether you are scaling a regional operation or
                managing a multinational supply chain, we deliver comprehensive
                containment strategies.
              </p>
              <p className="text-neutral-700 leading-relaxed text-base">
                By centralizing your procurement and leveraging our deep
                expertise in UN-rated hazmat standards, rigorous batch testing,
                and quality assurance, we streamline your operations and
                eliminate logistical friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE BANNER */}
      <section className="bg-berlin-blue py-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
            Scaling your production? Secure a precise, high-volume manufacturing
            quote from our logistics team today.
          </h2>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#e31837] text-white font-bold rounded hover:bg-red-700 transition-colors shadow-md"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* 7. SEO FOOTER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-12">
          {/* Paragraph Block 1 */}
          <div>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              Our industrial-grade containment portfolio spans a broad spectrum
              of heavy-duty materials, from high-density, impact-resistant
              polymers to cold-rolled steel. Engineered specifically for harsh
              substances like synthetic lubricants, commercial adhesives,
              agricultural treatments, and caustic cleaners, our vessels
              guarantee structural integrity. Available in capacities ranging
              from compact laboratory quarts to bulk 55-gallon drums, each
              container pairs with specialized, hermetic sealing systems to
              absolutely secure your product against leaks or contamination.
            </p>
          </div>

          {/* Paragraph Block 2 */}
          <div>
            <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
              What Plastic Chemical Bottles Are Available?
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              Engineered for maximum resilience without the heavy freight
              penalty, our premium synthetic containers are inherently
              shatterproof—a critical safety feature when handling volatile or
              reactive compounds. For complex dosing requirements, we offer
              advanced twin-neck designs featuring integrated measuring
              reservoirs, eliminating the need for external tools. To optimize
              your warehouse footprint and logistics, select our interlocking,
              cube-efficient jerricans that stack safely during transit. We also
              source highly specialized closures, including vapor-release vented
              caps to prevent pressurization from off-gassing, and precision
              micro-dispensers to ensure exact application with zero waste.
            </p>
          </div>

          {/* Paragraph Block 3 */}
          <div>
            <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
              What Additional Industrial And Chemical Bottles Are Available?
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              Beyond standard bottles and pails, our industrial catalog features
              specialized applicators, such as heavy-duty extruding tubes for
              sealants and adhesives, engineered for smooth, jam-free
              dispensing. We provide space-saving 'F-Style' metal and plastic
              jugs alongside a variety of dispensing mechanisms—from heavy mist
              sprayers to high-torque, tamper-evident safety closures. For
              extreme durability and corrosion resistance, our tinplate and
              steel catalog is unmatched, particularly for solvent-based
              products. These metal units can integrate built-in brush or dauber
              caps for targeted application. Crucially, we supply a wide array
              of strictly UN-certified and DOT-compliant packaging, ensuring
              your dangerous goods are legally primed for both domestic
              transport and global export.
            </p>
          </div>

          {/* Paragraph Block 4 */}
          <div>
            <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
              Benefits of Choosing PIF Packaging
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              Partnering with PIF Packaging extends far beyond simply ordering
              containers. We operate as an extension of your business, offering
              comprehensive brand design services and flexible, just-in-time
              stocking programs. Our logistics experts actively monitor and
              streamline your{" "}
              <Link
                href="#"
                className="text-berlin-blue hover:underline font-bold"
              >
                supply chain
              </Link>{" "}
              — forecasting inventory needs, orchestrating complex freight
              routing, and conducting rigorous quality audits before any pallet
              hits your loading dock.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
