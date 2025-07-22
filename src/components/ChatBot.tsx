import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';

const BOT_AVATAR = (
  <span className="inline-block w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-white text-2xl shadow-lg border-2 border-white">🐾</span>
);
const USER_AVATAR = (
  <span className="inline-block w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xl shadow-lg border-2 border-white">🧑</span>
);

const initialMessages = [
  { sender: 'bot', text: 'Hi! I am your Wildlife Guardian ChatBot. Ask me anything about wildlife, conservation, or how to use this app!' }
];

function getBotResponse(question: string) {
  const q = question.toLowerCase();
  if (q.includes('animal')) return 'You can explore animal info from the Dashboard or search for a specific animal.';
  if (q.includes('badge')) return 'Badges are earned by completing quizzes and conservation actions!';
  if (q.includes('quiz')) return 'Quizzes test your wildlife knowledge. Try one from the Dashboard!';
  if (q.includes('conservation')) return 'Conservation is at the heart of our mission. Learn more in the About section.';
  if (q.includes('help')) return 'Visit the Help Center from the footer or Navbar for FAQs and support.';
  if (q.includes('contact')) return 'You can contact us via the Contact page linked in the footer.';
  if (q.includes('privacy')) return 'Your privacy is important! See our Privacy Policy for details.';
  if (q.includes('terms')) return 'Our Terms of Service are available in the footer.';
  if (q.includes('register') || q.includes('login')) return 'You can register or login from the main page. If you have issues, let us know!';
  if (q.includes('threats')) return 'Wildlife face threats like habitat loss, poaching, and climate change.';
  if (q.includes('about')) return 'Wildlife Guardians is dedicated to protecting wildlife through education and action.';
  return 'Sorry, I am still learning. Please check the Help Center or try rephrasing your question!';
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, open]);

  // Keyboard shortcut: open/close with Ctrl+Shift+C
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: getBotResponse(input) }]);
      setLoading(false);
    }, 900);
  };

  const chatRef = useRef<HTMLDivElement>(null);

  // Close chat on click outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!open && (
        <button
          className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-2xl flex items-center justify-center text-white text-4xl hover:scale-110 hover:shadow-emerald-400/50 transition-all duration-300 animate-bounce focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <span className="sr-only">Open ChatBot</span>
          <MessageCircleIcon className="h-8 w-8" />
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div ref={chatRef} className="w-96 max-w-xs sm:max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up border border-emerald-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {BOT_AVATAR}
              <span className="font-bold text-lg tracking-wide drop-shadow">Wildlife ChatBot</span>
            </div>
            <button aria-label="Close chat" className="text-white hover:text-emerald-200 text-2xl font-bold px-2 focus:outline-none" onClick={() => setOpen(false)}><XIcon className="h-7 w-7" /></button>
          </div>
          {/* Messages */}
          <div className="flex-1 px-4 py-3 overflow-y-auto bg-gradient-to-b from-emerald-50 to-white" style={{ maxHeight: 340 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end`}>
                {msg.sender === 'bot' && (
                  <div className="mr-2">{BOT_AVATAR}</div>
                )}
                <div className={`relative max-w-[70%] px-4 py-2 rounded-2xl text-base shadow-md transition-all duration-200
                  ${msg.sender === 'user'
                    ? 'bg-amber-100 text-amber-900 rounded-br-none animate-slide-in-right'
                    : 'bg-white text-emerald-700 border border-emerald-200 rounded-bl-none animate-slide-in-left'}
                `}>
                  {msg.text}
                  {msg.sender === 'bot' && (
                    <span className="absolute -bottom-2 left-4 w-3 h-3 bg-white rotate-45 border-l border-b border-emerald-200"></span>
                  )}
                  {msg.sender === 'user' && (
                    <span className="absolute -bottom-2 right-4 w-3 h-3 bg-amber-100 rotate-45"></span>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="ml-2">{USER_AVATAR}</div>
                )}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">Bot is typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form className="p-3 bg-white border-t border-emerald-100 flex gap-2 items-center" onSubmit={e => { e.preventDefault(); handleSend(); }}>
            <input
              ref={inputRef}
              className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base shadow-sm"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              aria-label="Type your message"
              autoComplete="off"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon className="h-6 w-6" />
            </button>
          </form>
          {/* Tips & Shortcuts */}
          <div className="bg-emerald-50 text-emerald-700 text-xs px-4 py-2 border-t border-emerald-100 flex items-center justify-between">
            <span>Tip: Press <kbd className="px-1 py-0.5 bg-white border rounded text-emerald-700">Ctrl+Shift+C</kbd> to toggle chat</span>
            <a href="/help" className="underline hover:text-emerald-900 ml-2">Help</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
