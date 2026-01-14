import axios from 'axios';

// Backend FastAPI base URL (you can override with .env)
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Registration failed" };
  }
};

// LOGIN
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "Login failed" };
  }
};

// REPORT INCIDENT
export const reportIncident = async (incidentData, token) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/incidents`, incidentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Unknown error during incident report" };
  }
};