import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import CreateTodo from "./components/CreateTodo";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';
import todoState from "./context/todos/TodoState";
import Navbar from "./components/Navbar";

function App() {
  
  return (
    <>
      <div className="App">
        <todoState >
        <BrowserRouter>
        <Navbar />
         <Routes>

          <Route
            exact
            path="/"
            element={<Home />}
          ></Route>
          <Route
            path="/create-todo"
            element={<CreateTodo  />}
          ></Route>
        </Routes> 
      </BrowserRouter>
        </todoState>
      
        {/* <Login />
       <Register /> */}
      </div>
    </>
  );
}

export default App;
