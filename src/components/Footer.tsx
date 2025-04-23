import React from 'react';
import AnimatedElement from './AnimatedElement';

/**
 * Footer component with links and copyright information
 * @returns {React.ReactElement} Footer component
 */
const Footer: React.FC = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <AnimatedElement animation={{ type: 'fade-in' }}>
              <div>
                <h2 className="text-2xl font-bold text-blue-500 dark:text-dark-primary mb-4">DarkApp</h2>
                <p className="text-gray-400 mb-4">
                  A modern React template with dark mode, animations, and TypeScript.
                </p>
                <p className="text-gray-500 text-sm">
                  &copy; {currentYear} DarkApp. All rights reserved.
                </p>
              </div>
            </AnimatedElement>
          </div>
          
          {/* Quick Links */}
          <div>
            <AnimatedElement animation={{ type: 'fade-in', delay: 100 }}>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </AnimatedElement>
          </div>
          
          {/* Resources */}
          <div>
            <AnimatedElement animation={{ type: 'fade-in', delay: 200 }}>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                    NPM Package
                  </a>
                </li>
              </ul>
            </AnimatedElement>
          </div>
          
          {/* Newsletter */}
          <div>
            <AnimatedElement animation={{ type: 'fade-in', delay: 300 }}>
              <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest features and releases.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </AnimatedElement>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <AnimatedElement animation={{ type: 'fade-in', delay: 400 }}>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              Made with <span className="text-red-500">❤</span> using React, TypeScript, and Tailwind CSS
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 dark:hover:text-dark-primary transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </footer>
  );
};

export default Footer;