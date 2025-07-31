import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from '../services/apiClient';
import { PlayIcon, ArrowRightIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Quiz {
  id: string;
  title: string;
  description: string;
  image_url: string;
  difficulty?: string;
}

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Failed to load quizzes:', error);
        toast.error('Failed to load quizzes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold mb-6 font-['Playfair_Display']">All Quizzes</h1>
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No quizzes available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="card group cursor-pointer overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={quiz.image_url}
                    alt={quiz.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                      {quiz.difficulty || 'Medium'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{quiz.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                  >
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;
