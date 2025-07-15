import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, LeafIcon, UsersIcon, TargetIcon, AwardIcon, GlobeIcon, TreePineIcon, BookOpenIcon } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Wildlife Biologist & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "15+ years in wildlife conservation with focus on endangered species protection."
    },
    {
      name: "Marcus Johnson",
      role: "Conservation Educator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Passionate about making conservation accessible through innovative education."
    },
    {
      name: "Dr. Priya Patel",
      role: "Research Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Leading research on human-wildlife interaction and sustainable practices."
    }
  ];

  const achievements = [
    { number: "50,000+", label: "Students Educated", icon: UsersIcon },
    { number: "200+", label: "Conservation Projects", icon: LeafIcon },
    { number: "15", label: "Countries Reached", icon: GlobeIcon },
    { number: "95%", label: "User Satisfaction", icon: AwardIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full mr-4">
              <TreePineIcon className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 font-['Playfair_Display']">About Wildlife Guardians</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of conservationists through interactive education, 
            community engagement, and real-world impact in wildlife protection.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <TargetIcon className="h-8 w-8 text-emerald-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  To create a world where humans and wildlife coexist harmoniously by educating, 
                  inspiring, and empowering individuals to become active participants in conservation efforts.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Education through interactive learning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Community-driven conservation action</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Measurable impact on wildlife protection</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                  alt="Wildlife Conservation" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Playfair_Display']">Our Core Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <LeafIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Conservation First</h3>
              <p className="text-gray-600">
                Every decision we make prioritizes the protection and preservation of wildlife and their habitats.
              </p>
            </div>

            <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Education Excellence</h3>
              <p className="text-gray-600">
                We create engaging, accurate, and accessible educational content that inspires action.
              </p>
            </div>

            <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UsersIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600">
                We believe in the power of collective action and community-driven conservation efforts.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <div className="card p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Playfair_Display']">Our Impact</h2>
              <p className="text-gray-600 text-lg">Making a difference through education and action</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-emerald-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                    <div className="text-gray-600 font-medium">{achievement.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Playfair_Display']">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">Passionate experts dedicated to wildlife conservation</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="card p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1574937020702-83b59cbfa014?w=600&h=400&fit=crop" 
                  alt="Our Story" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg"></div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Wildlife Guardians was born from a simple observation: traditional conservation 
                    education wasn't reaching enough people or creating lasting behavioral change.
                  </p>
                  <p>
                    Founded in 2020 by a team of conservation biologists and educators, we set out 
                    to bridge the gap between scientific knowledge and public engagement through 
                    innovative digital learning experiences.
                  </p>
                  <p>
                    Today, we're proud to be a leading platform for wildlife education, connecting 
                    passionate learners with the knowledge and tools they need to make a real 
                    difference in conservation efforts worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <div className="card p-10 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            <h2 className="text-3xl font-bold mb-4 font-['Playfair_Display']">Join Our Mission</h2>
            <p className="text-xl mb-8 text-emerald-50">
              Ready to become a Wildlife Guardian? Start your conservation journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/quiz/1" 
                className="inline-flex items-center px-8 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="card p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">General Inquiries</h3>
                <p className="text-gray-600">info@wildlifeguardians.org</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Partnership</h3>
                <p className="text-gray-600">partners@wildlifeguardians.org</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
                <p className="text-gray-600">support@wildlifeguardians.org</p>
              </div>
            </div>
          </div>
        </section>

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

export default About;
