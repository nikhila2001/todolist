




function Login() {

    return (
        <>
        <section className="">
        <form action="" className="d-flex flex-column form-container p-md-5">
          {/* USERNAME */}
          <label htmlFor="username" className="mt-md-2">Name</label>
          <input className="p-md-1" type="text" id="username" name="username" placeholder="Enter your name" required/>
        {/* USER EMAIL */}
        <label htmlFor="useremail" id="useremail" className="mt-md-2">Email</label>
        <input className="p-md-1" type="email" id="useremail" placeholder="example@gmail.com" required/>
        {/* USER PASSWORD */}
        <label htmlFor="password" className="mt-md-2">Password</label>
        <input className="p-md-1" type="password" id="password" name="password" required/>   
        <a href="" className="d-flex">new user?</a> 
        </form>   
        
        </section>
    
        </>
    )
}

export default Login;