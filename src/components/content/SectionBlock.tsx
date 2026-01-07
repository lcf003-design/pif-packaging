import React from "react";

interface SectionBlockProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "blue";
}

export default function SectionBlock({
  children,
  className = "",
  background = "white",
}: SectionBlockProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-industrial-50",
    blue: "bg-berlin-blue text-white",
  };

  return (
    <section className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
