import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Loading projects and activities...'); // Debug log
      
      const [projectsData, activitiesData] = await Promise.all([
        projectService.getProjects(),
        projectService.getRecentActivity()
      ]);
      
      console.log('Loaded projects:', projectsData); // Debug log
      console.log('Loaded activities:', activitiesData); // Debug log
      
      setProjects(projectsData);
      setActivities(activitiesData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadLatest = async (project) => {
    try {
      await projectService.downloadDelivery(project.id, 'latest');
    } catch (err) {
      setError(err.message);
      console.error('Error downloading:', err);
    }
  };

  const getProject = async (id) => {
    try {
      return await projectService.getProject(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return {
    projects,
    activities,
    isLoading,
    error,
    downloadLatest,
    getProject,
    refreshData: loadData
  };
};