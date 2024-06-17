import "./App.css";

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
const App = (props) => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
