function TodoLists({  title,
    status,
    deadline,
    updateTodo,
    deleteTodo,
    id,}) {
    
    return (
        <tbody>
        <tr>
        
          <td>{title}</td>
          <td>{status}</td>
          <td>{deadline}</td>
          <td><button onClick={updateTodo}>edit</button></td>
          <td><button onClick={deleteTodo}>delete</button></td>

        </tr>
    
      </tbody>
    
    )
}

export default TodoLists;