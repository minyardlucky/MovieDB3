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
    /* Use !important for high specificity against external overrides */
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
              If you are a returning customer, please log in.
            </p>
         git  </div>
          
          {/* Form Content is passed as children */}
          {children}
          
        </div>
      </div>
    </>
  );
}


function Login({ setUser }) {
  // --- State for Login/Signup Forms ---
  const [isLogin, setIsLogin] = useState(true);

  // --- Login State ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // --- UI State ---
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Navigation (Restored) ---
  const navigate = useNavigate();
  
  // Adjusted to avoid the import.meta warning in environments targeting older ES versions
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

  // --- Handlers ---
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!signupUsername || !signupPassword || !signupEmail) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          firstName: signupFirstName,
          lastName: signupLastName,
          userName: signupUsername, 
          email: signupEmail, 
          passWord: signupPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        
        // Save user data and navigate (optional, can be removed if you want them to manually log in)
        saveUserDataAndNavigate(data);

      } else {
        // Displays the E11000 duplicate key error message from backend
        setError(data.message || "Signup failed. Please check your information.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again later.");
    }
  };
  
  const clearForm = () => {
      setError("");
      setSuccess("");
      setUsername("");
      setPassword("");
      setSignupUsername("");
      setSignupPassword("");
      setSignupEmail("");
      setSignupFirstName("");
      setSignupLastName("");
  };

  const toggleForm = () => {
      clearForm();
      setIsLogin(!isLogin);
  };


  const renderForm = () => (
    <div className="p-6 bg-gray-700 rounded-lg shadow-xl border border-yellow-500/50 text-white form-container text-left">
      <h3 className="text-yellow-400 text-2xl mb-4 font-bold text-center">
        {isLogin ? "Customer Login" : "New Account Sign Up"}
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
      {isLogin ? (
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
      ) : (
        /* Signup Form */
        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">First Name</label>
              <input
                type="text"
                value={signupFirstName}
                onChange={(e) => setSignupFirstName(e.target.value)}
                className="form-input p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <input
                type="text"
                value={signupLastName}
                onChange={(e) => setSignupLastName(e.target.value)}
                className="form-input p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="form-input p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="form-input p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="form-input p-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="w-full p-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md">
            SIGN UP
          </button>
        </form>
      )}

      {/* Form Toggle Button */}
      <button 
        onClick={toggleForm}
        className="mt-6 w-full text-center text-sm text-yellow-400 hover:text-yellow-300 transition duration-150"
      >
        {isLogin ? "Need an account? Sign Up!" : "Already have an account? Log In!"}
      </button>
    </div>
  );

  return (
    <WelcomeMarquee>
      {renderForm()}
    </WelcomeMarquee>
  );
}

export default Login;
