import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      // FIX: Removed the check for 'admin' as it's not a defined role.
      if (user.role === 'practitioner') {
        navigate('/practitioner-dashboard');
      } else if (user.role === 'patient') {
        navigate('/patient-portal');
      }
    } else if (!isLoading && !user) {
        // If loading is done and there's still no user, go to login.
        navigate('/login');
    }
  }, [user, isLoading, navigate]);

  // Display a loading spinner while checking the user's role
  return <LoadingSpinner />;
};

export default Dashboard;
