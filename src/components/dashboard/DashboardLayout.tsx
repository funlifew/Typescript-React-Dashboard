import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';

/**
 * Dashboard layout component with sidebar and header
 * @returns {React.ReactElement} Dashboard layout component
 */
const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { setGlobalSearchQuery } = useSearch();
  
  /**
   * Toggle sidebar visibility (for mobile)
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  /**
   * Toggle sidebar collapse state (for desktop)
   */
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  /**
   * Handle search functionality
   * @param {string} query - Search query
   */
  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query);
  };

  // Set default user if not authenticated
  const defaultUser = {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: 'https://i.pravatar.cc/150?img=33',
    role: 'Guest'
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isCollapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      }`}>
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          onSearch={handleSearch} 
          userOverride={isAuthenticated ? undefined : defaultUser}
          isCollapsed={sidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;