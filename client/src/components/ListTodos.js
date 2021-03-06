import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
//useEffect :
const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const body = {};
      const response = await fetch("http://localhost:5000/getTodo");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (todo_id) => {
    try {
      try {
        const body = { id: todo_id };
        const response = await fetch(
          `http://localhost:5000/deleteTodo/${todo_id}`,
          {
            method: "DELETE",
          }
        );
        setTodos(todos.filter((todo) => todo.todo_id !== todo_id));
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;