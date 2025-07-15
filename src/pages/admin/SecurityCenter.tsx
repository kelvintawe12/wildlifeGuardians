import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  ShieldIcon,
  AlertTriangleIcon,
  KeyIcon,
  EyeIcon,
  RefreshCwIcon,
  SearchIcon,
  MapPinIcon,
  ClockIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  CheckCircleIcon,
  XCircleIcon,
  BanIcon
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login_success' | 'login_failed' | 'password_change' | 'account_locked' | 'suspicious_activity';
  user: string;
  userRole: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating';
  details: string;
}

interface SecurityMetrics {
  totalEvents: number;
  criticalAlerts: number;
  failedLogins: number;
  suspiciousIPs: number;
  blockedAttempts: number;
}

const SecurityCenter: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalAlerts: 0,
    failedLogins: 0,
    suspiciousIPs: 0,
    blockedAttempts: 0
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with real API call
  useEffect(() => {
    const mockEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'login_failed',
        user: 'unknown',
        userRole: 'guest',
        timestamp: '2025-07-15T10:30:00Z',
        ipAddress: '203.0.113.42',
        location: 'Moscow, Russia',
        device: 'Desktop',
        userAgent: 'curl/7.68.0',
        severity: 'high',
        status: 'investigating',
        details: 'Multiple failed login attempts with different usernames'
      },
      {
        id: '2',
        type: 'suspicious_activity',
        user: 'admin@wildlifeguardians.com',
        userRole: 'super_admin',
        timestamp: '2025-07-15T10:25:00Z',
        ipAddress: '192.168.1.100',
        location: 'San Francisco, CA',
        device: 'Mobile',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
        severity: 'medium',
        status: 'resolved',
        details: 'Admin login from unusual location'
      },
      {
        id: '3',
        type: 'password_change',
        user: 'user@example.com',
        userRole: 'user',
        timestamp: '2025-07-15T10:20:00Z',
        ipAddress: '192.168.1.50',
        location: 'New York, NY',
        device: 'Desktop',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        severity: 'low',
        status: 'active',
        details: 'User changed password successfully'
      },
      {
        id: '4',
        type: 'account_locked',
        user: 'test@example.com',
        userRole: 'user',
        timestamp: '2025-07-15T10:15:00Z',
        ipAddress: '203.0.113.100',
        location: 'Unknown',
        device: 'Desktop',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
        severity: 'critical',
        status: 'investigating',
        details: 'Account locked due to 5 consecutive failed login attempts'
      }
    ];

    const mockMetrics: SecurityMetrics = {
      totalEvents: mockEvents.length,
      criticalAlerts: mockEvents.filter(e => e.severity === 'critical').length,
      failedLogins: mockEvents.filter(e => e.type === 'login_failed').length,
      suspiciousIPs: 3,
      blockedAttempts: 12
    };

    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setMetrics(mockMetrics);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.ipAddress.includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(event => event.severity === selectedSeverity);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(event => event.status === selectedStatus);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedSeverity, selectedType, selectedStatus]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-400 bg-green-500/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20';
      case 'active': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login_success': return CheckCircleIcon;
      case 'login_failed': return XCircleIcon;
      case 'password_change': return KeyIcon;
      case 'account_locked': return BanIcon;
      case 'suspicious_activity': return AlertTriangleIcon;
      default: return ShieldIcon;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return SmartphoneIcon;
      case 'tablet': return TabletIcon;
      case 'desktop': return MonitorIcon;
      default: return MonitorIcon;
    }
  };

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Security Center</h1>
            <p className="text-gray-400">Monitor security events and threats</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="flex items-center text-green-400 text-sm">
              <ShieldIcon className="h-4 w-4 mr-2" />
              System Secure
            </div>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { label: 'Total Events', value: metrics.totalEvents, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
            { label: 'Critical Alerts', value: metrics.criticalAlerts, color: 'text-red-400', bgColor: 'bg-red-500/20' },
            { label: 'Failed Logins', value: metrics.failedLogins, color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
            { label: 'Suspicious IPs', value: metrics.suspiciousIPs, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
            { label: 'Blocked Attempts', value: metrics.blockedAttempts, color: 'text-green-400', bgColor: 'bg-green-500/20' }
          ].map((metric, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className={`p-3 rounded-lg ${metric.bgColor} mb-4 w-fit`}>
                <ShieldIcon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-gray-400 text-sm">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="login_success">Login Success</option>
              <option value="login_failed">Login Failed</option>
              <option value="password_change">Password Change</option>
              <option value="account_locked">Account Locked</option>
              <option value="suspicious_activity">Suspicious Activity</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>

            {/* Refresh Button */}
            <button className="flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Security Events */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <RefreshCwIcon className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4 p-6">
              {filteredEvents.map((event) => {
                const TypeIcon = getTypeIcon(event.type);
                const DeviceIcon = getDeviceIcon(event.device);
                
                return (
                  <div key={event.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-medium">{formatEventType(event.type)}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(event.severity)}`}>
                              {event.severity.toUpperCase()}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                              {event.status}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-3">{event.details}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <EyeIcon className="h-4 w-4 mr-2" />
                              <span>{event.user} ({event.userRole})</span>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-2" />
                              <span>{event.ipAddress} - {event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <DeviceIcon className="h-4 w-4 mr-2" />
                              <span>{event.device}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-400 ml-4">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <ShieldIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No security events found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SecurityCenter;
