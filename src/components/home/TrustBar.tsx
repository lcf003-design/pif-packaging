import {
  Globe,
  Package,
  CheckCircle,
  Factory,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const STATS = [
  { label: "Vetted Manufacturing Partners", value: "500+", icon: Factory },
  { label: "Sourcing & Logistics Reach", value: "Global", icon: Globe },
  {
    label: "Custom Packaging Solutions",
    value: "Project-Based",
    icon: Package,
  },
  { label: "Hands-On Execution", value: "Founder-Led", icon: UserCheck },
  {
    label: "Production Oversight",
    value: "Quality-Focused",
    icon: ShieldCheck,
  },
  {
    label: "ISO-Informed Processes",
    value: "Standards-Aligned",
    icon: CheckCircle,
  },
];

export default function TrustBar() {
  return (
    <section className="bg-industrial-50 border-b border-industrial-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-center text-industrial-800">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <h3 className="text-2xl font-black mb-1 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-industrial-500 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
