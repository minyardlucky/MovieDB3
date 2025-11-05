import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css"; // Make sure to import the CSS

function Nav({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login page
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="Navbar">
      <Link to="/" className="logo">
        Movie DataBase/Home
      </Link>

      <div className="auth-buttons">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <Link to="/profile" className="profile-link">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="signup-btn" onClick={handleSignUpClick}>
              Sign Up
            </button>
            <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
