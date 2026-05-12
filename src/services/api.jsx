import axios from 'axios';

const API_URL = 'http://localhost:8000/api';
const BACKEND_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // ✅ OBLIGATOIRE
});

// Intercepteur pour ajouter le Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ Récupérer le token CSRF
export const initializeCsrfToken = async () => {
  try {
    await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du token CSRF:', error);
  }
};

// ✅ Inscription
export const registerUser = async (userData) => {
  // Récupérer le token CSRF avant
  await initializeCsrfToken();
  
  return api.post('/register', {
    name: userData.name,
    email: userData.email,
    password: userData.password
  });
};

// ✅ Connexion
export const loginUser = async (credentials) => {
  // Récupérer le token CSRF avant
  await initializeCsrfToken();
  
  return api.post('/login', {
    email: credentials.email,
    password: credentials.password
  });
};

// Déconnexion
export const logoutUser = () => {
  return api.post('/logout');
};

// Obtenir les infos utilisateur
export const getMe = () => {
  return api.get('/me');
};

// Récupérer les produits
export const getProducts = () => {
  return api.get('/products');
};

// Récupérer les catégories
export const getCategories = () => {
  return api.get('/categories');
};

export default api;