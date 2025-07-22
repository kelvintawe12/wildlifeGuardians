import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar - completely flush */}
      <header className="w-full sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto focus:outline-none">
          <main className="mx-auto w-full max-w-[100vw] p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer - completely flush */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;