import React from 'react';

interface TodoProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ id, title, completed, onToggle, onDelete }) => {
  return (
    <div className="flex items-center p-3 border-b border-gray-200">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="h-5 w-5 text-blue-600"
      />
      <span 
        className={`flex-1 ml-3 ${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
      >
        {title}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700"
      >
        삭제
      </button>
    </div>
  );
};

export default Todo; 