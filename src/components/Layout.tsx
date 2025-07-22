import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar - fixed at top */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar - now properly integrated with the layout */}
        <Sidebar />
        
        {/* Content area */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-72px)]">
          {/* Main content with proper spacing */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 w-full">
            <div className="max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </main>
          
          {/* Footer - now properly positioned */}
          <footer className="w-full bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Footer />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;