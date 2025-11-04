import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  //  Use environment variable for backend URL
  const backendURL = import.meta.env.VITE_API_BASE_URL;

  //  Test backend connection once on app load
  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await axios.get(backendURL);
        console.log(" Backend connection successful:", res.data);
      } catch (err) {
        console.error("Backend connection failed:", err);
      }
    };

    testConnection();
  }, [backendURL]);

  //  Load user from localStorage on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  //  Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Nav user={user} setUser={setUser} />
      <Routes>
        {/*  Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute user={user}>
              <Profile user={user} />
            </PrivateRoute>
          }
        />

        {/*  Public routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

