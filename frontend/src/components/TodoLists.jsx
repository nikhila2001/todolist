// TodoLists.jsx
import React from "react";

function TodoLists({ todos, updateTodo, deleteTodo , deadline}) {
   // Convert deadline to a Date object
   const deadlineDate = new Date(deadline);
   // Check if deadlineDate is valid
   const formattedDeadline = deadlineDate instanceof Date && !isNaN(deadlineDate) ? deadlineDate.toLocaleDateString() : "Invalid Date";
  return (
    <>
      {todos.map((task) => (
        <tr key={task._id}>
          <td>{task.title}</td>
          <td>{task.status}</td>
          <td>{formattedDeadline}</td>
          <td>
            <button className="btn btn-sm btn-primary me-2" onClick={() => updateTodo(task._id)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(task._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TodoLists;
