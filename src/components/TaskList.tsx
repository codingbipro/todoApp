import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';
import { Category } from './TaskCategories';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
  selectedTasks: string[];
  onTaskSelect: (selectedTasks: string[]) => void;
  categories: Category[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
  selectedTasks,
  onTaskSelect,
  categories,
}) => {
  const handleTaskSelect = (taskId: string, selected: boolean) => {
    if (selected) {
      onTaskSelect([...selectedTasks, taskId]);
    } else {
      onTaskSelect(selectedTasks.filter(id => id !== taskId));
    }
  };

  return (
    <div className="divide-y divide-slate-100">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          index={index}
          isSelected={selectedTasks.includes(task.id)}
          onSelect={handleTaskSelect}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default TaskList;