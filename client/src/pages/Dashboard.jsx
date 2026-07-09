import SummaryCard from "../components/dashboard/SummaryCard";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

import { HiOutlineFolder, HiOutlineCheckCircle, HiOutlineClock, HiOutlineCollection } from "react-icons/hi";

const [summary, setSummary] = useState(null);

const [loading, setLoading] = useState(true);

useEffect(() => {

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardSummary();

            setSummary(data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    fetchDashboard();

}, []);

const Dashboard = () => {

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Welcome Back 👋
                </h1>
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
        </div>
    );
};

<div className="mt-10">
    <h2 className="text-2xl font-semibold mb-5">
        Recent Projects
    </h2>

    <div className="bg-slate-900 rounded-xl border border-slate-800">
        <div className="p-5 border-b border-slate-800">
            <p className="font-medium">
                E-Commerce Website Redesign
            </p>
            <span className="text-green-400 text-sm">
                Active
            </span>
        </div>
        <div className="p-5 border-b border-slate-800">
            <p className="font-medium">
                Mobile App for Fitness Tracking
            </p>
            <span className="text-green-400 text-sm">
                Active
            </span>
        </div>
        <div className="p-5">
            <p className="font-medium">
                Internal Dashboard for HR
            </p>
            <span className="text-yellow-400 text-sm">
                On Hold
            </span>
        </div>
    </div>
</div>

export default Dashboard;