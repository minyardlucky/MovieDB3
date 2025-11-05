import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token"); // clear JWT
    localStorage.removeItem("user"); // IMPORTANT: Clear the user object from local storage
    navigate("/login"); // redirect to login page
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#333",
        color: "white",
      }}
    >
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
            <Link
              to="/signup"
              style={{ marginRight: "15px", color: "white", textDecoration: "none" }}
            >
              Sign Up
            </Link>
            {/* 💡 FIX: The Login Link was invisible because it had the same text decoration as its peers. 
                 It needs to be clearly styled as a primary button for the logged-out state.
            */}
            <Link
              to="/login"
              style={{ 
                background: "#FFD700", // Bright color
                color: "#333",          // Dark text
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                textDecoration: "none", // Remove underline
                fontWeight: "bold"
              }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;