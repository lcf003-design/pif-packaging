"use client";

import { useEffect, useState } from "react";
import { getAllUsers, UserProfile } from "@/services/userService";
import {
  Search,
  Filter,
  ShieldAlert,
  User,
  Building2,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"customers" | "team">("customers");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    // 1. Role Filter
    const isTeam = user.role === "admin";
    if (activeTab === "team" && !isTeam) return false;
    if (activeTab === "customers" && isTeam) return false;

    // 2. Search Filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (user.displayName?.toLowerCase() || "").includes(searchLower) ||
      (user.email?.toLowerCase() || "").includes(searchLower) ||
      (user.company?.toLowerCase() || "").includes(searchLower);

    return matchesSearch;
  });

  if (loading)
    return (
      <div className="p-12 text-center text-slate-500">
        Loading Directory...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            User Directory
          </h1>
          <p className="text-slate-500">Manage customers and team access.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("customers")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "customers"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <User className="w-4 h-4" />
          Customers
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
            {users.filter((u) => u.role !== "admin").length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === "team"
              ? "border-berlin-red text-berlin-red"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Team
          <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs">
            {users.filter((u) => u.role === "admin").length}
          </span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700">User</th>
                <th className="px-6 py-4 font-bold text-slate-700">Contact</th>
                <th className="px-6 py-4 font-bold text-slate-700">Company</th>
                <th className="px-6 py-4 font-bold text-slate-700">Role</th>
                <th className="px-6 py-4 font-bold text-slate-700">Joined</th>
                <th className="px-6 py-4 font-bold text-slate-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.uid}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                          {user.email?.substring(0, 2) || "??"}
                        </div>
                        <div className="font-bold text-slate-900">
                          {user.displayName || "No Name"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.company ? (
                        <div className="flex items-center gap-2 text-slate-900 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {user.company}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">
                          Individual
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Customer
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {/* Timestamp safety check */}
                      {user.createdAt
                        ? user.createdAt.seconds
                          ? formatDistanceToNow(
                              new Date(user.createdAt.seconds * 1000),
                              { addSuffix: true }
                            )
                          : "Unknown"
                        : "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <p>No users found in this tab.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
