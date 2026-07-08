import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import mockData from "../data/mockData.json" with { type: "json" };

dotenv.config();

const seedDatabase = async () => {
    try {
        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🌱 Starting Database Seeding...");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        // Connect to MongoDB
        await connectDB();

        // Clear existing collections
        await Task.deleteMany({});
        await Project.deleteMany({});

        console.log("🗑️ Existing data cleared.");

        // ----------------------------
        // Insert Projects
        // ----------------------------

        const projectData = mockData.projects.map((project) => ({
            title: project.title,
            description: project.description,
            status: project.status,
            deadline: new Date(project.deadline),
        }));

        const insertedProjects = await Project.insertMany(projectData);

        console.log(`✅ ${insertedProjects.length} Projects inserted.`);

        // ----------------------------
        // Create Mapping
        // ----------------------------

        const projectMap = {};

        mockData.projects.forEach((project, index) => {
            projectMap[project.id] = insertedProjects[index]._id;
        });

        // ----------------------------
        // Insert Tasks
        // ----------------------------

        const taskData = mockData.tasks.map((task) => ({
            projectId: projectMap[task.projectId],
            title: task.title,
            description: task.description,
            status: task.status,
        }));

        const insertedTasks = await Task.insertMany(taskData);

        console.log(`✅ ${insertedTasks.length} Tasks inserted.`);

        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🎉 Database Seeded Successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        process.exit(0);
    } catch (error) {
        console.error("\n❌ Database Seeding Failed\n");
        console.error(error);

        process.exit(1);
    }
};

seedDatabase();