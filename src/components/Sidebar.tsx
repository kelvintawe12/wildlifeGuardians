import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, AwardIcon, BookOpenIcon, HelpCircleIcon, InfoIcon, SettingsIcon } from 'lucide-react';

import { ShieldIcon, FileTextIcon, PhoneIcon } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Dashboard', icon: HomeIcon },
  { path: '/badges', label: 'Badges', icon: AwardIcon },
  { path: '/learn', label: 'Learn', icon: BookOpenIcon },
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

  // Sidebar is always open on md+ screens, collapsible on mobile
  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-emerald-600 text-white p-2 rounded-lg shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block md:w-56 md:z-0`}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex flex-col h-full py-8 px-4 space-y-2">
          <div className="mb-8 flex items-center space-x-3">
            <img src="/wildlife-guardians-compact.svg" alt="Logo" className="w-10 h-10" />
            <span className="text-lg font-bold text-emerald-700">Wildlife Guardians</span>
          </div>
          <nav className="flex-1 space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors font-medium text-base space-x-3
                  ${location.pathname === path
                    ? 'bg-emerald-100 text-emerald-700 shadow'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'}
                `}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
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
