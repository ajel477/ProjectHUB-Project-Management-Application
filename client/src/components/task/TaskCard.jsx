import {
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}) => {

  const badgeStyle = {
    Pending: "bg-yellow-500/20 text-yellow-400",
    "In Progress": "bg-blue-500/20 text-blue-400",
    Completed: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500 transition">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          <h3 className="text-lg font-semibold">

            {task.title}

          </h3>

          <p className="text-slate-400 text-sm mt-2">

            {task.description}

          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle[task.status]}`}
        >
          {task.status}
        </span>

      </div>

      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-yellow-600 transition"
        >
          <HiOutlinePencil />
        </button>

        <button
          onClick={() => onDelete(task)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 transition"
        >
          <HiOutlineTrash />
        </button>

      </div>

    </div>
  );

};

export default TaskCard;