import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import PractitionerDashboard from './pages/PractitionerDashboard';
import PatientPortal from './pages/PatientPortal';
import Login from './pages/Login';
import Register from './pages/Register';
// import NotFound from './pages/NotFound'; // Uncomment when you create this
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-ayurveda-beige-light">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/practitioner-dashboard" element={
              <ProtectedRoute requiredRole="practitioner">
                <PractitionerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/patient-portal" element={
              <ProtectedRoute requiredRole="patient">
                <PatientPortal />
              </ProtectedRoute>
            } />
            
            {/* Catch all route - 404 page */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;