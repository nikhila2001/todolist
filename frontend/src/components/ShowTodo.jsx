import { Link } from "react-router-dom";

function ShowTodo({ todo, error }) {
  console.log("Showtodo", todo);

  if (!error) {
    return (
      <>
        <section className="todo-container p-md-4 d-flex">
          <section className="todos w-100">
            <div className="d-flex justify-content-between mb-4">
            <h1 className="mb-0">What todo ?</h1>
            <Link to="/create-todo" className="addTodoLink my-auto">
              <button className="addTodoBtn">Add Todo</button>
            </Link>
            </div>
          
              {todo.map((data) => (
                <ul className="ps-0">
                  <li key={data._id} className="d-flex justify-content-between ">
                  <div className="task d-flex ">
                    <p className="task-title mb-0">{data.title} :</p>
                    <p className="task-status mb-0 flex-grow-1">&nbsp;{data.status}</p>
                    <small>{data.date}</small>
                  </div>

                  <div className="action-btns d-flex ">
                    {console.log("id - ", data._id)}
                    <button
                      name={data._id}
                      className="edit-btn me-3"
                    >
                      Edit
                    </button>
                    <button
                      name={data._id}
                      className="del-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
                <hr />
                </ul>
           
              ))}
          </section>
        </section>
      </>
    );
  } else {
    return error;
  }
}

export default ShowTodo;
