// API service for backend communication
// In development, use relative path so Vite proxy handles it
// In production, use environment variable or default
const getApiUrl = () => {
  // If explicitly set in env, use it (for production)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use relative path (Vite proxy)
  if (import.meta.env.DEV) {
    return '/api';
  }
  // Production fallback
  return 'http://localhost:3000/api';
};

const API_URL = getApiUrl();

// Log API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('API URL:', API_URL);
}

export const todoAPI = {
  // Get all todos
  getAllTodos: async () => {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  // Get a single todo by id
  getTodoById: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return response.json();
  },

  // Create a new todo
  createTodo: async (todo) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  // Update a todo
  updateTodo: async (id, todo) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  // Delete a todo
  deleteTodo: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return response.json();
  },
};

