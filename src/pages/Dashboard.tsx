import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from '../components/AnimatedElement';
import { useAuth } from '../contexts/AuthContext';

/**
 * Dashboard statistics type
 */
interface DashboardStat {
  id: number;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

/**
 * Dashboard quick link type
 */
interface QuickLink {
  id: number;
  title: string;
  path: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * Main dashboard component
 * @returns {React.ReactElement} Dashboard component
 */
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Sample dashboard statistics
  const stats: DashboardStat[] = [
    {
      id: 1,
      title: 'Total Users',
      value: '12,345',
      change: '12%',
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Revenue',
      value: '$23,456',
      change: '8%',
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Active Projects',
      value: '142',
      change: '2%',
      isPositive: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Task Completion',
      value: '78%',
      change: '5%',
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];
  
  // Quick links to dashboard features
  const quickLinks: QuickLink[] = [
    {
      id: 1,
      title: 'Forms',
      description: 'Various form layouts, elements, and validations',
      path: '/dashboard/forms',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Tables',
      description: 'Data tables with sorting, filtering, and pagination',
      path: '/dashboard/tables',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Notifications',
      description: 'Modal dialogs and toast notifications',
      path: '/dashboard/notifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Welcome section */}
      <AnimatedElement animation={{ type: 'fade-in' }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Here's what's happening with your dashboard today.
          </p>
        </div>
      </AnimatedElement>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <AnimatedElement
            key={stat.id}
            animation={{ type: 'scale-in', delay: index * 100 }}
          >
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-blue-600 dark:text-dark-primary">
                  {stat.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.title}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className={`text-xs font-medium flex items-center ${
                        stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <svg
                          className={`w-4 h-4 mr-1 ${stat.isPositive ? 'transform rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        {stat.change} since last month
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
      
      {/* Quick links section */}
      <AnimatedElement animation={{ type: 'fade-in', delay: 200 }}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Access
        </h2>
      </AnimatedElement>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link, index) => (
          <AnimatedElement
            key={link.id}
            animation={{ type: 'slide-up', delay: 300 + index * 100 }}
          >
            <Link
              to={link.path}
              className="block bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300"
            >
              <div className="flex">
                <div className="flex-shrink-0 text-blue-600 dark:text-dark-primary">
                  {link.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          </AnimatedElement>
        ))}
      </div>
      
      {/* Recent activity section (placeholder) */}
      <AnimatedElement animation={{ type: 'fade-in', delay: 400 }}>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow">
            <div className="p-6">
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No recent activity to display</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default Dashboard;