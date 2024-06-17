import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhotoUpload from "../PhotoUpload"; // Import UploadPhotoDialog
import "./styles.css";

function TopBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const getAppContext = () => {
    const pathname = location.pathname;

    if (pathname === "/users") {
      return "User List";
    } else if (pathname.startsWith("/users/")) {
      const userId = pathname.split("/")[2];
      return `User detail ${userId}`;
    } else if (pathname.startsWith("/photos/")) {
      const userId = pathname.split("/")[2];
      return `Photo Of  ${userId}`;
    } else {
      return "";
    }
  };

  function logOut() {
    setUser(null);
    navigate("/");
  }
  console.log(user);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          <Link to="/" style={{ padding: 5, textDecoration: "none" }}>
            PhotoShare
          </Link>
        </Typography>
        <Typography variant="h6" color="inherit" style={{ marginLeft: "20px" }}>
          {user ? `Hi ${user.username}` : "Please Login"}
        </Typography>
        <Typography variant="h6" color="inherit" style={{ marginLeft: "auto" }}>
          {getAppContext()}
        </Typography>

        <nav style={{ margin: 10 }}>
          <span> | </span>
          {user && (
            <Link
              to="/myprofile"
              style={{ padding: 5, textDecoration: "none" }}
            >
              My profile
            </Link>
          )}
          {!user && (
            <Link to="/login" style={{ padding: 5 }}>
              Login
            </Link>
          )}
          <span> | </span>
          {user && (
            <>
              {/* <Button
                onClick={handleUploadDialogOpen}
                color="inherit"
                style={{ padding: 5 }}
              >
                Upload Photo
              </Button> */}
              <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
                Logout
              </span>
            </>
          )}
        </nav>
      </Toolbar>
      {/* {user && (
        <PhotoUpload
          userId={user._id} // Pass user ID
          open={uploadDialogOpen}
          handleClose={handleUploadDialogClose}
          updateAll={() => {}} // Provide the updateAll function if needed
          history={navigate} // Provide the navigate function as history
        />
      )} */}
    </AppBar>
  );
}

export default TopBar;
