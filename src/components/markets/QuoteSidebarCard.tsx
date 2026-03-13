import Image from "next/image";

interface QuoteSidebarCardProps {
  title: string;
  description: string;
  imageSrc: string;
  bulletPoints: string[];
}

export default function QuoteSidebarCard({
  title,
  description,
  imageSrc,
  bulletPoints,
}: QuoteSidebarCardProps) {
  return (
    <div className="bg-neutral-50 border border-neutral-100 p-6 mb-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <div className="relative w-full aspect-square bg-white border border-neutral-100 p-4 mb-4">
        <Image src={imageSrc} alt={title} fill className="object-contain p-2" />
      </div>

      <ul className="space-y-2">
        {bulletPoints.map((point, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-700">
            <span className="text-slate-400 mr-2">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
