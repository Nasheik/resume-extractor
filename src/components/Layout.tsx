import React from 'react';
import { LayoutProps } from '@/types';
import { Do_Hyeon } from 'next/font/google';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden websitebackground">
      {/* Background pattern */}=
      
      {/* Content container */}
      {/* <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
        </div>
      </div> */}
      {children}

    </div>
  );
};

export default Layout;