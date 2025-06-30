import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
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

    onAddTask(title);
    setTitle('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
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
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="text-xs text-slate-500 text-right">
        {title.length}/200 characters
      </div>
    </form>
  );
};

export default TaskForm;