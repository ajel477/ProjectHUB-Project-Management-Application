import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /api/projects/:projectId/tasks
 * Fetch all tasks for a project
 */

/**
 * GET /api/projects/:projectId/tasks
 */

export const getTasksByProject = asyncHandler(async (req, res) => {

    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {

        const error = new Error("Invalid project ID");
        error.statusCode = 400;
        throw error;

    }

    const tasks = await Task.find({
        projectId
    }).sort({
        createdAt: -1
    });

    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });

});

/**
 * POST /api/projects/:projectId/tasks
 * Create a new task for a project
 */

export const createTask = asyncHandler(async (req, res) => {

    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {

        const error = new Error("Invalid project ID");
        error.statusCode = 400;
        throw error;

    }

    const project = await Project.findById(projectId);

    if (!project) {

        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;

    }

    const { title, description, status } = req.body;

    if (!title || !description || !status) {

        const error = new Error("All fields are required.");
        error.statusCode = 400;
        throw error;

    }

    const task = await Task.create({
        projectId,
        title,
        description,
        status
    });

    res.status(201).json({
        success: true,
        message: "Task created successfully.",
        data: task
    });

});
/**
 * PUT /api/tasks/:taskId
 * Update a task
 */

/**
 * PUT /api/tasks/:taskId
 */

export const updateTask = asyncHandler(async (req, res) => {

    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {

        const error = new Error("Invalid task ID");
        error.statusCode = 400;
        throw error;

    }

    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedTask) {

        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;

    }

    res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        data: updatedTask
    });

});

/**
 * DELETE /api/tasks/:taskId
 */

/**
 * DELETE /api/tasks/:taskId
 */

export const deleteTask = asyncHandler(async (req, res) => {

    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {

        const error = new Error("Invalid task ID");
        error.statusCode = 400;
        throw error;

    }

    const task = await Task.findById(taskId);

    if (!task) {

        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;

    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully."
    });

});