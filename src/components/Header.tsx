import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { NavLink } from '../types';
import AnimatedElement from './AnimatedElement';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample navigation links
  const navLinks: NavLink[] = [
    { id: 1, title: 'Home', path: '#home' },
    { id: 2, title: 'Features', path: '#features' },
    { id: 3, title: 'About', path: '#about' },
    { id: 4, title: 'Contact', path: '#contact' },
  ];

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-background shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedElement animation={{ type: 'fade-in' }}>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-dark-primary">
                React Dashboard
              </span>
            </div>
          </AnimatedElement>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <AnimatedElement 
                key={link.id}
                animation={{ 
                  type: 'fade-in',
                  delay: 100 * (index + 1) 
                }}
              >
                <a 
                  href={link.path}
                  className="nav-link font-medium"
                >
                  {link.title}
                </a>
              </AnimatedElement>
            ))}
            
            {/* Dashboard Link */}
            <AnimatedElement animation={{ type: 'fade-in', delay: 500 }}>
              <Link
                to="/dashboard"
                className="nav-link font-medium border border-blue-500 dark:border-dark-primary text-blue-600 dark:text-dark-primary px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-dark-background/20"
              >
                Dashboard
              </Link>
            </AnimatedElement>
            
            <AnimatedElement animation={{ type: 'fade-in', delay: 600 }}>
              <ThemeToggle />
            </AnimatedElement>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-gray-50 dark:bg-dark-surface rounded-md shadow-lg">
            <nav className="flex flex-col space-y-3 p-4">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={link.path}
                  className="nav-link block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              
              {/* Dashboard Link in mobile menu */}
              <Link
                to="/dashboard"
                className="block py-2 px-4 text-blue-600 dark:text-dark-primary font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;