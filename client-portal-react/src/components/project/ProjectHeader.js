import React from 'react';

const ProjectHeader = ({ project, onBack }) => {
  if (!project) return null;

  const daysRemaining = project.getDaysRemaining();
  const isOverdue = project.isOverdue();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
        
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${project.getStatusColor()}`}>
            {project.status}
          </span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${project.getPriorityColor()}`}>
            {project.priority} Priority
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h1>
          <p className="text-gray-600 mb-6">{project.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Project Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Project Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{project.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                  {project.dueDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days Remaining:</span>
                <span className={`font-medium ${isOverdue ? 'text-red-600' : daysRemaining <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {isOverdue ? 'Overdue' : `${daysRemaining} days`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium">{project.getFormattedBudget()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="font-medium">{project.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* Team Members */}
          {project.team && project.team.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Team Members</h3>
              <div className="space-y-2">
                {project.team.map((member, index) => (
                  <div key={index} className="text-sm text-gray-700">{member}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;