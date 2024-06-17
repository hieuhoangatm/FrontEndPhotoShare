import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../LoginForm";
import MyProfile from "../MyProfile";
import ProtectedRoute from "../ProtectedRoute";
import NoMatch from "../NoMatch";
import TopBar from "../TopBar";
import UserDetail from "../UserDetail";
import UserList from "../UserList";
import UserPhotos from "../UserPhotos";
import RegisterForm from "../RegisterForm";
import Home from "../Home";
function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/");
  }

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} setUser={setUser} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">{user && <UserList />}</Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute user={user}>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute user={user}>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute user={user}>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={<LoginForm onLogin={setUser} />}
                />
                

                <Route
                  path="/myprofile"
                  element={
                    <ProtectedRoute user={user}>
                      <MyProfile />
                    </ProtectedRoute>
                  }
                />

                <Route path="/register" element={<RegisterForm />} />
                <Route path="*" element={<NoMatch />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AppLayout;
