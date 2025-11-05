// src/components/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !passWord) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, passWord }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          username: data.user.userName,
          email: data.user.email,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            username: data.user.userName,
            email: data.user.email,
          })
        );
        navigate("/");
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Marquee added here for a scrolling message */}
      <marquee
        style={{
          color: "#FFD700", // Gold-like color, matching your screenshot
          backgroundColor: "#333", // Dark background for contrast
          padding: "5px 0",
          fontSize: "16px",
          fontWeight: "bold",
          borderTop: "1px solid #FFD700",
          borderBottom: "1px solid #FFD700",
        }}
        behavior="scroll"
        direction="left"
        scrollamount="5"
      >
        🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters and start reserving your tickets today! 🎬
      </marquee>

      <h2>Customer Login</h2> 
      {/* I changed 'Login' to 'Customer Login' to better match the image, feel free to revert if you prefer the old one */}
      <form onSubmit={handleLogin} style={{ maxWidth: "300px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: "5px", padding: "8px", cursor: "pointer" }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" style={{ padding: "8px 15px" }}>
          Log In
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {/* Added link to sign up to match your screenshot */}
      <p style={{ marginTop: '15px' }}>
          <a href="#" onClick={() => navigate("/signup")} style={{ color: '#FFD700', textDecoration: 'underline' }}>Need an account? Sign Up!</a>
      </p>
    </div>
  );
}

export default Login;