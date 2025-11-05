import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the keyframes for the pulsing border effect
const pulseBorderKeyframes = `
  @keyframes pulseYellowBorder {
    0% { border-color: #FFD700; box-shadow: 0 0 5px #FFD700; }
    50% { border-color: rgba(255, 215, 0, 0.4); box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
    100% { border-color: #FFD700; box-shadow: 0 0 5px #FFD700; }
  }
`;

// Define keyframes for the sweeping searchlight effect
const sweepSearchlightKeyframes = `
  @keyframes sweepSearchlight {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
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
    // 1. Outer div container (no specific styling, just acts as React Fragment replacement)
    <div style={{ width: "100%", padding: "0" }}>
      
      {/* 2. Inject the Keyframes for both the border pulse and the sweeping searchlight */}
      <style>{pulseBorderKeyframes}</style>
      <style>{sweepSearchlightKeyframes}</style>

      {/* Marquee with Pulsing Border (Layer 3) */}
      <marquee
        style={{
          color: "#FFD700",
          backgroundColor: "#333",
          padding: "20px 0",
          fontSize: "20px",
          fontWeight: "bold",
          border: "6px solid #FFD700", 
          animation: "pulseYellowBorder 2s infinite alternate", // Starts the pulse effect
        }}
        behavior="scroll"
        direction="left"
        scrollamount="8" // Increased speed for long text
      >
        🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or SignUp and start viewing movie information today! 🎬 🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or Sign Up and start viewing movie information today! 🎬 🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or Sign Up and start viewing movie information today! 🎬
      </marquee>

      {/* FIXED BACKGROUND CONTAINER (Layer 1) - Covers page, holds searchlight & form */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center vertically in viewport
          minHeight: "100vh",
          width: "100%",
          position: 'fixed',
          top: 0,
          left: 0,
          paddingTop: '60px', // Clear space for fixed navbar
          zIndex: 1, 
          
          // 💡 MOVING SEARCHLIGHT BACKGROUND
          background: 'radial-gradient(circle 500px at 50% 50%, #FFD700, #001f4d)',
          backgroundSize: '200% 200%', // Allows the gradient to move across a larger area
          animation: 'sweepSearchlight 15s infinite ease-in-out alternate', // Sweep animation
        }}
      >
        {/* LOGIN CARD CONTAINER (Layer 2) - Centered form */}
        <div 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark card
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
            zIndex: 2, // Sits above the background (zIndex: 1)
            color: 'white',
            maxWidth: "350px",
            width: "100%",
          }}
        >
          <h2 style={{ color: "#FFD700", marginBottom: "20px" }}>Customer Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #FFD700", borderRadius: "4px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
              <div style={{ display: "flex" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passWord}
                  onChange={(e) => setPassWord(e.target.value)}
                  style={{ flex: 1, padding: "10px", border: "1px solid #FFD700", borderRadius: "4px 0 0 4px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ padding: "10px 15px", cursor: "pointer", backgroundColor: '#FFD700', color: '#333', border: 'none', borderRadius: "0 4px 4px 0" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              style={{ padding: "10px 15px", width: "100%", backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Log In
            </button>
          </form>
          {error && <p style={{ color: "#FFD700", marginTop: "15px" }}>{error}</p>}
          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            <a href="#" onClick={() => navigate("/signup")} style={{ color: '#FFD700', textDecoration: 'underline' }}>Need an account? Sign Up!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;