import { Link } from "react-router-dom";

function ShowTodo({todo,error}) {

  console.log("Showtodo",todo);
  if(!error){
    return <>
    <section className="container">
     <section className="todos">
       <h1>What todo ?</h1>
       <Link to="/create-todo" className="addTodoLink">
        <button className="addTodoBtn">Add Todo</button>
       </Link>
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