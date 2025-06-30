import React from 'react';
import { Tag, X } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface TaskCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onAddCategory: (name: string, color: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const TaskCategories: React.FC<TaskCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [newCategoryColor, setNewCategoryColor] = React.useState('#6366f1');

  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f59e0b', '#10b981', '#06b6d4', '#6b7280'
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName('');
      setNewCategoryColor('#6366f1');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Categories
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Add Category
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-slate-800 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Tasks
        </button>
        
        {categories.map((category) => (
          <div key={category.id} className="relative group">
            <button
              onClick={() => onCategorySelect(category.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'text-white shadow-md'
                  : 'text-white/90 hover:text-white'
              }`}
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="p-3 bg-slate-50 rounded-lg space-y-3">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Color:</span>
            <div className="flex gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setNewCategoryColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    newCategoryColor === color ? 'border-slate-400' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddCategory}
              className="px-3 py-1.5 text-xs font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
                setNewCategoryColor('#6366f1');
              }}
              className="px-3 py-1.5 text-xs font-medium bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCategories;