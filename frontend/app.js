// API Configuration - can be set via config.js or window.API_URL
const API_URL = (window.APP_CONFIG && window.APP_CONFIG.API_URL) || window.API_URL || 'http://localhost:3000/api/todos';

let todos = [];
let currentFilter = 'all';

// DOM Elements
const todoTitleInput = document.getElementById('todoTitle');
const todoDescriptionInput = document.getElementById('todoDescription');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');

// Event Listeners
addTodoBtn.addEventListener('click', addTodo);
todoTitleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Functions
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
        showError('Failed to load todos. Please refresh the page.');
    }
}

async function addTodo() {
    const title = todoTitleInput.value.trim();
    const description = todoDescriptionInput.value.trim();

    if (!title) {
        alert('Please enter a todo title');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) throw new Error('Failed to create todo');

        const newTodo = await response.json();
        todos.unshift(newTodo);
        todoTitleInput.value = '';
        todoDescriptionInput.value = '';
        renderTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
        showError('Failed to add todo. Please try again.');
    }
}

async function toggleTodo(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !completed }),
        });

        if (!response.ok) throw new Error('Failed to update todo');

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
            todos[index] = updatedTodo;
        }
        renderTodos();
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update todo. Please try again.');
    }
}

async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete todo');

        todos = todos.filter(t => t.id !== id);
        renderTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
        showError('Failed to delete todo. Please try again.');
    }
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const todoContent = todoItem.querySelector('.todo-content');
    
    const editForm = document.createElement('div');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
        <input type="text" class="edit-input" value="${escapeHtml(todo.title)}" id="edit-title-${id}">
        <textarea class="edit-textarea" id="edit-desc-${id}" rows="2">${escapeHtml(todo.description || '')}</textarea>
        <div class="edit-actions">
            <button class="btn btn-save" onclick="saveTodo(${id})">Save</button>
            <button class="btn btn-cancel" onclick="cancelEdit(${id})">Cancel</button>
        </div>
    `;

    const originalContent = todoContent.innerHTML;
    todoContent.innerHTML = '';
    todoContent.appendChild(editForm);
    
    // Store original content for cancel
    editForm.dataset.original = originalContent;
    
    // Focus on title input
    document.getElementById(`edit-title-${id}`).focus();
}

async function saveTodo(id) {
    const titleInput = document.getElementById(`edit-title-${id}`);
    const descInput = document.getElementById(`edit-desc-${id}`);
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!title) {
        alert('Please enter a todo title');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok) throw new Error('Failed to update todo');

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
            todos[index] = updatedTodo;
        }
        renderTodos();
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update todo. Please try again.');
    }
}

function cancelEdit(id) {
    renderTodos();
}

function renderTodos() {
    const filteredTodos = getFilteredTodos();
    
    if (filteredTodos.length === 0) {
        todoList.style.display = 'none';
        emptyState.classList.add('show');
    } else {
        todoList.style.display = 'flex';
        emptyState.classList.remove('show');
    }

    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id}, ${todo.completed})"
            >
            <div class="todo-content">
                <div class="todo-title">${escapeHtml(todo.title)}</div>
                ${todo.description ? `<div class="todo-description-text">${escapeHtml(todo.description)}</div>` : ''}
                <div class="todo-date">Created: ${formatDate(todo.created_at)}</div>
            </div>
            <div class="todo-actions">
                <button class="btn-icon btn-edit" onclick="editTodo(${todo.id})" title="Edit">
                    ✏️
                </button>
                <button class="btn-icon btn-delete" onclick="deleteTodo(${todo.id})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    alert(message);
}

// Make functions globally available for inline event handlers
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.saveTodo = saveTodo;
window.cancelEdit = cancelEdit;

// Initialize
fetchTodos();

