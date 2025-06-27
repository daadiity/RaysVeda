import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api", // process.env.REACT_APP_API_URL -- uncomment for production
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data, // Return only the data part
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Admin API endpoints
export const adminAPI = {
  // Search functions
  searchUsers: (params) => axios.get("/api/admin/search/users", { params }),
  searchBookings: (params) => axios.get("/api/admin/search/bookings", { params }),

  // Authentication
  login: (credentials) => api.post("/admin/login", credentials),
  logout: () => api.post("/admin/logout"),
  getProfile: () => api.get("/admin/profile"),
  updateProfile: (data) => api.put("/admin/profile", data),

  // Dashboard
  getDashboardStats: () => api.get("/admin/dashboard/stats"),
  getRecentBookings: (limit = 5) =>
    api.get(`/admin/dashboard/recent-bookings?limit=${limit}`),
  getChartData: () => api.get("/admin/dashboard/charts"),

  // Users Management
  getUsers: (params = {}) => api.get("/admin/users", { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  createUser: (data) => api.post("/admin/users", data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  toggleUserStatus: (id, status) =>
    api.patch(`/admin/users/${id}/status`, { status }),

  // Bookings Management
  getBookings: (params = {}) => api.get("/admin/bookings", { params }),
  getBookingById: (id) => api.get(`/admin/bookings/${id}`),
  createBooking: (data) => api.post("/admin/bookings", data),
  updateBooking: (id, data) => api.put(`/admin/bookings/${id}`, data),
  updateBookingStatus: (id, status) =>
    api.patch(`/admin/bookings/${id}/status`, { status }),
  deleteBooking: (id) => api.delete(`/admin/bookings/${id}`),

  // Poojas Management
  getPoojas: (params = {}) => api.get("/admin/poojas", { params }),
  getPoojaById: (id) => api.get(`/admin/poojas/${id}`),
  createPooja: (data) => api.post("/admin/poojas", data),
  updatePooja: (id, data) => api.put(`/admin/poojas/${id}`, data),
  deletePooja: (id) => api.delete(`/admin/poojas/${id}`),
  updatePoojaStatus: (id, isActive) =>
    api.patch(`/admin/poojas/${id}/status`, { isActive }),

  // Reports
  generateReport: (type, dateRange, params = {}) =>
    api.get(`/admin/reports/${type}`, { params: { dateRange, ...params } }),
  downloadReport: (type, dateRange, format, params = {}) =>
    api.get(`/admin/reports/${type}/download`, {
      params: { dateRange, format, ...params },
      responseType: "blob",
    }),
  getDetailedStats: () => api.get("/admin/stats/detailed"),

  // Notifications
  getNotifications: (params = {}) =>
    api.get("/admin/notifications", { params }),
  markNotificationAsRead: (id) => api.patch(`/admin/notifications/${id}/read`),
  markAllNotificationsAsRead: () => api.patch("/admin/notifications/read-all"),
  deleteNotification: (id) => api.delete(`/admin/notifications/${id}`),

  // Settings
  getSettings: () => api.get("/admin/settings"),
  updateSettings: (section, data) =>
    api.put(`/admin/settings/${section}`, data),

  // File Upload
  uploadFile: (file, type = "general") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    return api.post("/admin/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Support
  createSupportRequest: (data) => api.post("/admin/support", data),
  getSupportRequests: () => api.get("/admin/support"),
};

export default api;
