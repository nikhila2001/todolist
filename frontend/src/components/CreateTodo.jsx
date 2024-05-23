import axios from "axios";
import { useState } from "react";

function CreateTodo({ fetchTodoItems }) {
  const [addTodo, setAddTodo] = useState({ title: "", status: "" });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setAddTodo((addTodo) => ({ ...addTodo, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      title: addTodo.title,
      status: addTodo.status,
    };
    console.log("todo", todo);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/todos",
        addTodo
      );
      setAddTodo({ title: "", status: "" });
      fetchTodoItems();
      console.log(result.message);
    } catch (err) {
      setError("faile to add todo", err.message);
    }
  }

  return (
    <>
      <section className="todo-container p-md-4">
        <a href="/" className="back-btn">
          <button type="button" className="mb-3">
            Back
          </button>
        </a>
        <section className="contents ">
          <form onSubmit={handleSubmit} className="form-container d-flex flex-column">
            <label htmlFor="title">Task Name</label>
            <input
              type="text"
              name="title"
              id="title"
              value={addTodo.title}
              onChange={handleChange}
              className="mb-3 p-1"
              placeholder="Enter task name here"
            />
            <label htmlFor="status" className="label">
              task status
            </label>
            <input
              type="text"
              name="status"
              id="status"
              value={addTodo.status}
              onChange={handleChange}
              className="mb-3 p-1"
              placeholder="Enter task status here"
            />
            <button type="submit" className="mt-5" onClick={handleSubmit}>
              Add Todo
            </button>
          </form>
        </section>
      </section>
    </>
  );
}

export default CreateTodo;
