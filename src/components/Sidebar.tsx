import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, AwardIcon, BookOpenIcon, HelpCircleIcon, InfoIcon, SettingsIcon, EyeIcon } from 'lucide-react';
import { ShieldIcon, FileTextIcon, PhoneIcon } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Dashboard', icon: HomeIcon },
  { path: '/quiz', label: 'Quizzes', icon: BookOpenIcon },
  { path: '/animals', label: 'Animals', icon: EyeIcon },
  { path: '/badges', label: 'Badges', icon: AwardIcon },
  { path: '/help', label: 'Help Center', icon: HelpCircleIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
  { path: '/contact', label: 'Contact', icon: PhoneIcon },
  { path: '/privacy', label: 'Privacy Policy', icon: ShieldIcon },
  { path: '/terms', label: 'Terms of Service', icon: FileTextIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button - only shows on mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-emerald-600 text-white p-2 rounded-lg shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Overlay for mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)} />
      )}
      
      {/* Sidebar - fixed on desktop but behaves differently on mobile */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-56`}
      >
        <div className="flex flex-col h-full py-8 px-4 space-y-2">
          <div className="mb-8 flex items-center space-x-3 px-3">
            <img src="/wildlife-guardians-compact.svg" alt="Logo" className="w-10 h-10" />
            <span className="text-lg font-bold text-emerald-700">Wildlife Guardians</span>
          </div>
          <nav className="flex-1 space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors font-medium text-base space-x-3
                    ${isActive
                      ? 'bg-emerald-100 text-emerald-700 shadow'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'}
                  `}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Wildlife Guardians
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
