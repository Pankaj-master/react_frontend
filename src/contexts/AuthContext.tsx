import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

// User interface based on typical NestJS user response
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient' | 'admin'|'dietitian';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Register data interface
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          // Verify token is still valid by fetching user profile
          const userProfile = await authAPI.getProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          // Token is invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function - UPDATED WITH DIRECT FETCH
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Use direct fetch instead of authAPI to avoid configuration issues
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await response.text();
        throw new Error(`Server returned non-JSON response: ${errorText}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Login failed: ${response.status}`);
      }

      // Assuming NestJS returns { access_token: string, user: User }
      if (data.access_token && data.user) {
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid response format from server - missing token or user data');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - UPDATED WITH DIRECT FETCH
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await response.text();
        throw new Error(`Server returned non-JSON response: ${errorText}`);
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Registration failed: ${response.status}`);
      }

      // Assuming registration also logs the user in
      if (data.access_token && data.user) {
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // If registration doesn't auto-login, just return the response
        return data;
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.message || 'Registration failed. Please try again.');
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
    
    // Optionally call logout API
    authAPI.logout().catch(console.error);
  };

  // Context value
  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;