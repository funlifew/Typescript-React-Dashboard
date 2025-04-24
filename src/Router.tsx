import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import Tables from './pages/Tables';
import Notifications from './pages/Notifications';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SearchProvider } from './contexts/SearchContext';

/**
 * Main router component for the application
 * @returns {React.ReactElement} Router component
 */
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
            <Routes>
              {/* Landing Page (Marketing Website) */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="forms" element={<Forms />} />
                <Route path="tables" element={<Tables />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
              
              {/* Catch all - redirect to landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;