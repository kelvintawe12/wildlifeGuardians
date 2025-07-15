import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShieldIcon, FileTextIcon, InfoIcon, PhoneIcon, HelpCircleIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Wildlife Guardians</h3>
            <p className="text-emerald-100 text-sm leading-relaxed mb-4">
              Empowering the next generation through wildlife conservation education and awareness.
            </p>
            <div className="flex items-center text-sm text-emerald-200">
              <HeartIcon className="h-4 w-4 mr-2 text-red-400" />
              Made for African wildlife
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-emerald-100 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/badges" className="text-emerald-100 hover:text-white transition-colors text-sm">
                  Badges
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-emerald-100 hover:text-white transition-colors text-sm">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center">
                  <InfoIcon className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center">
                  <HelpCircleIcon className="h-4 w-4 mr-2" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center">
                  <ShieldIcon className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-emerald-100 hover:text-white transition-colors text-sm flex items-center">
                  <FileTextIcon className="h-4 w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-emerald-200 text-sm">
              © {new Date().getFullYear()} Wildlife Guardians. All rights reserved.
            </p>
            <p className="text-emerald-300 text-sm mt-2 md:mt-0">
              Building a sustainable future for wildlife
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;