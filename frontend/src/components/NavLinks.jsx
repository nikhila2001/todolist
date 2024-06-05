import { Link } from "react-router-dom";
import Profile from "../Pages/Profile";
import { AppContext } from "./AppContextProvider";
import { useContext, useState } from "react";

function NavLinks() {
  const { isAuth } = useContext(AppContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileDropdownToggle = () => {
    setIsProfileDropdownOpen(true)
  } 

  return (
    <nav
      className="navbar navbar-expand-lg  border-bottom border-body"
      
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="#">
          What to do?
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            {isAuth ? (
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            ) : (
              ""
            )}

            {!isAuth ? (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            ) : (
              ""
            )}

            <Link className="nav-link" to="/Register">
              Register
            </Link>
            {/* Dropdown for profile component */}
            {isAuth && localStorage.getItem("token") ? (
              <div className="dropdown profile-link" >
                <Link
                  className="nav-link dropdown-toggle "
                  to="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={handleProfileDropdownToggle}
                  aria-expanded={isProfileDropdownOpen}
                >
                  Profile
                </Link>
                <ul
                  className={`dropdown-menu p-3 profile-width ${isProfileDropdownOpen ? 'show' : ""}`}
                  aria-labelledby="profileDropdown"
                >
                  <Profile toggleDropdown={setIsProfileDropdownOpen}/>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavLinks;
