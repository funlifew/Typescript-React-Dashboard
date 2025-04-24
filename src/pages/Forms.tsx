import React, { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';
import BasicContactForm from '../components/forms/BasicContactForm';
import FormElements from '../components/forms/FormElements';
import AdvancedForm from '../components/forms/AdvancedForm';

/**
 * Forms page component that showcases various forms and elements
 * @returns {React.ReactElement} Forms page component
 */
const Forms: React.FC = () => {
  // Success message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  /**
   * Handle form submission success
   * @param {string} message - Success message to display
   */
  const handleFormSuccess = (message: string) => {
    setSuccessMessage(message);
    
    // Clear success message after a delay
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  
  /**
   * Handle basic form submission
   */
  const handleBasicSubmit = () => {
    handleFormSuccess('Basic form submitted successfully!');
  };
  
  /**
   * Handle advanced form submission
   */
  const handleAdvancedSubmit = () => {
    handleFormSuccess('Advanced form submitted successfully!');
  };

  return (
    <div>
      <AnimatedElement animation={{ type: 'fade-in' }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Form Components
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Various form layouts and elements for your applications.
          </p>
        </div>
      </AnimatedElement>
      
      {/* Success message */}
      {successMessage && (
        <AnimatedElement animation={{ type: 'scale-in' }}>
          <div className="mb-6 p-4 rounded-md bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{successMessage}</p>
              </div>
            </div>
          </div>
        </AnimatedElement>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Contact Form */}
        <AnimatedElement animation={{ type: 'slide-up', delay: 100 }}>
          <BasicContactForm onSubmit={handleBasicSubmit} />
        </AnimatedElement>
        
        {/* Form Elements */}
        <AnimatedElement animation={{ type: 'slide-up', delay: 200 }}>
          <FormElements />
        </AnimatedElement>
      </div>
      
      {/* Advanced Registration Form */}
      <AnimatedElement animation={{ type: 'fade-in', delay: 300 }}>
        <div className="mt-6">
          <AdvancedForm onSubmit={handleAdvancedSubmit} />
        </div>
      </AnimatedElement>
    </div>
  );
};

export default Forms;