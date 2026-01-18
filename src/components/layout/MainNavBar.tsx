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
  Search,
  User,
  Menu,
  X,
  Phone,
  Truck,
  Zap,
  Box,
  ArrowRight,
  PenTool,
  Palette,
  BookOpen,
  FileText,
  Lightbulb,
  Briefcase,
  LayoutDashboard, // Added
  LogOut, // Added
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ShopNowDrawer from "./ShopNowDrawer";
import { logOut } from "@/services/authService"; // Added
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/services/userService"; // Added

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
    label: "Manufacturing",
    href: "/manufacturing",
    subItems: [
      {
        label: "Capabilities",
        href: "/manufacturing",
        description: "Custom molding, automation, and engineering.",
        icon: <Zap className="w-5 h-5 text-action" />,
      },
      {
        label: "Supply Chain",
        href: "/services/supply-chain",
        description: "Global logistics and freight management.",
        icon: <Truck className="w-5 h-5 text-action" />,
      },
      {
        label: "Decoration",
        href: "/services/design",
        description: "Silk screen, hot stamping, and labeling.",
        icon: <Box className="w-5 h-5 text-action" />, // Using Box as placeholder for decoration
      },
      {
        label: "Start Project",
        href: "/contact",
        description: "Get a quote for custom manufacturing.",
        icon: <ArrowRight className="w-5 h-5 text-action" />,
      },
    ],
  },
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
  { label: "PPE Division", href: "/ppe" },
  { label: "Markets Served", href: "/markets" },
];

import { SHOP_NAVIGATION } from "@/config/shop-navigation";

import { useInquiry } from "@/context/InquiryContext";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import ContactModal from "./ContactModal";

export default function MainNavBar() {
  const router = useRouter();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const { isMobileMenuOpen, closeMobileMenu, toggleMobileMenu } = useInquiry(); // Use Context State
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((p) => {
        if (p?.role === "admin") setIsAdmin(true);
      });
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  // Dynamic Shop Menu State
  const [expandedShopCategories, setExpandedShopCategories] = useState<
    string[]
  >([]);
  const [expandedShopSubCategories, setExpandedShopSubCategories] = useState<
    string[]
  >([]);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
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
        : [...prev, label],
    );
  };

  const toggleShopCategory = (id: string) => {
    setExpandedShopCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleShopSubCategory = (label: string) => {
    setExpandedShopSubCategories((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Robust scroll lock for iOS
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.height = "auto";
    }
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.height = "auto";
    };
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
          {/* Shop Now Drawer Button */}
          <div className="hidden md:block">
            {" "}
            {/* Removed relative z-50 and ref */}
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
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex flex-col items-start gap-2">
                    <button
                      className="flex items-center gap-3 text-white font-medium tracking-wide hover:text-berlin-red transition-colors"
                      onClick={() => {
                        const target = isAdmin ? "/admin/products" : "/portal";
                        closeMobileMenu();
                        router.push(target);
                      }}
                    >
                      <div className="p-2 bg-white/10 rounded-full">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="text-lg">
                        {user.email?.split("@")[0]}
                      </span>
                    </button>
                    {/* Inline Mobile Links */}
                    <div className="flex flex-col pl-14 gap-2 text-sm text-gray-400">
                      {isAdmin && (
                        <Link
                          href="/admin/products"
                          onClick={closeMobileMenu}
                          className="hover:text-white"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/portal"
                        onClick={closeMobileMenu}
                        className="hover:text-white"
                      >
                        My Portal
                      </Link>
                      <button
                        onClick={() => {
                          logOut();
                          closeMobileMenu();
                        }}
                        className="text-left text-red-400 hover:text-red-300"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
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
                )}

                {isAdmin && (
                  <Link
                    href="/admin/products"
                    onClick={closeMobileMenu}
                    className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
                    title="Admin Dashboard"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                )}
              </div>

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
                onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                className="w-full bg-gradient-to-r from-berlin-blue to-blue-600 text-white py-4 px-6 font-bold flex items-center justify-between rounded-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
              >
                <span className="flex-1 text-left text-lg tracking-wide">
                  Shop Now
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isMobileShopOpen ? "rotate-180" : "-rotate-90"
                  }`}
                />
              </button>
            </div>

            {/* Shop Now Expanded Content */}
            {isMobileShopOpen && (
              <div className="mx-6 mb-6 bg-neutral-900/50 rounded-lg border border-white/5 overflow-hidden flex-shrink-0 animate-in slide-in-from-top-4 duration-200">
                <div className="p-4">
                  {SHOP_NAVIGATION.map((category) => (
                    <div
                      key={category.id}
                      className="mb-2 border-b border-white/5 last:border-0"
                    >
                      <button
                        onClick={() => toggleShopCategory(category.id)}
                        className="w-full flex items-center justify-between text-berlin-red font-bold uppercase text-xs tracking-widest mb-3 hover:text-red-400 transition-colors pt-2"
                      >
                        <span>{category.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expandedShopCategories.includes(category.id)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {expandedShopCategories.includes(category.id) && (
                        <div className="pl-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                          {/* Flat Items */}
                          {category.flatItems &&
                            category.flatItems.length > 0 && (
                              <div className="space-y-2 border-l border-white/10 ml-1 pl-3">
                                {category.flatItems.map((item) => (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            )}

                          {/* Sub Sections */}
                          {category.subSections?.map((subSection) => (
                            <div key={subSection.label}>
                              <button
                                onClick={() =>
                                  toggleShopSubCategory(subSection.label)
                                }
                                className="w-full py-1 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                              >
                                <span>{subSection.label}</span>
                                <ChevronDown
                                  className={`w-3 h-3 text-berlin-blue transition-transform duration-200 ${
                                    expandedShopSubCategories.includes(
                                      subSection.label,
                                    )
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>
                              {expandedShopSubCategories.includes(
                                subSection.label,
                              ) && (
                                <div className="pl-3 mt-1 space-y-2 border-l border-white/10 ml-1">
                                  {subSection.items.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={closeMobileMenu}
                                      className="block text-xs text-gray-500 hover:text-white transition-colors py-1"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
                <a
                  href="tel:+447553479040"
                  className="block font-medium text-gray-300 mb-1 hover:text-white text-left w-full transition-colors group"
                >
                  Call Us <span className="text-white/40 mx-2">|</span>{" "}
                  <span className="italic text-white group-hover:text-berlin-red transition-colors">
                    +44 (0) 7553 479 040
                  </span>
                </a>
              </div>

              {!user && (
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
              )}
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

      {/* Shop Now Drawer */}
      <ShopNowDrawer isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
    </div>
  );
}
