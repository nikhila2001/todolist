import { AppContext } from "../components/AppContextProvider";
import React, { useContext, useEffect, useState } from "react";
// import Loader from "../components/Loader";
import Logout from "../components/Logout";
import { fetchUserDetails } from "../utils/userUtils";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const { isAuth } = useContext(AppContext);
  console.log(isAuth, "isAuth");
  const [userDetails, setUserDetails] = useState({});
  const [editProfile, setEditprofile] = useState(false);

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
    setEditprofile(true);
    
  }

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      {isAuth && localStorage.getItem("token") && (
        <>
        {/*user details  */}
          <h3 className="text-center">
          <i className="bi bi-person-circle"></i>
          </h3>
          <p className="text-capitalize fw-bold text-center mb-0">{userDetails.username}</p>
          <p className="text-center"><small className="text-secondary mb-0">{userDetails.email}</small></p>
          
          <Logout />
          <button className="btn text-primary" onClick={handleEditProfile}>edit</button>
          {/* profile edit form */}
          {editProfile && (
          <>
            <div className="d-flex">
             {/*Name field*/}
          <label htmlFor="username">Name</label>
          <input type="text" id="username" value={userDetails.username}/>
          </div>
           {/*Address field*/}
          <div className="d-flex">
          <label htmlFor="location">Address</label>
          <input type="address" id="location" />
          </div>
             {/*phone field*/}
          <div className="d-flex">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone"/>
          </div>
            {/*Action buttons */}
          <div className="d-flex">
            <button className="btn text-success">Save</button>
            <button className="btn text-danger" onClick={() => setEditprofile(false)}>Cancel</button>
          </div>
          </>
        ) }
          
        </>
      )}
    </div>
  );
}
export default Profile;
