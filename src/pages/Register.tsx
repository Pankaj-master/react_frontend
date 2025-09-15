import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RegisterData } from '../types'; // Import the central type

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [userType, setUserType] = useState<'practitioner' | 'patient'>('patient');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const { firstName, lastName, email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // FIX: The object passed to register now matches the RegisterData type
  const userData: RegisterData = {
    firstName,
    lastName,
    email,
    password,
    role: userType,
  };


    try {
      await register(userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... your input fields for firstName, lastName, email, password ... */}
          <input name="firstName" value={firstName} onChange={handleChange} placeholder="First Name" required className="w-full px-3 py-2 mt-1 border rounded-md" />
          <input name="lastName" value={lastName} onChange={handleChange} placeholder="Last Name" required className="w-full px-3 py-2 mt-1 border rounded-md" />
          <input name="email" type="email" value={email} onChange={handleChange} placeholder="Email" required className="w-full px-3 py-2 mt-1 border rounded-md" />
          <input name="password" type="password" value={password} onChange={handleChange} placeholder="Password" required className="w-full px-3 py-2 mt-1 border rounded-md" />
          
          <div className="flex justify-center space-x-4">
            <label>
              <input type="radio" value="patient" checked={userType === 'patient'} onChange={() => setUserType('patient')} />
              Patient
            </label>
            <label>
              <input type="radio" value="practitioner" checked={userType === 'practitioner'} onChange={() => setUserType('practitioner')} />
              Practitioner
            </label>
          </div>
          
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">Register</button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;