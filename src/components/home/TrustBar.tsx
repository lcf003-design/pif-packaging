import { Globe, Package, Award, Users, CheckCircle } from "lucide-react";

const STATS = [
  { label: "Global Suppliers", value: "1,700+", icon: Globe },
  { label: "Locations Worldwide", value: "100+", icon: Users },
  { label: "SKUs Available", value: "50,000+", icon: Package },
  { label: "Packaging Awards", value: "225+", icon: Award },
  { label: "Berlin Employees", value: "2,200+", icon: Users },
  { label: "ISO 9001 Certified", value: "Certified", icon: CheckCircle },
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
