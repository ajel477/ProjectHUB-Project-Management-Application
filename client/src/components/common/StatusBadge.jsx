const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: "bg-green-500/20 text-green-400",
    Completed: "bg-blue-500/20 text-blue-400",
    "On Hold": "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
    >
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {status}
    </span>
  );
};

export default StatusBadge;