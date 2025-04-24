import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

/**
 * Navigation item type
 */
interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
}

/**
 * Props for Sidebar component
 */
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

/**
 * Sidebar component for dashboard
 * @param {SidebarProps} props - Component props
 * @returns {React.ReactElement} Sidebar component
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const location = useLocation();
  
  // Dashboard navigation items
  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      path: '/dashboard/forms',
      name: 'Forms',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      path: '/dashboard/tables',
      name: 'Tables',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      path: '/dashboard/notifications',
      name: 'Notifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white dark:bg-dark-background shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          isCollapsed ? 'md:w-16' : 'w-64'
        }`}
      >
        {/* Logo and toggle buttons */}
        <div className={`flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'md:px-2 md:justify-center' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-dark-primary">
                DarkApp
              </span>
            </div>
          )}
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          {/* Collapse toggle button for desktop */}
          <button
            onClick={toggleCollapse}
            className="hidden md:block p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"}
              />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className={`p-4 ${isCollapsed ? 'md:p-2' : ''}`}>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center ${isCollapsed ? 'md:justify-center' : 'px-4'} py-2.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-dark-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom section */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 ${isCollapsed ? 'md:p-2' : ''} border-t border-gray-200 dark:border-gray-700`}>
          <div className={`flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                v1.0.0
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;