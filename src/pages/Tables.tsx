import React, { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';

/**
 * User data type
 */
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}

/**
 * Tables page component that showcases different table layouts and features
 * @returns {React.ReactElement} Tables page component
 */
const Tables: React.FC = () => {
  // Sample data for basic table
  const basicUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: '2025-04-23' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastActive: '2025-04-22' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Editor', status: 'pending', lastActive: '2025-04-20' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'User', status: 'inactive', lastActive: '2025-04-15' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'User', status: 'active', lastActive: '2025-04-21' },
  ];
  
  // Advanced table state with sorting and pagination
  const [advancedUsers] = useState<User[]>([
    ...basicUsers,
    { id: 6, name: 'Sarah Lee', email: 'sarah@example.com', role: 'Moderator', status: 'active', lastActive: '2025-04-23' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'User', status: 'pending', lastActive: '2025-04-19' },
    { id: 8, name: 'Jessica Taylor', email: 'jessica@example.com', role: 'User', status: 'active', lastActive: '2025-04-22' },
    { id: 9, name: 'Thomas Anderson', email: 'thomas@example.com', role: 'Editor', status: 'inactive', lastActive: '2025-04-10' },
    { id: 10, name: 'Jennifer Clark', email: 'jennifer@example.com', role: 'User', status: 'active', lastActive: '2025-04-21' },
    { id: 11, name: 'Daniel Evans', email: 'daniel@example.com', role: 'Admin', status: 'active', lastActive: '2025-04-23' },
    { id: 12, name: 'Laura Baker', email: 'laura@example.com', role: 'User', status: 'pending', lastActive: '2025-04-18' },
  ]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof User>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  /**
   * Get status badge based on user status
   * @param {User['status']} status - User status
   * @returns {React.ReactElement} Status badge
   */
  const getStatusBadge = (status: User['status']): React.ReactElement => {
    let bgColor = '';
    let textColor = '';
    
    switch (status) {
      case 'active':
        bgColor = 'bg-green-100 dark:bg-green-900/30';
        textColor = 'text-green-800 dark:text-green-200';
        break;
      case 'inactive':
        bgColor = 'bg-red-100 dark:bg-red-900/30';
        textColor = 'text-red-800 dark:text-red-200';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
        textColor = 'text-yellow-800 dark:text-yellow-200';
        break;
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  /**
   * Handle sort column click
   * @param {keyof User} field - Field to sort by
   */
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  /**
   * Get sort indicator based on current sort state
   * @param {keyof User} field - Field to check
   * @returns {React.ReactNode} Sort indicator icon
   */
  const getSortIndicator = (field: keyof User): React.ReactNode => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? (
          <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    );
  };
  
  /**
   * Get filtered users based on current filters
   */
  const getFilteredUsers = (): User[] => {
    return advancedUsers.filter(user => {
      // Filter by status
      if (statusFilter !== 'all' && user.status !== statusFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };
  
  /**
   * Get sorted users based on current sort field and direction
   */
  const getSortedUsers = (): User[] => {
    const filteredUsers = getFilteredUsers();
    
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  /**
   * Get paginated data for current page
   */
  const getPaginatedData = (): User[] => {
    const sortedUsers = getSortedUsers();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  };
  
  /**
   * Calculate total pages based on filtered data and items per page
   */
  const totalPages = Math.ceil(getFilteredUsers().length / itemsPerPage);
  
  /**
   * Handle page change
   * @param {number} page - Page number to navigate to
   */
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <AnimatedElement animation={{ type: 'fade-in' }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Table Components
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Various table layouts and features for displaying data.
          </p>
        </div>
      </AnimatedElement>
      
      {/* Basic Table */}
      <AnimatedElement animation={{ type: 'fade-in', delay: 100 }}>
        <div className="mb-8 bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Basic Table
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              A simple table with basic styling.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
                {basicUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedElement>
      
      {/* Advanced Table with Sorting, Filtering, and Pagination */}
      <AnimatedElement animation={{ type: 'fade-in', delay: 200 }}>
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Advanced Table
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Table with sorting, filtering, and pagination.
            </p>
          </div>
          
          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Status Filter */}
                <div className="flex items-center">
                  <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    Status:
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as any);
                      setCurrentPage(1); // Reset to first page on filter change
                    }}
                    className="text-sm rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:bg-gray-800 dark:text-white"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                {/* Items Per Page */}
                <div className="flex items-center">
                  <label htmlFor="items-per-page" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    Show:
                  </label>
                  <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page on items per page change
                    }}
                    className="text-sm rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-dark-primary dark:focus:ring-dark-primary dark:bg-gray-800 dark:text-white"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {/* Sortable Column Headers */}
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ID {getSortIndicator('id')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name {getSortIndicator('name')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">
                      Email {getSortIndicator('email')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center">
                      Role {getSortIndicator('role')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status {getSortIndicator('status')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('lastActive')}
                  >
                    <div className="flex items-center">
                      Last Active {getSortIndicator('lastActive')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-gray-700">
                {getPaginatedData().map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 dark:text-dark-primary hover:text-blue-800 dark:hover:text-blue-400 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {/* No results message */}
                {getPaginatedData().length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, getFilteredUsers().length)}</span> to{' '}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, getFilteredUsers().length)}</span> of{' '}
                <span className="font-medium">{getFilteredUsers().length}</span> results
              </div>
              
              <div className="flex space-x-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                <div className="hidden sm:flex space-x-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    
                    // Only show a subset of pages if there are many
                    if (
                      totalPages <= 7 ||
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${
                            isCurrentPage
                              ? 'bg-blue-600 dark:bg-dark-primary text-white border-blue-600 dark:border-dark-primary'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      // Ellipsis for skipped pages
                      return <span key={pageNumber} className="px-2 py-1 text-gray-500 dark:text-gray-400">...</span>;
                    }
                    
                    return null;
                  })}
                </div>
                
                {/* Next Page Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${
                    currentPage === totalPages || totalPages === 0
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default Tables;