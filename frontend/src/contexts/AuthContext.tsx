import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";

interface User {
  id?: string;
  username?: string;
  role?: string;
  token?: string;
}

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.role === "admin");

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === "admin");

    localStorage.setItem("token", userData.token || "");
    localStorage.setItem("user", JSON.stringify(userData));

    api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
