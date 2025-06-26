import React from 'react';
import { HeartIcon } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="bg-green-700 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Wildlife Guardians</h3>
            <p className="text-sm mt-1">
              Educating youth on wildlife conservation
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm flex items-center">
              Made with <HeartIcon className="h-4 w-4 mx-1 text-red-400" /> for
              African wildlife
            </p>
            <p className="text-xs mt-1">
              © {new Date().getFullYear()} Wildlife Guardians
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;