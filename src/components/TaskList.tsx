import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
}) => {
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
        />
      ))}
    </div>
  );
};

export default TaskList;