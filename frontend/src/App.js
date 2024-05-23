import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowTodo from "./components/ShowTodo";
import CreateTodo from "./components/CreateTodo";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css'

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState(null);
  const fetchTodoItems = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/todos");
      setTodo(result.data);
    } catch (err) {
      setError("Failed to Fetch todo items: " + err.message);
    }
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  return (
    <>
      <div className="App">
        {/* <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<ShowTodo todo={todo} error={error} />}
            ></Route>
            <Route
              path="/create-todo"
              element={<CreateTodo fetchTodoItems={fetchTodoItems} />}
            ></Route>
          </Routes>
        </BrowserRouter>
        <Login /> */}
       <Register />
      </div>
    </>
  );
}

export default App;
