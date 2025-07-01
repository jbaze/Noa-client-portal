import React, { useState } from 'react';

const ClientPortal = () => {
  const [currentView, setCurrentView] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Client data
  const client = {
    name: 'Noa Krakovich',
    initials: 'NK'
  };

  // Validation function
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!loginForm.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (loginForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setLoginForm({ ...loginForm, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const { email, password } = loginForm;
      
      if (email === 'demo@example.com' && password === 'demo123') {
        setCurrentView('dashboard');
      } else {
        setErrors({ 
          email: 'Invalid credentials', 
          password: 'Try demo@example.com / demo123' 
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
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
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Email Address</label>
              <input 
                type="email" 
                className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 text-gray-900 ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
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
            <a href="#" className="text-sm text-indigo-600 hover:text-purple-600 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900">Client Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600"
              >
                Dashboard
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{client.initials}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{client.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {client.name}!</h1>
          <p className="text-indigo-100">Here's an overview of your current projects and recent activity.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Content</h2>
          <p className="text-gray-600">Your dashboard components will go here.</p>
          <button 
            onClick={() => setCurrentView('login')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentView === 'login' && <LoginScreen />}
      {currentView === 'dashboard' && <Dashboard />}
    </div>
  );
};

export default ClientPortal;
