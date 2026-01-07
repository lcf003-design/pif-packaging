import React from "react";
import Image from "next/image";

interface ContentHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  align?: "left" | "center" | "right";
}

export default function ContentHero({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = "bg-berlin-blue",
  align = "center",
}: ContentHeroProps) {
  return (
    <div
      className={`relative py-24 px-4 ${backgroundColor} text-white overflow-hidden`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto relative z-10">
        <div
          className={`max-w-4xl ${
            align === "center" ? "mx-auto text-center" : ""
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-industrial-100 max-w-2xl mx-auto opacity-90 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
