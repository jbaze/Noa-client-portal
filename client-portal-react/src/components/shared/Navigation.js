import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Navigation = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-900">Client Portal</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onViewChange('history')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                currentView === 'history' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Project History
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{user.getInitials()}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button 
                onClick={logout}
                className="ml-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;