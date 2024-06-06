import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import { toast } from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();

  const { setIsAuth } = useContext(AppContext);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


  const handleLogout = () => {
    // setIsAuth(false);
    console.log("user logged out");
    // Clear JWT token from local storage upon logout
    localStorage.clear();
    toast.success("Logged out successfully");

    // Redirect user to login page or any other page after logout
    console.log("user logged out");

    navigate("/login");
    setIsAuth(false);
  };

   // Open the confirmation dialog when delete is clicked
   const handleLogoutConfirmation = () => {
    setOpenConfirmDialog(true); 
  };

  const handleConfirmLogout =  () => {
    try {
      // logout user
      handleLogout();
      setOpenConfirmDialog(false);
    } catch (error) {
      console.log("Error logging out", error.message);
      toast.error("Failed to logout");
    }
  };
 
  // handle cancel logout dailog
  const handleCancelLogout = () => {
    setOpenConfirmDialog(false);
  }
  return (
    <>

    <button type="btn" className="border-0 btn p-0 text-primary " onClick={handleLogoutConfirmation}>
      Logout
    </button>
    {/* Dailog box for confirming logout user */}
    <Dialog
    open={openConfirmDialog}
    onClose={handleCancelLogout}
    aria-labelledby="alert-dailog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        Confirm Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dailog-description">
        Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelLogout}>Cancel</Button>
        <Button onClick={handleConfirmLogout}>Yes</Button>
      </DialogActions>

    </Dialog>

  
    </>
   
  );
};
export default Logout;
