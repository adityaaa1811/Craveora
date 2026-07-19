import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const cacheMap = new Map();
const CACHE_TTL = 5000; // 5 seconds cache

// Request interceptor to attach JWT token and handle caching
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

    // In-memory caching for public GET requests to prevent duplicate mounting fetches
    if (config.method === "get" && (config.url.includes("/products") || config.url.includes("/categories"))) {
      const cacheKey = config.url + JSON.stringify(config.params || {});
      const cached = cacheMap.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        config.adapter = () => {
          return Promise.resolve({
            data: cached.data,
            headers: {},
            config,
            status: 200,
            statusText: "OK",
          });
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/auth errors and store cache
api.interceptors.response.use(
  (response) => {
    if (response.config.method === "get" && (response.config.url.includes("/products") || response.config.url.includes("/categories"))) {
      const cacheKey = response.config.url + JSON.stringify(response.config.params || {});
      cacheMap.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }
    return response;
  },
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
