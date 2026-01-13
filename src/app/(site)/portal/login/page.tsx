"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  signInWithEmail,
  signInWithGoogle,
  signInWithApple,
} from "@/services/authService";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signInWithEmail(email, password);
    setLoading(false);

    if (res.user) {
      router.push("/portal");
    } else {
      setError(
        res.error?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setLoading(true);
    setError(null);
    let res;

    if (provider === "google") {
      res = await signInWithGoogle();
    } else {
      res = await signInWithApple();
    }

    setLoading(false);

    if (res.user) {
      router.push("/portal");
    } else if (res.error) {
      // Graceful handling for popup closure or other errors
      if (res.error.message?.includes("closed-by-user")) {
        setError("Sign-in cancelled.");
      } else {
        setError(
          res.error.message ||
            `${provider === "google" ? "Google" : "Apple"} sign-in failed.`
        );
      }
    }
  };

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
          <div className="mb-8 flex justify-center">
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
          <p className="text-black mb-8 text-lg text-center">
            Access your portal by entering your credentials.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 focus:outline-none bg-transparent placeholder-industrial-400 text-black text-lg"
              />
            </div>
            <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 focus:outline-none bg-transparent placeholder-industrial-400 text-black text-lg"
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
              disabled={loading}
              className="w-full bg-berlin-red text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-xl shadow-berlin-red/20 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Login Section */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-industrial-300/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-industrial-600 font-medium backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-3 py-3 border border-industrial-300 rounded-sm hover:bg-white/80 transition-colors bg-white shadow-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-medium text-industrial-700">
                Continue with Google
              </span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("apple")}
              className="w-full flex items-center justify-center gap-3 py-3 border border-industrial-300 rounded-sm hover:bg-white/80 transition-colors bg-white shadow-sm"
            >
              <svg
                className="h-5 w-5 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <span className="font-medium text-industrial-700">
                Continue with Apple
              </span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-black text-sm">
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
