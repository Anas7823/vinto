import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Configuration d'Axios avec l'URL de base
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 400) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async login(credentials) {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error) {
      console.error('Erreur login:', error);
      throw error;
    }
  },

  async register(userData) {
    const response = await axiosInstance.post('/user/register', userData);
    return response.data;
  },

  // Méthodes pour les produits
  async getAllProducts() {
    const response = await axiosInstance.get('/product');
    return response.data;
  },

  async createProduct(productData) {
    const response = await axiosInstance.post('/product/create', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await axiosInstance.put(`/product/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await axiosInstance.delete(`/product/${id}`);
    return response.data;
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }
      const response = await axiosInstance.get('/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur getCurrentUser:', error);
      if (error.response?.status === 401 || error.response?.status === 400) {
        localStorage.removeItem('token');
        return null;
      }
      throw error;
    }
  },

  // Méthodes pour les actualités
  async getAllNews() {
    const response = await axiosInstance.get('/news');
    return response.data;
  },

  async createNews(newsData) {
    const response = await axiosInstance.post('/news/create', newsData);
    return response.data;
  },

  async updateNews(id, newsData) {
    const response = await axiosInstance.put(`/news/${id}`, newsData);
    return response.data;
  },

  async deleteNews(id) {
    const response = await axiosInstance.delete(`/news/${id}`);
    return response.data;
  },

  async getProductById(id) {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  }
}; 