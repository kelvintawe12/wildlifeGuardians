import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  SaveIcon,
  XIcon,
  StarIcon,
  TrophyIcon,
  MedalIcon,
  CrownIcon,
  ShieldIcon,
  UsersIcon,
  RefreshCwIcon
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  iconType: 'star' | 'trophy' | 'medal' | 'crown' | 'shield';
  color: string;
  criteria: string;
  isActive: boolean;
  earnedCount: number;
  createdAt: string;
  imageUrl?: string;
}

const BadgeManagement: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [filteredBadges, setFilteredBadges] = useState<Badge[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iconType: 'star' as Badge['iconType'],
    color: '#10B981',
    criteria: '',
    isActive: true
  });

  // Mock data - replace with real API call
  useEffect(() => {
    const mockBadges: Badge[] = [
      {
        id: '1',
        name: 'Wildlife Explorer',
        description: 'Complete your first wildlife quiz',
        iconType: 'star',
        color: '#10B981',
        criteria: 'Complete any quiz with a score of 70% or higher',
        isActive: true,
        earnedCount: 234,
        createdAt: '2025-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Conservation Champion',
        description: 'Complete 10 quizzes about conservation',
        iconType: 'trophy',
        color: '#F59E0B',
        criteria: 'Complete 10 different conservation-themed quizzes',
        isActive: true,
        earnedCount: 89,
        createdAt: '2025-01-15T00:00:00Z'
      },
      {
        id: '3',
        name: 'Perfect Score',
        description: 'Achieve 100% on any quiz',
        iconType: 'medal',
        color: '#EF4444',
        criteria: 'Score 100% on any quiz',
        isActive: true,
        earnedCount: 156,
        createdAt: '2025-01-15T00:00:00Z'
      },
      {
        id: '4',
        name: 'Knowledge Master',
        description: 'Complete all available quizzes',
        iconType: 'crown',
        color: '#8B5CF6',
        criteria: 'Complete every quiz in the platform',
        isActive: false,
        earnedCount: 12,
        createdAt: '2025-01-15T00:00:00Z'
      }
    ];

    setTimeout(() => {
      setBadges(mockBadges);
      setFilteredBadges(mockBadges);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter badges based on search
  useEffect(() => {
    const filtered = badges.filter(badge =>
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.criteria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBadges(filtered);
  }, [badges, searchTerm]);

  const getIconComponent = (iconType: Badge['iconType']) => {
    switch (iconType) {
      case 'star': return StarIcon;
      case 'trophy': return TrophyIcon;
      case 'medal': return MedalIcon;
      case 'crown': return CrownIcon;
      case 'shield': return ShieldIcon;
      default: return StarIcon;
    }
  };

  const handleCreate = () => {
    setEditingBadge(null);
    setFormData({
      name: '',
      description: '',
      iconType: 'star',
      color: '#10B981',
      criteria: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleEdit = (badge: Badge) => {
    setEditingBadge(badge);
    setFormData({
      name: badge.name,
      description: badge.description,
      iconType: badge.iconType,
      color: badge.color,
      criteria: badge.criteria,
      isActive: badge.isActive
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingBadge) {
      // Update existing badge
      setBadges(badges.map(badge =>
        badge.id === editingBadge.id
          ? { ...badge, ...formData }
          : badge
      ));
    } else {
      // Create new badge
      const newBadge: Badge = {
        id: Date.now().toString(),
        ...formData,
        earnedCount: 0,
        createdAt: new Date().toISOString()
      };
      setBadges([...badges, newBadge]);
    }
    setShowModal(false);
  };

  const handleDelete = (badgeId: string) => {
    if (confirm('Are you sure you want to delete this badge?')) {
      setBadges(badges.filter(badge => badge.id !== badgeId));
    }
  };

  const toggleStatus = (badgeId: string) => {
    setBadges(badges.map(badge =>
      badge.id === badgeId
        ? { ...badge, isActive: !badge.isActive }
        : badge
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Badge Management</h1>
            <p className="text-gray-400">Create and manage user achievement badges</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Badge
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>Total: {badges.length}</span>
              <span>Active: {badges.filter(b => b.isActive).length}</span>
              <span>Inactive: {badges.filter(b => !b.isActive).length}</span>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center p-12">
              <RefreshCwIcon className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            filteredBadges.map((badge) => {
              const IconComponent = getIconComponent(badge.iconType);
              return (
                <div
                  key={badge.id}
                  className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 ${
                    !badge.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${badge.color}20` }}
                    >
                      <IconComponent
                        className="h-6 w-6"
                        style={{ color: badge.color }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(badge)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(badge.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{badge.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{badge.description}</p>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Criteria</p>
                      <p className="text-sm text-white">{badge.criteria}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-300">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {badge.earnedCount} earned
                      </div>
                      <div className="flex items-center space-x-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={badge.isActive}
                            onChange={() => toggleStatus(badge.id)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                        <span className="text-xs text-gray-400">
                          {badge.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {editingBadge ? 'Edit Badge' : 'Create New Badge'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Badge Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter badge name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter badge description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Icon Type
                    </label>
                    <select
                      value={formData.iconType}
                      onChange={(e) => setFormData({ ...formData, iconType: e.target.value as Badge['iconType'] })}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="star">Star</option>
                      <option value="trophy">Trophy</option>
                      <option value="medal">Medal</option>
                      <option value="crown">Crown</option>
                      <option value="shield">Shield</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full h-10 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Earning Criteria
                  </label>
                  <textarea
                    value={formData.criteria}
                    onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Describe how users can earn this badge"
                  />
                </div>

                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                  <span className="ml-3 text-sm text-gray-300">Active Badge</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  <SaveIcon className="h-4 w-4 mr-2" />
                  {editingBadge ? 'Update' : 'Create'} Badge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BadgeManagement;
