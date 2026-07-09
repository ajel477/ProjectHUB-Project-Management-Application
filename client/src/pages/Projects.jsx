import { useEffect, useState } from "react";
import ProjectTable from "../components/project/ProjectTable";
import { getProjects } from "../services/projectService";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch projects.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-slate-400 text-lg">Loading projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Projects</h1>

                <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition">
                    + New Project
                </button>
            </div>

            <div className="mb-6">
                <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white">
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                </select>
            </div>

            <ProjectTable projects={projects} />
        </div>
    );
};

export default Projects;