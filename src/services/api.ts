const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('🔄 API Request:', url); // Debug log
  
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    console.log('📨 API Response Status:', response.status); // Debug log
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json') 
      ? await response.json() 
      : await response.text();
    
    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('❌ API request error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (userData: any) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () => 
    apiRequest('/auth/logout', {
      method: 'POST',
    }),

  getProfile: () => apiRequest('/auth/profile'),
};

// Clients API
export const clientsAPI = {
  getAll: () => apiRequest('/clients'),
  getById: (id: string) => apiRequest(`/clients/${id}`),
  create: (clientData: any) =>
    apiRequest('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    }),
  update: (id: string, clientData: any) =>
    apiRequest(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    }),
  delete: (id: string) =>
    apiRequest(`/clients/${id}`, {
      method: 'DELETE',
    }),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => apiRequest('/appointments'),
  getById: (id: string) => apiRequest(`/appointments/${id}`),
  create: (appointmentData: any) =>
    apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),
  update: (id: string, appointmentData: any) =>
    apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    }),
  delete: (id: string) =>
    apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    }),
};

// Treatment Plans API
export const treatmentPlansAPI = {
  getAll: () => apiRequest('/treatment-plans'),
  getById: (id: string) => apiRequest(`/treatment-plans/${id}`),
  create: (planData: any) =>
    apiRequest('/treatment-plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    }),
  update: (id: string, planData: any) =>
    apiRequest(`/treatment-plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    }),
  delete: (id: string) =>
    apiRequest(`/treatment-plans/${id}`, {
      method: 'DELETE',
    }),
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest('/users'),
  getById: (id: string) => apiRequest(`/users/${id}`),
  update: (id: string, userData: any) =>
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

// Export the main api function as well
export default apiRequest;