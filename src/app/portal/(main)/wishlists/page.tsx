"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  FileText,
  Trash2,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/services/authService";
import {
  getProjects,
  createProject,
  deleteProject,
  removeItemFromProject,
  Project,
  ProjectItem,
} from "@/services/userService";

export default function WishlistsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadProjects();
    } else {
      // If not logged in, maybe show empty or redirect?
      // For now, let's just stop loading.
      setLoading(false);
    }
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getProjects(user.uid);
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (projId: string, item: ProjectItem) => {
    if (!user || !confirm("Remove this item from the project?")) return;
    try {
      // Optimistic update
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projId) return p;
          return { ...p, items: p.items.filter((i) => i.id !== item.id) };
        })
      );
      await removeItemFromProject(user.uid, projId, item);
      // Ideally reload or rely on real-time listener, but simple fetch for now
      // loadProjects(); // unnecessary if optimistic works well, but good for sync
    } catch (error) {
      console.error("Failed to delete item", error);
      loadProjects(); // Revert on error
    }
  };

  const handleDeleteProject = async (projId: string) => {
    if (
      !user ||
      !confirm("Are you sure you want to delete this entire project?")
    )
      return;
    try {
      setProjects((prev) => prev.filter((p) => p.id !== projId)); // Optimistic
      await deleteProject(user.uid, projId);
    } catch (error) {
      console.error("Failed to delete project", error);
      loadProjects();
    }
  };

  const handleCreateProject = async () => {
    const name = prompt("Enter new project name:");
    if (name && user) {
      try {
        setActionLoading(true);
        await createProject(user.uid, name);
        await loadProjects();
      } catch (error) {
        console.error("Failed to create project", error);
        alert("Failed to create project.");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleAddToQuote = (item: ProjectItem) => {
    alert(`Item [${item.sku}] added to active inquiry draft.`);
  };

  if (loading) {
    return (
      <div className="p-12 flex justify-center text-industrial-400">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-industrial-900 uppercase">
            My Projects
          </h1>
          <p className="text-industrial-500 text-sm mt-1">
            Manage specification groups for upcoming launches.
          </p>
        </div>
        <button
          onClick={handleCreateProject}
          disabled={!user || actionLoading}
          className="bg-berlin-red text-white px-6 py-2 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {actionLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Create New Project
        </button>
      </div>

      {!user ? (
        <div className="bg-yellow-50 p-6 rounded-sm border border-yellow-200 text-yellow-800">
          Please log in to manage your projects.
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-white border border-industrial-100 rounded-sm">
          <p className="text-industrial-500 mb-4">
            You haven't created any projects yet.
          </p>
          <button
            onClick={handleCreateProject}
            className="text-berlin-blue font-bold hover:underline"
          >
            Create your first project
          </button>
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-industrial-200 rounded-sm mb-8 overflow-hidden"
          >
            <div className="bg-industrial-50 px-6 py-4 border-b border-industrial-200 flex justify-between items-center">
              <div className="flex items-baseline gap-4">
                <h3 className="font-bold text-industrial-800">
                  {project.name}
                </h3>
                <span className="text-xs text-industrial-500 font-medium bg-white px-2 py-1 rounded border border-industrial-200">
                  Created{" "}
                  {new Date(
                    project.createdAt?.seconds * 1000 || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-gray-400 hover:text-berlin-red transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-industrial-100">
              {(!project.items || project.items.length === 0) && (
                <div className="p-8 text-center text-industrial-400 italic text-sm">
                  No items in this project yet. Browse the catalog to add specs.
                </div>
              )}
              {project.items?.map((item, idx) => (
                <div
                  key={item.id + idx} // fallback key if duplicates for some reason
                  className="p-6 flex flex-col md:flex-row items-center gap-6 group"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-sm relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <Star className="w-8 h-8 opacity-20" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-bold text-industrial-900 text-lg">
                      {item.name}
                    </h4>
                    <p className="text-sm text-industrial-500 mb-2">
                      SKU: {item.sku}
                    </p>
                    <p className="text-sm text-industrial-600">{item.detail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDeleteItem(project.id, item)}
                      className="flex items-center gap-2 px-4 py-2 border border-industrial-200 rounded-sm text-industrial-600 hover:text-berlin-red hover:border-berlin-red transition-colors"
                      title="Remove from Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAddToQuote(item)}
                      className="flex items-center gap-2 px-6 py-2 bg-industrial-900 text-white rounded-sm font-bold hover:bg-berlin-blue transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Add to Quote</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
