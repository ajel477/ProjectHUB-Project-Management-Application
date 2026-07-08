import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";

function App() {

    return (

        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/projects"
                    element={<Projects />}
                />

                <Route
                    path="/projects/:id"
                    element={<ProjectDetails />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;