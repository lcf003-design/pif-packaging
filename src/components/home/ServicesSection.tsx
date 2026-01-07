import { Layers, Search, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "Design",
    desc: "Creating Innovative Packaging Solutions Daily",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800",
    action: "Learn About Studio One Eleven",
  },
  {
    title: "Sourcing",
    desc: "Sourcing Products From a Vast Network of Manufacturers Globally",
    image:
      "https://images.unsplash.com/photo-1566576912906-600aceeb7aef?q=80&w=800",
    action: "View Sourcing Network",
  },
  {
    title: "Quality",
    desc: "Embracing the Highest Standards of Products Quality",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    action: "See Quality Standards",
  },
  {
    title: "Decorating & Labeling",
    desc: "Custom Professional Label Creation",
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800",
    action: "Explore Decorating",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-industrial-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-industrial-200 pb-4">
          <h2 className="text-3xl font-extrabold text-industrial-900">
            Packaging Services
          </h2>
          <Link
            href="/services"
            className="px-6 py-2 bg-berlin-red hover:bg-berlin-red-hover text-white font-bold text-sm rounded-sm transition-colors"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="bg-white border border-industrial-200 group hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-industrial-900">
                  {service.title}
                </h3>
                <p className="text-industrial-600 text-sm mb-6 min-h-[40px]">
                  {service.desc}
                </p>
                <span className="text-berlin-blue font-bold text-sm group-hover:underline cursor-pointer">
                  {service.action} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
