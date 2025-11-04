// src/components/SignUp/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants for the circle effect
const NUM_REELS = 8; // Number of movie reels
const RADIUS = 200; // Radius of the circle (in pixels)

// Function to calculate position on a circle
const getReelStyle = (index) => {
  const angle = (index / NUM_REELS) * 2 * Math.PI; // Angle for the current reel
  const x = RADIUS * Math.cos(angle);
  const y = RADIUS * Math.sin(angle);
  
  return {
    position: 'absolute',
    top: `calc(50% + ${y}px)`,
    left: `calc(50% + ${x}px)`,
    transform: 'translate(-50%, -50%)', // Center the reel icon
    fontSize: '24px', // Size of the reel icon
    color: '#FFD700', // Gold color for movie reel
    zIndex: 1, // Keep reels behind the form for a nice effect
  };
};

function SignUp({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !userName || !passWord || !email) {
      setError("All fields are required.");
      return;
    }

    try {
      console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, userName, email, passWord }),
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
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    // 1. Full-page container for centering and relative positioning
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensures it takes up full viewport height
        padding: "20px",
        position: "relative", // Crucial for positioning the reels absolutely
      }}
    >
      
      {/* 2. Container for the form to apply a style */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '350px',
          width: '100%',
          zIndex: 2, // Keep the form in front of the reels
        }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} style={{}}>
          <div style={{ marginBottom: "10px" }}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
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
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" style={{ padding: "8px 15px", width: "100%" }}>
            Sign Up
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
      
      {/* 3. Movie Reel Icons (using 🎬 emoji) */}
      {[...Array(NUM_REELS)].map((_, index) => (
        <div key={index} style={getReelStyle(index)}>
          🎬
        </div>
      ))}
      
    </div>
  );
}

export default SignUp;
