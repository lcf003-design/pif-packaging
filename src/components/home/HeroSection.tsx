"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  animate,
  PanInfo,
  useSpring,
  useTransform,
} from "framer-motion";

const SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072",
    headline: "Global Manufacturing & Supply Chain.",
    subhead: "From custom molds to global freight.",
    overlayColor: "from-black/60 to-transparent",
    layout: "left",
    cta: [
      {
        text: "View Capabilities",
        href: "/manufacturing",
        primary: true,
      },
      {
        text: "Shop Catalog",
        href: "/shop-all",
        primary: false,
      },
    ],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=1000",
    headline: "Streamlined Execution.",
    subhead: "Your Supply Chain, Simplified.",
    overlayColor: "from-berlin-blue/80 to-transparent",
    layout: "center",
    cta: [
      {
        text: "Learn More",
        href: "/services/supply-chain",
        primary: true,
      },
    ],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000",
    headline: "Markets We Serve.",
    subhead: "Specialized solutions for every sector.",
    overlayColor: "from-purple-900/60 to-transparent",
    layout: "center",
    cta: [
      {
        text: "View Markets",
        href: "/markets",
        primary: true,
      },
    ],
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // We use a spring to animate the x-offset of the track
  const x = useSpring(0, {
    stiffness: 300,
    damping: 30,
    mass: 1,
  });

  // Sync the spring target to the current index
  useEffect(() => {
    x.set(-index * 100);
  }, [index, x]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      if (index < SLIDES.length - 1) {
        setIndex(index + 1);
      } else {
        x.set(-index * 100);
      }
    } else if (offset > 50 || velocity > 500) {
      if (index > 0) {
        setIndex(index - 1);
      } else {
        x.set(-index * 100);
      }
    } else {
      x.set(-index * 100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-neutral-900 relative group overflow-hidden h-[600px] w-full touch-pan-y"
    >
      {/* RENDER 2: Correct Implementation without placeholder errors */}
      <Track
        index={index}
        setIndex={setIndex}
        onDragEnd={handleDragEnd}
        springX={x}
      />

      {/* Controls - Lowered Z-Index to respect Modal Overlays */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-30">
        <button
          onClick={() =>
            setIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
          }
          className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={() => setIndex((prev) => (prev + 1) % SLIDES.length)}
          className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Pagination Dots - Lowered Z-Index */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 pointer-events-none z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`pointer-events-auto h-3 rounded-full transition-all duration-500 shadow-sm ${
              index === idx
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60 w-3"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Subcomponent to handle the motion values cleanly
function Track({
  index,
  setIndex,
  onDragEnd,
  springX,
}: {
  index: number;
  setIndex: (i: number) => void;
  onDragEnd: (e: any, info: PanInfo) => void;
  springX: any;
}) {
  const xPercent = useTransform(
    springX,
    (v: number) => `${v / SLIDES.length}%`
  );

  return (
    <motion.div
      className="flex h-full"
      style={{
        width: `${SLIDES.length * 100}%`,
        x: xPercent,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
    >
      {SLIDES.map((slide, i) => (
        <Slide
          key={slide.id}
          slide={slide}
          isActive={i === index}
          index={i}
          totalSlides={SLIDES.length}
          springX={springX}
        />
      ))}
    </motion.div>
  );
}

function Slide({
  slide,
  isActive,
  index,
  totalSlides,
  springX,
}: {
  slide: any;
  isActive: boolean;
  index: number;
  totalSlides: number;
  springX: any;
}) {
  // Parallax/Opacity Logic could go here using springX
  // For now, let's use a simpler "Active" state animation for text
  // And a subtle opacity for the container based on Active state?
  // Let's rely on Framer Motion's Animate for the Text

  return (
    <div
      className="relative w-full h-full flex-shrink-0"
      style={{ width: `${100 / totalSlides}%` }}
    >
      {/* Background with Opacity Transition */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slide.image}')` }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor}`}
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full max-w-[1920px]">
        <div
          className={`max-w-2xl ${
            slide.layout === "center"
              ? "mx-auto text-center items-center"
              : "text-left items-start"
          } flex flex-col pointer-events-none select-none`}
        >
          {/* Text Animation */}
          <motion.div
            initial={false}
            animate={
              isActive
                ? { y: 0, opacity: 1, filter: "blur(0px)" }
                : { y: 20, opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 0.8, delay: isActive ? 0.2 : 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
              {slide.headline}
              <span className="block text-2xl md:text-3xl mt-4 font-light text-gray-200 opacity-90">
                {slide.subhead}
              </span>
            </h1>
          </motion.div>

          {/* Buttons Animation */}
          <motion.div
            initial={false}
            animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: isActive ? 0.4 : 0 }}
            className="flex gap-4 pointer-events-auto"
          >
            {slide.cta.map((btn: any, idx: number) => (
              <Link
                key={idx}
                href={btn.href}
                draggable={false}
                className={`px-8 py-4 font-bold uppercase text-sm tracking-wider transition-all shadow-lg hover:translate-y-[-2px] ${
                  btn.primary
                    ? "bg-berlin-red border-2 border-berlin-red text-white hover:bg-white hover:text-berlin-red hover:border-white"
                    : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
                }`}
                onDragStart={(e) => e.preventDefault()}
              >
                {btn.text}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
