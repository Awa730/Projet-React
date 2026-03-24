interface FilterBarProps {
    filtreStatut: string;
    onFilterChange: (statut: string) => void;
    showStatuts: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filtreStatut, onFilterChange, showStatuts }) => {
    return (
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Filtrer:</span>
                <select
                    value={filtreStatut}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                    {showStatuts.map((statut) => (
                        <option key={statut} value={statut}>
                            {statut}
                        </option>
                    ))}
                </select>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                <span>📥</span>
                Exporter
            </button>
        </div>
    );
};

export default FilterBar;