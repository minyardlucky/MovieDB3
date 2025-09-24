// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  return children; // Logged in → render the page
};

export default PrivateRoute;