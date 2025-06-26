import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
const NotFound: React.FC = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
        <HomeIcon className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </div>;
};
export default NotFound;