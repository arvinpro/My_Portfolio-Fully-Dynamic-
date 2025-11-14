import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "https://my-portfolio-r5z0.onrender.com",

  timeout: 60000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens if needed in the future
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error("Server error:", error.response.data);
    } else if (error.code === "ECONNABORTED") {
      // Handle timeout
      console.error("Request timeout");
    }

    return Promise.reject(error);
  }
);

export default api;
