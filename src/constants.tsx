// Use Vite's import.meta.env instead of process.env
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  NOTES: {
    BASE: '/notes',
    BY_ID: (id: string) => `/notes/${id}`,
  },
};