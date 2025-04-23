import React, { useState, useEffect } from 'react';
import Todo from '../../components/Todo';
import type { Todo as TodoType } from '../../services/todoService';
import { todoService } from '../../services/todoService';

export default function TodosPage() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todosData = await todoService.getAllTodos();
      setTodos(todosData);
      setError(null);
    } catch (err) {
      setError('할 일을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await todoService.createTodo({
        title: newTodoTitle,
        completed: false
      });
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (err) {
      setError('할 일 추가에 실패했습니다.');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    try {
      const updatedTodo = await todoService.updateTodo({
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      });
      
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('할 일 상태 변경에 실패했습니다.');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('할 일 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">할 일 목록</h1>
      
      <form onSubmit={handleAddTodo} className="mb-6 flex">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="새로운 할 일"
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          추가
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center p-4">로딩 중...</div>
      ) : todos.length === 0 ? (
        <div className="text-center p-4 text-gray-500">할 일이 없습니다.</div>
      ) : (
        <div className="bg-white rounded shadow">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id!}
              title={todo.title}
              completed={todo.completed}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
} 