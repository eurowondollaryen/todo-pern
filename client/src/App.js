import React, { Fragment } from "react";
import "./App.css";

//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import ListDones from "./components/ListDones";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
        <ListDones />
      </div>
    </Fragment>
  );
}

export default App;
