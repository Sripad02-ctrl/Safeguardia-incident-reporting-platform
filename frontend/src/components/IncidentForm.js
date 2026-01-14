import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth.js";

const IncidentForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const res = await axios.post("http://127.0.0.1:8000/incidents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Incident reported successfully.");
      setFormData({ title: "", description: "", location: "" });
    } catch (error) {
      setMessage("❌ Failed to report incident.");
    }
  };

  return (
    <div className="form-container">
      <h2>Report Incident</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IncidentForm;