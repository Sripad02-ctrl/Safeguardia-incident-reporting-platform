// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/main.css";

const App = () => (
  <Router>
    <div className="app-container">
      <Navbar />
      
      {/* TEMP DEBUG: Check if this shows up */}
      <h1 style={{ textAlign: "center", marginTop: "50px", color: "green" }}>
        🔍 React is rendering!
      </h1>

      <AppRoutes />

      <Footer />
    </div>
  </Router>
);

export default App;