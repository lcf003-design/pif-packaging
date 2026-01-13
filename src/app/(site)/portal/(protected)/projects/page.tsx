"use client";

import { useAuth } from "@/services/authService";
import {
  createProject,
  deleteProject,
  getProjects,
  Project,
} from "@/services/userService";
import { useEffect, useState } from "react";
import { Plus, Trash2, Folder, Package } from "lucide-react";

export default function MyProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  async function loadProjects() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getProjects(user.uid);
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !newProjectName.trim()) return;

    try {
      await createProject(user.uid, newProjectName);
      setNewProjectName("");
      setIsCreating(false);
      loadProjects(); // Refresh list
    } catch (err) {
      console.error("Failed to create project", err);
    }
  }

  async function handleDeleteProject(projectId: string) {
    if (!user || !confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await deleteProject(user.uid, projectId);
      loadProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  }

  if (loading && !projects.length) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading Projects...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-500 text-sm mt-1">
            Organize potential orders by season or client.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Create Modal (Inline for simplicity) */}
      {isCreating && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleCreateProject} className="flex gap-2">
            <input
              type="text"
              placeholder="Project Name (e.g., Summer 2026 Line)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-gray-600 hover:text-black"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mt-2">
            Create a project to start grouping items for your next big product
            launch.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Folder className="w-6 h-6 text-gray-700" />
                </div>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Last updated{" "}
                {new Date(
                  project.updatedAt?.seconds * 1000 || Date.now()
                ).toLocaleDateString()}
              </p>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>
                    {project.items?.length || 0} Item
                    {project.items?.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
