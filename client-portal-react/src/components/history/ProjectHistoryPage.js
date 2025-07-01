import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import FilterBar from './FilterBar';
import DeliveryTable from './DeliveryTable';
import LoadingSpinner from '../shared/LoadingSpinner';

const ProjectHistoryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    type: 'All',
    project: 'All'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDeliveries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [deliveries, filters]);

  const loadDeliveries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await projectService.getAllDeliveries();
      setDeliveries(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading deliveries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...deliveries];

    // Search filter - FIX: Add null checks
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(delivery => {
        const name = delivery.name || '';
        const type = delivery.type || '';
        const project = delivery.project || '';
        
        return name.toLowerCase().includes(searchTerm) ||
               type.toLowerCase().includes(searchTerm) ||
               project.toLowerCase().includes(searchTerm);
      });
    }

    // Status filter
    if (filters.status !== 'All') {
      filtered = filtered.filter(delivery => delivery.status === filters.status);
    }

    // Type filter
    if (filters.type !== 'All') {
      filtered = filtered.filter(delivery => delivery.type === filters.type);
    }

    // Project filter
    if (filters.project !== 'All') {
      filtered = filtered.filter(delivery => delivery.project === filters.project);
    }

    setFilteredDeliveries(filtered);
  };

  const handleDownload = async (delivery) => {
    try {
      await projectService.downloadDelivery('all', delivery.id);
      // Update download count
      setDeliveries(prev =>
        prev.map(d =>
          d.id === delivery.id
            ? { ...d, downloadCount: d.downloadCount + 1 }
            : d
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewDelivery = (delivery) => {
    alert(`Viewing details for: ${delivery.name}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading project history..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project History</h1>
        <p className="text-gray-600">
          View and download all your project deliverables and milestones
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <FilterBar filters={filters} onFilterChange={setFilters} />

      {/* Results Summary */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredDeliveries.length} of {deliveries.length} deliverables
        </p>
        <button
          onClick={loadDeliveries}
          className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Deliveries Table */}
      <DeliveryTable
        deliveries={filteredDeliveries}
        onDownload={handleDownload}
        onView={handleViewDelivery}
      />

      {/* Action Notes */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Need Help?</h3>
            <p className="text-sm text-yellow-700">
              If you can't find a specific deliverable or need assistance downloading files, 
              please contact our support team or use the quick actions on your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHistoryPage;