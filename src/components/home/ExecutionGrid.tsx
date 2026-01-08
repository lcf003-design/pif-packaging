"use client";

import Image from "next/image";
import Link from "next/link";

const EXECUTION_CARDS = [
  {
    title: "Vetted Quality Network",
    description:
      "Rigorous vetting process. We partner only with manufacturers who meet our strict standards for precision and consistency.",
    image: "/execution_quality.png",
    linkText: "See More Here",
    href: "/services/quality",
  },
  {
    title: "On-Time Delivery",
    description:
      "PIF Packaging's deliveries are on-time. We set our clocks to your production schedule. Inventory management that keeps your line running.",
    image: "/execution_delivery.png",
    linkText: "Check it Out",
    href: "/results/delivery",
  },
  {
    title: "Expert Support",
    description:
      "Our dedicated Quality Service Division has hands-on packaging knowledge with direct links to the largest manufacturers in the world.",
    image: "/execution_expert.png",
    linkText: "Take a Look",
    href: "/services/consulting",
  },
];

export default function ExecutionGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-industrial-900 mb-4">
            Unmatched Quality and Execution
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto">
            We operate with cutting-edge enterprise systems to ensure process
            excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {EXECUTION_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-industrial-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group rounded-sm overflow-hidden"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-industrial-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-industrial-600 mb-6 leading-relaxed text-sm min-h-[80px]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="text-berlin-blue font-bold text-sm hover:text-berlin-dark-blue hover:underline uppercase tracking-wide"
                >
                  {card.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
