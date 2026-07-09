import { useEffect, useState } from "react";

const ProjectForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active",
    deadline: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "Active",
        deadline: initialData.deadline
          ? initialData.deadline.substring(0, 10)
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Active",
        deadline: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {initialData ? "Edit Project" : "New Project"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm">Project Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
              >
                <option>Active</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm">Deadline</label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              {initialData ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
