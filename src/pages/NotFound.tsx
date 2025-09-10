// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-ayurveda-beige-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-ayurveda-green">404</h1>
        <h2 className="text-2xl font-semibold text-ayurveda-brown mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block mt-6 px-6 py-2 bg-ayurveda-green text-white rounded hover:bg-ayurveda-green-dark"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;