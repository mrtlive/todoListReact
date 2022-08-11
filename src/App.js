import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { toBeDisabled } from "@testing-library/jest-dom/dist/matchers";
function App() {
  const [message, setMessage] = useState("");
  const [filtered, setFiltered] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const [todos, setTodos] = useState([
    { id: uuidv4(), title: "Learn React", status: "completed" },
  ]);

  const addTodo = (title) => {
    setTodos([...todos, { id: uuidv4(), title, status: "active" }]);
    console.log(filtered);
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const deleteAll = () => {
    setTodos([]);
  };
  const updateTodo = (id, title) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      })
    );
    console.log(todos);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "completed" ? "active" : "completed",
            }
          : todo
      )
    );
  };
  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addTodo(message);
                  setMessage("");
                  e.preventDefault();
                }
              }}
              onChange={handleChange}
              value={message}
            />
          </form>
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos
              .filter((todo) => todo.status.includes(filtered))
              .map((todo) => (
                <li className={todo.status} key={todo.id}>
                  <input
                    className="toggle"
                    type="checkbox"
                    defaultChecked={todo.status === "completed"}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label>
                    <input
                      type="text"
                      className="labelinput"
                      defaultValue={todo.title}
                      onChange={(e) => {
                        updateTodo(todo.id, e.target.value);
                      }}
                    />
                  </label>

                  <button
                    className="destroy"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </li>
              ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.length} </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                onClick={() => setFiltered("")}
                className={filtered === "" ? "selected" : ""}
              >
                All
              </a>
            </li>
            <li>
              <a
                className={filtered === "active" ? "selected" : ""}
                onClick={() => setFiltered("active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                className={filtered === "completed" ? "selected" : ""}
                onClick={() => setFiltered("completed")}
              >
                Completed
              </a>
            </li>
          </ul>
          <button onClick={() => deleteAll()} className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
        <p style={{ color: "black" }}>
          Remake by <a href="http://instagram.com/mrtlive">mrtlive</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
