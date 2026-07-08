import Project from "../models/Project.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /api/projects
 * Fetch all projects
 */

export const getProjects = asyncHandler(async (req, res) => {

    const projects = await Project.find().sort({
        createdAt: -1
    });

    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    });

});

/**
 * GET /api/projects/:id
 * Fetch a single project by ID
 */

export const getProjectById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid Project ID");
        error.statusCode = 400;
        throw error;
    }

    const project = await Project.findById(id);

    if (!project) {
        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        success: true,
        data: project
    });
});
/**
 * POST /api/projects
 * Create a new project
 */

export const createProject = asyncHandler(async (req, res) => {

    const { title, description, status, deadline } = req.body;

    if (!title || !description || !status || !deadline) {

        const error = new Error("All fields are required.");
        error.statusCode = 400;
        throw error;

    }

    const project = await Project.create({
        title,
        description,
        status,
        deadline
    });

    res.status(201).json({
        success: true,
        message: "Project created successfully.",
        data: project
    });

});

/**
 * PUT /api/projects/:id
 * Update an existing project
 */

export const updateProject = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        const error = new Error("Invalid project ID");
        error.statusCode = 400;
        throw error;

    }

    const updatedProject = await Project.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProject) {

        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;

    }

    res.status(200).json({
        success: true,
        message: "Project updated successfully.",
        data: updatedProject
    });

});
/**
 * DELETE /api/projects/:id
 * Delete project and all its tasks
 */

export const deleteProject = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        const error = new Error("Invalid project ID");
        error.statusCode = 400;
        throw error;

    }

    const project = await Project.findById(id);

    if (!project) {

        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;

    }

    await Task.deleteMany({
        projectId: id
    });

    await Project.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Project and associated tasks deleted successfully."
    });

});