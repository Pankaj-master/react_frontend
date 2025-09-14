const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Defines the shape of the user data for registration
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
}

// ✅ Exported helper for API requests
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');

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

    const contentType = response.headers.get('content-type');
    if (
      response.status === 204 ||
      !contentType ||
      !contentType.includes('application/json')
    ) {
      if (!response.ok) throw new Error('An error occurred with no JSON response.');
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// ✅ Exported Auth API module
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

// ✅ Optionally export everything in one object
// ✅ Default export (named object instead of anonymous)
const api = {
  request: apiRequest,
  auth: authAPI,
};

export default api;