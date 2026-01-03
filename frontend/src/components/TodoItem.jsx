import { useState } from 'react';

function TodoItem({ todo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = () => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('Please enter a todo title');
      return;
    }
    onUpdateTodo(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              className="edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="edit-textarea"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="2"
            />
            <div className="edit-actions">
              <button className="btn btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="todo-title">{todo.title}</div>
            {todo.description && (
              <div className="todo-description-text">{todo.description}</div>
            )}
            <div className="todo-date">Created: {formatDate(todo.created_at)}</div>
          </>
        )}
      </div>
      {!isEditing && (
        <div className="todo-actions">
          <button
            className="btn-icon btn-edit"
            onClick={handleEdit}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDeleteTodo(todo.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;

