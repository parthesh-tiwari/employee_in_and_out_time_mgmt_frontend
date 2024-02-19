import { useState, useEffect } from "react";

import { useAuthContext } from "../contexts/authContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import ProfilePage from "../pages/ProfilePage";

import Header from "../components/Header";
import EmployeeEntries from "../pages/EmployeeEntries";

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  const authContext = useAuthContext();
  const { verifyAuth, user } = authContext;

  useEffect(() => {
    const fetchAuth = () => {
      const auth = verifyAuth();
      setAuth(auth ? true : false);
      setLoading(false);
    };
    fetchAuth();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    <BrowserRouter>
      {user && <Header />}
      <div className="m-4">
        <Routes>
          <Route
            path="/sign-up"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/user"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />

          <Route
            path="/employee-entries/:id"
            element={user ? <EmployeeEntries /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default AppRoutes;
