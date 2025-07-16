import React, { useState, useEffect } from 'react';
import { WifiOff, CloudOff, Cloud, RotateCw, CheckCircle, AlertCircle } from 'lucide-react';
import { offlineStorageService } from '../services/offlineStorageEnhanced';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      
      if (navigator.onLine) {
        // Attempt to sync when coming back online
        syncPendingData();
      }
    };

    const checkPendingSync = async () => {
      try {
        const pending = await offlineStorageService.getPendingSync();
        setPendingSync(pending.length);
      } catch (error) {
        console.error('Failed to check pending sync:', error);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Check pending sync data periodically
    const syncInterval = setInterval(checkPendingSync, 30000); // Every 30 seconds
    checkPendingSync(); // Initial check

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(syncInterval);
    };
  }, []);

  const syncPendingData = async () => {
    if (!navigator.onLine) return;

    setSyncStatus('syncing');
    
    try {
      const pendingData = await offlineStorageService.getPendingSync();
      
      for (const item of pendingData) {
        try {
          let response;
          const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://wildlife-guardians-backends.vercel.app/api';
          
          switch (item.type) {
            case 'quiz_result':
              response = await fetch(`${apiBase}/quiz-results`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${item.token}`
                },
                body: JSON.stringify(item.data)
              });
              break;
              
            case 'user_progress':
              response = await fetch(`${apiBase}/user/progress`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${item.token}`
                },
                body: JSON.stringify(item.data)
              });
              break;
              
            default:
              continue;
          }
          
          if (response?.ok && item.id) {
            await offlineStorageService.clearSyncedData(item.id);
          }
        } catch (error) {
          console.error('Failed to sync item:', error);
        }
      }
      
      // Update pending count
      const remainingPending = await offlineStorageService.getPendingSync();
      setPendingSync(remainingPending.length);
      
      setSyncStatus(remainingPending.length === 0 ? 'success' : 'error');
      setLastSync(new Date());
      
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const getStatusColor = () => {
    if (!isOnline) return 'bg-red-500';
    if (syncStatus === 'syncing') return 'bg-yellow-500';
    if (syncStatus === 'success') return 'bg-green-500';
    if (syncStatus === 'error') return 'bg-red-500';
    if (pendingSync > 0) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (syncStatus === 'syncing') return 'Syncing...';
    if (syncStatus === 'success') return 'Synced';
    if (syncStatus === 'error') return 'Sync Error';
    if (pendingSync > 0) return `${pendingSync} pending`;
    return 'Online';
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    if (syncStatus === 'syncing') return <RotateCw className="w-4 h-4 animate-spin" />;
    if (syncStatus === 'success') return <CheckCircle className="w-4 h-4" />;
    if (syncStatus === 'error') return <AlertCircle className="w-4 h-4" />;
    if (pendingSync > 0) return <CloudOff className="w-4 h-4" />;
    return <Cloud className="w-4 h-4" />;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={`flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm font-medium shadow-lg transition-all duration-300 ${getStatusColor()}`}
        title={lastSync ? `Last sync: ${lastSync.toLocaleTimeString()}` : undefined}
      >
        {getStatusIcon()}
        <span className="hidden sm:inline">{getStatusText()}</span>
        {pendingSync > 0 && isOnline && (
          <button
            onClick={syncPendingData}
            className="ml-1 p-1 hover:bg-white/20 rounded-full transition-colors"
            title="Sync now"
            disabled={syncStatus === 'syncing'}
          >
            <RotateCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
      
      {/* Detailed status tooltip for mobile */}
      {!isOnline && (
        <div className="mt-2 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="w-4 h-4 text-red-400" />
            <span className="font-medium">You're offline</span>
          </div>
          <p className="text-gray-300">
            You can still browse saved content and take quizzes. 
            Your progress will sync when you're back online.
          </p>
          {pendingSync > 0 && (
            <p className="text-orange-300 mt-1">
              {pendingSync} item{pendingSync > 1 ? 's' : ''} waiting to sync
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;
