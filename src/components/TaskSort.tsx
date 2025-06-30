import React from 'react';
import { ArrowUpDown, Calendar, MoreVertical as AlphabeticalSort, CheckCircle } from 'lucide-react';

export type SortType = 'date-desc' | 'date-asc' | 'alpha-asc' | 'alpha-desc' | 'status';

interface TaskSortProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ currentSort, onSortChange }) => {
  const sortOptions: { key: SortType; label: string; icon: React.ReactNode }[] = [
    { key: 'date-desc', label: 'Newest First', icon: <Calendar className="w-4 h-4" /> },
    { key: 'date-asc', label: 'Oldest First', icon: <Calendar className="w-4 h-4" /> },
    { key: 'alpha-asc', label: 'A to Z', icon: <AlphabeticalSort className="w-4 h-4" /> },
    { key: 'alpha-desc', label: 'Z to A', icon: <AlphabeticalSort className="w-4 h-4" /> },
    { key: 'status', label: 'By Status', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortType)}
        className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent cursor-pointer"
      >
        {sortOptions.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ArrowUpDown className="h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
};

export default TaskSort;