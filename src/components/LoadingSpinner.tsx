// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayurveda-green"></div>
      <span className="ml-3 text-ayurveda-green">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;