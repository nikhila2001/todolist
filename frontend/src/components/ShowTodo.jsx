import { useState, useEffect } from "react";
import axios from "axios";

function ShowTodo() {
  const [todo, setTodo] = useState([]);
  const [error,setError] = useState(null);

  let result;
  useEffect(() => {
    async function fetchTodoItems() {
      try {
        result = await axios.get("http://localhost:8000/api/todos")
        console.log(result.data);
        setTodo(result.data)
      } catch(err) {
        setError("Failed to Fetch todo items ", + err.message)
        
      }

    }
    fetchTodoItems()
  }, [])
  console.log("todo",todo);
  if(!error){
    return <>
    <section className="container">
     <section className="todos">
       <h1>What todo ?</h1>
       <ul className="list-container">
         {todo.map((data) => (
           <li key={data._id}>
           <div className="task">
             <h3 className="task-title">{data.title}</h3>
             <p className="task-status">{data.status}</p>
           </div>
   
           <div className="action-btns">
             <button className="edit-btn">Edit</button>
             <button className="del-btn">Del</button>
           </div>
           </li>
         ))}
       </ul>
     </section>
    </section>
     </>;
  } else {
    return error;
  }
  
}

export default ShowTodo;