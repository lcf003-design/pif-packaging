"use client";

import { useAuth } from "@/services/authService";
import { getUserProfile } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Store, Upload } from "lucide-react";
import { logOut } from "@/services/authService";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      if (!authLoading) {
        if (!user) {
          router.push("/");
          return;
        }

        try {
          // Fetch profile to check role
          const profile = await getUserProfile(user.uid);

          if (profile?.role === "admin") {
            setIsAdmin(true);
          } else {
            console.warn("Access Denied: User is not an admin.");
            router.push("/"); // Or to a 'Not Authorized' page
          }
        } catch (error) {
          console.error("Error checking admin role:", error);
          router.push("/");
        } finally {
          setCheckingRole(false);
        }
      }
    };

    checkRole();
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-20">
        <div className="flex h-16 items-center px-6 border-b border-slate-800">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <div className="p-1 bg-white/10 rounded">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span>Admin Panel</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-slate-800 text-white rounded-md"
          >
            <Upload className="w-5 h-5 text-slate-400" />
            Products
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            <Store className="w-5 h-5 text-slate-400" />
            Back to Shop
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64 transition-all duration-300">
        <div className="min-h-full p-8">{children}</div>
      </main>
    </div>
  );
}
