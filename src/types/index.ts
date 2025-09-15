// Defines the shape of data for the login API call
export interface LoginData {
  email: string;
  password: string;
}

// Defines the shape of data for the registration API call
export interface RegisterData {
  email: string;
  password: string;
  name: string; // Assuming 'name' based on your Register.tsx page
  role: 'practitioner' | 'patient';
}
// Defines the shape of data for the login API call
export interface LoginData {
  email: string;
  password: string;
}

// Defines the shape of data for the registration API call
// This now includes firstName and lastName, matching your Register.tsx page
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'practitioner' | 'patient';
}
