import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://bharatarchive-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const entryAPI = {
  getAll: (params) => api.get('/entries', { params }),
  getById: (id) => api.get(`/entries/${id}`),
  getBySlug: (slug) => api.get(`/entries/slug/${slug}`),
  create: (data) => api.post('/entries', data),
  update: (id, data) => api.put(`/entries/${id}`, data),
  delete: (id) => api.delete(`/entries/${id}`),
  like: (id) => api.post(`/entries/${id}/like`),
  addComment: (id, text) => api.post(`/entries/${id}/comment`, { text }),
  deleteComment: (id, commentId) => api.delete(`/entries/${id}/comment/${commentId}`),
};

export const sitemapAPI = {
  get: () => api.get('/sitemap'),
};

export default api;
