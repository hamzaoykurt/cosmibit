import axios from 'axios';

// API base URL - configure based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service object
const api = {
  // Projects
  projects: {
    getAll: async () => {
      const response = await apiClient.get('/projects');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    },
    getByStatus: async (status) => {
      const response = await apiClient.get(`/projects/status/${status}`);
      return response.data;
    },
  },

  // Team Members
  team: {
    getAll: async () => {
      const response = await apiClient.get('/team');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/team/${id}`);
      return response.data;
    },
  },

  // Services
  services: {
    getAll: async () => {
      const response = await apiClient.get('/services');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/services/${id}`);
      return response.data;
    },
  },

  // Contact
  contact: {
    submit: async (contactData) => {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    },
  },
};

export default api;
