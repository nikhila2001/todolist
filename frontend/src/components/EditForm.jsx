import { useState } from "react";

function EditForm({ task, onUpdate, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [deadline, setDeadline] = useState(task.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("task", task);
    onUpdate({ ...task, title, status, deadline });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10 input-field">
            <input
              type="text"
              className="form-control text-secondary"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row ">
          <label htmlFor="inputStatus" className="col-sm-2 col-form-label">
            Status
          </label>
          <div className="col-sm-10 input-field">
            <input
              type="text"
              className="form-control text-secondary"
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
          <div className="col-sm-10 input-field">
            <input
              type="date"
              className="form-control text-secondary"
              id="inputDeadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className=" btn btn-outline-success"
            type="submit"
            onClick={onUpdate}
            data-bs-dismiss="modal"
          >
            Save Changes
          </button>
          <button
            className=" btn btn-outline-danger"
            data-bs-dismiss="modal"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditForm;
