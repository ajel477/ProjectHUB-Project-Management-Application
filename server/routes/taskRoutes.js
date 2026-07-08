import express from "express";

import { getTasksByProject, createTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// GET /api/projects/:projectId/tasks
router.get("/projects/:projectId/tasks", getTasksByProject);
router.post("/projects/:projectId/tasks", createTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

export default router;