import { useEffect, useState } from "react";
import {
  HiOutlineFolder,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCollection,
} from "react-icons/hi";

import SummaryCard from "../components/dashboard/SummaryCard";
import StatusBadge from "../components/common/StatusBadge";
import { getDashboardSummary } from "../services/dashboardService";
import { getProjects } from "../services/projectService";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const summaryResponse = await getDashboardSummary();
        const projectResponse = await getProjects();

        setSummary(summaryResponse.data);
        setProjects(projectResponse.data.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-slate-400 text-lg">Loading Dashboard...</p>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="text-slate-400 mt-2">
          Manage all your ongoing projects from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Projects"
          value={summary?.totalProjects || 0}
          icon={<HiOutlineCollection />}
          color="text-blue-400"
        />

        <SummaryCard
          title="Active Projects"
          value={summary?.activeProjects || 0}
          icon={<HiOutlineFolder />}
          color="text-green-400"
        />

        <SummaryCard
          title="Completed Tasks"
          value={summary?.completedTasks || 0}
          icon={<HiOutlineCheckCircle />}
          color="text-emerald-400"
        />

        <SummaryCard
          title="Pending Tasks"
          value={summary?.pendingTasks || 0}
          icon={<HiOutlineClock />}
          color="text-yellow-400"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-5">Recent Projects</h2>

        <div className="bg-slate-900 rounded-xl border border-slate-800 divide-y divide-slate-800">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex justify-between items-center p-5 hover:bg-slate-800 transition"
            >
              <div>
                <h3 className="font-semibold">{project.title}</h3>

                <p className="text-sm text-slate-400 mt-1">
                  {project.description.length > 70
                    ? project.description.substring(0, 70) + "..."
                    : project.description}
                </p>
              </div>

              <StatusBadge status={project.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;