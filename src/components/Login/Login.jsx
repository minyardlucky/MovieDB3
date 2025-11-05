import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pulseBorderKeyframes = `
  @keyframes pulseYellowBorder {
    0% { border-color: #FFD700; box-shadow: 0 0 5px #FFD700; }
    50% { border-color: rgba(255, 215, 0, 0.4); box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
    100% { border-color: #FFD700; box-shadow: 0 0 5px #FFD700; }
  }
`;

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
    <div style={{ width: "100%", padding: 0 }}>
      <style>{pulseBorderKeyframes}</style>
      <style>{sweepSearchlightKeyframes}</style>

      {/* ✅ FIXED MARQUEE WRAPPER ABOVE EVERYTHING */}
      <div
        style={{
          position: "fixed",
          top: "66px",
          width: "100%",
          zIndex: 10, // ensures it’s above background and login card
        }}
      >
        <marquee
          style={{
            color: "#FFD700",
            backgroundColor: "#333",
            padding: "20px 0",
            fontSize: "40px",
            fontWeight: "bold",
            border: "6px solid #FFD700",
            animation: "pulseYellowBorder 2s infinite alternate",
          }}
          behavior="scroll"
          direction="left"
          scrollamount="10"
        >
          🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters
          Information or SignUp and start viewing movie information today! 🎬 🌟
          Welcome to Lucky's Movie Center! Log in to view the latest blockbusters
          Information or Sign Up and start viewing movie information today! 🎬 🌟
          Welcome to Lucky's Movie Center! Log in to view the latest blockbusters
          Information or Sign Up and start viewing movie information today! 🎬
        </marquee>
      </div>

      {/* 🔦 SEARCHLIGHT BACKGROUND */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          paddingTop: "60px",
          zIndex: 1, // background layer
          background: "radial-gradient(circle 500px at 50% 50%, #FFD700, #001f4d)",
          backgroundSize: "200% 200%",
          animation: "sweepSearchlight 15s infinite ease-in-out alternate",
        }}
      >
        {/* LOGIN CARD */}
        
<div
  style={{
    backgroundColor: "rgba(0, 0, 0, 0.7)", // semi-transparent dark background
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
    zIndex: 2,
    color: "white", // text color inside card
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
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #FFD700",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "white", // ✅ text color
        }}
      />
    </div>

    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
      <div style={{ display: "flex" }}>
        <input
          type={showPassword ? "text" : "password"}
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #FFD700",
            borderRadius: "4px 0 0 4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white", // ✅ text color
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor: "#FFD700",
            color: "#333",
            border: "none",
            borderRadius: "0 4px 4px 0",
            fontWeight: "bold",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>

    <button
      type="submit"
      style={{
        padding: "10px 15px",
        width: "100%",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Log In
    </button>
  </form>

  {error && <p style={{ color: "#FFD700", marginTop: "15px" }}>{error}</p>}

  <p style={{ marginTop: "15px", textAlign: "center" }}>
    <a
      href="#"
      onClick={() => navigate("/signup")}
      style={{ color: "#FFD700", textDecoration: "underline" }}
    >
      Need an account? Sign Up!
    </a>
  </p>
</div>

      </div>
    </div>
  );
}

export default Login;
