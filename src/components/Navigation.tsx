import React, { useState } from 'react';
import { 
  FaUserMd, 
  FaUser, 
  FaUtensils, 
  FaBookMedical, 
  FaChartLine, 
  FaBell, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface NavigationProps {
  // FIX: Allow userType to be null for logged-out states
  userType: 'practitioner' | 'patient' | null;
}

const Navigation: React.FC<NavigationProps> = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // FIX: If there is no user, do not render the navigation sidebar.
  // This is for pages like Login and Register.
  if (!userType) {
    return null;
  }

  const practitionerMenu = [
    { name: 'Dashboard', icon: <FaChartLine />, path: '/practitioner-dashboard' },
    { name: 'Patients', icon: <FaUser />, path: '/patients' },
    { name: 'Food Database', icon: <FaUtensils />, path: '/food-db' },
    { name: 'Recipes', icon: <FaBookMedical />, path: '/recipes' },
    { name: 'Notifications', icon: <FaBell />, path: '/notifications' },
  ];

  const patientMenu = [
    { name: 'Dashboard', icon: <FaChartLine />, path: '/patient-portal' },
    { name: 'Diet Plan', icon: <FaUtensils />, path: '/diet-plan' },
    { name: 'Wellness', icon: <FaBookMedical />, path: '/wellness' },
    { name: 'Resources', icon: <FaUserMd />, path: '/resources' },
    { name: 'Notifications', icon: <FaBell />, path: '/notifications' },
  ];

  const menuItems = userType === 'practitioner' ? practitionerMenu : patientMenu;

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-ayurveda-green text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative w-64 bg-ayurveda-green text-white h-full transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40
      `}>
        <div className="p-5 border-b border-ayurveda-green-dark">
          <h1 className="text-2xl font-bold">AyurCare</h1>
          <p className="text-ayurveda-beige-light text-sm">
            {userType === 'practitioner' ? 'Practitioner Portal' : 'Patient Portal'}
          </p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className="flex items-center p-3 rounded hover:bg-ayurveda-green-dark transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-ayurveda-green-dark">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded hover:bg-ayurveda-green-dark transition-colors text-left"
          >
            <span className="mr-3"><FaSignOutAlt /></span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
