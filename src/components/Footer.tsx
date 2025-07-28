import React from 'react';
import { HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <img 
              src="/wildlife-guardians-compact.svg" 
              alt="Wildlife Guardians Logo" 
              className="w-8 h-8 drop-shadow-lg"
            />
            <div>
              <p className="font-bold text-sm sm:text-base">WILDLIFE GUARDIANS</p>
              <p className="text-emerald-200 text-xs">Learn • Conserve • Inspire</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-emerald-100 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Wildlife Guardians. All rights reserved.
          </p>

          {/* Social/CTA */}
          <div className="flex items-center gap-2 text-emerald-100">
            <HeartIcon className="h-4 w-4 text-pink-300" />
            <span className="text-xs hidden xs:inline">Protecting our planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;