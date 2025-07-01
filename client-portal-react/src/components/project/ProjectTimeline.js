import React from 'react';

const ProjectTimeline = ({ timeline = [] }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        );
      case 'in-progress':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        );
      case 'upcoming':
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        );
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'milestone': return 'text-purple-600 bg-purple-100';
      case 'deliverable': return 'text-green-600 bg-green-100';
      case 'phase': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Timeline</h2>
      
      <div className="space-y-6">
        {timeline.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-4">
            {/* Timeline Icon */}
            <div className="flex flex-col items-center">
              {getStatusIcon(item.status)}
              {index < timeline.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
              )}
            </div>
            
            {/* Timeline Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;