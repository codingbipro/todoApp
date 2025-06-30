import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Filter } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import FilterBar from './components/FilterBar';
import TaskSearch from './components/TaskSearch';
import TaskSort, { SortType } from './components/TaskSort';
import TaskBulkActions from './components/TaskBulkActions';
import TaskCategories, { Category } from './components/TaskCategories';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string;
  priority: 'low' | 'medium' | 'high';
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('date-desc');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todos');
    const savedCategories = localStorage.getItem('todo-categories');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          priority: task.priority || 'medium',
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }

    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(parsedCategories);
      } catch (error) {
        console.error('Error loading categories from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('todo-categories', JSON.stringify(categories));
  }, [categories]);

  const addTask = (title: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: selectedCategory || undefined,
      priority,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const updateTask = (id: string, title: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, title: title.trim(), updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
    setSelectedTasks([]);
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    setTasks(prev => prev.map(task => 
      task.categoryId === categoryId 
        ? { ...task, categoryId: undefined }
        : task
    ));
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    }
  };

  const handleSelectAll = () => {
    setSelectedTasks(filteredAndSortedTasks.map(task => task.id));
  };

  const handleDeselectAll = () => {
    setSelectedTasks([]);
  };

  const handleBulkComplete = () => {
    setTasks(prev =>
      prev.map(task =>
        selectedTasks.includes(task.id)
          ? { ...task, completed: true, updatedAt: new Date() }
          : task
      )
    );
    setSelectedTasks([]);
  };

  const handleBulkDelete = () => {
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = tasks.filter(task => {
      // Filter by completion status
      const statusMatch = filter === 'all' || 
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);

      // Filter by search term
      const searchMatch = !searchTerm || 
        task.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by category
      const categoryMatch = !selectedCategory || task.categoryId === selectedCategory;

      return statusMatch && searchMatch && categoryMatch;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'date-desc':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'alpha-asc':
          return a.title.localeCompare(b.title);
        case 'alpha-desc':
          return b.title.localeCompare(a.title);
        case 'status':
          if (a.completed === b.completed) {
            return b.createdAt.getTime() - a.createdAt.getTime();
          }
          return a.completed ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, filter, searchTerm, selectedCategory, sortBy]);

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">TaskFlow Pro</h1>
          <p className="text-slate-600 text-lg">Advanced task management for productivity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <TaskCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Task Form */}
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <TaskForm onAddTask={addTask} />
              </div>

              {/* Controls */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 space-y-4">
                {/* Search and Sort */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <TaskSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                  </div>
                  <TaskSort currentSort={sortBy} onSortChange={setSortBy} />
                </div>

                {/* Stats and Filter */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <TaskStats completed={completedCount} total={totalCount} />
                  <FilterBar
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    onClearCompleted={clearCompleted}
                    hasCompleted={completedCount > 0}
                  />
                </div>
              </div>

              {/* Bulk Actions */}
              <TaskBulkActions
                selectedTasks={selectedTasks}
                totalTasks={filteredAndSortedTasks.length}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onBulkComplete={handleBulkComplete}
                onBulkDelete={handleBulkDelete}
              />

              {/* Task List */}
              <div className="min-h-[400px]">
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Circle className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">No tasks yet</h3>
                    <p className="text-slate-500 max-w-md">
                      Start by adding your first task above. Keep track of what needs to be done and stay organized.
                    </p>
                  </div>
                ) : filteredAndSortedTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Filter className="w-12 h-12 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">No tasks match your filters</h3>
                    <p className="text-slate-500">Try adjusting your search or filter settings.</p>
                  </div>
                ) : (
                  <TaskList
                    tasks={filteredAndSortedTasks}
                    onToggleTask={toggleTask}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                    selectedTasks={selectedTasks}
                    onTaskSelect={setSelectedTasks}
                    categories={categories}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;