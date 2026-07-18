import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    try {
      const stateStr = localStorage.getItem("craveora_state");
      if (stateStr) {
        const state = JSON.parse(stateStr);
        const token = state?.auth?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Failed to parse auth token in API client:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 Unauthorized and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        const { token } = response.data.data;
        
        // Update the token in localStorage so subsequent requests have it
        const stateStr = localStorage.getItem("craveora_state");
        if (stateStr) {
          const state = JSON.parse(stateStr);
          if (state.auth) {
            state.auth.token = token;
            state.auth.isAuthenticated = true;
            localStorage.setItem("craveora_state", JSON.stringify(state));
          }
        }
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch {
        // If refresh fails, clear token/state and redirect to login
        try {
          const stateStr = localStorage.getItem("craveora_state");
          if (stateStr) {
            const state = JSON.parse(stateStr);
            if (state.auth) {
              state.auth.user = null;
              state.auth.token = null;
              state.auth.isAuthenticated = false;
              localStorage.setItem("craveora_state", JSON.stringify(state));
            }
          }
        } catch (e) {
          console.error("Failed to clear auth state upon refresh failure:", e);
        }
        
        // Redirect to login page if window is available
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
