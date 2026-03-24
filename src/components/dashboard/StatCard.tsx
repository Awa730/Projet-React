interface StatCardProps {
    title: string;
    value: number;
    emoji: string;
    color: 'blue' | 'green' | 'yellow' | 'purple';
}

const StatCard = ({ title, value, emoji, color }: StatCardProps) => {
    const colorClasses = {
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        yellow: 'bg-yellow-100',
        purple: 'bg-purple-100'
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center text-2xl`}>
                    {emoji}
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    );
};

export default StatCard;