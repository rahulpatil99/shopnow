// src/components/PrivateRoute.js

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
