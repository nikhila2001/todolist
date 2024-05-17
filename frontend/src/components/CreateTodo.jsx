import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";



function CreateTodo() {

const [addTodo, setAddTodo] = useState({title:"", status:""});
const [error,setError] = useState(null);

    function handleChange(e) {
        setAddTodo((addTodo) => ({...addTodo, [e.target.name]:e.target.value}))

    }
    
    


     async  function handleSubmit(e) {
        e.preventDefault();
        const todo = {
            title: addTodo.title,
            status: addTodo.status,
        }
        console.log("todo",todo);
        try {
            const result = await axios.post("http://localhost:8000/api/todos", addTodo);
            setAddTodo({title:"", status:""})
            console.log(result.message);
        } catch(err) {
          setError("faile to add todo", err.message)
        }
  
    }

    return (
        <>
        <section className="container">
            <a href="/" className="back-btn">
                <button type="button" className="">Back</button>
            </a>
            <section className="contents">
                <form onSubmit={handleSubmit} className="form-container">
                    <label htmlFor="title" >
                        Task Name
                    </label>
                    <input type="text" name="title" id="title" value={addTodo.title} onChange={handleChange}/>
                    <label htmlFor="status" className="label">task status</label>
                    <input type="text" name="status" id="status" value={addTodo.status} onChange={handleChange}/>
                    <button type="submit" className="">Add Todo</button>
                </form>
            </section>
        </section>
        </>
    )
}

export default CreateTodo;