import './CSS/todo.css';
import React, { useState, useEffect, useRef } from 'react';
import Todoitems from './todoitems';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const count = useRef(0);

  const add = () => {
    const taskText = inputRef.current.value.trim();
    if (!taskText) {
      alert("Task cannot be empty!");
      return;
    }
    const newTask = { no: count.current++, text: taskText, display: "" };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todos_count", count.current);
    inputRef.current.value = "";
  };

  useEffect(() => {
    // Load saved todos and count from localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedCount = parseInt(localStorage.getItem("todos_count"), 10) || 0;
    setTodos(savedTodos);
    count.current = savedCount;
  }, []);

  useEffect(() => {
    
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">Todo-List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your Task"
          className="todoinput"
        />
        <div onClick={add} className="addbtn">
          ADD
        </div>
      </div>
      <div className="todolist">
        {todos.map((item) => (
          <Todoitems
            key={item.no}
            settodos={setTodos}
            no={item.no}
            display={item.display}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
