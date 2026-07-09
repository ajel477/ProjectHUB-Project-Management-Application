const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-4">
          Delete Project
        </h2>

        <p className="text-slate-400 mb-6">
          Are you sure you want to delete
          <span className="text-white font-semibold">
            {" "}{projectTitle}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;