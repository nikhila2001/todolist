import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
// import Loader from "../components/Loader";
import Logout from "../components/Logout";
import { fetchUserDetails } from "../utils/userUtils";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const host = "http://localhost:4000/api";

function Profile({ toggleDropdown }) {
  const { isAuth } = useContext(AppContext);
  console.log(isAuth, "isAuth");
  const [userDetails, setUserDetails] = useState({});
  const [editProfile, setEditprofile] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    username: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUserDetails();
        setUserDetails(userData);
      } catch (error) {
        toast.error("Failed to fetch user detais", error.message);
      }
    };
    if (isAuth) {
      getUserDetails();
    }
  }, [isAuth]);

  const handleEditProfile = () => {
    console.log("edit button clicked");
    toggleDropdown(true);
    setEditprofile(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        token: token,
      };
      const response = await axios.post(
        `${host}/user/editUser`,
        updatedDetails,
        { headers }
      );
      toast.success(response.data.message);

      // Fetch updated user details after successful update
      const updatedUserDetails = await fetchUserDetails();
      setUserDetails(updatedUserDetails); // Update userDetails state

      // Clear the edit mode
      setEditprofile(false);
    } catch (error) {
      toast.error("Failed to update profiel", error.message);
    }
  };

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      {isAuth && localStorage.getItem("token") && (
        <>
          {/*user details  */}
          <div className="d-flex justify-content-between">
            <h3 className="text-start">
              <i className="bi bi-person-circle"></i>
            </h3>
            <Logout />
          </div>

          <p className="text-capitalize fw-bold text-start mb-0">
            {userDetails.username}
          </p>
          <p className="custom-color text-start mb-0">
            <small className="mb-0">{userDetails.email}</small>
          </p>
          {updatedDetails ? (
            <>
              <small className="custom-color text-capitalize mb-0">
                <i class="bi bi-geo-alt"></i>&nbsp;{`${userDetails.address}`}
              </small>
              <small className="custom-color d-block">
                <i class="bi bi-telephone"></i>&nbsp;{`${userDetails.phone}`}
              </small>
            </>
          ) : ("")}

          {/* profile edit form */}
          {editProfile ? (
            <>
              <div className="mt-2">
                {/*Name field*/}
                <small>
                  <label htmlFor="username">Name</label>
                </small>
                <input
                  className="w-100"
                  type="text"
                  id="username"
                  value={updatedDetails.username}
                  onChange={(e) =>
                    setUpdatedDetails((prevState) => ({
                      ...prevState,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              {/*Address field*/}
              <div className="">
                <small>
                  <label htmlFor="location">Address</label>
                </small>
                <input
                  className="w-100"
                  type="address"
                  id="location"
                  value={updatedDetails.address}
                  onChange={(e) =>
                    setUpdatedDetails((prevState) => ({
                      ...prevState,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
              {/*phone field*/}
              <div className="">
                <small>
                  {" "}
                  <label htmlFor="phone">Phone</label>
                </small>
                <input
                  className="w-100"
                  type="tel"
                  id="phone"
                  value={updatedDetails.phone}
                  onChange={(e) =>
                    setUpdatedDetails((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              {/*Action buttons */}
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-success px-2 rounded-3 border-0"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger px-2 rounded-3 border-0"
                  onClick={() => setEditprofile(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              className="btn btn-outline-primary w-100 p-0 mt-3"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          )}
        </>
      )}
    </div>
  );
}
export default Profile;
