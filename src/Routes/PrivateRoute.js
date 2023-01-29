import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AuthContext } from "../Context/AuthProvider";
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (token && user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
