 
import React from 'react';

const QuickActions = () => {
  const actions = [
    {
      id: 'new-request',
      title: 'New Request',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      bgColor: 'from-blue-50 to-indigo-50',
      hoverColor: 'hover:from-blue-100 hover:to-indigo-100',
      iconBg: 'bg-blue-500',
      onClick: () => alert('New request functionality coming soon!')
    },
    {
      id: 'send-message',
      title: 'Send Message',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      bgColor: 'from-green-50 to-emerald-50',
      hoverColor: 'hover:from-green-100 hover:to-emerald-100',
      iconBg: 'bg-green-500',
      onClick: () => alert('Message functionality coming soon!')
    },
    {
      id: 'schedule-call',
      title: 'Schedule Call',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      bgColor: 'from-purple-50 to-violet-50',
      hoverColor: 'hover:from-purple-100 hover:to-violet-100',
      iconBg: 'bg-purple-500',
      onClick: () => alert('Schedule call functionality coming soon!')
    },
    {
      id: 'view-reports',
      title: 'View Reports',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      bgColor: 'from-orange-50 to-amber-50',
      hoverColor: 'hover:from-orange-100 hover:to-amber-100',
      iconBg: 'bg-orange-500',
      onClick: () => alert('Reports functionality coming soon!')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button 
            key={action.id}
            onClick={action.onClick}
            className={`flex flex-col items-center p-4 bg-gradient-to-br ${action.bgColor} ${action.hoverColor} rounded-lg transition-all transform hover:-translate-y-1`}
          >
            <div className={`w-12 h-12 ${action.iconBg} rounded-lg flex items-center justify-center mb-3`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon}/>
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-900">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;