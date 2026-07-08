import Project from "../models/Project.js";
import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /api/dashboard
 * Dashboard summary statistics
 */

export const getDashboardSummary = asyncHandler(async (req, res) => {

    const totalProjects = await Project.countDocuments();

    const activeProjects = await Project.countDocuments({
        status: "Active"
    });

    const completedTasks = await Task.countDocuments({
        status: "Completed"
    });

    const pendingTasks = await Task.countDocuments({
        status: {
            $in: ["Pending", "In Progress"]
        }
    });

    res.status(200).json({
        success: true,
        data: {
            totalProjects,
            activeProjects,
            completedTasks,
            pendingTasks
        }
    });

});