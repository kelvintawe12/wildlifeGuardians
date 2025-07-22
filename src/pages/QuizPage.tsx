import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomAuth } from '../contexts/CustomAuthContext';
import { getQuizById, saveQuizResult, awardBadge } from '../services/supabaseClient';
import { CheckIcon, XIcon, ArrowRightIcon, AwardIcon, HomeIcon } from 'lucide-react';
import { toast } from 'sonner';
interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}
interface Quiz {
  id: string;
  title: string;
  description: string;
  image_url: string;
  questions: Question[];
}
const QuizPage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    user
  } = useCustomAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [badgeEarned, setBadgeEarned] = useState<string | null>(null);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        const quizData = await getQuizById(id);
        setQuiz(quizData);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        toast.error('Failed to load quiz');
        // For demo purposes, use sample quiz if API fails
        setQuiz(sampleQuiz);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIndex);
  };
  const handleNextQuestion = () => {
    if (!quiz) return;
    // If answer not submitted yet, submit it first
    if (!isAnswerSubmitted) {
      handleSubmitAnswer();
      return;
    }
    // Reset for next question
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    // Move to next question or complete quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };
  const handleSubmitAnswer = () => {
    if (!quiz || selectedOption === null) return;
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswerSubmitted(true);
  };
  const completeQuiz = async () => {
    if (!quiz || !user) return;
    setQuizCompleted(true);
    try {
      // Calculate percentage score
      const percentage = score / quiz.questions.length * 100;
      // Save quiz result
      await saveQuizResult(user.id, quiz.id, percentage);
      // Award badge if score is good enough
      if (percentage >= 80) {
        const badgeType = `${quiz.title} Expert`;
        await awardBadge(user.id, badgeType);
        setBadgeEarned(badgeType);
        toast.success(`You earned the "${badgeType}" badge!`);
      }
    } catch (error) {
      console.error('Error saving quiz result:', error);
      toast.error('Failed to save quiz results');
    }
  };
  // Sample quiz data for demonstration
  const sampleQuiz: Quiz = {
    id: '1',
    title: 'Mountain Gorillas',
    description: "Test your knowledge about Rwanda's endangered mountain gorillas",
    image_url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    questions: [{
      id: '1',
      text: 'What is the conservation status of mountain gorillas?',
      options: ['Least Concern', 'Vulnerable', 'Endangered', 'Critically Endangered'],
      correctAnswer: 2
    }, {
      id: '2',
      text: 'Where are mountain gorillas found?',
      options: ['Throughout Central Africa', 'Only in Rwanda', 'Rwanda, Uganda, and Democratic Republic of Congo', 'Kenya and Tanzania'],
      correctAnswer: 2
    }, {
      id: '3',
      text: 'What is the main threat to mountain gorillas?',
      options: ['Climate change', 'Habitat loss', 'Disease', 'All of the above'],
      correctAnswer: 3
    }, {
      id: '4',
      text: 'How many mountain gorillas are estimated to remain in the wild?',
      options: ['Less than 100', 'Around 500', 'About 1,000', 'Over 5,000'],
      correctAnswer: 2
    }, {
      id: '5',
      text: 'What conservation effort has been most successful for mountain gorillas?',
      options: ['Captive breeding programs', 'Ecotourism', 'Relocation to safer areas', 'Building fences around habitats'],
      correctAnswer: 1
    }]
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>;
  }
  if (!quiz) {
    return <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">Quiz not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
          <HomeIcon className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>;
  }
  if (quizCompleted) {
    return <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 mb-4">
              <AwardIcon className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Quiz Completed!
            </h2>
            <p className="text-gray-600">
              You scored {score} out of {quiz.questions.length} questions
              correctly.
            </p>
            <div className="mt-4 mb-6">
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{
                width: `${score / quiz.questions.length * 100}%`
              }}></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {Math.round(score / quiz.questions.length * 100)}% correct
              </p>
            </div>
          </div>
          {badgeEarned && <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <AwardIcon className="h-8 w-8 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  New Badge Earned!
                </h3>
              </div>
              <p className="text-gray-600">{badgeEarned}</p>
            </div>}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/')} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
              <HomeIcon className="h-4 w-4 mr-2" />
              Back to Home
            </button>
            <button onClick={() => navigate(`/animal/${id}`)} className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md shadow-sm text-green-600 bg-white hover:bg-green-50">
              Learn More About {quiz.title}
            </button>
          </div>
        </div>
      </div>;
  }
  const currentQuestion = quiz.questions[currentQuestionIndex];
  return <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Quiz header */}
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-xl font-bold">{quiz.title}</h1>
        <div className="flex justify-between items-center mt-2">
          <p className="text-green-100 text-sm">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Score: {score}</span>
            <div className="h-2 w-20 bg-green-300 bg-opacity-30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{
              width: `${score / quiz.questions.length * 100}%`
            }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Question content */}
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {currentQuestion.text}
        </h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => <button key={index} onClick={() => handleOptionSelect(index)} className={`w-full text-left p-3 rounded-md border ${selectedOption === index ? isAnswerSubmitted ? index === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors duration-200`} disabled={isAnswerSubmitted}>
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswerSubmitted && selectedOption === index && (index === currentQuestion.correctAnswer ? <CheckIcon className="h-5 w-5 text-green-500" /> : <XIcon className="h-5 w-5 text-red-500" />)}
                {isAnswerSubmitted && selectedOption !== index && index === currentQuestion.correctAnswer && <CheckIcon className="h-5 w-5 text-green-500" />}
              </div>
            </button>)}
        </div>
        {isAnswerSubmitted && <div className={`mt-4 p-3 rounded-md ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
            <p className="text-sm">
              {selectedOption === currentQuestion.correctAnswer ? 'Correct! Well done.' : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
            </p>
          </div>}
      </div>
      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <div>
          <span className="text-sm text-gray-500">
            {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
        </div>
        <button onClick={handleNextQuestion} disabled={selectedOption === null} className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${selectedOption === null ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
          {!isAnswerSubmitted ? 'Submit' : currentQuestionIndex < quiz.questions.length - 1 ? <>
              Next <ArrowRightIcon className="ml-1 h-4 w-4" />
            </> : 'Complete Quiz'}
        </button>
      </div>
    </div>;
};
export default QuizPage;