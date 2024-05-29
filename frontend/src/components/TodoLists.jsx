// TodoLists.jsx
import React from "react";

function TodoLists({ todos, deadline ,deleteTodo}) {
  const formattedDeadline = new Date(deadline).toLocaleDateString() || "Invalid Date";

  return (
    <>
      {todos.map((todo) => (
        <tr key={todo._id}>
          <td>{todo.title}</td>
          <td>{todo.status}</td>
          <td>{formattedDeadline}</td>
          <td>
            <button className="border-0 px-2 btn btn-danger text-light " onClick={(() => deleteTodo(todo._id))}>Delete</button>
          </td>
        
        </tr>
      ))}
    </>
  );
}

export default TodoLists;