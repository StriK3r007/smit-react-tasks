export default function Stat({name, value}) {
    return (
        <div className="stats shadow min-w-50 bg-gray-200">
            <div className="stat">
                <div className="stat-title">{name}</div>
                <div className="stat-value">Rs. {value}</div>
            </div>
        </div>
    )
};
