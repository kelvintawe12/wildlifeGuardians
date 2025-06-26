import React, { useEffect, useState } from 'react';
import { WifiOffIcon, WifiIcon } from 'lucide-react';
const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  if (isOnline) return null;
  return <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-md flex items-center">
      <WifiOffIcon className="h-5 w-5 mr-2" />
      <span className="text-sm font-medium">
        You're offline. Some features may be limited.
      </span>
    </div>;
};
export default OfflineIndicator;