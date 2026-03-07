import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api",  // for local development
// });

const API = axios.create({
  baseURL: "https://veloura-b0qg.onrender.com/api", // for production
});

// Attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired session safely
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token");

    if (error.response && error.response.status === 403 && token) {
      localStorage.removeItem("token");

      alert("Session expired. Please login again.");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default API;
