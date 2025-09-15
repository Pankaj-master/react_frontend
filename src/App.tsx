import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PractitionerDashboard from './pages/PractitionerDashboard';
import PatientPortal from './pages/PatientPortal';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

// This new component lives inside the AuthProvider, so it can access the auth context.
const AppContent: React.FC = () => {
  const { user } = useAuth();
  const userType = user ? user.role : null;

  return (
    // The required userType prop is now passed to the Layout component.
    <Layout userType={userType}>
      <Routes>
        {/* Public routes that everyone can access */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* General protected routes (must be logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
        {/* Protected routes specifically for practitioners */}
        <Route element={<ProtectedRoute requiredRole="practitioner" />}>
          <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
        </Route>

        {/* Protected routes specifically for patients */}
        <Route element={<ProtectedRoute requiredRole="patient" />}>
          <Route path="/patient-portal" element={<PatientPortal />} />
        </Route>

        {/* Catch-all route for pages that don't exist */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;