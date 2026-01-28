import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

// Auth
export const authApi = {
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

// Activities
export const activitiesApi = {
  getAll: (params?: Record<string, string>) =>
    api.get('/activities', { params }),
  getById: (id: string) => api.get(`/activities/${id}`),
};

// Favorites
export const favoritesApi = {
  getAll: () => api.get('/favorites'),
  add: (activityId: string) => api.post('/favorites', { activityId }),
  remove: (id: string) => api.delete(`/favorites/${id}`),
};

// User
export const userApi = {
  getMe: () => api.get('/user/me'),
  getPreferences: () => api.get('/user/preferences'),
  updatePreferences: (budget: number, categories: string[]) =>
    api.post('/user/preferences', { budget, categories }),
};

