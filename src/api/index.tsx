import axios from 'axios';
import { API_BASE_URL } from '../constants';

// Use the constant for the base URL
export const apiClient = axios.create({ baseURL: API_BASE_URL });

let inMemoryToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  inMemoryToken = token;
};

apiClient.interceptors.request.use((config) => {
  if (inMemoryToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
  }
  return config;
});