import React from 'react';
import AnimatedElement from './AnimatedElement';

/**
 * About section component with information about the project/company
 * @returns {React.ReactElement} About section component
 */
const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Animated Image/Graphic */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <AnimatedElement animation={{ type: 'fade-in' }}>
              <div className="relative">
                {/* Animated Background Elements */}
                <div className="absolute -z-10 top-0 left-0 w-64 h-64 bg-blue-400 dark:bg-dark-primary rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-purple-400 dark:bg-dark-secondary rounded-full filter blur-3xl opacity-20"></div>
                
                {/* Main Image Container */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  {/* Animated Code Block */}
                  <pre className="bg-white dark:bg-dark-background p-4 rounded shadow-inner text-sm font-mono overflow-x-auto">
                    <code className="text-gray-800 dark:text-gray-300">
                      <span className="text-green-600 dark:text-green-400">// TypeScript with Dark Mode</span><br/>
                      <span className="text-blue-600 dark:text-blue-400">interface</span> <span className="text-purple-600 dark:text-purple-400">ThemeProps</span> {'{'}
                      <br/>&nbsp;&nbsp;<span className="text-red-600 dark:text-red-400">isDarkMode</span>: <span className="text-blue-600 dark:text-blue-400">boolean</span>;
                      <br/>&nbsp;&nbsp;<span className="text-red-600 dark:text-red-400">toggleTheme</span>: {'() => '}<span className="text-blue-600 dark:text-blue-400">void</span>;
                      <br/>{'}'}<br/><br/>
                      <span className="text-blue-600 dark:text-blue-400">const</span> <span className="text-yellow-600 dark:text-yellow-400">ThemeToggle</span> = {'({ isDarkMode, toggleTheme }) => {'}<br/>
                      &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">return</span> (
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'<button onClick={toggleTheme}>'}
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{isDarkMode ? "Light Mode" : "Dark Mode"}'}
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'</button>'}
                      <br/>&nbsp;&nbsp;);
                      <br/>{'}'}
                    </code>
                  </pre>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          {/* Text Content */}
          <div className="md:w-1/2 md:pl-10">
            <AnimatedElement animation={{ type: 'slide-up' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                About Our Project
              </h2>
            </AnimatedElement>
            
            <AnimatedElement animation={{ type: 'slide-up', delay: 200 }}>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                This modern web template is built with React, TypeScript, and Tailwind CSS. It features a beautiful dark mode, smooth animations, and responsive design to create engaging user experiences.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation={{ type: 'slide-up', delay: 300 }}>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We've focused on creating a clean, maintainable codebase with best practices in mind. The use of TypeScript provides excellent type safety and developer experience, while Tailwind CSS makes styling efficient and consistent.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation={{ type: 'slide-up', delay: 400 }}>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Clean Code</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Well-structured, maintainable TypeScript code</p>
                </div>
                <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smooth Animations</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Fluid transitions and effects for better UX</p>
                </div>
                <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Responsive</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Works on all devices and screen sizes</p>
                </div>
                <div className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Customizable</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">Easy to modify and extend for your needs</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;