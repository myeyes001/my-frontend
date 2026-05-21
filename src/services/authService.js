// src/services/authService.js
import axios from 'axios';

// URL du backend Laravel
const API_URL = 'http://127.0.0.1:8000/api';
// Créer une instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  /**
   * 📝 Inscription
   * Correspond à POST /api/register du backend
   */
  register: async (userData) => {
    try {
      const response = await api.post('/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      
      // Stocker le token et l'utilisateur
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        message: response.data.message,
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      const errorData = error.response?.data || {};
      throw {
        success: false,
        message: errorData.message || 'Erreur lors de l\'inscription',
        errors: errorData.errors || {}
      };
    }
  },

  /**
   * 🔐 Connexion
   * Correspond à POST /api/login du backend
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      // Stocker le token et l'utilisateur
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        message: response.data.message,
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      const errorData = error.response?.data || {};
      throw {
        success: false,
        message: errorData.message || 'Erreur lors de la connexion',
        errors: errorData.errors || {}
      };
    }
  },

  /**
   * 🔌 Déconnexion
   * Correspond à POST /api/logout du backend
   */
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
    
    // Supprimer les données du localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  /**
   * 👤 Obtenir les infos de l'utilisateur connecté
   * Correspond à GET /api/me du backend
   */
  getMe: async () => {
    try {
      const response = await api.get('/me');
      return {
        success: true,
        user: response.data
      };
    } catch (error) {
      throw {
        success: false,
        message: 'Erreur lors de la récupération des infos'
      };
    }
  },

  /**
   * ✅ Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * 🔑 Obtenir le token
   */
  getToken: () => {
    return localStorage.getItem('auth_token');
  },

  /**
   * 👥 Obtenir l'utilisateur du localStorage
   */
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * 🛒 Obtenir les produits (route publique)
   */
  getProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erreur lors de la récupération des produits';
    }
  },

  /**
   * 📦 Obtenir les catégories (route publique)
   */
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Erreur lors de la récupération des catégories';
    }
  }
};

export default authService;
