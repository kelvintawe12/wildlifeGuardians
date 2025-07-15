import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  ActivityIcon,
  SearchIcon,
  DownloadIcon,
  UserIcon,
  ShieldIcon,
  SettingsIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  RefreshCwIcon
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
  category: 'auth' | 'user' | 'content' | 'system' | 'security';
}

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Mock data - replace with real API call
  useEffect(() => {
    const mockLogs: AuditLog[] = [
      {
        id: '1',
        timestamp: '2025-07-15T10:30:00Z',
        user: 'admin@wildlifeguardians.com',
        userRole: 'super_admin',
        action: 'User Created',
        resource: 'User',
        resourceId: 'user_123',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0...',
        status: 'success',
        details: 'Created new user account for john.doe@example.com',
        category: 'user'
      },
      {
        id: '2',
        timestamp: '2025-07-15T10:25:00Z',
        user: 'moderator@wildlifeguardians.com',
        userRole: 'moderator',
        action: 'Quiz Published',
        resource: 'Quiz',
        resourceId: 'quiz_456',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0...',
        status: 'success',
        details: 'Published quiz: Wildlife Conservation Basics',
        category: 'content'
      },
      {
        id: '3',
        timestamp: '2025-07-15T10:20:00Z',
        user: 'system',
        userRole: 'system',
        action: 'Database Backup',
        resource: 'Database',
        ipAddress: '127.0.0.1',
        userAgent: 'System Process',
        status: 'success',
        details: 'Automated daily backup completed successfully',
        category: 'system'
      },
      {
        id: '4',
        timestamp: '2025-07-15T10:15:00Z',
        user: 'unknown',
        userRole: 'guest',
        action: 'Failed Login Attempt',
        resource: 'Authentication',
        ipAddress: '203.0.113.42',
        userAgent: 'curl/7.68.0',
        status: 'failed',
        details: 'Multiple failed login attempts detected',
        category: 'security'
      },
      {
        id: '5',
        timestamp: '2025-07-15T10:10:00Z',
        user: 'admin@wildlifeguardians.com',
        userRole: 'super_admin',
        action: 'Settings Updated',
        resource: 'System Settings',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0...',
        status: 'success',
        details: 'Updated email notification settings',
        category: 'system'
      }
    ];

    setTimeout(() => {
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(log => log.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(log => log.status === selectedStatus);
    }

    if (dateRange.start) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(dateRange.start));
    }

    if (dateRange.end) {
      filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(dateRange.end));
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, selectedCategory, selectedStatus, dateRange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'auth': return ShieldIcon;
      case 'user': return UserIcon;
      case 'content': return ActivityIcon;
      case 'system': return SettingsIcon;
      case 'security': return AlertCircleIcon;
      default: return ActivityIcon;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'auth': return 'text-blue-400 bg-blue-500/20';
      case 'user': return 'text-emerald-400 bg-emerald-500/20';
      case 'content': return 'text-purple-400 bg-purple-500/20';
      case 'system': return 'text-yellow-400 bg-yellow-500/20';
      case 'security': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'Status', 'IP Address', 'Details'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.userRole,
        log.action,
        log.resource,
        log.status,
        log.ipAddress,
        `"${log.details}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
            <p className="text-gray-400">Monitor system activities and user actions</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={exportLogs}
              className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              <option value="auth">Authentication</option>
              <option value="user">User Management</option>
              <option value="content">Content</option>
              <option value="system">System</option>
              <option value="security">Security</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>

            {/* Date Range */}
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <RefreshCwIcon className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredLogs.map((log) => {
                    const CategoryIcon = getCategoryIcon(log.category);
                    return (
                      <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-300">
                            <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-white">{log.user}</div>
                            <div className="text-xs text-gray-400">{log.userRole}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white">{log.action}</div>
                          <div className="text-xs text-gray-400">{log.resource}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getCategoryColor(log.category)}`}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {log.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(log.status)}`}>
                            {log.status === 'success' ? (
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircleIcon className="h-3 w-3 mr-1" />
                            )}
                            {log.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {log.ipAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Log Detail Modal */}
        {selectedLog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Log Details</h2>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Timestamp</label>
                    <p className="text-white">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">User</label>
                    <p className="text-white">{selectedLog.user} ({selectedLog.userRole})</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Action</label>
                    <p className="text-white">{selectedLog.action}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Resource</label>
                    <p className="text-white">{selectedLog.resource}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">IP Address</label>
                    <p className="text-white">{selectedLog.ipAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(selectedLog.status)}`}>
                      {selectedLog.status}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Details</label>
                  <p className="text-white bg-slate-700/50 p-3 rounded-lg">{selectedLog.details}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">User Agent</label>
                  <p className="text-gray-400 text-sm bg-slate-700/50 p-3 rounded-lg font-mono">
                    {selectedLog.userAgent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AuditLogs;
