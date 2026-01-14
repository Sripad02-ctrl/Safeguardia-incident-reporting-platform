import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken, clearToken } from "../utils/auth";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.sub);  // `sub` contains email
      } catch (e) {
        console.error("Token decode error:", e);
        setUserEmail("");
      }
    }
  }, []);

  const handleLogout = () => {
    clearToken();
    setUserEmail("");
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        {!userEmail && (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {userEmail && (
          <>
            <li><Link to="/report">Report</Link></li>
            <li>Welcome, {userEmail}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;