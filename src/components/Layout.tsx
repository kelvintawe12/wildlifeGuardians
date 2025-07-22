import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - completely flush */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main content with minimal padding */}
      <main className="flex-1 w-full">
        <div className="w-full mx-auto max-w-[100vw]">
          <Outlet />
        </div>
      </main>

      {/* Footer - completely flush */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;