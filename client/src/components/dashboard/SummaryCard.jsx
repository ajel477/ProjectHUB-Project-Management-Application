const SummaryCard = ({
    title,
    value,
    icon,
    color
}) => {

    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm hover:border-blue-500 transition">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-slate-400 text-sm">
                        {title}
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>
                </div>
                <div
                    className={`text-3xl ${color}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;