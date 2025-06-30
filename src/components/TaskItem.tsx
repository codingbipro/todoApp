import React, { useState } from 'react';
import { Check, X, Edit3, Trash2, Save, RotateCcw } from 'lucide-react';
import { Task } from '../App';
import ConfirmDialog from './ConfirmDialog';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onUpdate,
  onDelete,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (editTitle.trim() && editTitle.trim() !== task.title) {
      onUpdate(task.id, editTitle.trim());
    }
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <>
      <div
        className={`group p-6 hover:bg-slate-50 transition-all duration-200 ${
          task.completed ? 'opacity-75' : ''
        }`}
        style={{
          animationDelay: `${index * 50}ms`,
          animation: 'slideIn 0.3s ease-out forwards',
        }}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
              task.completed
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-300 hover:border-indigo-400'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 mx-auto" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  autoFocus
                  maxLength={200}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!editTitle.trim()}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-500 text-white text-sm rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p
                  className={`text-lg font-medium transition-all duration-200 ${
                    task.completed
                      ? 'line-through text-slate-500'
                      : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Created {formatDate(task.createdAt)}
                  {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                    <span> • Updated {formatDate(task.updatedAt)}</span>
                  )}
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          onDelete(task.id);
          setShowDeleteConfirm(false);
        }}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default TaskItem;