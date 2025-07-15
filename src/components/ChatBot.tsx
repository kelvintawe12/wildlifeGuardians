import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircleIcon, 
  SendIcon, 
  XIcon, 
  BotIcon,
  UserIcon,
  MinimizeIcon,
  MaximizeIcon,
  HelpCircleIcon,
  AwardIcon,
  BookOpenIcon,
  SettingsIcon,
  ShieldIcon,
  TreePineIcon,
  InfoIcon,
  RefreshCwIcon,
  StarIcon,
  TrendingUpIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  actions?: ChatAction[];
}

interface ChatAction {
  label: string;
  type: 'navigate' | 'external' | 'function';
  value: string;
}

interface ChatBotKnowledge {
  [key: string]: {
    response: string;
    suggestions?: string[];
    actions?: ChatAction[];
  };
}

const ChatBot: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Comprehensive knowledge base about the platform
  const knowledgeBase: ChatBotKnowledge = {
    // Greetings
    'hello': {
      response: `Hello ${user?.user_metadata?.name || 'there'}! 🌿 I'm your Wildlife Guardians assistant. I'm here to help you navigate our conservation education platform. What would you like to know?`,
      suggestions: ['How do I take a quiz?', 'Tell me about badges', 'Conservation tips', 'Account help'],
      actions: [
        { label: 'Go to Dashboard', type: 'navigate', value: '/' },
        { label: 'View Badges', type: 'navigate', value: '/badges' }
      ]
    },
    'hi': {
      response: `Hi ${user?.user_metadata?.name || 'there'}! 🦁 Welcome to Wildlife Guardians! I can help you with quizzes, badges, conservation information, and platform navigation. How can I assist you today?`,
      suggestions: ['Show me available quizzes', 'How to earn badges?', 'Privacy settings', 'Learning progress'],
      actions: [
        { label: 'Take a Quiz', type: 'navigate', value: '/' },
        { label: 'Check Settings', type: 'navigate', value: '/settings' }
      ]
    },

    // Platform Navigation
    'dashboard': {
      response: 'Your dashboard is your home base! 🏠 Here you can see your learning progress, recent quiz scores, earned badges, and conservation tips. You can also find new quizzes and track your journey in wildlife conservation education.',
      suggestions: ['Take a new quiz', 'View my badges', 'Check my progress', 'Conservation tips'],
      actions: [{ label: 'Go to Dashboard', type: 'navigate', value: '/' }]
    },
    'navigation': {
      response: 'Getting around is easy! Use the top navigation bar to access: Dashboard (home), Badges (achievements), Settings (account preferences). The footer has links to About Us, Contact, Privacy Policy, and Terms of Service.',
      suggestions: ['How to change settings?', 'View privacy policy', 'Contact support', 'About Wildlife Guardians'],
      actions: [
        { label: 'Open Settings', type: 'navigate', value: '/settings' },
        { label: 'About Us', type: 'navigate', value: '/about' },
        { label: 'Contact Support', type: 'navigate', value: '/contact' }
      ]
    },

    // Quizzes
    'quiz': {
      response: 'Our quizzes cover amazing African wildlife! 🦒 We have categories like Wildlife, Conservation, Primates, Birds, Marine Life, and more. Each quiz has different difficulty levels (Beginner, Intermediate, Advanced) and durations (10-25 minutes).',
      suggestions: ['Beginner quizzes', 'Advanced challenges', 'Conservation quizzes', 'My quiz history'],
      actions: [{ label: 'Browse Quizzes', type: 'navigate', value: '/' }]
    },
    'take quiz': {
      response: 'To take a quiz: 1) Go to your Dashboard 2) Browse available quizzes 3) Click on any quiz that interests you 4) Read the description and difficulty level 5) Click "Start Quiz" 6) Answer questions and submit when done! 📚',
      suggestions: ['Quiz difficulty levels', 'Quiz categories', 'Quiz scoring', 'Time limits'],
      actions: [{ label: 'Start Learning', type: 'navigate', value: '/' }]
    },
    'quiz categories': {
      response: 'We offer diverse quiz categories: 🌍 Wildlife (Big Five, antelopes), Conservation (protection efforts), Primates (intelligence), Birds (migration), Marine Life (coastal ecosystems), Reptiles, Nocturnal animals, and Ecosystems!',
      suggestions: ['African Big Five quiz', 'Conservation heroes', 'Primate intelligence', 'Bird migration']
    },
    'difficulty': {
      response: 'Quiz difficulty levels: 🎯 Beginner (8-10 questions, basic concepts), Intermediate (10-15 questions, moderate complexity), Advanced (15-20+ questions, detailed knowledge). Start with Beginner and work your way up!',
      suggestions: ['Beginner quizzes', 'Intermediate challenges', 'Advanced quizzes', 'My skill level']
    },

    // Badges & Achievements
    'badges': {
      response: 'Badges show your conservation journey! 🏆 Earn them by completing quizzes, reaching milestones, and demonstrating wildlife knowledge. Categories include Learning badges, Conservation badges, and Special achievements.',
      suggestions: ['How to earn badges?', 'My badge collection', 'Badge categories', 'Rare badges'],
      actions: [{ label: 'View My Badges', type: 'navigate', value: '/badges' }]
    },
    'earn badges': {
      response: 'Earn badges by: ✨ Completing your first quiz (Welcome badge), scoring 80%+ (Excellence badges), finishing quiz categories (Specialist badges), taking quizzes daily (Dedication badges), and reaching score milestones (Achievement badges)!',
      suggestions: ['Badge requirements', 'My progress', 'Special challenges', 'Badge rewards'],
      actions: [{ label: 'Check My Progress', type: 'navigate', value: '/badges' }]
    },

    // Account & Settings
    'account': {
      response: 'Manage your account in Settings! ⚙️ Update your profile, change preferences (theme, language, timezone), manage notifications, privacy settings, security options, and data management. Your learning journey, your way!',
      suggestions: ['Change password', 'Privacy settings', 'Notification preferences', 'Theme options'],
      actions: [{ label: 'Open Settings', type: 'navigate', value: '/settings' }]
    },
    'settings': {
      response: 'Settings has 6 sections: 👤 Profile (name, bio, photo), Preferences (theme, language), Notifications (email, push), Privacy (visibility, data sharing), Security (2FA, sessions), Data & Storage (offline data, export).',
      suggestions: ['Update profile', 'Change theme', 'Privacy options', 'Security settings'],
      actions: [{ label: 'Go to Settings', type: 'navigate', value: '/settings' }]
    },
    'privacy': {
      response: 'Your privacy matters! 🔒 Control profile visibility (public/friends/private), manage data sharing, notification preferences, and account security. We protect your data and give you full control over your information.',
      suggestions: ['Privacy policy', 'Data protection', 'Profile visibility', 'Data export'],
      actions: [
        { label: 'Privacy Settings', type: 'navigate', value: '/settings' },
        { label: 'Privacy Policy', type: 'navigate', value: '/privacy' }
      ]
    },

    // Help & Support
    'help': {
      response: 'Need help? 🆘 I\'m here 24/7! Also check our Help Center, contact support, browse FAQs, or visit our About page. We\'re committed to supporting your wildlife conservation learning journey!',
      suggestions: ['Contact support', 'FAQs', 'Technical issues', 'Learning tips'],
      actions: [
        { label: 'Help Center', type: 'navigate', value: '/help' },
        { label: 'Contact Support', type: 'navigate', value: '/contact' }
      ]
    },
    'contact': {
      response: 'Reach us anytime! 📞 Email: support@wildlifeguardians.org, Phone: +1-800-WILDLIFE, or use our Contact form. We typically respond within 24 hours. For urgent issues, use the priority support option.',
      suggestions: ['Email support', 'Priority support', 'Feedback', 'Bug reports'],
      actions: [{ label: 'Contact Form', type: 'navigate', value: '/contact' }]
    }
  };

  // Enhanced quick action buttons with navigation
  const quickActions = [
    { label: 'Take a Quiz', icon: BookOpenIcon, action: () => navigate('/') },
    { label: 'My Badges', icon: AwardIcon, action: () => navigate('/badges') },
    { label: 'Settings', icon: SettingsIcon, action: () => navigate('/settings') },
    { label: 'Conservation Tips', icon: TreePineIcon, action: () => handleQuickAction('Give me conservation tips') },
    { label: 'Help Center', icon: HelpCircleIcon, action: () => navigate('/help') },
    { label: 'Privacy', icon: ShieldIcon, action: () => navigate('/privacy') }
  ];

  // Handle chat actions
  const handleChatAction = (action: ChatAction) => {
    switch (action.type) {
      case 'navigate':
        navigate(action.value);
        setConversationCount(prev => prev + 1);
        break;
      case 'external':
        window.open(action.value, '_blank');
        break;
      case 'function':
        // Handle custom functions if needed
        break;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: generateId(),
          content: `Welcome to Wildlife Guardians! 🌍 I'm your AI assistant, here to help you learn about African wildlife conservation. I can help you with quizzes, badges, platform navigation, and conservation education. How can I assist you today?`,
          isBot: true,
          timestamp: new Date(),
          suggestions: ['Platform tour', 'Take a quiz', 'Learn about conservation', 'Account help'],
          actions: [
            { label: 'Start Learning', type: 'navigate', value: '/' },
            { label: 'View Help', type: 'navigate', value: '/help' }
          ]
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickAction = (message: string) => {
    setInputValue(message);
    setTimeout(() => handleSendMessage(message), 100);
  };

  const findBestResponse = (input: string): { response: string; suggestions?: string[]; actions?: ChatAction[] } => {
    const lowercaseInput = input.toLowerCase();
    
    // Direct keyword matches
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowercaseInput.includes(key)) {
        return value;
      }
    }

    // Contextual matches
    if (lowercaseInput.includes('score') || lowercaseInput.includes('result')) {
      return knowledgeBase['progress'] || { response: 'Let me help you with your progress!' };
    }
    if (lowercaseInput.includes('animal') || lowercaseInput.includes('wildlife')) {
      return knowledgeBase['big five'] || { response: 'Let me tell you about African wildlife!' };
    }
    if (lowercaseInput.includes('learn') || lowercaseInput.includes('education')) {
      return knowledgeBase['quiz'] || { response: 'Let me help you with learning!' };
    }
    if (lowercaseInput.includes('problem') || lowercaseInput.includes('issue')) {
      return knowledgeBase['technical'] || { response: 'Let me help you with technical issues!' };
    }
    if (lowercaseInput.includes('thank')) {
      return {
        response: `You're welcome! 😊 I'm always here to help you on your wildlife conservation journey. Feel free to ask me anything about the platform, quizzes, or African wildlife!`,
        suggestions: ['Take another quiz', 'Learn something new', 'Check my progress', 'Conservation tips'],
        actions: [{ label: 'Continue Learning', type: 'navigate', value: '/' }]
      };
    }

    // Default response
    return {
      response: `I'd love to help you with that! 🤔 I can assist with quizzes, badges, conservation education, account settings, platform navigation, and wildlife information. Could you be more specific about what you'd like to know?`,
      suggestions: ['Available quizzes', 'How to earn badges', 'Conservation information', 'Platform help'],
      actions: [
        { label: 'Browse Quizzes', type: 'navigate', value: '/' },
        { label: 'Get Help', type: 'navigate', value: '/help' }
      ]
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse = findBestResponse(text);
      const botMessage: Message = {
        id: generateId(),
        content: botResponse.response,
        isBot: true,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
        actions: botResponse.actions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQuickAction(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationCount(0);
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: generateId(),
        content: `Fresh start! 🔄 I'm ready to help you with anything about Wildlife Guardians. What would you like to explore today?`,
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Take a quiz', 'Learn about badges', 'Conservation tips', 'Platform help'],
        actions: [
          { label: 'Browse Quizzes', type: 'navigate', value: '/' },
          { label: 'My Progress', type: 'navigate', value: '/badges' }
        ]
      };
      setMessages([welcomeMessage]);
    }, 300);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        aria-label="Open chat assistant"
      >
        <MessageCircleIcon className="h-6 w-6" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          ?
        </div>
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Wildlife Assistant
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
      isMinimized ? 'h-16 w-80' : 'h-96 w-80 md:w-96'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-full">
            <BotIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Wildlife Assistant</h3>
            <p className="text-xs text-emerald-100">Always here to help 🌿</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetConversation}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            title="Reset conversation"
          >
            <RefreshCwIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            {isMinimized ? <MaximizeIcon className="h-4 w-4" /> : <MinimizeIcon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Actions */}
          <div className="p-3 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-2">
              {quickActions.slice(0, 6).map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex flex-col items-center p-2 text-xs text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <IconComponent className="h-4 w-4 mb-1" />
                    <span className="text-xs leading-tight">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto h-48 p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[75%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                  {message.isBot && (
                    <div className="flex items-center mb-1">
                      <BotIcon className="h-4 w-4 text-emerald-600 mr-2" />
                      <span className="text-xs text-gray-500">Wildlife Assistant</span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full hover:bg-emerald-200 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  {message.actions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleChatAction(action)}
                          className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors flex items-center"
                        >
                          {action.type === 'navigate' && <TrendingUpIcon className="h-3 w-3 mr-1" />}
                          {action.type === 'external' && <StarIcon className="h-3 w-3 mr-1" />}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {!message.isBot && (
                  <div className="order-2 ml-2">
                    <UserIcon className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-2xl">
                  <BotIcon className="h-4 w-4 text-emerald-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about wildlife conservation..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="p-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white rounded-full transition-colors"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
