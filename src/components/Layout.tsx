// src/components/Layout.tsx
import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'practitioner' | 'patient';
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  return (
    <div className="flex h-screen bg-ayurveda-beige-light">
      <Navigation userType={userType} />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;