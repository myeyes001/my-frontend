import { createContext, useContext, useState } from 'react';
import { logoutUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));

  const login = (authToken, role) => {
    setToken(authToken);
    localStorage.setItem('auth_token', authToken);
    // Vous pouvez ajouter plus d'infos si nécessaire
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
}