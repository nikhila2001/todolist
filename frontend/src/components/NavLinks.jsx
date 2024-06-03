import { Link } from "react-router-dom";
import Profile from "../Pages/Profile";
import { AppContext } from "./AppContextProvider";
import { useContext } from "react";

function NavLinks() {
  const { isAuth } = useContext(AppContext);

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
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
          <div className="navbar-nav" style={{ marginLeft: "70rem" }}>
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
              <div className="dropdown" style={{ width: "10rem" }}>
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </Link>
                <ul
                  className="dropdown-menu p-3 dropdown-menu-dark"
                  aria-labelledby="profileDropdown"
                >
                  <Profile />
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
