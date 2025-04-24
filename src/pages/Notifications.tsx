import React, { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';

/**
 * Toast notification type
 */
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

/**
 * Modal configuration type
 */
interface ModalConfig {
  title: string;
  message: string;
  type: 'alert' | 'confirm' | 'form';
  confirmText?: string;
  cancelText?: string;
}

/**
 * Notifications page component showcasing modals and toast notifications
 * @returns {React.ReactElement} Notifications page component
 */
const Notifications: React.FC = () => {
  // State for toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    title: '',
    message: '',
    type: 'alert',
    confirmText: 'OK',
    cancelText: 'Cancel'
  });
  
  // Form state for modal with form
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
  });
  
  /**
   * Show a toast notification
   * @param {Toast} toast - Toast notification to show
   */
  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000
    };
    
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  };
  
  /**
   * Remove a toast notification
   * @param {string} id - Toast ID to remove
   */
  const removeToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  /**
   * Show a modal
   * @param {ModalConfig} config - Modal configuration
   */
  const showModal = (config: ModalConfig) => {
    setModalConfig(config);
    setIsModalOpen(true);
  };
  
  /**
   * Handle modal form input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleModalFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  /**
   * Handle modal form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleModalFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Close modal
    setIsModalOpen(false);
    
    // Show success toast
    showToast({
      type: 'success',
      title: 'Form Submitted',
      message: `Form submitted with name: ${modalFormData.name}, email: ${modalFormData.email}`,
    });
    
    // Reset form data
    setModalFormData({
      name: '',
      email: '',
    });
  };
  
  /**
   * Get icon for toast notification based on type
   * @param {Toast['type']} type - Toast type
   * @returns {React.ReactNode} Icon for toast
   */
  const getToastIcon = (type: Toast['type']): React.ReactNode => {
    switch (type) {
      case 'success':
        return (
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  /**
   * Get background and text color for toast notification based on type
   * @param {Toast['type']} type - Toast type
   * @returns {string} CSS classes for toast colors
   */
  const getToastColors = (type: Toast['type']): string => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-50 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div>
      <AnimatedElement animation={{ type: 'fade-in' }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Modals & Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Interactive modals and toast notifications for your applications.
          </p>
        </div>
      </AnimatedElement>
      
      {/* Toast Notifications Container - Fixed width and positioning */}
      <div className="fixed top-5 right-5 z-50 space-y-3 w-80">
        {toasts.map(toast => (
          <AnimatedElement key={toast.id} animation={{ type: 'scale-in' }}>
            <div className={`p-4 rounded-lg shadow-lg w-full ${getToastColors(toast.type)}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getToastIcon(toast.type)}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{toast.title}</p>
                  <p className="mt-1 text-sm opacity-80">{toast.message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="inline-flex text-gray-500 dark:text-gray-400 hover:opacity-75 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-black opacity-50" 
              onClick={() => setIsModalOpen(false)}
            ></div>
            
            {/* Modal content */}
            <AnimatedElement animation={{ type: 'scale-in' }}>
              <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl z-50 w-full max-w-md p-6 relative">
                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal title */}
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {modalConfig.title}
                </h3>
                
                {/* Modal content based on type */}
                {modalConfig.type === 'alert' && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{modalConfig.message}</p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary"
                      >
                        {modalConfig.confirmText || 'OK'}
                      </button>
                    </div>
                  </div>
                )}
                
                {modalConfig.type === 'confirm' && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{modalConfig.message}</p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                      >
                        {modalConfig.cancelText || 'Cancel'}
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          showToast({
                            type: 'success',
                            title: 'Confirmed',
                            message: 'You confirmed the action successfully.',
                          });
                        }}
                        className="px-4 py-2 bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary"
                      >
                        {modalConfig.confirmText || 'Confirm'}
                      </button>
                    </div>
                  </div>
                )}
                
                {modalConfig.type === 'form' && (
                  <form onSubmit={handleModalFormSubmit}>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{modalConfig.message}</p>
                    
                    <div className="mb-4">
                      <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        value={modalFormData.name}
                        onChange={handleModalFormChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={modalFormData.email}
                        onChange={handleModalFormChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedElement>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Modals Section */}
        <AnimatedElement animation={{ type: 'slide-up', delay: 100 }}>
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Modal Dialogs
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Interactive modal dialogs for alerts, confirmations, and forms.
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={() => showModal({
                    title: 'Alert Dialog',
                    message: 'This is a simple alert dialog to inform you about something important.',
                    type: 'alert',
                  })}
                  className="w-full px-4 py-2 bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary"
                >
                  Show Alert Modal
                </button>
                
                <button
                  onClick={() => showModal({
                    title: 'Confirm Action',
                    message: 'Are you sure you want to perform this action? This cannot be undone.',
                    type: 'confirm',
                    confirmText: 'Yes, Proceed',
                    cancelText: 'Cancel',
                  })}
                  className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Show Confirm Modal
                </button>
                
                <button
                  onClick={() => showModal({
                    title: 'Submit Form',
                    message: 'Please fill out the form below to continue.',
                    type: 'form',
                  })}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Show Form Modal
                </button>
              </div>
            </div>
          </div>
        </AnimatedElement>
        
        {/* Toast Notifications Section */}
        <AnimatedElement animation={{ type: 'slide-up', delay: 200 }}>
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Toast Notifications
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Non-intrusive notifications for various events and statuses.
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={() => showToast({
                    type: 'success',
                    title: 'Success',
                    message: 'Operation completed successfully!',
                  })}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Show Success Toast
                </button>
                
                <button
                  onClick={() => showToast({
                    type: 'error',
                    title: 'Error',
                    message: 'An error occurred while processing your request.',
                  })}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Show Error Toast
                </button>
                
                <button
                  onClick={() => showToast({
                    type: 'warning',
                    title: 'Warning',
                    message: 'Please be careful with this action.',
                  })}
                  className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Show Warning Toast
                </button>
                
                <button
                  onClick={() => showToast({
                    type: 'info',
                    title: 'Information',
                    message: 'Here is some useful information for you.',
                  })}
                  className="w-full px-4 py-2 bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary"
                >
                  Show Info Toast
                </button>
                
                <button
                  onClick={() => showToast({
                    type: 'info',
                    title: 'Long Duration',
                    message: 'This toast will stay for 10 seconds.',
                    duration: 10000
                  })}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Show Long Duration Toast
                </button>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
      
      {/* Toast Notification Examples */}
      <AnimatedElement animation={{ type: 'fade-in', delay: 300 }}>
        <div className="mt-6 bg-white dark:bg-dark-surface rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Toast Notification Examples
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Static examples of different notification styles.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  {getToastIcon('success')}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium">Success Notification</h3>
                  <div className="mt-1 text-sm opacity-80">
                    <p>Your changes have been saved successfully.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  {getToastIcon('error')}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium">Error Notification</h3>
                  <div className="mt-1 text-sm opacity-80">
                    <p>An error occurred while saving your changes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  {getToastIcon('warning')}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium">Warning Notification</h3>
                  <div className="mt-1 text-sm opacity-80">
                    <p>You are about to perform a potentially dangerous action.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  {getToastIcon('info')}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium">Info Notification</h3>
                  <div className="mt-1 text-sm opacity-80">
                    <p>A new version of the application is available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

export default Notifications;