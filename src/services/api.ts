const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Defines the shape of the user data for registration
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
}

// Helper to create a consistent API request structure
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');

  // Correctly type headers as a flexible record of strings
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = { ...options, headers };

  try {
    const response = await fetch(url, config);

    // Handle cases where the response might not have a body (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
      if (!response.ok) throw new Error('An error occurred with no JSON response.');
      return; // No content to parse
    }
    
    const data = await response.json();

    if (!response.ok) {
      // Use the error message from the backend if available
      throw new Error(data.message || 'An error occurred');
    }
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// --- Auth API calls ---
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: RegisterData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getProfile: () => apiRequest('/auth/profile'),
  
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
};

// You can add other API modules here as needed

