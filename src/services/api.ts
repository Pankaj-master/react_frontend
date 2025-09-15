import { LoginData, RegisterData } from '../types'; // CORRECTED IMPORT PATH

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * A robust, reusable function for making authenticated API requests.
 */
const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  // --- THIS IS THE FIX for the 'Authorization' error ---
  // We define headers as a flexible Record type that allows any string key.
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  // ----------------------------------------------------

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Handle responses that don't have a body (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        if (!response.ok) throw new Error('Network response was not ok.');
        return; // Return nothing for non-JSON responses
    }

    const data = await response.json();

    if (!response.ok) {
      // Use the server's error message if available
      throw new Error(data.message || 'An unknown API error occurred');
    }

    return data;
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

/**
 * A dedicated module for all authentication-related API calls.
 */
export const authAPI = {
  login: (credentials: LoginData) => 
    request('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    }),
  register: (userData: RegisterData) => 
    request('/auth/register', { 
      method: 'POST', 
      body: JSON.stringify(userData) 
    }),
  getProfile: () => request('/auth/profile'),
  logout: () => request('/auth/logout', { method: 'POST' }),
};

/**
 * A default export that bundles all API services for easy importing.
 * Example usage: `import api from './services/api'; api.auth.login(...)`
 */
const api = {
  request,
  auth: authAPI,
};

export default api;

