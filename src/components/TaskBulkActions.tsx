import React from 'react';
import { CheckSquare, Square, Trash2 } from 'lucide-react';

interface TaskBulkActionsProps {
  selectedTasks: string[];
  totalTasks: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkComplete: () => void;
  onBulkDelete: () => void;
}

const TaskBulkActions: React.FC<TaskBulkActionsProps> = ({
  selectedTasks,
  totalTasks,
  onSelectAll,
  onDeselectAll,
  onBulkComplete,
  onBulkDelete,
}) => {
  const allSelected = selectedTasks.length === totalTasks && totalTasks > 0;
  const someSelected = selectedTasks.length > 0;

  if (totalTasks === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <button
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
        >
          {allSelected ? (
            <CheckSquare className="w-4 h-4" />
          ) : (
            <Square className="w-4 h-4" />
          )}
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
        {someSelected && (
          <span className="text-sm text-slate-500">
            {selectedTasks.length} selected
          </span>
        )}
      </div>

      {someSelected && (
        <div className="flex items-center gap-2">
          <button
            onClick={onBulkComplete}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
          >
            <CheckSquare className="w-4 h-4" />
            Complete
          </button>
          <button
            onClick={onBulkDelete}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskBulkActions;