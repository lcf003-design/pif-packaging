"use client";

import Link from "next/link";
import {
  ChevronDown,
  Globe,
  Leaf,
  Target,
  Users,
  Building2,
  History,
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
  ShieldCheck,
  FileText,
  Lightbulb,
  BookOpen,
  PenTool,
  Palette,
  Truck,
  User,
  Briefcase,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ShopNowMegaMenu from "./mega-menu/ShopNowMegaMenu";

interface NavItem {
  label: string;
  href: string;
  subItems?: {
    label: string;
    href: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const NAV_LINKS: NavItem[] = [
  {
    label: "Why PIF",
    href: "/why-us",
    subItems: [
      {
        label: "Our Mission",
        href: "/why-us/mission",
        description: "Driving innovation in packaging.",
        icon: <Target className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Model",
        href: "/why-us/model",
        description: "A unique approach to supply chain.",
        icon: <Building2 className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Global Reach",
        href: "/why-us/global-reach",
        description: "Serving partners worldwide.",
        icon: <Globe className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Divisions",
        href: "/why-us/divisions",
        description: "Specialized sectors and expertise.",
        icon: <Users className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Operations",
        href: "/why-us/operations",
        description: "Efficiency at every step.",
        icon: <TrendingUp className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Story",
        href: "/why-us/story",
        description: "Decades of industry leadership.",
        icon: <History className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Community",
        href: "/why-us/community",
        description: "Giving back and growing together.",
        icon: <Users className="w-5 h-5 text-action" />,
      },
    ],
  },
  {
    label: "Results",
    href: "/results",
    subItems: [
      {
        label: "Quantified Value",
        href: "/results/value",
        description: "Real numbers, real savings.",
        icon: <TrendingUp className="w-5 h-5 text-action" />,
      },
      {
        label: "On-Time Delivery",
        href: "/results/delivery",
        description: "Reliability you can count on.",
        icon: <Clock className="w-5 h-5 text-action" />,
      },
      {
        label: "Testimonials",
        href: "/results/testimonials",
        description: "What our partners say.",
        icon: <MessageSquare className="w-5 h-5 text-action" />,
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    subItems: [
      {
        label: "Design",
        href: "/services/design",
        description: "Award-winning structural & graphic design.",
        icon: <PenTool className="w-5 h-5 text-action" />,
      },
      {
        label: "Sourcing",
        href: "/services/sourcing",
        description: "Global supplier network & procurement.",
        icon: <Globe className="w-5 h-5 text-action" />,
      },
      {
        label: "Quality",
        href: "/services/quality",
        description: "Rigorous standards and on-site testing.",
        icon: <ShieldCheck className="w-5 h-5 text-action" />,
      },
      {
        label: "Decorating & Labeling",
        href: "/services/decorating",
        description: "Custom branding & shelf presence.",
        icon: <Palette className="w-5 h-5 text-action" />,
      },
      {
        label: "Supply Chain",
        href: "/services/supply-chain",
        description: "Logistics, freight, and optimization.",
        icon: <Truck className="w-5 h-5 text-action" />,
      },
      {
        label: "Customer Portal",
        href: "/portal",
        description: "Track orders and manage inventory.",
        icon: <User className="w-5 h-5 text-action" />,
      },
      {
        label: "Management Consulting",
        href: "/services/consulting",
        description: "Strategic advice for growth.",
        icon: <Briefcase className="w-5 h-5 text-action" />,
      },
    ],
  },
  { label: "Markets Served", href: "/markets" },
  {
    label: "Sustainability",
    href: "/sustainability",
    subItems: [
      {
        label: "Our Sustainability Purpose",
        href: "/sustainability/purpose",
        description: "Committed to a greener future.",
        icon: <Leaf className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Sustainability Framework",
        href: "/sustainability/framework",
        description: "Strategic environmental goals.",
        icon: <ShieldCheck className="w-5 h-5 text-action" />,
      },
      {
        label: "Our Sustainability Solutions",
        href: "/sustainability/solutions",
        description: "Eco-friendly packaging options.",
        icon: <Lightbulb className="w-5 h-5 text-action" />,
      },
      {
        label: "Sustainability Legislations",
        href: "/sustainability/legislations",
        description: "Compliance and regulations.",
        icon: <FileText className="w-5 h-5 text-action" />,
      },
      {
        label: "ESG Report",
        href: "/sustainability/esg",
        description: "Download our latest report.",
        icon: <BookOpen className="w-5 h-5 text-action" />,
      },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export default function MainNavBar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        shopMenuRef.current &&
        !shopMenuRef.current.contains(event.target as Node)
      ) {
        setIsShopOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white border-b border-industrial-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Shop Now Mega Menu Button (Click-Only) */}
          <div className="relative mr-8 z-50" ref={shopMenuRef}>
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className={`px-6 h-10 rounded-sm font-bold text-sm flex items-center gap-2 transition-colors ${
                isShopOpen
                  ? "bg-berlin-dark-blue text-white"
                  : "bg-berlin-blue hover:bg-berlin-dark-blue text-white"
              }`}
            >
              Shop Now
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isShopOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Mega Menu Dropdown */}
            {isShopOpen && (
              <div className="absolute top-full left-0 pt-2 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                <ShopNowMegaMenu />
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 h-full">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group h-full flex items-center"
              >
                {/* Parent Item */}
                <div className="relative">
                  {link.subItems ? (
                    <button className="text-sm font-bold text-industrial-800 group-hover:text-berlin-blue px-4 py-2 rounded-sm transition-all flex items-center gap-1 cursor-default outline-none">
                      {link.label}
                      <ChevronDown className="w-4 h-4 ml-0.5 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm font-bold text-industrial-800 hover:text-berlin-blue px-4 py-2 rounded-sm transition-all flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Hover Underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-berlin-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                </div>

                {/* Rich Mega Menu Dropdown */}
                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-max max-w-screen-xl hidden group-hover:block z-50 perspective-[1000px]">
                    <div className="bg-white/95 backdrop-blur-xl border border-industrial-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-lg p-6 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5 mt-1">
                      {/* Decorative Up Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-industrial-200" />

                      <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-[600px]">
                        {link.subItems.map((sub, idx) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="group/item flex items-start gap-4 p-3 -mx-3 rounded-lg hover:bg-industrial-50 transition-colors"
                          >
                            <div className="flex-shrink-0 mt-1 p-2 bg-industrial-50 group-hover/item:bg-white rounded-md border border-industrial-100 group-hover/item:border-industrial-200 group-hover/item:shadow-sm transition-all duration-200">
                              {sub.icon}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-industrial-900 group-hover/item:text-berlin-blue transition-colors flex items-center gap-1">
                                {sub.label}
                              </div>
                              <p className="text-xs text-industrial-500 mt-0.5 font-medium leading-relaxed">
                                {sub.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
