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
    // Inject the CSS Keyframes for the pulsing border
    <div style={{ width: "100%", padding: "0" }}>
      <style>{pulseBorderKeyframes}</style>
      
      {/* 1. MARQUEE ELEMENT (Full-Width, Pulsing Border, Taller Height) */}
      <marquee
        style={{
          color: "#FFD700",
          backgroundColor: "#333",
          padding: "20px 0",
          fontSize: "20px",
          fontWeight: "bold",
          border: "6px solid #FFD700",
          animation: "pulseYellowBorder 2s infinite alternate",
        }}
        behavior="scroll"
        direction="left"
        scrollamount="5"
      >
        🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or SignUp and start viewing movie information today! 🎬 🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or Sign Up and start viewing movie information today! 🎬 🌟 Welcome to Lucky's Movie Center! Log in to view the latest blockbusters Information or Sign Up and start viewing movie information today! 🎬
      </marquee>

      {/* 2. FIXED CINEMA BACKGROUND CONTAINER */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 60px)", // Fixed height cleared for nav bar
          width: "100%",
          position: 'fixed', 
          top: '60px', // Starts 60px below the fixed navbar
          left: 0,
          zIndex: 1, // Sits below the navbar (which should have zIndex > 1)
          // New Cinema Background Color
          backgroundColor: '#001f4d', 
        }}
      >
        {/* 3. CENTERED LOGIN CARD */}
        <div
          style={{
            maxWidth: "350px",
            width: "90%",
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "rgba(30, 30, 30, 0.95)", // Dark semi-transparent card
            boxShadow: "0 4px 20px rgba(255, 215, 0, 0.2)", // Subtle gold glow
            color: "white",
            border: '1px solid #FFD70055' // Subtle gold border
          }}
        >
          <h2 style={{ color: "#FFD700", marginBottom: "20px", textAlign: "center" }}>Customer Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Username Field */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ width: "100%", padding: "10px", backgroundColor: '#2a2a2a', border: "1px solid #555", borderRadius: "5px", color: 'white' }}
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#FFD700' }}>Password</label>
              <div style={{ display: "flex" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={passWord}
                  onChange={(e) => setPassWord(e.target.value)}
                  style={{ flex: 1, padding: "10px", backgroundColor: '#2a2a2a', border: "1px solid #555", borderRadius: "5px 0 0 5px", color: 'white' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    padding: "10px 15px", 
                    cursor: "pointer", 
                    backgroundColor: showPassword ? "#FFD700" : "#555", 
                    color: showPassword ? "#333" : "white",
                    border: "none",
                    borderRadius: "0 5px 5px 0",
                    fontWeight: 'bold'
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              type="submit" 
              style={{ 
                padding: "12px 15px", 
                backgroundColor: "#FFD700", 
                color: "#333", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer", 
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Log In
            </button>
          </form>

          {/* Error Message */}
          {error && <p style={{ color: "#ff4d4d", marginTop: "15px", textAlign: "center" }}>{error}</p>}
          
          {/* Sign Up Link */}
          <p style={{ marginTop: '20px', textAlign: "center" }}>
              <a 
                href="#" 
                onClick={() => navigate("/signup")} 
                style={{ color: '#FFD700', textDecoration: 'underline' }}
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