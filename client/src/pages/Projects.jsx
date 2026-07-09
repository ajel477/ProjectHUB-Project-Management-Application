import { useEffect, useState } from "react";
import ProjectTable from "../components/project/ProjectTable";
import ProjectForm from "../components/project/ProjectForm";
import DeleteModal from "../components/project/DeleteModal";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.status === filter),
      );
    }
  }, [filter, projects]);

  const handleCreateProject = async (projectData) => {
    try {
      await createProject(projectData);

      fetchProjects();

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create project.");
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      await updateProject(selectedProject._id, projectData);

      fetchProjects();

      setSelectedProject(null);

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update project.");
    }
  };

  const openCreateModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const openDeleteModal = (project) => {
    setProjectToDelete(project);

    setDeleteModalOpen(true);
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectToDelete._id);

      fetchProjects();

      setDeleteModalOpen(false);

      setProjectToDelete(null);
    } catch (err) {
      console.error(err);

      alert("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-slate-400 text-lg">Loading Projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>

        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          + New Project
        </button>
      </div>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>
      </div>

      <ProjectTable
        projects={filteredProjects}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <ProjectForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
        initialData={selectedProject}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDeleteProject}
        projectTitle={projectToDelete?.title}
      />
    </div>
  );
};

export default Projects;
