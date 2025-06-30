import React from 'react';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  completed: number;
  total: number;
}

const TaskStats: React.FC<TaskStatsProps> = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-slate-600">
          <Circle className="w-4 h-4" />
          <span className="text-sm font-medium">{total - completed} Active</span>
        </div>
        <div className="w-px h-4 bg-slate-300" />
        <div className="flex items-center gap-1 text-emerald-600">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-medium">{completed} Completed</span>
        </div>
      </div>
      
      {total > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-indigo-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{percentage}% Done</span>
          </div>
          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;