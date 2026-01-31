"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Archive,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { logOut } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Navbar() {
  const { totalItems } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, loading } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setUserMenuOpen(false);
  };

  /* Mobile Menu State */
  const [mobileMarketOpen, setMobileMarketOpen] = useState(false);
  const [mobileContainerOpen, setMobileContainerOpen] = useState(false);

  /* Desktop Menu State */
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
  );
  let menuTimeout: NodeJS.Timeout;

  const handleMouseEnter = (menu: string) => {
    clearTimeout(menuTimeout);
    setActiveDesktopMenu(menu);
  };

  const handleMouseLeave = () => {
    menuTimeout = setTimeout(() => {
      setActiveDesktopMenu(null);
    }, 100);
  };

  const toggleMenu = (menu: string) => {
    setActiveDesktopMenu(activeDesktopMenu === menu ? null : menu);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-industrial-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Branding */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-industrial-900 rounded-sm flex items-center justify-center">
              <Archive className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-industrial-900">
              CATALOG<span className="font-light">PRIME</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* 1. Shop by Market */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("market")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleMenu("market")}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  activeDesktopMenu === "market"
                    ? "text-industrial-900"
                    : "text-industrial-600 hover:text-industrial-900"
                }`}
              >
                <span>Shop by Market</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDesktopMenu === "market" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDesktopMenu === "market" && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-white border border-industrial-100 shadow-xl rounded-md p-4 grid gap-2">
                    {[
                      "Food",
                      "Beverage",
                      "Personal Care",
                      "Pharmaceutical",
                      "Home Care",
                      "Industrial",
                    ].map((item) => (
                      <Link
                        key={item}
                        href={`/products?industry=${item}`}
                        onClick={() => setActiveDesktopMenu(null)}
                        className="block text-sm text-industrial-600 hover:text-action hover:bg-industrial-50 p-2 rounded"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Shop by Container */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("container")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleMenu("container")}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  activeDesktopMenu === "container"
                    ? "text-industrial-900"
                    : "text-industrial-600 hover:text-industrial-900"
                }`}
              >
                <span>Shop by Container</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDesktopMenu === "container" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDesktopMenu === "container" && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-white border border-industrial-100 shadow-xl rounded-md p-4 grid gap-2">
                    {[
                      "Bottles",
                      "Jars",
                      "Jugs",
                      "Vials",
                      "Tubes",
                      "Closures",
                    ].map((item) => (
                      <Link
                        key={item}
                        href={`/products?category=${item}`}
                        onClick={() => setActiveDesktopMenu(null)}
                        className="block text-sm text-industrial-600 hover:text-action hover:bg-industrial-50 p-2 rounded"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/medical"
              className="text-sm font-medium text-industrial-600 hover:text-industrial-900 transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Medical Division
            </Link>

            <Link
              href="/services"
              className="text-sm font-medium text-industrial-600 hover:text-industrial-900"
            >
              Services
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-industrial-500 hover:text-industrial-900">
              <Search className="w-5 h-5" />
            </button>

            {/* Auth Button */}
            <div className="relative">
              {!loading && user ? (
                // Logged In State
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-sm font-medium text-industrial-600 hover:text-industrial-900"
                  >
                    <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center">
                      <span className="text-industrial-700 font-bold">
                        {user.displayName?.[0] || user.email?.[0] || "U"}
                      </span>
                    </div>
                    <span className="hidden md:block">
                      {user.displayName || "My Account"}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute top-full right-0 w-48 pt-2">
                      <div className="bg-white border border-industrial-100 shadow-xl rounded-md p-2 grid gap-1">
                        <Link
                          href="/portal"
                          onClick={() => setUserMenuOpen(false)}
                          className="block text-sm text-industrial-600 hover:text-action hover:bg-industrial-50 p-2 rounded text-left"
                        >
                          Portal Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-sm text-red-600 hover:bg-red-50 p-2 rounded text-left"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Guest State
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center space-x-1 text-sm font-medium text-industrial-600 hover:text-industrial-900 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">Log In</span>
                </button>
              )}
            </div>

            <Link
              href="/inquiry"
              className="relative p-2 text-industrial-500 hover:text-action transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-action rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-industrial-100 bg-white p-4 space-y-2 h-[calc(100vh-64px)] overflow-y-auto">
            {/* Shop by Market */}
            <div className="border-b border-industrial-50 pb-2">
              <button
                onClick={() => setMobileMarketOpen(!mobileMarketOpen)}
                className="flex items-center justify-between w-full py-2 text-base font-bold text-industrial-900"
              >
                <span>Shop by Market</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileMarketOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileMarketOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {[
                    "Food",
                    "Beverage",
                    "Personal Care",
                    "Pharmaceutical",
                    "Home Care",
                    "Industrial",
                  ].map((item) => (
                    <Link
                      key={item}
                      href={`/products?industry=${item}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-sm text-industrial-600 hover:text-action"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Shop by Container */}
            <div className="border-b border-industrial-50 pb-2">
              <button
                onClick={() => setMobileContainerOpen(!mobileContainerOpen)}
                className="flex items-center justify-between w-full py-2 text-base font-bold text-industrial-900"
              >
                <span>Shop by Container</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileContainerOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileContainerOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {[
                    "Bottles",
                    "Jars",
                    "Jugs",
                    "Vials",
                    "Tubes",
                    "Closures",
                  ].map((item) => (
                    <Link
                      key={item}
                      href={`/products?category=${item}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-sm text-industrial-600 hover:text-action"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/medical"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-industrial-900 border-b border-industrial-50 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Medical Division
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-bold text-industrial-900 border-b border-industrial-50"
            >
              Services
            </Link>

            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginOpen(true);
                }}
                className="block w-full text-left py-2 text-base font-bold text-industrial-900 border-b border-industrial-50"
              >
                Log In / Sign Up
              </button>
            )}
          </div>
        )}
      </header>

      {/* Auth Modals */}
      <SignUpModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSwitchToLogin={() => {
          setSignUpOpen(false);
          setLoginOpen(true);
        }}
      />

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignUp={() => {
          setLoginOpen(false);
          setSignUpOpen(true);
        }}
      />
    </>
  );
}
