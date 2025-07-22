import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShieldIcon, FileTextIcon, InfoIcon, PhoneIcon, HelpCircleIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-3 mb-2">
          <img 
            src="/wildlife-guardians-compact.svg" 
            alt="Wildlife Guardians Logo" 
            className="w-10 h-10 drop-shadow-lg"
          />
          <span className="text-lg font-bold">Wildlife Guardians</span>
        </div>
        <p className="text-emerald-200 text-xs mb-2">Learn • Conserve • Inspire</p>
        <p className="text-emerald-100 text-xs mb-2">&copy; {new Date().getFullYear()} Wildlife Guardians. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;