import React from 'react';

const FilterBar = ({ filters, onFilterChange, onSearch }) => {
  const statusOptions = ['All', 'Delivered', 'Pending Review', 'Approved', 'Revision Requested'];
  const typeOptions = ['All', 'Design Files', 'Brand Assets', 'Interactive Prototype', 'Documentation'];
  const projectOptions = ['All', 'Website Redesign', 'Brand Identity', 'Mobile App UI'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search deliverables..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={filters.status || 'All'}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={filters.type || 'All'}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          >
            {typeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Project Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={filters.project || 'All'}
            onChange={(e) => onFilterChange({ ...filters, project: e.target.value })}
          >
            {projectOptions.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => onFilterChange({ search: '', status: 'All', type: 'All', project: 'All' })}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear all filters
        </button>
        <div className="text-sm text-gray-600">
          {/* Add count of filtered results here if needed */}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;