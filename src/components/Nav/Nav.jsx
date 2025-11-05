import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

function Nav({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login page
  };
  
  // New handler for the unauthenticated Login button
  const handleLoginClick = () => {
      navigate("/login");
  };

  // New handler for the unauthenticated Sign Up button
  const handleSignUpClick = () => {
      navigate("/signup");
  };

  return (
    <nav className="Navbar">
      
      {/* Left side: App name */}
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Movie DataBase/Home
      </Link>

      {/* Right side: Auth buttons */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>{user.username}</span>
            <Link
              to="/profile"
              style={{ marginRight: "15px", color: "white", textDecoration: "none" }}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Switched Link to Button for Sign Up, using programmatic navigation */}
            <button
              onClick={handleSignUpClick}
              style={{
                marginRight: "15px", 
                background: "transparent",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
            
            {/* Switched Link to Button for Login, using programmatic navigation */}
            <button
              onClick={handleLoginClick}
              style={{ 
                background: "#FFD700",
                color: "#333",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                fontWeight: "bold"
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;