// src/components/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Marquee Styles (Injected via <style> tag) ---
const MarqueeStyles = `
  /* Global height fix to center the marquee */
  .center-screen {
    min-height: 100vh;
  }
  
  .marquee {
    position: relative;
    padding: 3rem 2rem;
    border: 12px solid #ffaa00; /* Gold frame border */
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(255, 170, 0, 0.7), 0 0 30px rgba(255, 170, 0, 0.4);
    background: #333333; /* Medium Gray Inside Marquee */
    font-family: 'Georgia', serif; 
    animation: flicker 1s infinite alternate;
    width: 100%;
  }
  
  .marquee::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 8px dashed #ffdd55; /* Inner dashed light effect */
    border-radius: 8px;
    pointer-events: none;
    animation: glow-flicker 2s infinite alternate;
  }
  
  /* Keyframes for a subtle flickering light effect */
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

  /* Text Shadow for 'Neon' Effect */
  .neon-text {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #ffaa00,
      0 0 20px #ffaa00,
      0 0 25px #ffaa00,
      0 0 30px #ffaa00;
  }
  
  /* Custom CSS to enforce form sizing and block display */
  .form-container {
    width: 100% !important; 
    max-width: 380px !important; 
    margin: 2rem auto 0 auto !important;
    padding: 1.5rem !important;
  }
  
  .form-label {
    display: block !important;
    margin-bottom: 0.25rem;
    font-weight: bold;
    color: #facc15; /* yellow-400 */
  }
  
  .form-input {
    width: 100% !important;
  }
`;

/**
 * A styled component rendering a classic theater marquee welcome message.
 * The content related to 'Sign up' has been removed from the welcome text.
 */
function WelcomeMarquee({ children }) {
  return (
    // Inject custom styles needed for the marquee effect
    <>
      <style>{MarqueeStyles}</style>
      
      <div className="flex justify-center items-center center-screen bg-gray-200">
        <div className="marquee max-w-lg md:max-w-xl text-center">
          
          <h1 className="neon-text text-4xl sm:text-5xl font-bold text-yellow-300 tracking-wider mb-6 leading-tight">
            WELCOME TO 
            <br />
            LUCKY'S MOVIE CENTER
          </h1>

          <div className="text-white text-xl sm:text-2xl neon-text font-normal space-y-4 mb-8">
            <p>
              Please log in to view the showtimes.
            </p>
          </div>
          
          {/* Form Content is passed as children */}
          {children}
          
        </div>
      </div>
    </>
  );
}


function Login({ setUser }) {
  // --- Login State (Simplified) ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // --- UI State (Simplified) ---
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Navigation (Restored) ---
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
  
  // --- Render Login Form Only ---
  const renderLoginForm = () => (
    <div className="p-6 bg-gray-700 rounded-lg shadow-xl border border-yellow-500/50 text-white form-container text-left">
      <h3 className="text-yellow-400 text-2xl mb-4 font-bold text-center">
        Customer Login
      </h3>
      
      {/* Success/Error Messages */}
      {success && (
          <p className="p-3 mb-4 rounded bg-green-500 text-white font-bold text-sm">
              {success}
          </p>
      )}
      {error && (
          <p className="p-3 mb-4 rounded bg-red-600 text-white font-bold text-sm">
              {error}
          </p>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 border border-gray-600"
            placeholder="Your Username"
            required
          />
        </div>
        <div className="mb-6">
          <label className="form-label">Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input p-3 rounded-l bg-gray-800 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 border border-gray-600 border-r-0"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-3 bg-gray-600 text-xs text-white font-bold rounded-r hover:bg-gray-500 transition duration-150"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full p-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md">
          LOG IN
        </button>
      </form>
    </div>
  );

  return (
    <WelcomeMarquee>
      {renderLoginForm()}
    </WelcomeMarquee>
  );
}

export default Login;