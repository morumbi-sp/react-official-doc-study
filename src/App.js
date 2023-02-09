import { useState } from 'react';

function TaskList({ todos, onChangeTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChange({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type='checkbox'
        checked={todo.done}
        onChange={(e) => {
          onChange({
            ...todo,
            done: e.target.checked,
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}

function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder='Add todo'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          setTitle('');
          onAddTodo(title);
        }}
      >
        Add
      </button>
    </>
  );
}
//
let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    const newTodos = [...todos, { id: nextId++, title, done: false }];
    setTodos(newTodos);
  }

  function handleChangeTodo(nextTodo) {
    const newTodos = todos.map((todo) => {
      if (todo.id === nextTodo.id) {
        return { ...todo, title: nextTodo.title, done: nextTodo.done };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  }

  function handleDeleteTodo(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
