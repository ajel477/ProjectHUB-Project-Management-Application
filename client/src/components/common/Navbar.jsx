const Navbar = () => {

    const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (

        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">

            <h1 className="text-xl font-semibold text-white">
                Project Management Dashboard
            </h1>

            <span className="text-slate-400">
                {today}
            </span>

        </header>

    );

};

export default Navbar;