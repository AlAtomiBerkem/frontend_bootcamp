import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(localStorage);
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
