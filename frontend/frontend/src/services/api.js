import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-api.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Gestion des erreurs
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-api.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Gestion des erreurs
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
