const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a todo
app.post("/createTodo", async (req, res) => {
  //await
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, inst_time) VALUES($1, TO_CHAR(NOW(), 'YYYYMMDDHH24MISS')) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//get all todos
app.get("/getTodo", async (req, res) => {
  //await
  try {
    const todoList = await pool.query(
      "SELECT todo_id, description, done_yn FROM todo ORDER BY todo_id"
    );
    res.json(todoList.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//get a todo
app.get("/getTodo/:id", async (req, res) => {
  //await
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//update a todo
app.put("/updateTodo/:id", async (req, res) => {
  //await
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, updt_time = TO_CHAR(NOW(), 'YYYYMMDDHH24MISS') WHERE todo_id = $2",
      [description, id]
    );
    res.json("todo was updated.");
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//delete a todo
app.delete("/deleteTodo/:id", async (req, res) => {
  //await
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted.");
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//update todo to done
app.post("/checkTodo/:id", async (req, res) => {
  //await
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query(
      "UPDATE todo SET done_yn = CASE WHEN done_yn = '1' THEN '0' ELSE '1' END, updt_time = TO_CHAR(NOW(), 'YYYYMMDDHH24MISS')  WHERE todo_id = $1",
      [id]
    );
    res.json("todo was UPDATED.");
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

app.get("/getDones", async (req, res) => {
  try {
    const doneList = await pool.query(
      "SELECT todo_id, description, done_yn FROM todo WHERE done_yn IS NOT NULL AND done_yn = '1' ORDER BY todo_id"
    );
    res.json(doneList.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000.");
});
