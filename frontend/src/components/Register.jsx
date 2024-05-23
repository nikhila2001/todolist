import { useState } from "react";
import axios from "axios";


function Register() {
const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function handleSubmit(e) {
  e.preventDefault();
  try {
    if(username && email && password) {
        const response = await axios.post(
            "http://localhost:8000/api/user/register",
            { username, email,password}
           
          );
        console.log(response);
    }

  } catch (err) {
    alert("invalid input")
  }
}


    return(
        <>
      <form action="" className="d-flex flex-column form-container p-md-5" onSubmit={handleSubmit}>
          {/* USERNAME */}
          <label htmlFor="username" className="mt-md-2">Name</label>
          <input 
          className="p-md-1" 
          type="text" 
          id="username" 
          value={username} 
          name="username" 
          onChange={(e) => setUsername( e.target.value)}
          placeholder="Enter your name" required/>

        {/* USER EMAIL */}
        <label htmlFor="useremail" id="useremail" className="mt-md-2">Email</label>
        <input 
        className="p-md-1" 
        type="email" 
        id="useremail" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@gmail.com" required/>

        {/* USER PASSWORD */}
        <label htmlFor="password" className="mt-md-2">Password</label>
        <input 
        className="p-md-1"
        type="password" 
        id="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        name="password" required/> 

        <button type="submit">Sign Up</button>  

        <a href="#" className="d-flex">new user?</a> 
        </form>   
        </>
    )
}
export default Register;