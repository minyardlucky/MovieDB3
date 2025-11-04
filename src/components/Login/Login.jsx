// src/components/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Marquee Keyframes (MUST BE MOVED TO A GLOBAL CSS FILE for animation to run) ---
// NOTE: Animations and ::before/::after pseudoelements cannot be defined inline in React.
// These keyframes *must* be added to your index.css or App.css file for flickering to work.
// The rest of the styling is applied inline below.
const MarqueeCSS = `
/* Add this block to your main CSS file (e.g., index.css) */
@keyframes flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    box-shadow: 0 0 15px rgba(255, 170, 0, 0.7), 0 0 30px rgba(255, 170, 0, 0.4);
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    box-shadow: 0 0 5px rgba(255, 170, 0, 0.3), 0 0 10px rgba(255, 170, 0, 0.2);
  }
}
@keyframes glow-flicker {
  0% { opacity: 0.95; }
  100% { opacity: 1; }
}
`;

function Login({ setUser }) {
  // --- Login State ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // --- UI State ---
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  
  const API_BASE_URL = typeof import.meta.env.VITE_API_BASE_URL !== 'undefined' 
    ? import.meta.env.VITE_API_BASE_URL 
    : '';

  // --- Helper to save user data ---
  const saveUserDataAndNavigate = (data) => {
    const userData = {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      userName: data.user.userName,
      email: data.user.email,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/"); // Redirect to home
  };

  // --- Login Handler ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, passWord: password }),
      });

      const data = await response.json();

      if (response.ok) {
        saveUserDataAndNavigate(data);
      } else {
        setError(data.message || "Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again later.");
    }
  };
  
  
  const renderLoginForm = () => (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: '380px', 
        margin: '2rem auto 0 auto', 
        padding: '1.5rem',
        background: '#4b5563', // gray-700 equivalent
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #fcd34d' // yellow-500
      }}
    >
      <h3 style={{ color: '#facc15', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
        Customer Login
      </h3>
      
      {/* Success/Error Messages */}
      {success && (
          <p style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.25rem', background: '#10b981', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
              {success}
          </p>
      )}
      {error && (
          <p style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.25rem', background: '#dc2626', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
              {error}
          </p>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: '#facc15' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.25rem', background: '#1f2937', color: 'white', border: '1px solid #4b5563' }}
            placeholder="Your Username"
            required
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold', color: '#facc15' }}>Password</label>
          <div style={{ display: 'flex' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ flexGrow: 1, padding: '0.75rem', border: '1px solid #4b5563', background: '#1f2937', color: 'white', borderRadius: '0.25rem 0 0 0.25rem' }}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ padding: '0.75rem', background: '#4b5563', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '0 0.25rem 0.25rem 0', border: '1px solid #4b5563' }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '0.75rem', background: '#f59e0b', color: '#1f2937', fontWeight: 'bold', borderRadius: '0.5rem', cursor: 'pointer' }}
        >
          LOG IN
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* NOTE: Add MarqueeCSS content to your project's main CSS file (e.g., index.css) */}
      
      {/* Outer container for centering and full screen height */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh', 
          background: '#1f2937' // Dark background for contrast
        }}
      >
        
        {/* Inner marquee container with styling directly applied */}
        <div 
          style={{
            position: 'relative',
            padding: '3rem 2rem',
            border: '12px solid #ffaa00', // Gold frame border
            borderRadius: '10px',
            boxShadow: '0 0 15px rgba(255, 170, 0, 0.7)', // Initial shadow for marquee
            background: '#333333', // Inside Marquee background
            fontFamily: 'Georgia, serif',
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center'
          }}
        >
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#fcd34d', 
            marginBottom: '1.5rem',
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ffaa00, 0 0 20px #ffaa00'
          }}>
            WELCOME TO 
            <br />
            LUCKY'S MOVIE CENTER
          </h1>

          <div style={{ color: 'white', fontSize: '1.25rem', marginBottom: '2rem' }}>
            <p>
              If you are a returning customer, please log in.
            </p>
          </div>
          
          {renderLoginForm()}
        </div>
      </div>
    </>
  );
}

export default Login;