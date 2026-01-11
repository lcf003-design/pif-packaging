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
  Menu,
  X,
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
    ],
  },
  { label: "Markets Served", href: "/markets" },
];

import { useInquiry } from "@/context/InquiryContext";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import ContactModal from "./ContactModal";

export default function MainNavBar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { isMobileMenuOpen, closeMobileMenu, toggleMobileMenu } = useInquiry(); // Use Context State
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isFunctionOpen, setIsFunctionOpen] = useState(false);
  const [isBottlesOpen, setIsBottlesOpen] = useState(false);
  const [isJarsOpen, setIsJarsOpen] = useState(false);
  const [isJarsMaterialOpen, setIsJarsMaterialOpen] = useState(false);
  const [isJarsColorOpen, setIsJarsColorOpen] = useState(false);
  const [isJarsShapeOpen, setIsJarsShapeOpen] = useState(false);
  const [isJarsPopularOpen, setIsJarsPopularOpen] = useState(false);
  const [isJarsFoodOpen, setIsJarsFoodOpen] = useState(false);
  const [isJarsBeautyOpen, setIsJarsBeautyOpen] = useState(false);
  const [isMoreJarsOpen, setIsMoreJarsOpen] = useState(false);
  const [isJugsOpen, setIsJugsOpen] = useState(false);
  const [isJugsMaterialOpen, setIsJugsMaterialOpen] = useState(false);
  const [isJugsColorOpen, setIsJugsColorOpen] = useState(false);
  const [isJugsUtilityOpen, setIsJugsUtilityOpen] = useState(false);
  const [isJugsBeverageOpen, setIsJugsBeverageOpen] = useState(false);
  const [isBottlesMaterialOpen, setIsBottlesMaterialOpen] = useState(false);
  const [isBottlesColorOpen, setIsBottlesColorOpen] = useState(false);
  const [isBottlesPopularOpen, setIsBottlesPopularOpen] = useState(false);
  const [isBottlesBeverageOpen, setIsBottlesBeverageOpen] = useState(false);
  const [isBottlesWineOpen, setIsBottlesWineOpen] = useState(false);
  const [isBottlesFoodOpen, setIsBottlesFoodOpen] = useState(false);
  const [isBottlesBeautyOpen, setIsBottlesBeautyOpen] = useState(false);
  const [isBottlesPharmaOpen, setIsBottlesPharmaOpen] = useState(false);
  const [isBottlesIndustrialOpen, setIsBottlesIndustrialOpen] = useState(false);
  const [isVialsOpen, setIsVialsOpen] = useState(false);
  const [isVialsPopularOpen, setIsVialsPopularOpen] = useState(false);
  const [isVialsColorOpen, setIsVialsColorOpen] = useState(false);
  const [isCansOpen, setIsCansOpen] = useState(false);
  const [isCansPopularOpen, setIsCansPopularOpen] = useState(false);
  const [isCansNoveltyOpen, setIsCansNoveltyOpen] = useState(false);
  const [isCansSeamlessOpen, setIsCansSeamlessOpen] = useState(false);
  const [isTubsOpen, setIsTubsOpen] = useState(false);
  const [isTubsPopularOpen, setIsTubsPopularOpen] = useState(false);
  const [isBucketsOpen, setIsBucketsOpen] = useState(false);
  const [isBucketsMaterialOpen, setIsBucketsMaterialOpen] = useState(false);
  const [isBucketsPopularOpen, setIsBucketsPopularOpen] = useState(false);
  const [isBucketsDrumsPopularOpen, setIsBucketsDrumsPopularOpen] =
    useState(false);
  const [isBucketsAccessoriesOpen, setIsBucketsAccessoriesOpen] =
    useState(false);
  const [isTubesOpen, setIsTubesOpen] = useState(false);
  const [isTubesBeautyOpen, setIsTubesBeautyOpen] = useState(false);
  const [isTubesPopularOpen, setIsTubesPopularOpen] = useState(false);
  const [isCapsOpen, setIsCapsOpen] = useState(false);
  const [isCapsPopularOpen, setIsCapsPopularOpen] = useState(false);
  const [isBottlingToolsOpen, setIsBottlingToolsOpen] = useState(false);
  const [isBottlingToolsPopularOpen, setIsBottlingToolsPopularOpen] =
    useState(false);
  const [isBoxesBagsOpen, setIsBoxesBagsOpen] = useState(false);
  const [isBoxesPopularOpen, setIsBoxesPopularOpen] = useState(false);
  const [isBagsPopularOpen, setIsBagsPopularOpen] = useState(false);
  const [isHazmatOpen, setIsHazmatOpen] = useState(false);
  const [isHazmatPopularOpen, setIsHazmatPopularOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null
  );

  const shopMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth < 768) return; // Prevent interference with mobile menu interaction
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

  // Desktop Hover/Click Handlers
  const handleDesktopEnter = (label: string) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      if (desktopMenuTimeoutRef.current)
        clearTimeout(desktopMenuTimeoutRef.current);
      setActiveDesktopMenu(label);
    }
  };

  const handleDesktopLeave = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      desktopMenuTimeoutRef.current = setTimeout(() => {
        setActiveDesktopMenu(null);
      }, 100);
    }
  };

  const toggleDesktopMenu = (label: string) => {
    setActiveDesktopMenu(activeDesktopMenu === label ? null : label);
  };

  // Mobile Accordion Handler
  const toggleMobileItem = (label: string) => {
    setExpandedMobileItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      className={`md:bg-white md:border-b md:border-industrial-200 md:shadow-sm sticky top-0 ${
        isMobileMenuOpen ? "z-[100]" : "z-50"
      }`}
    >
      <div className="flex items-center md:h-16 h-0 w-full relative">
        {/* NAV CONTENT AREA */}
        <div className="flex items-center px-4 md:px-8 gap-4 md:gap-8 w-full">
          {/* Shop Now Mega Menu Button (Hidden on Mobile - Moved to Drawer) */}
          <div className="relative z-50 hidden md:block" ref={shopMenuRef}>
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className={`px-4 md:px-6 h-10 rounded-sm font-bold text-sm flex items-center gap-2 transition-colors ${
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
              <div className="absolute top-full left-0 pt-2 animate-in fade-in zoom-in-95 duration-200 origin-top-left w-[90vw] md:w-auto">
                <ShopNowMegaMenu />
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 h-full">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDesktopEnter(link.label)}
                onMouseLeave={handleDesktopLeave}
              >
                {/* Parent Item */}
                <div className="relative">
                  {link.subItems ? (
                    <button
                      onClick={() => toggleDesktopMenu(link.label)}
                      className={`text-sm font-bold px-4 py-2 rounded-sm transition-all flex items-center gap-1 cursor-pointer outline-none ${
                        activeDesktopMenu === link.label
                          ? "text-berlin-blue"
                          : "text-industrial-800 hover:text-berlin-blue"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 ml-0.5 opacity-50 transition-transform duration-200 ${
                          activeDesktopMenu === link.label ? "rotate-180" : ""
                        }`}
                      />
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
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[3px] bg-berlin-red transition-transform duration-300 ease-out origin-left ${
                      activeDesktopMenu === link.label
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  />
                </div>

                {/* Rich Mega Menu Dropdown */}
                {link.subItems && activeDesktopMenu === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-max max-w-screen-xl z-50 perspective-[1000px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white/95 backdrop-blur-xl border border-industrial-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-lg p-6 ring-1 ring-black/5 mt-1">
                      {/* Decorative Up Arrow */}
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-l border-t border-industrial-200" />

                      <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-[600px]">
                        {link.subItems.map((sub, idx) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setActiveDesktopMenu(null)}
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

          {/* RIGHT SIDE: Utility / Download */}
          <div className="ml-auto flex items-center gap-4">
            <a
              href="/docs/PIF_Capability_Deck_2026.pdf"
              download
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-industrial-200 rounded-sm hover:bg-industrial-50 transition-colors text-industrial-600"
            >
              <FileText className="w-4 h-4" />
              <span className="mt-0.5">Capability Deck</span>
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end isolate">
          {/* Backdrop (Blur) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeMobileMenu}
          />
          {/* Drawer Panel (85% Width, Slide from Right, DARK THEME) */}
          <div className="relative w-[75%] max-w-md h-full bg-neutral-950 shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300 border-l border-white/10">
            {/* 1. Header Row (Account + Close) */}
            <div className="flex items-center justify-between p-6 flex-shrink-0">
              <button
                className="flex items-center gap-3 text-white font-medium tracking-wide hover:text-berlin-red transition-colors"
                onClick={() => {
                  closeMobileMenu();
                  setIsLoginOpen(true);
                }}
              >
                <div className="p-2 bg-white/10 rounded-full">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-lg">Account</span>
              </button>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 2. Shop Now Bar (Blue Gradient) */}
            <div className="px-6 pb-6 flex-shrink-0">
              <button
                onClick={() => setIsShopOpen(!isShopOpen)}
                className="w-full bg-gradient-to-r from-berlin-blue to-blue-600 text-white py-4 px-6 font-bold flex items-center justify-between rounded-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
              >
                <span className="flex-1 text-left text-lg tracking-wide">
                  Shop Now
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isShopOpen ? "rotate-180" : "-rotate-90"
                  }`}
                />
              </button>
            </div>

            {/* Shop Now Expanded Content */}
            {isShopOpen && (
              <div className="mx-6 mb-6 bg-neutral-900/50 rounded-lg border border-white/5 overflow-hidden flex-shrink-0 animate-in slide-in-from-top-4 duration-200">
                <div className="p-4">
                  {/* Market Sub-Accordion */}
                  <div className="mb-2">
                    <button
                      onClick={() => setIsMarketOpen(!isMarketOpen)}
                      className="w-full flex items-center justify-between text-berlin-red font-bold uppercase text-xs tracking-widest mb-3 hover:text-red-400 transition-colors"
                    >
                      <span>Shop by Market</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isMarketOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isMarketOpen && (
                      <div className="pl-4 pb-4 space-y-2 border-l border-white/10 ml-1 mb-4 animate-in slide-in-from-top-2 duration-200">
                        {[
                          "Automotive",
                          "Food",
                          "Pet Care & Veterinary",
                          "Beer",
                          "Home Care",
                          "Pharma, Nutraceutical & Healthcare",
                          "Beverage",
                          "Industrial Chemical",
                          "Spirits",
                          "Cannabis & CBD",
                          "Personal Health & Beauty",
                          "Wine",
                        ].map((market) => (
                          <Link
                            key={market}
                            href={`/products?market=${market}`}
                            onClick={closeMobileMenu}
                            className="block text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            {market}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Main Categories */}
                  <div className="flex flex-col">
                    {/* Shop by Function Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsFunctionOpen(!isFunctionOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Shop by Function</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isFunctionOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isFunctionOpen && (
                        <div className="pl-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {[
                            "Child-Resistant Solutions",
                            "Leak-Resistant Design",
                            "Tamper-Evident Features",
                            "E-Commerce Ready",
                            "Sustainable Options",
                          ].map((func) => (
                            <Link
                              key={func}
                              href={`/products?function=${func}`}
                              onClick={closeMobileMenu}
                              className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                            >
                              {func}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottles Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsBottlesOpen(!isBottlesOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Bottles</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isBottlesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isBottlesOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Material */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesMaterialOpen(!isBottlesMaterialOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Material</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesMaterialOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesMaterialOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Fiber Drums",
                                  "Plastic Drums",
                                  "Stainless Steel Drums",
                                  "Steel Barrels",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_material=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Colors */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesColorOpen(!isBottlesColorOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Bottle Colors</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesColorOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesColorOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Amber Bottles",
                                  "Black Bottles",
                                  "Blue Bottles",
                                  "Clear Bottles",
                                  "Green Bottles",
                                  "White Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_color=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Popular */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesPopularOpen(!isBottlesPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Shop Popular Bottles</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Juice Bottles",
                                  "Milk Bottles",
                                  "Water Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 4. Beverage */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesBeverageOpen(!isBottlesBeverageOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Beverage Bottles</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesBeverageOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesBeverageOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Juice Bottles",
                                  "Milk Bottles",
                                  "Water Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_beverage=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 5. Wine, Beer & Spirits */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesWineOpen(!isBottlesWineOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Wine, Beer & Spirit Bottles</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesWineOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesWineOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Wine Bottles",
                                  "Beer Bottles",
                                  "Liquor Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_spirits=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 6. Food */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesFoodOpen(!isBottlesFoodOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Food Bottles</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesFoodOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesFoodOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Honey Bottles",
                                  "Sauce Bottles",
                                  "Oil Bottles",
                                  "Plastic Food Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_food=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 7. Health & Beauty */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesBeautyOpen(!isBottlesBeautyOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Health & Beauty Bottles</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesBeautyOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesBeautyOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Essential Oils & Aromatherapy Bottles",
                                  "Perfume Bottles",
                                  "Liquid Soap & Lotion Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_beauty=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 8. Pharmaceutical */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesPharmaOpen(!isBottlesPharmaOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Pharmaceutical & Healthcare</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesPharmaOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesPharmaOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Dropper Bottles",
                                  "Pill & Vitamin Bottles",
                                  "Ointment Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_pharma=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 9. Industrial */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlesIndustrialOpen(
                                  !isBottlesIndustrialOpen
                                )
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Industrial & Chemical Bottles</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlesIndustrialOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlesIndustrialOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Bettix Bottles",
                                  "Oil & Lubricant Bottles",
                                  "Leak-Resistant Bottles",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottles_industrial=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Jars Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsJarsOpen(!isJarsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Jars</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isJarsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isJarsOpen && (
                        <div className="pl-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Material */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJarsMaterialOpen(!isJarsMaterialOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Material</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJarsMaterialOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJarsMaterialOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Fiber Drums",
                                  "Plastic Drums",
                                  "Stainless Steel Drums",
                                  "Steel Barrels",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_material=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Popular Colors */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJarsColorOpen(!isJarsColorOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Colors</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJarsColorOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJarsColorOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Amber Glass",
                                  "Blue Glass",
                                  "Clear Glass",
                                  "Green Glass",
                                  "Clear Plastic",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_color=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Popular Jar Shapes */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJarsShapeOpen(!isJarsShapeOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Jar Shapes</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJarsShapeOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJarsShapeOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Round Jars",
                                  "Square Jars",
                                  "Gripper Jars",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_shape=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 4. Shop Popular Jars */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJarsPopularOpen(!isJarsPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Shop Popular Jars</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJarsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJarsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Mason Jars",
                                  "Kilner Jars",
                                  "Square Jars",
                                  "Gripper Jars",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 5. Food */}
                          <div>
                            <button
                              onClick={() => setIsJarsFoodOpen(!isJarsFoodOpen)}
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Food</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJarsFoodOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJarsFoodOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Jelly & Jam Jars",
                                  "Spice Jars",
                                  "Honey Jars",
                                  "Pickle Jars",
                                  "Salsa Jars",
                                  "Spaghetti Jars",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_food=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 6. Health & Beauty Jars */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJarsBeautyOpen(!isJarsBeautyOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Health & Beauty Jars</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJarsBeautyOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJarsBeautyOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Bath Salt & Body Scrub Jars",
                                  "Cosmetic Jars",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_beauty=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 7. More Jars */}
                          <div>
                            <button
                              onClick={() => setIsMoreJarsOpen(!isMoreJarsOpen)}
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>More Jars</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isMoreJarsOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isMoreJarsOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Lab & Science Jars",
                                  "Pharmacy Jars",
                                  "Cannabis Jars",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jars_more=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Jugs Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsJugsOpen(!isJugsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Jugs</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isJugsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isJugsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Material */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJugsMaterialOpen(!isJugsMaterialOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Material</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJugsMaterialOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJugsMaterialOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Fiber Drums",
                                  "Plastic Drums",
                                  "Stainless Steel Drums",
                                  "Steel Barrels",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jugs_material=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Color */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJugsColorOpen(!isJugsColorOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Shop Jugs by Color</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJugsColorOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJugsColorOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "White Jugs",
                                  "Black Jugs",
                                  "Clear Jugs",
                                  "Natural Jugs",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jugs_color=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Utility */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJugsUtilityOpen(!isJugsUtilityOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Utility Jugs</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJugsUtilityOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJugsUtilityOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Jerry Cans",
                                  "Plastic Carboys",
                                  "Cleaners & Solvent Jugs",
                                  "F-Style Jugs",
                                  "Jugs with Caps",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?jugs_utility=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 4. Beverage */}
                          <div>
                            <button
                              onClick={() =>
                                setIsJugsBeverageOpen(!isJugsBeverageOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Beverage Jugs</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isJugsBeverageOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isJugsBeverageOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {["Growlers", "Juice Jugs", "Milk Jugs"].map(
                                  (item) => (
                                    <Link
                                      key={item}
                                      href={`/products?jugs_beverage=${item}`}
                                      onClick={closeMobileMenu}
                                      className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                    >
                                      {item}
                                    </Link>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Vials Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsVialsOpen(!isVialsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Vials</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isVialsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isVialsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Vials */}
                          <div>
                            <button
                              onClick={() =>
                                setIsVialsPopularOpen(!isVialsPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Vials</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isVialsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isVialsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Glass Vials",
                                  "Plastic Vials",
                                  "Screw Cap Vials",
                                  "Perfume Vials",
                                  "Rollerball Vials",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?vials_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Popular Colors */}
                          <div>
                            <button
                              onClick={() =>
                                setIsVialsColorOpen(!isVialsColorOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Colors</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isVialsColorOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isVialsColorOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Amber Glass Vials",
                                  "Blue Glass Vials",
                                  "Clear Glass Vials",
                                  "Green Glass Vials",
                                  "Clear Plastic Vials",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?vials_color=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cans & Tins Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsCansOpen(!isCansOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Cans & Tins</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isCansOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isCansOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Cans */}
                          <div>
                            <button
                              onClick={() =>
                                setIsCansPopularOpen(!isCansPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Cans</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isCansPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isCansPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Paint Cans",
                                  "Industrial Cans",
                                  "Open Top Cans",
                                  "Coin Collection Cans",
                                  "Safety Cans",
                                  "Stock Aluminum Cans",
                                  "Special Order Aluminum Cans",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?cans_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Novelty Tins */}
                          <div>
                            <button
                              onClick={() =>
                                setIsCansNoveltyOpen(!isCansNoveltyOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Novelty Tins</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isCansNoveltyOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isCansNoveltyOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {["Popcorn Tins"].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?cans_novelty=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Seamless Tins */}
                          <div>
                            <button
                              onClick={() =>
                                setIsCansSeamlessOpen(!isCansSeamlessOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Seamless Tins</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isCansSeamlessOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isCansSeamlessOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Clear Top Tins",
                                  "Hinged Tins",
                                  "Screw Top Tins",
                                  "Slip Cover Tins",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?cans_seamless=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tubs Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsTubsOpen(!isTubsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Tubs</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isTubsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isTubsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Tubs */}
                          <div>
                            <button
                              onClick={() =>
                                setIsTubsPopularOpen(!isTubsPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Tubs</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isTubsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isTubsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Ice Cream Tubs",
                                  "Butter Tubs",
                                  "Yogurt Tubs",
                                  "Food Grade Tubs",
                                  "Takeout Containers",
                                  "Deli Containers",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?tubs_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buckets & Drums Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsBucketsOpen(!isBucketsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Buckets & Drums</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isBucketsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isBucketsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Material */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBucketsMaterialOpen(!isBucketsMaterialOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Material</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBucketsMaterialOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBucketsMaterialOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Fiber Drums",
                                  "Plastic Drums",
                                  "Stainless Steel Drums",
                                  "Steel Barrels",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?buckets_material=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Popular Buckets */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBucketsPopularOpen(!isBucketsPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Buckets</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBucketsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBucketsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "5 Gallon Buckets",
                                  "Carboys & Jerry Cans",
                                  "Bucket & Pail Accessories",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?buckets_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Popular Drums */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBucketsDrumsPopularOpen(
                                  !isBucketsDrumsPopularOpen
                                )
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Drums</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBucketsDrumsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBucketsDrumsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Fiber Drums",
                                  "Plastic Drums",
                                  "Stainless Steel Drums",
                                  "Steel Barrels",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?buckets_drums_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 4. Drum & Barrel Accessories */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBucketsAccessoriesOpen(
                                  !isBucketsAccessoriesOpen
                                )
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Drum & Barrel Accessories</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBucketsAccessoriesOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBucketsAccessoriesOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Drum Faucets & Spouts",
                                  "Drum Funnels",
                                  "Drum Liners",
                                  "Drum Plugs & Closures",
                                  "Drum Pumps",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?buckets_accessories=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tubes Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsTubesOpen(!isTubesOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Tubes</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isTubesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isTubesOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Health & Beauty Tubes */}
                          <div>
                            <button
                              onClick={() =>
                                setIsTubesBeautyOpen(!isTubesBeautyOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Health & Beauty Tubes</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isTubesBeautyOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isTubesBeautyOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Lip Balm Tubes",
                                  "Mascara Tubes",
                                  "Sunscreen & Lotion Tubes",
                                  "Deodorant Tubes",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?tubes_beauty=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Popular */}
                          <div>
                            <button
                              onClick={() =>
                                setIsTubesPopularOpen(!isTubesPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isTubesPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isTubesPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {["Grease Cartridges"].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?tubes_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Caps & Closures Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsCapsOpen(!isCapsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Caps & Closures</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isCapsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isCapsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Caps & Closures */}
                          <div>
                            <button
                              onClick={() =>
                                setIsCapsPopularOpen(!isCapsPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Caps & Closures</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isCapsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isCapsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Beer Bottle Caps",
                                  "Dropper Caps",
                                  "Dropper Fitments",
                                  "Spice & Sifter Caps",
                                  "Bottle Pourer Caps",
                                  "Flip Top Caps",
                                  "Spout Caps",
                                  "Brush & Dauber Caps",
                                  "Mister Caps",
                                  "Tamper-Evident Caps",
                                  "Child-Resistant Capable Caps",
                                  "Orifice Reducers",
                                  "Threaded & Lug Caps",
                                  "Corks & Stoppers",
                                  "Pump Caps",
                                  "Trigger Sprayers",
                                  "Disc Caps",
                                  "Shrink Bands & Cap Liners",
                                  "Closures for Industrial Cans",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?caps_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottling Tools Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() =>
                          setIsBottlingToolsOpen(!isBottlingToolsOpen)
                        }
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Bottling Tools</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isBottlingToolsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isBottlingToolsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Bottling Tools */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBottlingToolsPopularOpen(
                                  !isBottlingToolsPopularOpen
                                )
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Bottling Tools</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBottlingToolsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBottlingToolsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Measuring Container",
                                  "Bottle Funnels",
                                  "Can Sealers",
                                  "Capping Tools",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bottling_tools_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Boxes, Bags & Supplies Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsBoxesBagsOpen(!isBoxesBagsOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Boxes, Bags & Supplies</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isBoxesBagsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isBoxesBagsOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Boxes */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBoxesPopularOpen(!isBoxesPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Boxes</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBoxesPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBoxesPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Shipping Boxes",
                                  "Cardboard Storage Boxes",
                                  "Mailers",
                                  "Shipping Supplies",
                                  "Labels",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?boxes_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. Popular Bags */}
                          <div>
                            <button
                              onClick={() =>
                                setIsBagsPopularOpen(!isBagsPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Bags</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isBagsPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isBagsPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "Poly Bags",
                                  "Resealable Poly Bags",
                                  "Custom Bags",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?bags_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hazmat Packaging Accordion */}
                    <div className="border-b border-white/5">
                      <button
                        onClick={() => setIsHazmatOpen(!isHazmatOpen)}
                        className="w-full py-2.5 text-gray-300 font-medium hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span>Hazmat Packaging</span>
                        <ChevronDown
                          className={`w-4 h-4 text-berlin-blue transition-transform duration-200 ${
                            isHazmatOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isHazmatOpen && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* 1. Popular Hazmat Packaging */}
                          <div>
                            <button
                              onClick={() =>
                                setIsHazmatPopularOpen(!isHazmatPopularOpen)
                              }
                              className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>Popular Hazmat Packaging</span>
                              <ChevronDown
                                className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                  isHazmatPopularOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isHazmatPopularOpen && (
                              <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                {[
                                  "UN Rated Bottles",
                                  "Popular Hazmat Packaging",
                                  "UN Rated Buckets",
                                  "UN Rated Drums",
                                  "UN Rated Jerrycans & Kegs",
                                ].map((item) => (
                                  <Link
                                    key={item}
                                    href={`/products?hazmat_popular=${item}`}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* All categories are now specialized into accordions */}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Navigation Links */}
            <div className="flex-1 px-2 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="border-b border-white/5 last:border-0"
                >
                  {link.subItems ? (
                    <>
                      <button
                        onClick={() => toggleMobileItem(link.label)}
                        className="flex items-center justify-between w-full py-5 px-6 text-left font-medium text-lg text-white hover:text-berlin-blue transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            expandedMobileItems.includes(link.label)
                              ? "rotate-180 text-berlin-blue"
                              : "-rotate-90 text-white/30"
                          }`}
                        />
                      </button>
                      {expandedMobileItems.includes(link.label) && (
                        <div className="bg-black/20 pb-4 animate-in slide-in-from-top-2 duration-200">
                          {link.subItems.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-3 py-3 px-8 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-berlin-blue ml-6"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between w-full py-5 px-6 text-left font-medium text-lg text-white hover:text-berlin-blue transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="w-5 h-5 -rotate-90 opacity-30 text-white/30" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* 4. Footer Section */}
            <div className="p-8 space-y-6 bg-black/40 flex-shrink-0 mt-auto">
              <Link
                href="/quote"
                onClick={closeMobileMenu}
                className="block font-bold text-berlin-red hover:text-red-400 transition-colors text-lg"
              >
                Request Quote
              </Link>

              <div>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    setIsContactOpen(true);
                  }}
                  className="block font-medium text-gray-300 mb-1 hover:text-white text-left w-full transition-colors group"
                >
                  Contact Us <span className="text-white/40 mx-2">|</span>{" "}
                  <span className="italic text-white group-hover:text-berlin-red transition-colors">
                    800.363.9855
                  </span>
                </button>
              </div>

              <div className="pt-4 flex flex-col gap-4 border-t border-white/10">
                <button
                  onClick={() => {
                    closeMobileMenu();
                    setIsLoginOpen(true);
                  }}
                  className="text-left font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    setIsSignUpOpen(true);
                  }}
                  className="text-left font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
