import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import ProjectHeader from './ProjectHeader';
import ProjectTimeline from './ProjectTimeline';
import DeliverablesList from './DeliverablesList';
import ProjectNotes from './ProjectNotes';
import LoadingSpinner from '../shared/LoadingSpinner';

const ProjectDetailsPage = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [deliverables, setDeliverables] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  const loadProjectData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [projectData, deliverablesData, timelineData, notesData] = await Promise.all([
        projectService.getProjectDetails(projectId),
        projectService.getProjectDeliverables(projectId),
        projectService.getProjectTimeline(projectId),
        projectService.getProjectNotes(projectId)
      ]);

      setProject(projectData);
      setDeliverables(deliverablesData);
      setTimeline(timelineData);
      setNotes(notesData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading project data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (deliverable) => {
    try {
      await projectService.downloadDelivery(projectId, deliverable.id);
      // Update download count
      setDeliverables(prev => 
        prev.map(d => 
          d.id === deliverable.id 
            ? { ...d, downloadCount: d.downloadCount + 1 }
            : d
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNote = (content) => {
    const newNote = {
      id: Date.now(),
      content,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      type: 'update'
    };
    setNotes(prev => [newNote, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading project details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Project</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectHeader project={project} onBack={onBack} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            <DeliverablesList deliverables={deliverables} onDownload={handleDownload} />
            <ProjectTimeline timeline={timeline} />
          </div>
          
          {/* Sidebar */}
          <div className="xl:col-span-1">
            <ProjectNotes notes={notes} onAddNote={handleAddNote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;