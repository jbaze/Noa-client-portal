import React from 'react';

const ProjectCard = ({ project, onDownload, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.name}</h3>
          <div className="flex items-center space-x-2 mb-4">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${project.getStatusColor()}`}>
              {project.status}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${project.getPriorityColor()}`}>
              {project.priority}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span className="font-medium">Progress</span>
          <span className="font-semibold">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${project.progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 text-sm text-gray-500 mb-6">
        <div className="flex justify-between items-center">
          <span>Due Date:</span>
          <span className={`font-medium ${project.isOverdue() ? 'text-red-600' : 'text-gray-900'}`}>
            {project.dueDate}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Last Update:</span>
          <span className="font-medium text-gray-900">{project.lastUpdate}</span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button 
          onClick={() => onDownload?.(project)}
          className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-3 px-4 rounded-lg transition-colors text-sm"
        >
          Download Latest
        </button>
        <button 
          onClick={() => onViewDetails?.(project)}
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;