import React, { useState } from 'react';
import { Plus, AlertCircle, Flag } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string, priority?: 'low' | 'medium' | 'high') => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a task');
      return;
    }

    if (title.trim().length > 200) {
      setError('Task is too long (max 200 characters)');
      return;
    }

    onAddTask(title, priority);
    setTitle('');
    setPriority('medium');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  const priorityColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="Add a new task..."
            className={`w-full px-4 py-4 pr-12 text-lg rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
              error
                ? 'border-red-300 focus:border-red-400'
                : 'border-slate-200 focus:border-indigo-400'
            } bg-white shadow-sm`}
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Priority Selector */}
        <div className="flex items-center gap-1 bg-white border-2 border-slate-200 rounded-2xl p-1">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                priority === p
                  ? priorityColors[p]
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Flag className="w-3 h-3" />
              <span className="hidden sm:inline capitalize">{p}</span>
            </button>
          ))}
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex justify-between text-xs text-slate-500">
        <span>Priority: <span className="capitalize font-medium">{priority}</span></span>
        <span>{title.length}/200 characters</span>
      </div>
    </form>
  );
};

export default TaskForm;