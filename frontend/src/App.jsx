import { useState, useEffect } from 'react';
import { todoAPI } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoAPI.getAllTodos();
      setTodos(data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load todos. Please make sure the backend server is running on port 3000.';
      setError(errorMessage);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title, description) => {
    try {
      setError(null);
      const newTodo = await todoAPI.createTodo({ title, description });
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      setError(null);
      const updatedTodo = await todoAPI.updateTodo(id, updates);
      setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }
    try {
      setError(null);
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <header>
        <h1>📝 My Todo List</h1>
        <p className="subtitle">Stay organized and get things done</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <TodoForm onAddTodo={handleAddTodo} />

      <FilterButtons filter={filter} onFilterChange={setFilter} />

      {loading ? (
        <div className="empty-state show">
          <p>Loading todos...</p>
        </div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
}

export default App;

