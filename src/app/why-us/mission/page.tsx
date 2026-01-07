import React from "react";
import ContentHero from "@/components/content/ContentHero";
import SectionBlock from "@/components/content/SectionBlock";
import { CheckCircle2 } from "lucide-react";

export default function MissionPage() {
  return (
    <main>
      <ContentHero
        title="Our Mission"
        subtitle="To be the world's most trusted packaging partner, delivering innovation and reliability in every package."
        align="center"
      />

      <SectionBlock>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-industrial max-w-none">
            <h2 className="text-3xl font-bold text-industrial-800 mb-6">
              More Than Just a Supplier
            </h2>
            <p className="text-industrial-600 mb-8 leading-relaxed">
              At PIF Packaging, we believe that packaging is more than just a
              container; it's the physical embodiment of your brand promise. Our
              mission goes beyond simply selling bottles and caps. We aim to be
              a strategic partner that empowers your business to grow, innovate,
              and succeed in a competitive marketplace.
            </p>
            <p className="text-industrial-600 mb-12 leading-relaxed">
              We achieve this by combining the purchasing power and logistical
              reach of a global distributor with the agility and personalized
              service of a local partner. This unique hybrid model allows us to
              offer the best of both worlds to our customers.
            </p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock background="gray">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-industrial-800 mb-4">
              Core Values
            </h2>
            <p className="text-industrial-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every
              interaction we have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity First",
                desc: "We do what we say. Transparency and honesty are the foundations of our long-term relationships.",
              },
              {
                title: "Customer Obsession",
                desc: "Your success is our success. We go above and beyond to solve your toughest packaging challenges.",
              },
              {
                title: "Continuous Innovation",
                desc: "We never settle. We are constantly seeking new materials, designs, and processes to improve.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-sm shadow-sm border border-industrial-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-berlin-blue flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-industrial-800">
                    {value.title}
                  </h3>
                </div>
                <p className="text-industrial-600 leading-relaxed pl-10">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>
    </main>
  );
}
