import axios from 'axios';
const API = axios.create({
  baseURL: "https://mm-showcase-1.onrender.com", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('mm_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API; 
