import { Link } from "react-router-dom";
import {
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash
} from "react-icons/hi";

import StatusBadge from "../common/StatusBadge";

const ProjectTable = ({ projects }) => {

    if (projects.length === 0) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-400 text-lg">
                    No projects found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-slate-900 rounded-xl border border-slate-800 shadow-lg">

            <table className="w-full">

                <thead className="bg-slate-800">

                    <tr>

                        <th className="text-left px-6 py-4 font-semibold">
                            Project
                        </th>

                        <th className="text-left px-6 py-4 font-semibold">
                            Status
                        </th>

                        <th className="text-left px-6 py-4 font-semibold">
                            Deadline
                        </th>

                        <th className="text-center px-6 py-4 font-semibold">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {projects.map((project) => (

                        <tr
                            key={project._id}
                            className="border-b border-slate-800 hover:bg-slate-800 transition"
                        >

                            <td className="px-6 py-5">

                                <div>

                                    <h3 className="font-semibold text-white">

                                        {project.title}

                                    </h3>

                                    <p className="text-sm text-slate-400 mt-1 line-clamp-1">

                                        {project.description}

                                    </p>

                                </div>

                            </td>

                            <td className="px-6 py-5">

                                <StatusBadge
                                    status={project.status}
                                />

                            </td>

                            <td className="px-6 py-5 text-slate-300">

                                {new Date(project.deadline).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )}

                            </td>

                            <td className="px-6 py-5">

                                <div className="flex justify-center gap-4">

                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="text-blue-400 hover:text-blue-300"
                                        title="View Project"
                                    >

                                        <HiOutlineEye size={22} />

                                    </Link>

                                    <button
                                        className="text-yellow-400 hover:text-yellow-300"
                                        title="Edit Project"
                                    >

                                        <HiOutlinePencil size={22} />

                                    </button>

                                    <button
                                        className="text-red-500 hover:text-red-400"
                                        title="Delete Project"
                                    >

                                        <HiOutlineTrash size={22} />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

};

export default ProjectTable;