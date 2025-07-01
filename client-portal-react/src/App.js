import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Navigation from './components/shared/Navigation';
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import ProjectDetailsPage from './components/project/ProjectDetailsPage';
import ProjectHistoryPage from './components/history/ProjectHistoryPage';
import LoadingSpinner from './components/shared/LoadingSpinner';

function App() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Handle navigation
  const handleViewChange = (view, projectId = null) => {
    setCurrentView(view);
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  };

  // Handle project details navigation
  const handleViewProjectDetails = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-details');
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    setSelectedProjectId(null);
    setCurrentView('dashboard');
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading application..." />
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentView('dashboard')} />;
  }

  // Main application layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - only show on main pages, not project details */}
      {currentView !== 'project-details' && (
        <Navigation currentView={currentView} onViewChange={handleViewChange} />
      )}
      
      <main>
        {currentView === 'dashboard' && (
          <DashboardPage onViewProjectDetails={handleViewProjectDetails} />
        )}
        
        {currentView === 'history' && <ProjectHistoryPage />}
        
        {currentView === 'project-details' && selectedProjectId && (
          <ProjectDetailsPage 
            projectId={selectedProjectId} 
            onBack={handleBackToDashboard}
          />
        )}
        
        {/* Fallback for unknown views */}
        {!['dashboard', 'history', 'project-details'].includes(currentView) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
              <p className="text-gray-600 mb-4">The requested page could not be found.</p>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;