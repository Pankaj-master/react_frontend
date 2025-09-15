import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

// Defines the shape of the user object
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
  isActive: boolean;
}

// Defines the shape of the data for the register function
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
}

// Defines the shape of the context value
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Verify the token by fetching the user's profile
          const profile = await authAPI.getProfile();
          setUser(profile);
        } catch (error) {
          console.error("Session check failed, clearing token", error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    localStorage.setItem('authToken', response.access_token);
    setUser(response.user);
  };

  const register = async (userData: RegisterData) => {
    const response = await authAPI.register(userData);
    localStorage.setItem('authToken', response.access_token);
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    // Optionally, you could also call an API endpoint to invalidate the token on the server
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

