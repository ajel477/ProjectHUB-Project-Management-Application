import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const MainLayout = () => {

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="p-6 flex-1">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default MainLayout;