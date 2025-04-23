import React from 'react';
import AnimatedElement from './AnimatedElement';
import { FeatureCard } from '../types';

/**
 * Features section component with animated cards
 * @returns {React.ReactElement} Features section component
 */
const FeaturesSection: React.FC = () => {
  // Sample feature data
  const features: FeatureCard[] = [
    {
      id: 1,
      title: 'Dark Mode',
      description: 'Seamlessly switch between light and dark themes with smooth transitions.',
      icon: 'moon'
    },
    {
      id: 2,
      title: 'Animations',
      description: 'Beautiful animations that enhance the user experience and visual appeal.',
      icon: 'sparkles'
    },
    {
      id: 3,
      title: 'TypeScript',
      description: 'Type-safe code that improves development efficiency and reduces bugs.',
      icon: 'code'
    },
    {
      id: 4,
      title: 'Responsive Design',
      description: 'Fully responsive layout that works perfectly on all devices and screen sizes.',
      icon: 'device'
    }
  ];

  // Render icon based on the feature icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'moon':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'sparkles':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'device':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedElement animation={{ type: 'fade-in' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Awesome Features
            </h2>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              Our template comes with a variety of features to help you build modern, interactive websites with great user experience.
            </p>
          </div>
        </AnimatedElement>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedElement 
              key={feature.id}
              animation={{ 
                type: 'scale-in', 
                delay: 150 * index 
              }}
            >
              <div className="card hover:shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-4 text-blue-600 dark:text-dark-primary">
                    {renderIcon(feature.icon)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;