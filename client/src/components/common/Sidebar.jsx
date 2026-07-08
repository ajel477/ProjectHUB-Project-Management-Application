import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    HiOutlineViewGrid,
    HiOutlineFolder,
    HiOutlineMenu
} from "react-icons/hi";

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <aside
            className={`${
                collapsed ? "w-20" : "w-64"
            } transition-all duration-300 bg-slate-900 border-r border-slate-800 min-h-screen`}
        >

            {/* Header */}

            <div className="flex items-center justify-between p-4">

                {!collapsed && (

                    <h2 className="text-xl font-bold text-white">
                        ProjectPilot
                    </h2>

                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white"
                >
                    <HiOutlineMenu size={24} />
                </button>

            </div>

            {/* Navigation */}

            <nav className="mt-8 flex flex-col gap-2 px-3">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                        }`
                    }
                >
                    <HiOutlineViewGrid size={22} />

                    {!collapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                        }`
                    }
                >
                    <HiOutlineFolder size={22} />

                    {!collapsed && <span>Projects</span>}
                </NavLink>

            </nav>

        </aside>

    );

};

export default Sidebar;