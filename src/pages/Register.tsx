// src/pages/Register.tsx
import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'practitioner' | 'patient'>('practitioner');

  return (
    <div className="min-h-screen bg-ayurveda-beige-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-ayurveda-green">Create an AyurCare Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join as a {userType}
          </p>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <button
            className={`flex-1 py-2 rounded ${
              userType === 'practitioner'
                ? 'bg-ayurveda-green text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setUserType('practitioner')}
          >
            Practitioner
          </button>
          <button
            className={`flex-1 py-2 rounded ${
              userType === 'patient'
                ? 'bg-ayurveda-green text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setUserType('patient')}
          >
            Patient
          </button>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-t-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-ayurveda-green focus:border-ayurveda-green focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-ayurveda-green focus:border-ayurveda-green focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-b-lg relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-ayurveda-green focus:border-ayurveda-green focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-ayurveda-green hover:bg-ayurveda-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ayurveda-green"
            >
              Register
            </button>
          </div>
          
          <div className="text-center">
            <a href="/login" className="text-ayurveda-green hover:underline">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;