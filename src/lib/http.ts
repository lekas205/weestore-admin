import axios from 'axios'
import { SAVED_AUTH_TOKEN_KEY } from '@/constants'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add an interceptor to set the token in the request headers
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(SAVED_AUTH_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default http;