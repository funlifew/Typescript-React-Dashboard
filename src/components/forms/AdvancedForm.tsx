import React, { useState } from 'react';

/**
 * Form validation state type
 */
interface ValidationState {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  phone: string | null;
  terms: string | null;
}

/**
 * Advanced form component with validation
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Submission handler callback
 * @returns {React.ReactElement} Advanced form component
 */
const AdvancedForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    birthdate: '',
    country: '',
    interests: [] as string[],
    bio: '',
    terms: false,
    notifications: false
  });
  
  // Validation state
  const [errors, setErrors] = useState<ValidationState>({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    phone: null,
    terms: null
  });
  
  /**
   * Handle form input changes
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'interests') {
        // Handle interest checkboxes separately
        const interest = checkbox.value;
        if (checkbox.checked) {
          // Add a new interest to the array
          setFormData(prev => ({
            ...prev,
            interests: [...prev.interests, interest]
          }));
        } else {
          // Remove an interest from the array
          setFormData(prev => ({
            ...prev,
            interests: prev.interests.filter(item => item !== interest)
          }));
        }
      } else {
        // For other checkboxes (like terms and notifications)
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }));
      }
    } else {
      // For text inputs, selects, etc.
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field if it exists
    if (errors[name as keyof ValidationState]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Validate the form
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationState = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      phone: null,
      terms: null,
    };
    
    let isValid = true;
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^[0-9\s+\-()]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
    
    // Terms validation
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle form submission
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
      // Call onSubmit callback
      onSubmit();
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Advanced Registration Form with Validation
        </h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="adv-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="adv-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="adv-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="adv-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="adv-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="adv-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="adv-confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="adv-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <label htmlFor="adv-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                id="adv-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                placeholder="+1 (123) 456-7890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>
            
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="gender-male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700"
                  />
                  <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700"
                  />
                  <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-other"
                    name="gender"
                    type="radio"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700"
                  />
                  <label htmlFor="gender-other" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interests */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interests
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Technology', 'Design', 'Business', 'Science', 'Arts', 'Health'].map((interest) => (
                <div key={interest} className="flex items-center">
                  <input
                    id={`interest-${interest.toLowerCase()}`}
                    name="interests"
                    type="checkbox"
                    value={interest.toLowerCase()}
                    checked={formData.interests.includes(interest.toLowerCase())}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700 rounded"
                  />
                  <label htmlFor={`interest-${interest.toLowerCase()}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-gray-800 dark:text-white sm:text-sm"
            ></textarea>
          </div>
          
          {/* Terms and Conditions */}
          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className={`h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700 rounded ${
                    errors.terms ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                  I agree to the terms and conditions
                </label>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.terms}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="mt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 dark:text-dark-primary focus:ring-blue-500 dark:focus:ring-dark-primary border-gray-300 dark:border-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifications" className="font-medium text-gray-700 dark:text-gray-300">
                  I want to receive email notifications
                </label>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-dark-primary hover:bg-blue-700 dark:hover:bg-purple-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvancedForm;