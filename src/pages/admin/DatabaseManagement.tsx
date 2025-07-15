import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  DatabaseIcon,
  DownloadIcon,
  UploadIcon,
  RefreshCwIcon,
  PlayIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ServerIcon,
  BarChart3Icon,
  SettingsIcon,
  EyeIcon,
  CodeIcon
} from 'lucide-react';

interface DatabaseStats {
  totalSize: string;
  usedSpace: string;
  freeSpace: string;
  usagePercentage: number;
  totalTables: number;
  totalRecords: number;
  lastBackup: string;
  connectionStatus: 'connected' | 'disconnected' | 'error';
}

interface BackupHistory {
  id: string;
  filename: string;
  size: string;
  createdAt: string;
  type: 'manual' | 'automatic';
  status: 'completed' | 'failed' | 'in_progress';
}

interface TableInfo {
  name: string;
  records: number;
  size: string;
  lastUpdated: string;
  engine: string;
}

const DatabaseManagement: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats>({
    totalSize: '2.5 GB',
    usedSpace: '1.8 GB',
    freeSpace: '0.7 GB',
    usagePercentage: 72,
    totalTables: 15,
    totalRecords: 125847,
    lastBackup: '2025-07-15T06:00:00Z',
    connectionStatus: 'connected'
  });

  const [backupHistory, setBackupHistory] = useState<BackupHistory[]>([]);
  const [tableInfo, setTableInfo] = useState<TableInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DatabaseIcon },
    { id: 'tables', label: 'Tables', icon: BarChart3Icon },
    { id: 'backups', label: 'Backups', icon: DownloadIcon },
    { id: 'query', label: 'Query Tool', icon: CodeIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockBackups: BackupHistory[] = [
      {
        id: '1',
        filename: 'wildlife_guardians_backup_2025-07-15.sql',
        size: '128 MB',
        createdAt: '2025-07-15T06:00:00Z',
        type: 'automatic',
        status: 'completed'
      },
      {
        id: '2',
        filename: 'wildlife_guardians_backup_2025-07-14.sql',
        size: '125 MB',
        createdAt: '2025-07-14T06:00:00Z',
        type: 'automatic',
        status: 'completed'
      },
      {
        id: '3',
        filename: 'manual_backup_2025-07-13.sql',
        size: '124 MB',
        createdAt: '2025-07-13T14:30:00Z',
        type: 'manual',
        status: 'completed'
      }
    ];

    const mockTables: TableInfo[] = [
      {
        name: 'users',
        records: 2847,
        size: '45 MB',
        lastUpdated: '2025-07-15T10:30:00Z',
        engine: 'InnoDB'
      },
      {
        name: 'quizzes',
        records: 156,
        size: '12 MB',
        lastUpdated: '2025-07-15T09:45:00Z',
        engine: 'InnoDB'
      },
      {
        name: 'quiz_results',
        records: 15890,
        size: '89 MB',
        lastUpdated: '2025-07-15T10:25:00Z',
        engine: 'InnoDB'
      },
      {
        name: 'badges',
        records: 24,
        size: '2 MB',
        lastUpdated: '2025-07-10T16:00:00Z',
        engine: 'InnoDB'
      },
      {
        name: 'animals',
        records: 450,
        size: '28 MB',
        lastUpdated: '2025-07-12T11:20:00Z',
        engine: 'InnoDB'
      }
    ];

    setTimeout(() => {
      setBackupHistory(mockBackups);
      setTableInfo(mockTables);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBackup: BackupHistory = {
        id: Date.now().toString(),
        filename: `manual_backup_${new Date().toISOString().split('T')[0]}.sql`,
        size: '128 MB',
        createdAt: new Date().toISOString(),
        type: 'manual',
        status: 'completed'
      };
      
      setBackupHistory([newBackup, ...backupHistory]);
      setStats(prev => ({ ...prev, lastBackup: new Date().toISOString() }));
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleQuery = () => {
    if (!sqlQuery.trim()) return;
    
    // Mock query execution
    const mockResult = {
      columns: ['id', 'name', 'email', 'created_at'],
      rows: [
        ['1', 'John Doe', 'john@example.com', '2025-07-01'],
        ['2', 'Jane Smith', 'jane@example.com', '2025-07-02'],
        ['3', 'Bob Johnson', 'bob@example.com', '2025-07-03']
      ],
      affectedRows: 3,
      executionTime: '0.045s'
    };
    
    setQueryResult(mockResult);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case 'disconnected': return <XCircleIcon className="h-5 w-5 text-red-400" />;
      case 'error': return <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getBackupStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'in_progress': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Database Connection</h3>
          {getStatusIcon(stats.connectionStatus)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{stats.totalTables}</p>
            <p className="text-sm text-gray-400">Total Tables</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{stats.totalRecords.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Total Records</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{stats.totalSize}</p>
            <p className="text-sm text-gray-400">Database Size</p>
          </div>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Used Space</span>
            <span className="text-white">{stats.usedSpace}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Free Space</span>
            <span className="text-white">{stats.freeSpace}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${stats.usagePercentage}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-400">
            {stats.usagePercentage}% used
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleBackup}
          disabled={isBackingUp}
          className="flex items-center justify-center p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
        >
          {isBackingUp ? (
            <RefreshCwIcon className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <DownloadIcon className="h-5 w-5 mr-2" />
          )}
          {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
        </button>
        
        <button className="flex items-center justify-center p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors">
          <UploadIcon className="h-5 w-5 mr-2" />
          Restore Backup
        </button>
        
        <button
          onClick={() => setActiveTab('query')}
          className="flex items-center justify-center p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-colors"
        >
          <CodeIcon className="h-5 w-5 mr-2" />
          Query Tool
        </button>
      </div>
    </div>
  );

  const renderTables = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Table Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Records
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Engine
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {tableInfo.map((table) => (
                <tr key={table.name} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DatabaseIcon className="h-4 w-4 text-emerald-400 mr-2" />
                      <span className="text-white font-medium">{table.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {table.records.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {table.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {table.engine}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(table.lastUpdated).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-emerald-400 hover:text-emerald-300 transition-colors mr-3">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <BarChart3Icon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBackups = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Backup History</h3>
        <div className="text-sm text-gray-400">
          Last backup: {new Date(stats.lastBackup).toLocaleString()}
        </div>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Filename
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {backupHistory.map((backup) => (
                <tr key={backup.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {backup.filename}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {backup.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      backup.type === 'automatic' 
                        ? 'text-blue-400 bg-blue-500/20' 
                        : 'text-green-400 bg-green-500/20'
                    }`}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${getBackupStatusColor(backup.status)}`}>
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(backup.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-emerald-400 hover:text-emerald-300 transition-colors mr-3">
                      <DownloadIcon className="h-4 w-4" />
                    </button>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <UploadIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Database Management</h1>
            <p className="text-gray-400">Monitor and manage your database</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="flex items-center text-sm text-gray-300">
              <ServerIcon className="h-4 w-4 mr-2" />
              Supabase PostgreSQL
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <nav className="flex space-x-1 mb-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <IconComponent className="mr-2 h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Tab Content */}
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <RefreshCwIcon className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'tables' && renderTables()}
              {activeTab === 'backups' && renderBackups()}
              {activeTab === 'query' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">SQL Query</label>
                    <textarea
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white font-mono text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="SELECT * FROM users LIMIT 10;"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleQuery}
                      className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Execute Query
                    </button>
                    <button
                      onClick={() => setSqlQuery('')}
                      className="flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  
                  {queryResult && (
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-green-400 text-sm">Query executed successfully</span>
                        <span className="text-gray-400 text-sm">
                          {queryResult.affectedRows} rows, {queryResult.executionTime}
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-slate-600">
                              {queryResult.columns.map((col: string) => (
                                <th key={col} className="text-left py-2 px-3 text-gray-300">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {queryResult.rows.map((row: any[], index: number) => (
                              <tr key={index} className="border-b border-slate-700">
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="py-2 px-3 text-gray-300">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white">Database Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-md font-medium text-white">Backup Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Automatic Backups</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Backup Frequency</label>
                          <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-md font-medium text-white">Connection Settings</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Connection Pool Size</label>
                          <input
                            type="number"
                            defaultValue="20"
                            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Query Timeout (seconds)</label>
                          <input
                            type="number"
                            defaultValue="30"
                            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DatabaseManagement;
