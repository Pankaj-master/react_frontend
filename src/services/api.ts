import { LoginData, RegisterData } from '../types'; // CORRECTED IMPORT PATH

// CORRECTED: Point to the new backend port
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  // FIX: Define headers as a flexible Record type
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message);
    }

    // Handle responses that might not have content (like a 204 status)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    return; // Return undefined for non-json responses
    
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export const authAPI = {
  login: (credentials: LoginData) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData: RegisterData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: () => request('/auth/profile'),
  logout: () => request('/auth/logout', { method: 'POST' }),
};

const api = {
  request,
  auth: authAPI,
};

export default api;
