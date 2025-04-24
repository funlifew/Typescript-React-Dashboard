import React, { createContext, useState, useContext, ReactNode } from 'react';

/**
 * Search context type
 */
interface SearchContextType {
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

// Create the search context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

/**
 * Search provider component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider component
 */
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Context value
  const contextValue: SearchContextType = {
    globalSearchQuery,
    setGlobalSearchQuery,
    isSearching,
    setIsSearching
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

/**
 * Hook to use search context
 * @returns {SearchContextType} Search context
 */
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
};