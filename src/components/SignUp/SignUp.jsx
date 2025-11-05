// src/components/SignUp/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants for the circle effect
const NUM_REELS = 40; 
const RADIUS = 250; // Radius for the movie reel chain

// Function to calculate position on a circle
const getReelStyle = (index) => {
  const angle = (index / NUM_REELS) * 2 * Math.PI; // Angle for the current reel
  const x = RADIUS * Math.cos(angle);
  const y = RADIUS * Math.sin(angle);
  
  return {
    position: 'absolute',
    top: `calc(50% + ${y}px)`,
    left: `calc(50% + ${x}px)`,
    transform: 'translate(-50%, -50%)', 
    fontSize: '28px',
    color: '#FFD700', // Changed color to Gold for contrast!
    zIndex: 3, // Increased zIndex to ensure visibility
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
    // 1. Full-page container for centering. Position: fixed prevents scrolling.
 <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 'calc(100vh - 60px)', // Shrinks the height to fit below the navbar
    width: "100%",
    position: "fixed", 
    top: '60px', // Pushes the container down 60px
    left: 0,
    zIndex: 1, // Ensures the nav bar (zIndex > 1) is clickable
  }}
>
      
      {/* 2. Form Container - Circular */}
      <div
        style={{
          backgroundColor: 'white', 
          padding: '30px',
          borderRadius: '50%', 
          width: '500px', 
          height: '500px', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          zIndex: 2, // Kept at zIndex 2
          textAlign: 'center', 
        }}
      >
        <h2>Sign Up</h2>
        {/* Form content width limited so it fits inside the circle */}
        <form onSubmit={handleSignUp} style={{ width: '80%', maxWidth: '300px' }}> 
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
                  backgroundColor: '#4CAF50', 
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
              backgroundColor: '#007BFF', 
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
      
      {/* 3. Movie Reel Icons (🎞️) - Should now be visible */}
      {[...Array(NUM_REELS)].map((_, index) => (
        <div key={index} style={getReelStyle(index)}>
          🎞️
        </div>
      ))}
      
    </div>
  );
}

export default SignUp;