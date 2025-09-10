import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role
    if (user) {
      if (user.role === 'practitioner' || user.role === 'admin') {
        navigate('/practitioner-dashboard');
      } else if (user.role === 'patient') {
        navigate('/patient-portal');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-ayurveda-beige-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-ayurveda-green">Loading...</h1>
        <p className="text-ayurveda-brown">Redirecting to your dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;