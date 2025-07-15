import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  BookOpenIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  CheckCircleIcon
} from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  questions: number;
  completions: number;
  averageScore: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const QuizManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [quizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'African Big Five Safari',
      description: 'Test your knowledge about Africa\'s most famous wildlife',
      category: 'Wildlife',
      difficulty: 'intermediate',
      duration: 15,
      questions: 12,
      completions: 892,
      averageScore: 78.5,
      status: 'published',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-11-20')
    },
    {
      id: '2',
      title: 'Conservation Heroes',
      description: 'Learn about famous conservationists and their contributions',
      category: 'Conservation',
      difficulty: 'advanced',
      duration: 20,
      questions: 15,
      completions: 456,
      averageScore: 82.1,
      status: 'published',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-12-01')
    },
    {
      id: '3',
      title: 'Primate Intelligence',
      description: 'Explore the cognitive abilities of African primates',
      category: 'Primates',
      difficulty: 'advanced',
      duration: 25,
      questions: 18,
      completions: 234,
      averageScore: 75.3,
      status: 'published',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-10-15')
    },
    {
      id: '4',
      title: 'Bird Migration Patterns',
      description: 'Understanding African bird migration routes',
      category: 'Birds',
      difficulty: 'intermediate',
      duration: 18,
      questions: 14,
      completions: 0,
      averageScore: 0,
      status: 'draft',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-10')
    }
  ]);

  const categories = ['Wildlife', 'Conservation', 'Primates', 'Birds', 'Marine Life', 'Ecosystems'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || quiz.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'draft': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const stats = {
    total: quizzes.length,
    published: quizzes.filter(q => q.status === 'published').length,
    draft: quizzes.filter(q => q.status === 'draft').length,
    totalCompletions: quizzes.reduce((sum, q) => sum + q.completions, 0)
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Management</h1>
            <p className="text-gray-400">Create, edit, and manage educational quizzes</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Quiz
            </button>
            <button className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              <TrendingUpIcon className="h-4 w-4 mr-2" />
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Quizzes</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <BookOpenIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Published</p>
                <p className="text-2xl font-bold text-white">{stats.published}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-white">{stats.draft}</p>
              </div>
              <EditIcon className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Completions</p>
                <p className="text-2xl font-bold text-white">{stats.totalCompletions.toLocaleString()}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quizzes by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FilterIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-200">
              {/* Header */}
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2 truncate">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {quiz.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-gray-400 hover:text-emerald-400 transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-400 transition-colors">
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 transition-colors">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(quiz.status)}`}>
                    {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">{quiz.duration}min</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">{quiz.completions} completed</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">{quiz.averageScore}% avg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {formatDate(quiz.createdAt)}</span>
                  <span>Updated: {formatDate(quiz.updatedAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 mt-4">
                  {quiz.status === 'published' && (
                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors">
                      <PlayIcon className="h-4 w-4 mr-1" />
                      Preview
                    </button>
                  )}
                  {quiz.status === 'draft' && (
                    <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Publish
                    </button>
                  )}
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-slate-600/50 text-gray-300 rounded-lg text-sm hover:bg-slate-600/70 transition-colors">
                    <EditIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No quizzes found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuizManagement;
