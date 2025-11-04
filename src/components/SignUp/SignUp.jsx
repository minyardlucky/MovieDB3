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
    // Position relative to the center of the main container
    top: `calc(50% + ${y}px)`,
    left: `calc(50% + ${x}px)`,
    // Center the reel icon perfectly
    transform: 'translate(-50%, -50%)', 
    fontSize: '32px', // Increased size for visibility
    color: '#9370DB', // Medium Purple color
    zIndex: 1, // Keep reels behind the form
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
    // 1. Full-page container for centering, relative positioning, and circle spacing
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", 
        // IMPORTANT FIX: Added large padding to prevent the absolutely positioned reels
        // from being cut off by the container's edges.
        padding: "300px", 
        position: "relative",
      }}
    >
      
      {/* 2. Form Container */}
      <div
        style={{
          backgroundColor: 'white', // Changed to white for better contrast
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          maxWidth: '350px',
          width: '100%',
          zIndex: 2, // Keep the form in front of the reels
        }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <div style={{ display: "flex" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px 0 0 5px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  marginLeft: "0px", 
                  padding: "10px 15px", 
                  cursor: "pointer", 
                  backgroundColor: '#4CAF50', // Green button
                  color: 'white',
                  border: 'none',
                  borderRadius: "0 5px 5px 0"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            style={{ 
              padding: "12px 15px", 
              width: "100%", 
              backgroundColor: '#007BFF', // Blue submit button
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      </div>
      
      {/* 3. Movie Reel Icons (🎞️) */}
      {[...Array(NUM_REELS)].map((_, index) => (
        <div key={index} style={getReelStyle(index)}>
          🎞️
        </div>
      ))}
      
    </div>
  );
}

export default SignUp;
