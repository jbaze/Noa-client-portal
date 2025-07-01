import React from 'react';

const DeliverablesList = ({ deliverables = [], onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Deliverables</h2>
      
      <div className="space-y-4">
        {deliverables.map((deliverable) => (
          <div key={deliverable.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {/* File Type Icon */}
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={deliverable.getFileTypeIcon()}/>
                  </svg>
                </div>
                
                {/* File Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{deliverable.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${deliverable.getStatusColor()}`}>
                      {deliverable.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{deliverable.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Type: {deliverable.type}</span>
                    <span>Size: {deliverable.getFormattedFileSize()}</span>
                    <span>Version: {deliverable.version}</span>
                    <span>Downloads: {deliverable.downloadCount}</span>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-1">
                    Delivered on {deliverable.getFormattedDate()}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onDownload?.(deliverable)}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Download
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {deliverables.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p className="text-gray-500">No deliverables available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverablesList;