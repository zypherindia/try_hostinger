import TodoItem from './TodoItem';

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state show">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;

