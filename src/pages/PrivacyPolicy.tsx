import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, EyeIcon, LockIcon, UserIcon, DatabaseIcon, CookieIcon } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 p-3 rounded-full mr-4">
              <ShieldIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 font-['Playfair_Display']">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: July 15, 2025</p>
        </div>

        {/* Quick Navigation */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <a href="#information-collection" className="text-emerald-600 hover:text-emerald-700">Information Collection</a>
            <a href="#usage" className="text-emerald-600 hover:text-emerald-700">How We Use Data</a>
            <a href="#sharing" className="text-emerald-600 hover:text-emerald-700">Information Sharing</a>
            <a href="#security" className="text-emerald-600 hover:text-emerald-700">Data Security</a>
            <a href="#cookies" className="text-emerald-600 hover:text-emerald-700">Cookies</a>
            <a href="#rights" className="text-emerald-600 hover:text-emerald-700">Your Rights</a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Information Collection */}
          <section id="information-collection" className="card p-8">
            <div className="flex items-center mb-6">
              <UserIcon className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Name and email address when you create an account</li>
                  <li>Profile information you choose to provide</li>
                  <li>Quiz responses and educational progress</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Automatic Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent on platform)</li>
                  <li>IP address and general location information</li>
                  <li>Performance and analytics data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section id="usage" className="card p-8">
            <div className="flex items-center mb-6">
              <EyeIcon className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Educational Services</h3>
                <ul className="text-emerald-700 text-sm space-y-1">
                  <li>• Provide personalized learning experiences</li>
                  <li>• Track your progress and achievements</li>
                  <li>• Recommend relevant content</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Platform Improvement</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Analyze usage patterns</li>
                  <li>• Improve user experience</li>
                  <li>• Develop new features</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">Communication</h3>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Send important updates</li>
                  <li>• Educational newsletters</li>
                  <li>• Support responses</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Legal Compliance</h3>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Comply with legal obligations</li>
                  <li>• Prevent fraud and abuse</li>
                  <li>• Protect user safety</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section id="sharing" className="card p-8">
            <div className="flex items-center mb-6">
              <DatabaseIcon className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
              <p className="text-red-800 font-medium">
                🔒 We do not sell, trade, or rent your personal information to third parties.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Limited Sharing Occurs Only:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers under strict agreements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="card p-8">
            <div className="flex items-center mb-6">
              <LockIcon className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-green-600 font-semibold">Encryption</div>
                <div className="text-sm text-green-700">Data encrypted in transit and at rest</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-blue-600 font-semibold">Access Control</div>
                <div className="text-sm text-blue-700">Strict access limitations</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-purple-600 font-semibold">Monitoring</div>
                <div className="text-sm text-purple-700">Continuous security monitoring</div>
              </div>
            </div>

            <p className="text-gray-600">
              We implement industry-standard security measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          {/* Cookies */}
          <section id="cookies" className="card p-8">
            <div className="flex items-center mb-6">
              <CookieIcon className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                We use cookies and similar technologies to enhance your experience and analyze usage patterns.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Types of Cookies:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li><strong>Essential:</strong> Required for basic functionality</li>
                  <li><strong>Performance:</strong> Help us understand usage patterns</li>
                  <li><strong>Functional:</strong> Remember your preferences</li>
                  <li><strong>Analytics:</strong> Improve our services</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section id="rights" className="card p-8">
            <div className="flex items-center mb-6">
              <ShieldIcon className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Data Rights</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Delete your account</li>
                  <li>• Export your data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Communication Choices</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Opt out of marketing emails</li>
                  <li>• Control notification preferences</li>
                  <li>• Manage cookie settings</li>
                  <li>• Update contact preferences</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <p className="text-emerald-800">
                To exercise your rights, contact us at <strong>privacy@wildlifeguardians.org</strong> 
                or visit your <Link to="/settings" className="underline">account settings</Link>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <strong className="text-gray-800">Email:</strong>
                    <br />
                    <span className="text-gray-600">privacy@wildlifeguardians.org</span>
                  </div>
                  <div>
                    <strong className="text-gray-800">Response Time:</strong>
                    <br />
                    <span className="text-gray-600">Within 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
