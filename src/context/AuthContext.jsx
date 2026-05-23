import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { logoutUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // USER
  const [user, setUser] = useState(() => {

    const storedUser =
      localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  // TOKEN
  const [token, setToken] = useState(() => {
    return localStorage.getItem("auth_token");
  });

  // LOAD USER AUTOMATIQUEMENT
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  // LOGIN
  const login = (authToken, userData) => {

    setToken(authToken);

    setUser(userData);

    localStorage.setItem(
      "auth_token",
      authToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };

  // LOGOUT
  const logout = async () => {

    try {

      await logoutUser();

    } catch (error) {

      console.error(
        "Erreur lors de la déconnexion:",
        error
      );
    }

    setToken(null);

    setUser(null);

    localStorage.removeItem("auth_token");

    localStorage.removeItem("user");
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth doit être utilisé dans AuthProvider"
    );
  }

  return context;
}