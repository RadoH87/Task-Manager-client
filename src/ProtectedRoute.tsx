import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props: any) => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    return <Navigate to="/login" />;
  }
  return props.children;
};
