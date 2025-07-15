import React, { useState } from 'react';
import { 
  HelpCircleIcon, 
  BookOpenIcon, 
  MessageCircleIcon, 
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AwardIcon,
  SettingsIcon,
  BellIcon,
  ShieldIcon,
  TreePineIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpenIcon },
    { id: 'badges', label: 'Badges & Achievements', icon: AwardIcon },
    { id: 'quizzes', label: 'Quizzes & Learning', icon: HelpCircleIcon },
    { id: 'account', label: 'Account Settings', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy & Security', icon: ShieldIcon },
    { id: 'conservation', label: 'Conservation Info', icon: TreePineIcon }
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I get started with Wildlife Guardians?',
        answer: 'Welcome! After registering, you can start by exploring the dashboard, taking quizzes about different animals, and earning badges for your achievements. The platform is designed to be intuitive and educational.'
      },
      {
        question: 'What can I learn on this platform?',
        answer: 'You can learn about various wildlife species, their habitats, conservation status, and how to help protect them. Our quizzes cover topics like animal behavior, ecosystems, and conservation efforts.'
      },
      {
        question: 'Is the platform free to use?',
        answer: 'Yes! Wildlife Guardians is completely free to use. Our mission is to make wildlife education accessible to everyone, especially young learners interested in conservation.'
      }
    ],
    'badges': [
      {
        question: 'How do I earn badges?',
        answer: 'Badges are earned by completing quizzes, achieving high scores, learning about specific animals, and participating in conservation activities. Each badge represents a milestone in your wildlife education journey.'
      },
      {
        question: 'What types of badges are available?',
        answer: 'We offer various badges including: Wildlife Enthusiast, Conservation Champion, Quiz Master, Animal Expert, and species-specific badges for learning about particular animals.'
      },
      {
        question: 'Can I share my badges with others?',
        answer: 'Yes! Your badges are displayed on your profile, and depending on your privacy settings, they can be visible to other users. You can also share your achievements on social media.'
      }
    ],
    'quizzes': [
      {
        question: 'How do the quizzes work?',
        answer: 'Our quizzes are interactive and educational, featuring multiple-choice questions about wildlife. Each quiz focuses on specific animals or conservation topics and provides detailed explanations for each answer.'
      },
      {
        question: 'Can I retake quizzes?',
        answer: 'Absolutely! You can retake quizzes as many times as you want to improve your score and reinforce your learning. Each attempt helps you learn more about wildlife conservation.'
      },
      {
        question: 'How are quiz scores calculated?',
        answer: 'Quiz scores are based on the number of correct answers and the time taken to complete the quiz. Bonus points are awarded for consistent performance and completing quizzes quickly.'
      }
    ],
    'account': [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile to update your name, bio, location, and other profile details. You can also change your profile picture and manage your account preferences.'
      },
      {
        question: 'How do I change my password?',
        answer: 'In the Settings page, navigate to the Security tab where you can change your password. Make sure to use a strong password for better account security.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account from Settings > Data & Storage > Delete Account. Please note that this action is permanent and will remove all your progress and data.'
      }
    ],
    'notifications': [
      {
        question: 'How do I manage my notifications?',
        answer: 'Visit Settings > Notifications to customize which notifications you receive. You can enable or disable email notifications, push notifications, and choose specific types of alerts.'
      },
      {
        question: 'What types of notifications will I receive?',
        answer: 'You can receive notifications for new badges earned, quiz reminders, conservation updates, achievement alerts, and weekly progress digests.'
      },
      {
        question: 'How do I turn off all notifications?',
        answer: 'In the Notifications settings, you can disable all notification types or choose to receive only the most important ones like security alerts.'
      }
    ],
    'privacy': [
      {
        question: 'How is my data protected?',
        answer: 'We take privacy seriously and use industry-standard security measures to protect your data. Read our Privacy Policy for detailed information about how we collect, use, and protect your information.'
      },
      {
        question: 'Can I control who sees my profile?',
        answer: 'Yes! In Settings > Privacy, you can control your profile visibility, choose what information to share, and manage who can see your progress and badges.'
      },
      {
        question: 'Do you share my data with third parties?',
        answer: 'We do not sell your personal data. We may share anonymized data to help improve wildlife conservation efforts, but only with your consent and in accordance with our Privacy Policy.'
      }
    ],
    'conservation': [
      {
        question: 'How does this platform help wildlife conservation?',
        answer: 'By educating users about wildlife and conservation, we create awareness and inspire action. Informed individuals are more likely to support conservation efforts and make environmentally conscious decisions.'
      },
      {
        question: 'Can I contribute to real conservation efforts?',
        answer: 'While our platform focuses on education, we provide information about real conservation organizations and ways you can get involved in protecting wildlife in your area.'
      },
      {
        question: 'How accurate is the conservation information?',
        answer: 'All our content is researched and verified using reputable sources including IUCN, WWF, and scientific publications. We regularly update our information to ensure accuracy.'
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
              <HelpCircleIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 font-['Playfair_Display'] mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of Wildlife Guardians
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Topics</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <Link
                    to="/contact"
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <MessageCircleIcon className="h-4 w-4" />
                    <span>Contact Support</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-700"
                  >
                    <SettingsIcon className="h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                  <Link
                    to="/privacy"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-700"
                  >
                    <ShieldIcon className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  {categories.find(c => c.id === activeCategory)?.icon && 
                    React.createElement(categories.find(c => c.id === activeCategory)!.icon, {
                      className: "h-6 w-6 text-blue-600"
                    })
                  }
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find(c => c.id === activeCategory)?.label}
                </h2>
              </div>

              {/* FAQ Section */}
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 text-left flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 py-4 bg-white">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <HelpCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">
                      Try searching with different keywords or browse the categories on the left.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Support Card */}
            <div className="card p-6 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <div className="text-center">
                <MessageCircleIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
                <p className="text-gray-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <MessageCircleIcon className="h-5 w-5 mr-2" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
