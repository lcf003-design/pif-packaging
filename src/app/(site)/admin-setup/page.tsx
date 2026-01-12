"use client";

import { useAuth } from "@/services/authService";
import { setUserRole, getUserProfile } from "@/services/userService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function AdminSetupPage() {
  const { user, loading } = useAuth();
  const [status, setStatus] = useState("idle");
  const router = useRouter();

  const makeMeAdmin = async () => {
    if (!user) return;
    setStatus("updating");
    try {
      await setUserRole(user.uid, "admin");
      setStatus("success");
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="p-20 text-center">
        Please log in first to claim admin access.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Setup</h1>
        <p className="text-slate-500 mb-8">
          Click below to grant yourself <strong>Admin</strong> privileges.
          <br />
          <span className="text-xs text-red-500">
            This page should be disabled or deleted after use.
          </span>
        </p>

        {status === "success" ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg font-bold animate-in fade-in">
            Success! Redirecting...
          </div>
        ) : (
          <button
            onClick={makeMeAdmin}
            disabled={status === "updating"}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {status === "updating" ? "Updating..." : "Establish Admin Access"}
          </button>
        )}
      </div>
    </div>
  );
}
