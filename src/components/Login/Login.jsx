import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the keyframes for the pulsing effect as a string
const pulseBorderKeyframes = `
  @keyframes pulseYellowBorder {
    0% { border-color: #FFD700; box-shadow: 0 0 5px #FFD700; }
    50% { border-color: rgba(255, 215, 0, 0.4); box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
    100% { border-color: #FFD700; box-shadow: 0 0 5px #FFD700; }
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
      // NOTE: Using VITE_API_BASE_URL as provided in the user's snippet
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
    // 1. Outer div set to 100% width to allow the marquee to stretch
    <div style={{ width: "100%", padding: "0" }}>
      
      {/* 2. Inject the Keyframes */}
      <style>{pulseBorderKeyframes}</style>

      {/* Marquee with Pulsing Border */}
      <marquee
        style={{
          color: "#FFD700",
          backgroundColor: "#333",
          // Taller height from your request (15px top/bottom padding)
          padding: "20px 0",
          fontSize: "20px",
          fontWeight: "bold",
          // 3. Applying the flashing border
          border: "6px solid #FFD700", // Increased border thickness slightly (from 2px to 3px)
          animation: "pulseYellowBorder 2s infinite alternate", // Starts the pulse effect
        }}
        behavior="scroll"
        direction="left"
        scrollamount="5"
      >
        {/* Doubled message content from your request */}
        🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or SignUp and start reserving your tickets today! 🎬 🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or Sign Up and start reserving your tickets today! 🎬 🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or Sign Up and start reserving your tickets today! 🎬
      </marquee>

      {/* 4. Inner div restores the padding for the centered form content */}
      <div style={{ padding: "20px" }}> 
        <h2>Customer Login</h2> 
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
        <p style={{ marginTop: '15px' }}>
            <a href="#" onClick={() => navigate("/signup")} style={{ color: '#FFD700', textDecoration: 'underline' }}>Need an account? Sign Up!</a>
        </p>
      </div>
    </div>
  );
}

export default Login;