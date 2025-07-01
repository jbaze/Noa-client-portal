import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useProjects } from '../../hooks/useProjects';
import StatsGrid from './StatsGrid';
import ProjectCard from './ProjectCard';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';
import LoadingSpinner from '../shared/LoadingSpinner';

const DashboardPage = ({ onViewProjectDetails }) => {
  const { user } = useAuth();
  const { projects, activities, isLoading, downloadLatest } = useProjects();

  const handleViewDetails = (project) => {
    onViewProjectDetails?.(project.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-indigo-100 text-lg">
                Here's an overview of your current projects and recent activity.
              </p>
              <div className="mt-4 flex items-center space-x-6 text-indigo-200">
                <span className="text-sm">
                  <strong className="text-white">{user?.company}</strong> • Member since {user?.memberSince}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{user?.getInitials()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Active Projects Section - FULL WIDTH */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {projects.length} active project{projects.length !== 1 ? 's' : ''}
              </span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View All Projects
              </button>
            </div>
          </div>
          
          {/* Project Cards - 3 COLUMNS: Perfect balance of space and visibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDownload={downloadLatest}
                onViewDetails={handleViewDetails}
              />
            ))}
            
            {/* Add Project Card - Optional: Show when less than 6 projects */}
            {projects.length < 6 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start New Project</h3>
                  <p className="text-sm text-gray-500 mb-4">Ready to begin your next project?</p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Create Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Content Grid - Activity Feed + Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Activity Feed - Takes 2 columns */}
          <div className="xl:col-span-2">
            <ActivityFeed activities={activities} />
          </div>

          {/* Sidebar Content - Takes 1 column */}
          <div className="xl:col-span-1 space-y-6">
            <QuickActions />
            
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {projects.filter(p => p.status !== 'Completed').map(project => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-500">{project.dueDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${project.getPriorityColor()}`}>
                        {project.priority}
                      </span>
                      {project.isOverdue() && (
                        <span className="text-xs text-red-600 font-medium">Overdue</span>
                      )}
                    </div>
                  </div>
                ))}
                
                {projects.filter(p => p.status !== 'Completed').length === 0 && (
                  <div className="text-center py-4">
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p className="text-sm text-gray-500">All projects completed!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Project Progress Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">{project.name}</span>
                        <span className="text-gray-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;