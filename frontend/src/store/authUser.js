import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Optional: Set the base URL for Axios if you're using a specific API endpoint.
// axios.defaults.baseURL = "https://your-api-url.com";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  // Signup function
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  // Login function
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error?.response?.data?.message || "Login failed");
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  // Auth check function
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error("Auth check failed", error); // Optional: Log the error for debugging
      set({ isCheckingAuth: false, user: null });
      // Optional: You can also display an error message via toast here if needed.
    }
  },
}));
