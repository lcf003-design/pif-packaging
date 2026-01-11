"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  signInWithEmail,
  signInWithGoogle,
  signInWithApple,
} from "@/services/authService";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
}

export default function AccountModal({
  isOpen,
  onClose,
  onSwitchToSignUp,
}: AccountModalProps) {
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
      onClose();
    } else {
      setError(res.error?.message || "Login failed.");
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
      onClose();
    } else if (res.error) {
      // Graceful handling
      if (res.error.message?.includes("closed-by-user")) {
        setError("Sign-in cancelled.");
      } else {
        setError(res.error.message || "Sign-in failed.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-industrial-900/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden border border-industrial-200 z-[101]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-industrial-50 rounded-full transition-colors text-industrial-400 hover:text-berlin-red z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* LEFT COLUMN: Existing Customer */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-industrial-100">
              <h2 className="text-2xl font-black text-industrial-900 mb-8">
                Existing Customer?
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-industrial-700 mb-2">
                    Email Address <span className="text-berlin-red">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-industrial-700 mb-2">
                    Password <span className="text-berlin-red">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-berlin-red text-white px-8 py-2.5 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                  <Link
                    href="/forgot-password"
                    onClick={onClose}
                    className="text-berlin-blue hover:underline text-sm font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </form>

              {/* Social Login Separator */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-industrial-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-industrial-500 font-medium">
                    Or login with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSocialLogin("google")}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-industrial-300 rounded-sm hover:bg-industrial-50 transition-colors bg-white shadow-sm disabled:opacity-70"
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
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSocialLogin("apple")}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-industrial-300 rounded-sm hover:bg-industrial-50 transition-colors bg-white shadow-sm disabled:opacity-70"
                >
                  <svg
                    className="h-5 w-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  <span className="font-medium text-industrial-700">Apple</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Customer Portal & Sign Up */}
            <div className="p-8 md:p-12 bg-industrial-50/50">
              {/* Portal Login Section */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-industrial-900 mb-4">
                  Customer Portal Login
                </h2>
                <Link
                  href="/portal/login"
                  onClick={onClose}
                  className="inline-block bg-berlin-red text-white px-6 py-2.5 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors"
                >
                  Click Here
                </Link>
              </div>

              {/* Sign Up Section */}
              <div>
                <h2 className="text-xl font-bold text-industrial-900 mb-4">
                  Don't have an Account?
                </h2>
                <p className="text-industrial-600 mb-6 text-sm">
                  Create an account with us and you'll be able to:
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Save multiple shipping addresses",
                    "Access your order history",
                    "Track new orders",
                    "Save items to your wish list",
                    "Re-order previously purchased items",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-industrial-700"
                    >
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-industrial-200 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-industrial-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onSwitchToSignUp}
                  className="bg-berlin-red text-white px-8 py-2.5 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Footer Link */}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
