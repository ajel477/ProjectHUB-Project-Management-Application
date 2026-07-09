import { useEffect, useState } from "react";

const TaskForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-xl border border-slate-700 w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {initialData ? "Edit Task" : "New Task"}
          </h2>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2">Task Title</label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
            >
              {initialData ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
