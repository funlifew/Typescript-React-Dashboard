import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';

/**
 * User data type
 */
interface UserType {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

/**
 * Props for Header component
 */
interface HeaderProps {
  toggleSidebar: () => void;
  onSearch: (query: string) => void;
  userOverride?: UserType;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

/**
 * Header component for dashboard with search box and profile
 * @param {HeaderProps} props - Component props
 * @returns {React.ReactElement} Header component
 */
const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  onSearch, 
  userOverride,
  isCollapsed = false,
  toggleCollapse
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { globalSearchQuery, setGlobalSearchQuery, isSearching, setIsSearching } = useSearch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Use override user data if provided (for guest access)
  const displayUser = userOverride || user;
  
  // Update local search when global search changes
  useEffect(() => {
    setSearchQuery(globalSearchQuery);
  }, [globalSearchQuery]);
  
  /**
   * Handle search input change
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Call local search handler
    onSearch(value);
    
    // Update global search
    setGlobalSearchQuery(value);
    setIsSearching(value.trim() !== '');
  };
  
  /**
   * Toggle profile dropdown
   */
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  /**
   * Handle logout
   */
  const handleLogout = () => {
    if (isAuthenticated) {
      logout();
    }
    navigate('/login');
  };
  
  /**
   * Handle login
   */
  const handleLogin = () => {
    navigate('/login');
  };
  
  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileRef]);

  return (
    <header className="bg-white dark:bg-dark-background shadow-sm py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left section with menu buttons and search */}
        <div className="flex items-center flex-1">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
          {/* Desktop collapse toggle button */}
          {toggleCollapse && (
            <button
              onClick={toggleCollapse}
              className="hidden md:block mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h8M4 18h16"}
                />
              </svg>
            </button>
          )}
          
          {/* Search box */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 dark:focus:ring-dark-primary focus:border-blue-500 dark:focus:border-dark-primary sm:text-sm transition-colors duration-300"
            />
            {isSearching && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setGlobalSearchQuery('');
                  setIsSearching(false);
                  onSearch('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Right section with profile */}
        <div className="flex items-center ml-4" ref={profileRef}>
          {/* Link to Landing Page */}
          <Link 
            to="/"
            className="mr-4 text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
          >
            View Website
          </Link>
          
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 dark:focus:border-gray-700 transition-colors duration-300"
              aria-label="Profile"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={displayUser?.avatar || 'https://i.pravatar.cc/150?img=68'}
                alt="Profile"
              />
            </button>
            
            {/* Profile dropdown */}
            {isProfileOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark-surface ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {displayUser?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {displayUser?.email || 'user@example.com'}
                    </p>
                  </div>
                  <a
                    href="#profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Settings
                  </a>
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign in
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;