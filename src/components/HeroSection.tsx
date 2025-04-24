import React from 'react';
import AnimatedElement from './AnimatedElement';

/**
 * Hero section component with animated elements
 * @returns {React.ReactElement} Hero section component
 */
const HeroSection: React.FC = () => {
  return (
    <section id="home" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <AnimatedElement animation={{ type: 'fade-in' }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                React.js Dashboard <span className="text-blue-600 dark:text-dark-primary">Made by Mehdi Radfar</span>
              </h1>
            </AnimatedElement>
            
            <AnimatedElement animation={{ type: 'slide-up', delay: 200 }}>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                this is a test dashboard for learning react and typescript
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation={{ type: 'scale-in', delay: 400 }}>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">
                  Get Started
                </button>
                <button className="btn bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
                  Learn More
                </button>
              </div>
            </AnimatedElement>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="md:w-1/2">
            <AnimatedElement animation={{ type: 'fade-in', delay: 300 }}>
              <div className="relative">
                {/* Animated Circles Background */}
                <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-blue-500 dark:bg-dark-primary rounded-full filter blur-3xl opacity-20 animate-pulse-subtle"></div>
                <div className="absolute -z-10 bottom-0 left-0 w-60 h-60 bg-purple-500 dark:bg-dark-secondary rounded-full filter blur-3xl opacity-20 animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
                
                {/* Mock UI Element */}
                <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 md:p-8 relative z-10">
                  {/* Mock Header */}
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="w-full ml-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>
                  
                  {/* Mock Button */}
                  <div className="mt-6 flex">
                    <div className="h-8 w-24 bg-blue-500 dark:bg-dark-primary rounded"></div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;