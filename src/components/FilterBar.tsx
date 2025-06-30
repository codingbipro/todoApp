import React from 'react';
import { FilterType } from '../App';
import { List, Clock, CheckCircle, Trash2 } from 'lucide-react';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}) => {
  const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <List className="w-4 h-4" /> },
    { key: 'active', label: 'Active', icon: <Clock className="w-4 h-4" /> },
    { key: 'completed', label: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Filter Buttons */}
      <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
        {filters.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              currentFilter === key
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Clear Completed Button */}
      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      )}
    </div>
  );
};

export default FilterBar;