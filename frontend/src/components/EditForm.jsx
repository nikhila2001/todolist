import { useState } from "react";


function EditForm({task, onUpdate, onCancel}) {


    const[title, setTitle] = useState(task.title);
    const [status, setStatus] = useState(task.status);
    const [deadline, setDeadline] = useState(task.deadline);

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("task",task);
    onUpdate({...task, title, status, deadline});
    };


    return(
<>

    <form onSubmit={handleSubmit}>
    <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
              Status
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="inputDeadline" className="col-sm-2 col-form-label">
              Deadline
            </label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="inputDeadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
      <button type="submit" onClick={onUpdate}  data-bs-dismiss="modal" >Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
</>
    )
}

export default EditForm;