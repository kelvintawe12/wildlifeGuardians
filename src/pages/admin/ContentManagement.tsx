
import React, { useEffect, useState } from 'react';
import { FileTextIcon, AwardIcon, BookOpenIcon, PlusIcon, EditIcon, Trash2Icon } from 'lucide-react';

// Replace with real API calls
const fetchContent = async () => {
  return {
    quizzes: [
      { id: 1, title: 'Wildlife Basics', questions: 10, updated: '2025-07-20' },
      { id: 2, title: 'Endangered Species', questions: 8, updated: '2025-07-18' },
    ],
    badges: [
      { id: 1, name: 'Conservation Hero', description: 'Awarded for 10 quiz completions' },
      { id: 2, name: 'Wildlife Expert', description: 'Awarded for 100% quiz score' },
    ],
    articles: [
      { id: 1, title: 'How to Help Wildlife', updated: '2025-07-15' },
      { id: 2, title: 'Conservation Tips', updated: '2025-07-10' },
    ],
  };
};

const ContentManagement: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchContent();
      setContent(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 lg:py-12">
      <div className="w-full max-w-5xl mx-auto px-2 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <BookOpenIcon className="h-7 w-7 text-emerald-700" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-['Playfair_Display']">Content Management</h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading content...</div>
        ) : (
          <div className="space-y-10">
            {/* Quizzes */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <FileTextIcon className="h-6 w-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-blue-700">Quizzes</h2>
                <button className="ml-auto flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-semibold">
                  <PlusIcon className="h-4 w-4" /> Add Quiz
                </button>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Title</th>
                      <th className="py-2">Questions</th>
                      <th className="py-2">Last Updated</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.quizzes.map((quiz: any) => (
                      <tr key={quiz.id} className="border-b hover:bg-emerald-50/40">
                        <td className="py-2 font-medium">{quiz.title}</td>
                        <td className="py-2">{quiz.questions}</td>
                        <td className="py-2">{quiz.updated}</td>
                        <td className="py-2 flex gap-2">
                          <button className="text-blue-600 hover:underline" title="Edit"><EditIcon className="h-4 w-4" /></button>
                          <button className="text-red-600 hover:underline" title="Delete"><Trash2Icon className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/* Badges */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <AwardIcon className="h-6 w-6 text-yellow-600" />
                <h2 className="text-lg font-semibold text-yellow-700">Badges</h2>
                <button className="ml-auto flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-semibold">
                  <PlusIcon className="h-4 w-4" /> Add Badge
                </button>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Name</th>
                      <th className="py-2">Description</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.badges.map((badge: any) => (
                      <tr key={badge.id} className="border-b hover:bg-yellow-50/40">
                        <td className="py-2 font-medium">{badge.name}</td>
                        <td className="py-2">{badge.description}</td>
                        <td className="py-2 flex gap-2">
                          <button className="text-blue-600 hover:underline" title="Edit"><EditIcon className="h-4 w-4" /></button>
                          <button className="text-red-600 hover:underline" title="Delete"><Trash2Icon className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/* Articles / Educational Content */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpenIcon className="h-6 w-6 text-emerald-600" />
                <h2 className="text-lg font-semibold text-emerald-700">Educational Content</h2>
                <button className="ml-auto flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-semibold">
                  <PlusIcon className="h-4 w-4" /> Add Article
                </button>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Title</th>
                      <th className="py-2">Last Updated</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.articles.map((article: any) => (
                      <tr key={article.id} className="border-b hover:bg-emerald-50/40">
                        <td className="py-2 font-medium">{article.title}</td>
                        <td className="py-2">{article.updated}</td>
                        <td className="py-2 flex gap-2">
                          <button className="text-blue-600 hover:underline" title="Edit"><EditIcon className="h-4 w-4" /></button>
                          <button className="text-red-600 hover:underline" title="Delete"><Trash2Icon className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
