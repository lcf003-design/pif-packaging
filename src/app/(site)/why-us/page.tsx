import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Heart,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import ContentHero from "@/components/content/ContentHero";
import SectionBlock from "@/components/content/SectionBlock";

const WHY_US_LINKS = [
  {
    title: "Our Mission",
    description: "Driven by purpose to elevate packaging standards.",
    href: "/why-us/mission",
    icon: Heart,
  },
  {
    title: "Our Global Reach",
    description: "Sourcing and delivering from anywhere to anywhere.",
    href: "/why-us/global-reach",
    icon: Globe,
  },
  {
    title: "Our Model",
    description:
      "A unique hybrid approach combining manufacturing and distribution.",
    href: "/why-us/model",
    icon: ShieldCheck,
  },
  {
    title: "Our Divisions",
    description: "Specialized teams for specialized industries.",
    href: "/why-us/divisions",
    icon: Users,
  },
  {
    title: "Our Operations",
    description: "World-class logistics and supply chain management.",
    href: "/why-us/operations",
    icon: Truck,
  },
  {
    title: "Our Story",
    description: "From humble beginnings to industry leadership.",
    href: "/why-us/story",
    icon: Zap,
  },
];

export default function WhyUsPage() {
  return (
    <main>
      <ContentHero
        title="Why Partner with PIF?"
        subtitle="Unmatched expertise, global reach, and a commitment to your success."
        align="center"
      />

      <SectionBlock>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_LINKS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-8 border border-industrial-200 rounded-sm hover:shadow-lg hover:border-berlin-blue transition-all duration-300 bg-white"
            >
              <div className="w-12 h-12 bg-industrial-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-berlin-blue group-hover:text-white transition-colors text-berlin-blue">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-industrial-800 mb-3 group-hover:text-berlin-blue transition-colors">
                {item.title}
              </h3>
              <p className="text-industrial-600 mb-6 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center text-sm font-bold text-berlin-blue opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock background="gray" className="text-center">
        <h2 className="text-3xl font-bold text-industrial-900 mb-6">
          Ready to Elevate Your Packaging?
        </h2>
        <p className="text-lg text-industrial-600 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied partners who trust PIF with their
          brand&apos;s physical presence.
        </p>
        <button className="bg-berlin-blue text-white px-8 py-3 rounded-sm font-bold hover:bg-berlin-dark-blue transition-colors">
          Get Started Today
        </button>
      </SectionBlock>
    </main>
  );
}
