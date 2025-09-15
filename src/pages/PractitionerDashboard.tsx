import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaUsers, FaUtensils, FaBookMedical, FaChartLine, FaRobot } from 'react-icons/fa';
import { Chatbot } from '../components/Chatbot';

const PractitionerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chatbot');

  const stats = [
    { label: 'Total Patients', value: '24', icon: <FaUsers className="text-ayurveda-green" /> },
    { label: 'Food Items', value: '156', icon: <FaUtensils className="text-ayurveda-green" /> },
    { label: 'Recipes', value: '42', icon: <FaBookMedical className="text-ayurveda-green" /> },
    { label: 'This Week Appointments', value: '8', icon: <FaChartLine className="text-ayurveda-green" /> },
  ];

  const recentPatients = [
    { name: 'Ananya Sharma', dosha: 'Pitta-Vata', lastVisit: '2 days ago' },
    { name: 'Rahul Verma', dosha: 'Kapha', lastVisit: '3 days ago' },
    { name: 'Priya Patel', dosha: 'Vata-Pitta', lastVisit: '4 days ago' },
  ];

  return (
    <Layout userType="practitioner">
      <div className="font-poppins">
        <h1 className="text-2xl font-bold text-ayurveda-green mb-6">Practitioner Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="mr-4 text-3xl">{stat.icon}</div>
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-ayurveda-brown">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`flex items-center gap-2 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'chatbot'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('chatbot')}
              >
                <FaRobot /> AyurBot Assistant
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'patients'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('patients')}
              >
                Patients
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'food'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('food')}
              >
                Food Database
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'chatbot' && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-ayurveda-brown">AI Assistant</h2>
                <p className="text-gray-600 mb-4">
                  Ask AyurBot for food recommendations, meal analysis, or general Ayurvedic questions.
                </p>
                <Chatbot />
              </div>
            )}
            
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
                <div className="space-y-3">
                  {recentPatients.map((patient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-ayurveda-beige-light rounded">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-600">Dosha: {patient.dosha}</p>
                      </div>
                      <span className="text-sm text-gray-500">{patient.lastVisit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'patients' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Patient Management</h2>
                <p className="text-gray-600">Patient list and management tools will appear here.</p>
              </div>
            )}
            
            {activeTab === 'food' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Food Database</h2>
                <p className="text-gray-600">Food items and their Ayurvedic properties will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PractitionerDashboard;
