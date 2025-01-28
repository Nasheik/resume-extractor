import React from 'react';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden websitebackground">
      {children}
    </div>
  );
};

export default Layout;