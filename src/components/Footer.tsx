import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ShieldIcon, 
  FileTextIcon, 
  InfoIcon, 
  HelpCircleIcon,
  TreePineIcon,
  GlobeIcon,
  MailIcon
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Mobile: Single column, Desktop: Multi-column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <TreePineIcon className="h-8 w-8 text-emerald-500 mr-3" />
              <h3 className="text-xl font-bold text-white">Wildlife Guardians</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-sm">
              Empowering conservation through education. Learn, protect, and preserve African wildlife for future generations.
            </p>
            <div className="flex items-center text-sm text-emerald-400">
              <HeartIcon className="h-4 w-4 mr-2 text-red-400" />
              <span>Made with love for wildlife</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:mt-0">
            <h4 className="text-lg font-semibold mb-3 text-white">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <GlobeIcon className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/badges" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <svg className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Badges
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <svg className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="sm:mt-0">
            <h4 className="text-lg font-semibold mb-3 text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <InfoIcon className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <MailIcon className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" />
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <HelpCircleIcon className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="sm:mt-0">
            <h4 className="text-lg font-semibold mb-3 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <ShieldIcon className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm inline-flex items-center group"
                >
                  <FileTextIcon className="h-3 w-3 mr-2 opacity-70 group-hover:opacity-100" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} Wildlife Guardians. All rights reserved.
              </p>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <p className="text-gray-500 text-xs">
                Building a sustainable future for wildlife
              </p>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span>Made in </span>
              <span className="ml-1 text-emerald-400">🌍 Africa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;