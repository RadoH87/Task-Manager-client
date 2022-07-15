import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActiveTasks } from "./pages/ActiveTasks";
import { CompletedTasks } from "./pages/CompletedTasks";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { UsersPage } from "./pages/UsersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./ProtectedRoute";

export const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          autoClose={3000}
          position={"top-center"}
          hideProgressBar={true}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route
            path="/active"
            element={
              <ProtectedRoute>
                <ActiveTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoute>
                <CompletedTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* Default Page Active Tasks */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ActiveTasks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
