// src/pages/ReportPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import IncidentForm from "../components/IncidentForm"; // ✅ Import the form

const ReportPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");  // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="page-container">
      <h2>🕵️ Report Incident</h2>
      <IncidentForm /> {/* ✅ Show the form */}
    </div>
  );
};

export default ReportPage;