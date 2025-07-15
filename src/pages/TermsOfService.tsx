import React from 'react';
import { Link } from 'react-router-dom';
import { ScaleIcon, FileTextIcon, AlertTriangleIcon, UserCheckIcon, ShieldIcon, GavelIcon } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <ScaleIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 font-['Playfair_Display']">Terms of Service</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Please read these terms carefully before using Wildlife Guardians platform.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: July 15, 2025</p>
        </div>

        {/* Quick Navigation */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <a href="#acceptance" className="text-blue-600 hover:text-blue-700">Acceptance</a>
            <a href="#services" className="text-blue-600 hover:text-blue-700">Our Services</a>
            <a href="#user-accounts" className="text-blue-600 hover:text-blue-700">User Accounts</a>
            <a href="#conduct" className="text-blue-600 hover:text-blue-700">User Conduct</a>
            <a href="#content" className="text-blue-600 hover:text-blue-700">Content Policy</a>
            <a href="#termination" className="text-blue-600 hover:text-blue-700">Termination</a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Acceptance */}
          <section id="acceptance" className="card p-8">
            <div className="flex items-center mb-6">
              <UserCheckIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                By accessing and using Wildlife Guardians, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between 
                  you and Wildlife Guardians. Please read them carefully.
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="card p-8">
            <div className="flex items-center mb-6">
              <FileTextIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Description of Services</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Educational Content</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Interactive wildlife quizzes</li>
                  <li>• Educational articles and resources</li>
                  <li>• Conservation information</li>
                  <li>• Progress tracking and badges</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Platform Features</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• User account management</li>
                  <li>• Personalized learning paths</li>
                  <li>• Achievement system</li>
                  <li>• Community features</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>Service Availability:</strong> We strive to maintain 99.9% uptime, but cannot 
                guarantee uninterrupted service. Scheduled maintenance will be announced in advance.
              </p>
            </div>
          </section>

          {/* User Accounts */}
          <section id="user-accounts" className="card p-8">
            <div className="flex items-center mb-6">
              <UserCheckIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You must be at least 13 years old to create an account</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Responsibilities</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="text-gray-600 space-y-2">
                    <li>• You are responsible for all activities under your account</li>
                    <li>• Keep your login credentials confidential</li>
                    <li>• Use only one account per person</li>
                    <li>• Report any security breaches immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* User Conduct */}
          <section id="conduct" className="card p-8">
            <div className="flex items-center mb-6">
              <ShieldIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptable Use Policy</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-800 mb-3">✅ Encouraged Behavior</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Engage respectfully with content</li>
                  <li>• Share knowledge about wildlife conservation</li>
                  <li>• Report inappropriate content</li>
                  <li>• Support other learners</li>
                  <li>• Provide constructive feedback</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-red-800 mb-3">❌ Prohibited Activities</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Harassment or bullying</li>
                  <li>• Sharing false information</li>
                  <li>• Attempting to hack or disrupt services</li>
                  <li>• Creating multiple accounts</li>
                  <li>• Commercial use without permission</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                <strong>Violation Consequences:</strong> Violations may result in warnings, temporary 
                suspension, or permanent account termination, depending on severity.
              </p>
            </div>
          </section>

          {/* Content Policy */}
          <section id="content" className="card p-8">
            <div className="flex items-center mb-6">
              <FileTextIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Content and Intellectual Property</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Content</h3>
                <p className="text-gray-600 mb-4">
                  All educational materials, quizzes, articles, and platform content are protected by 
                  copyright and other intellectual property laws.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    You may use our content for personal, non-commercial educational purposes only. 
                    Redistribution or commercial use requires written permission.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">User-Generated Content</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>You retain rights to content you create</li>
                  <li>You grant us license to use, display, and distribute your content</li>
                  <li>You're responsible for ensuring you have rights to share content</li>
                  <li>We may remove content that violates our policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section className="card p-8">
            <div className="flex items-center mb-6">
              <AlertTriangleIcon className="h-6 w-6 text-amber-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Disclaimers and Limitations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">Educational Purpose</h3>
                <p className="text-amber-700 text-sm">
                  Our content is for educational purposes only. While we strive for accuracy, 
                  we cannot guarantee completeness or currency of all information.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Limitation of Liability</h3>
                <p className="text-red-700 text-sm">
                  Wildlife Guardians is provided "as is" without warranties. We are not liable 
                  for any damages arising from use of our platform.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section id="termination" className="card p-8">
            <div className="flex items-center mb-6">
              <GavelIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">By You</h3>
                <p className="text-gray-600">
                  You may terminate your account at any time through your account settings or 
                  by contacting support.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">By Us</h3>
                <p className="text-gray-600">
                  We may terminate or suspend your account immediately for violations of these terms, 
                  illegal activity, or abuse of our services.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  Upon termination, your right to use the service ceases immediately. Some provisions 
                  of these terms survive termination.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes via email or platform notifications.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  Continued use of the platform after changes constitutes acceptance of new terms. 
                  If you disagree with changes, please discontinue use.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Questions about these Terms of Service? Contact us:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <strong className="text-gray-800">Email:</strong>
                    <br />
                    <span className="text-gray-600">legal@wildlifeguardians.org</span>
                  </div>
                  <div>
                    <strong className="text-gray-800">Response Time:</strong>
                    <br />
                    <span className="text-gray-600">Within 5 business days</span>
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
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
