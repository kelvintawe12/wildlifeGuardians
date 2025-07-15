import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  SaveIcon,
  XIcon,
  ImageIcon,
  VideoIcon,
  BookOpenIcon,
  UserIcon,
  RefreshCwIcon
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'infographic' | 'quiz' | 'guide';
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  viewCount: number;
  likes: number;
}

const ContentManagement: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState({
    title: '',
    type: 'article' as ContentItem['type'],
    category: '',
    status: 'draft' as ContentItem['status'],
    excerpt: '',
    content: '',
    tags: [] as string[],
    featuredImage: ''
  });

  const categories = [
    'Wildlife Conservation',
    'Marine Life',
    'Endangered Species',
    'Climate Change',
    'Habitat Protection',
    'Animal Behavior',
    'Ecology',
    'Environmental Policy'
  ];

  // Mock data - replace with real API call
  useEffect(() => {
    const mockContent: ContentItem[] = [
      {
        id: '1',
        title: 'Protecting African Elephants: A Conservation Success Story',
        type: 'article',
        category: 'Wildlife Conservation',
        status: 'published',
        author: 'Dr. Sarah Johnson',
        createdAt: '2025-07-10T10:00:00Z',
        updatedAt: '2025-07-12T14:30:00Z',
        publishedAt: '2025-07-12T14:30:00Z',
        excerpt: 'Learn about the remarkable conservation efforts that have helped increase African elephant populations.',
        content: 'Full article content here...',
        featuredImage: '/images/elephants.jpg',
        tags: ['elephants', 'conservation', 'africa'],
        viewCount: 1250,
        likes: 89
      },
      {
        id: '2',
        title: 'Ocean Plastic Pollution: What You Can Do',
        type: 'infographic',
        category: 'Marine Life',
        status: 'published',
        author: 'Marine Conservation Team',
        createdAt: '2025-07-08T09:00:00Z',
        updatedAt: '2025-07-08T09:00:00Z',
        publishedAt: '2025-07-08T09:00:00Z',
        excerpt: 'An infographic showing the impact of plastic pollution on marine ecosystems.',
        content: 'Infographic content...',
        featuredImage: '/images/ocean-plastic.jpg',
        tags: ['ocean', 'pollution', 'marine-life'],
        viewCount: 890,
        likes: 156
      },
      {
        id: '3',
        title: 'Understanding Climate Change Effects on Wildlife',
        type: 'video',
        category: 'Climate Change',
        status: 'draft',
        author: 'Climate Research Team',
        createdAt: '2025-07-05T16:00:00Z',
        updatedAt: '2025-07-14T11:00:00Z',
        excerpt: 'A comprehensive video explaining how climate change affects different wildlife species.',
        content: 'Video transcript and description...',
        tags: ['climate-change', 'wildlife', 'environment'],
        viewCount: 0,
        likes: 0
      }
    ];

    setTimeout(() => {
      setContent(mockContent);
      setFilteredContent(mockContent);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter content based on search and filters
  useEffect(() => {
    let filtered = content;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredContent(filtered);
  }, [content, searchTerm, selectedType, selectedStatus, selectedCategory]);

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return FileTextIcon;
      case 'video': return VideoIcon;
      case 'infographic': return ImageIcon;
      case 'quiz': return BookOpenIcon;
      case 'guide': return BookOpenIcon;
      default: return FileTextIcon;
    }
  };

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20';
      case 'archived': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleCreate = () => {
    setEditingContent(null);
    setFormData({
      title: '',
      type: 'article',
      category: '',
      status: 'draft',
      excerpt: '',
      content: '',
      tags: [],
      featuredImage: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingContent(item);
    setFormData({
      title: item.title,
      type: item.type,
      category: item.category,
      status: item.status,
      excerpt: item.excerpt,
      content: item.content,
      tags: item.tags,
      featuredImage: item.featuredImage || ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingContent) {
      // Update existing content
      setContent(content.map(item =>
        item.id === editingContent.id
          ? { 
              ...item, 
              ...formData, 
              updatedAt: new Date().toISOString(),
              publishedAt: formData.status === 'published' && item.status !== 'published' 
                ? new Date().toISOString() 
                : item.publishedAt
            }
          : item
      ));
    } else {
      // Create new content
      const newContent: ContentItem = {
        id: Date.now().toString(),
        ...formData,
        author: 'Current Admin User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined,
        viewCount: 0,
        likes: 0
      };
      setContent([newContent, ...content]);
    }
    setShowModal(false);
  };

  const handleDelete = (contentId: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContent(content.filter(item => item.id !== contentId));
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
            <p className="text-gray-400">Create and manage educational content</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Content
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="infographic">Infographics</option>
              <option value="quiz">Quizzes</option>
              <option value="guide">Guides</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex bg-slate-700/50 border border-slate-600 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center space-x-4">
              <span>Total: {content.length}</span>
              <span>Published: {content.filter(c => c.status === 'published').length}</span>
              <span>Drafts: {content.filter(c => c.status === 'draft').length}</span>
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center p-12">
              <RefreshCwIcon className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            filteredContent.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              
              if (viewMode === 'list') {
                return (
                  <div key={item.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="p-2 bg-slate-700/50 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{item.category}</span>
                            <span>By {item.author}</span>
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
                  {item.featuredImage && (
                    <div className="h-48 bg-slate-700/50 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs text-gray-400 uppercase">{item.type}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.excerpt}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{item.viewCount} views</span>
                        <span>{item.likes} likes</span>
                      </div>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-400">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {item.author}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {editingContent ? 'Edit Content' : 'Create New Content'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Enter content title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Brief description of the content"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Write your content here..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as ContentItem['type'] })}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="infographic">Infographic</option>
                        <option value="quiz">Quiz</option>
                        <option value="guide">Guide</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentItem['status'] })}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image URL</label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-emerald-400 hover:text-emerald-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tag and press Enter"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const target = e.target as HTMLInputElement;
                          addTag(target.value.trim());
                          target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-700">
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
                  {editingContent ? 'Update' : 'Create'} Content
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
