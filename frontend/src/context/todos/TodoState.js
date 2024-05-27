import React, { Children } from 'react';
import todoContext from './todoContext';
import { useState } from 'react';
import axios from 'axios';


const host = "http://localhost:4000/api";
const config = {
  headers:{
    "Content-Type":"application/json",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzNGIyMjMxMzhiYTE1MzA1OTY1MTkiLCJpYXQiOjE3MTY3ODY4MjUsImV4cCI6MTcxNzM5MTYyNX0.ZYem6DQHgvTBidXBCG9H60Eye6i0fyIwyWjin0Tr_f4"
  }
}

// get todo api call
const getTodos = async () => {
  try {
    const response = await axios.get(`${host}/todos/`, config);
    console.log("todos",response);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}



const TodoState = (props) => {

  const [todos, setTodos] = useState([]);

  return (
    <todoContext.Provider value={getTodos}>
        {props.Children}
    </todoContext.Provider>
  )
}

export {TodoState, getTodos}