import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginDetails;
  return userInfo ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
