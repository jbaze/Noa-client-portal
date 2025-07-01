import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../shared/LoadingSpinner';

const LoginForm = ({ onLoginSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(formData);
    setIsLoading(false);

    if (result.success) {
      onLoginSuccess?.();
    } else {
      setErrors({ 
        email: result.error, 
        password: 'Try demo@example.com / demo123' 
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h2>
          <p className="text-gray-600 text-lg">Sign in to access your project portal</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Email Address</label>
            <input 
              type="email" 
              className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 text-gray-900 ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Password</label>
            <input 
              type="password" 
              className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 text-gray-900 ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="small" />
                <span className="ml-2">Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
          <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
          <p className="text-sm text-blue-700">Email: demo@example.com</p>
          <p className="text-sm text-blue-700">Password: demo123</p>
        </div>
        
        {/* Forgot Password */}
        <div className="text-center mt-6">
          <button 
            type="button"
            className="text-sm text-indigo-600 hover:text-purple-600 transition-colors bg-transparent border-none underline cursor-pointer"
            onClick={() => alert('Password reset functionality coming soon!')}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;