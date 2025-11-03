// src/components/SignUp/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !userName || !passWord || !email) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, userName, email, passWord }),
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
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} style={{ maxWidth: "300px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default SignUp;
