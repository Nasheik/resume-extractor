import React from 'react';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden websitebackground">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-100/50 rounded-t-full"
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;