import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">

            <h1 className="text-6xl font-bold">
                404
            </h1>

            <p className="mt-4 text-slate-400">
                Page Not Found
            </p>

            <Link
                to="/"
                className="mt-6 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                Back to Dashboard
            </Link>

        </div>
    );
};

export default NotFound;