import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlinePlus } from "react-icons/hi";

import StatusBadge from "../components/common/StatusBadge";
import TaskCard from "../components/task/TaskCard";
import TaskForm from "../components/task/TaskForm";
import DeleteModal from "../components/project/DeleteModal";

import { getProjectById } from "../services/projectService";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const projectResponse = await getProjectById(id);
      const taskResponse = await getTasks(id);

      setProject(projectResponse.data);
      setTasks(taskResponse.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load project.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(id, taskData);
      fetchData();
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create task.");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(selectedTask._id, taskData);
      fetchData();
      setSelectedTask(null);
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update task.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskToDelete._id);
      fetchData();
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-slate-400 text-lg">Loading Project...</p>
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
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
      >
        <HiOutlineArrowLeft />
        Back to Projects
      </Link>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{project.title}</h1>

          <StatusBadge status={project.status} />
        </div>

        <p className="text-slate-400 mt-6">{project.description}</p>

        <div className="mt-6">
          <p className="text-slate-500 text-sm">Deadline</p>

          <p className="mt-1">
            {new Date(project.deadline).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>

        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <HiOutlinePlus />
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400">No tasks found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      <TaskForm
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        initialData={selectedTask}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
        projectTitle={taskToDelete?.title}
      />
    </div>
  );
};

export default ProjectDetails;
