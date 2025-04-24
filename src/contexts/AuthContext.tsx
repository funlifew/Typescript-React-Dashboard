import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

/**
 * Authentication context type
 */
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: UserType | null;
}

/**
 * User data type
 */
interface UserType {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider component
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  // Check for existing login on mount
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        setIsAuthenticated(true);
        // In a real app, you'd fetch user data from an API or JWT
        setUser({
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://i.pravatar.cc/150?img=68',
          role: 'Administrator'
        });
      }
    };
    
    checkAuth();
  }, []);

  /**
   * Log in a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<boolean>} Login success status
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would validate credentials against an API
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsAuthenticated(true);
      setUser({
        name: 'Admin User',
        email: 'admin@example.com',
        avatar: 'https://i.pravatar.cc/150?img=68',
        role: 'Administrator'
      });
      return true;
    }
    return false;
  };

  /**
   * Log out the current user
   */
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 * @returns {AuthContextType} Authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};