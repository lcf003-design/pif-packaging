"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen relative flex">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pif_portal_mixed_markets.png"
          alt="PIF Mixed Markets Collection - Black & Red"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Overlay - Left Sided Glass Panel */}
      <div className="relative z-10 w-full lg:w-[50%] xl:w-[40%] min-h-screen flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 bg-white/50 backdrop-blur-md shadow-2xl border-r border-white/20">
        {/* Back Link */}
        <div className="absolute top-8 left-8 sm:left-12">
          <Link
            href="/"
            className="flex items-center text-black hover:text-berlin-blue transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Brand Logo */}
          <div className="mb-12 flex justify-center">
            <Link
              href="/"
              className="bg-berlin-red text-white w-40 h-20 shrink-0 flex flex-col items-center justify-center hover:bg-red-700 transition-all duration-300 group shadow-lg"
            >
              <span className="relative font-black text-4xl leading-none tracking-tighter group-hover:scale-110 transition-transform duration-300 ease-out">
                PIF
                <span className="absolute top-0.5 -right-4 text-[0.5rem] font-bold tracking-normal opacity-80">
                  TM
                </span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase mt-0.5 group-hover:tracking-[0.2em] transition-all duration-300 ease-out">
                Packaging
              </span>
            </Link>
          </div>

          <h1 className="text-4xl font-black text-industrial-900 mb-3 tracking-tight text-center">
            Welcome Back
          </h1>
          <p className="text-industrial-600 mb-10 text-lg text-center">
            Access your portal by entering your credentials.
          </p>

          <form className="space-y-6">
            <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
              <input
                type="email"
                placeholder="Email"
                className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black text-lg"
              />
            </div>
            <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
              <input
                type="password"
                placeholder="Password"
                className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black text-lg"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Link
                href="/forgot-password"
                className="text-berlin-blue text-sm font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-berlin-red text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-xl shadow-berlin-red/20 text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-industrial-600 text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-berlin-blue font-bold hover:underline ml-1"
              >
                Sign up now.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
