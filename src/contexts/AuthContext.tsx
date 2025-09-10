import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

// --- TYPE DEFINITIONS ---
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient' | 'admin' | 'dietitian';
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// --- CONTEXT CREATION ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- CUSTOM HOOK ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- PROVIDER COMPONENT ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing user session on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.clear(); // Clear corrupted data
      }
    }
    setIsLoading(false);
  }, []);

  // Centralized function to handle successful auth
  const handleAuthSuccess = (data: { access_token: string; user: User }) => {
    localStorage.setItem('authToken', data.access_token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authAPI.login({ email, password });
      handleAuthSuccess(data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to be caught in the component
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const data = await authAPI.register(userData);
      // Backend logs user in automatically upon successful registration
      handleAuthSuccess(data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw to be caught in the component
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

