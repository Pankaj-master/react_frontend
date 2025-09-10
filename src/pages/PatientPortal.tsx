// src/pages/PatientPortal.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaHeart, FaWater, FaAppleAlt, FaBookOpen } from 'react-icons/fa';

const PatientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');

  // Sample data
  const todayDiet = {
    breakfast: {
      time: '8:00 AM',
      items: [{ name: 'Oatmeal with Berries', qty: '1 bowl', cal: 300 }],
      rasa: ['Sweet', 'Sour'],
      virya: 'Cooling',
      guna: 'Light',
    },
    lunch: {
      time: '1:00 PM',
      items: [
        { name: 'Brown Rice', qty: '1 cup', cal: 215 },
        { name: 'Mung Dal', qty: '1 bowl', cal: 150 },
        { name: 'Steamed Vegetables', qty: '1 cup', cal: 100 },
      ],
      rasa: ['Sweet', 'Astringent'],
      virya: 'Cooling',
      guna: 'Light',
    },
    dinner: {
      time: '7:00 PM',
      items: [
        { name: 'Khichdi', qty: '1 bowl', cal: 250 },
        { name: 'Ghee', qty: '1 tsp', cal: 45 },
      ],
      rasa: ['Sweet'],
      virya: 'Neutral',
      guna: 'Soft',
    },
  };

  return (
    <Layout userType="patient">
      <div className="font-inter">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ayurveda-green">Welcome, Ananya!</h1>
          <p className="text-ayurveda-brown">Your Dosha: Pitta-Vata</p>
        </div>
        
        {/* Wellness Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <FaHeart className="text-ayurveda-green mx-auto text-2xl mb-2" />
            <p className="text-sm text-gray-600">Wellness Score</p>
            <p className="text-xl font-bold text-ayurveda-brown">85%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <FaWater className="text-ayurveda-green mx-auto text-2xl mb-2" />
            <p className="text-sm text-gray-600">Hydration</p>
            <p className="text-xl font-bold text-ayurveda-brown">70%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <FaAppleAlt className="text-ayurveda-green mx-auto text-2xl mb-2" />
            <p className="text-sm text-gray-600">Diet Adherence</p>
            <p className="text-xl font-bold text-ayurveda-brown">90%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <FaBookOpen className="text-ayurveda-green mx-auto text-2xl mb-2" />
            <p className="text-sm text-gray-600">Appointments</p>
            <p className="text-xl font-bold text-ayurveda-brown">2</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'today'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('today')}
              >
                Today's Diet
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'wellness'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('wellness')}
              >
                Wellness Tracking
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-ayurveda-green text-ayurveda-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'today' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Today's Diet Plan</h2>
                <div className="space-y-4">
                  {Object.entries(todayDiet).map(([meal, details]) => (
                    <div key={meal} className="border border-ayurveda-beige rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium capitalize text-ayurveda-brown">{meal}</h3>
                        <span className="text-sm text-gray-500">{details.time}</span>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Items:</h4>
                        <ul className="list-disc list-inside text-sm">
                          {details.items.map((item, index) => (
                            <li key={index}>
                              {item.name} ({item.qty}, {item.cal} cal)
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Rasa:</span> {details.rasa.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Virya:</span> {details.virya}
                        </div>
                        <div>
                          <span className="font-medium">Guna:</span> {details.guna}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'wellness' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Wellness Tracking</h2>
                <p className="text-gray-600">Your wellness tracking tools will appear here.</p>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Educational Resources</h2>
                <p className="text-gray-600">Ayurvedic educational resources will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientPortal;