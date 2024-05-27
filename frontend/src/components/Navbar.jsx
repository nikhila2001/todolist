import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
  console.log(location);
  }, [location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">what todo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className={`nav-link ${location.pathname === "/Home" ? "active" : " "}`} aria-current="page" href="#">Home</Link>
        <Link className={`nav-link ${location.pathname === "/Features" ? "active" : " "}`} href="#">Features</Link>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
