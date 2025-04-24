import React, { useState } from 'react';

/**
 * Form elements showcase component
 * @returns {React.ReactElement} Form elements component
 */
const FormElements: React.FC = () => {
  // Toggle state for switch
  const [isToggleOn, setIsToggleOn] = useState(false);
  
  /**
   * Toggle switch handler
   */
  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Form Elements
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text Input
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm"
              placeholder="Text input"
            />
          </div>
          
          {/* Disabled Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Disabled Input
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              placeholder="Disabled input"
              disabled
            />
          </div>
          
          {/* Select with Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Dropdown
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          
          {/* Checkbox */}
          <div>
            <div className="flex items-center">
              <input
                id="checkbox"
                type="checkbox"
                className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="checkbox" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Checkbox
              </label>
            </div>
          </div>
          
          {/* Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Radio Buttons
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="radio-1"
                  name="radio-group"
                  type="radio"
                  className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700"
                />
                <label htmlFor="radio-1" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Option 1
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="radio-2"
                  name="radio-group"
                  type="radio"
                  className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700"
                />
                <label htmlFor="radio-2" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Option 2
                </label>
              </div>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Toggle Switch
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary ${
                  isToggleOn ? 'bg-blue-600 dark:bg-dark-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={isToggleOn}
              >
                <span className="sr-only">Toggle</span>
                <span
                  className={`${
                    isToggleOn ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-gray-600 shadow transform ring-0 transition ease-in-out duration-200`}
                >
                  <span
                    className={`${
                      isToggleOn ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                    aria-hidden="true"
                  >
                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={`${
                      isToggleOn ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                    aria-hidden="true"
                  >
                    <svg className="h-3 w-3 text-blue-600 dark:text-dark-primary" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414 0l4.242-4.242a1 1 0 00-1.414-1.414L5 5.414 3.707 5.293z" />
                    </svg>
                  </span>
                </span>
              </button>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {isToggleOn ? 'On' : 'Off'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormElements;