import { apiService } from './apiService';
import { Project } from '../models/Project';
import { Activity } from '../models/Activity';
import { Deliverable } from '../models/Deliverable';

class ProjectService {
  async getProjects() {
    try {
      // Demo data - in real app: return apiService.get('/projects')
      const projectsData = [
        {
          id: 1,
          name: 'Website Redesign',
          progress: 75,
          status: 'In Progress',
          description: 'Complete overhaul of company website with modern design and improved UX.',
          dueDate: '2025-07-15',
          priority: 'High',
          lastUpdate: '2 days ago',
          startDate: '2025-05-01',
          budget: 25000,
          team: ['John Doe (Designer)', 'Jane Smith (Developer)', 'Mike Johnson (PM)'],
          tags: ['Web Design', 'UX/UI', 'Development']
        },
        {
          id: 2,
          name: 'Brand Identity',
          progress: 60,
          status: 'Review',
          description: 'Logo design, color palette, and brand guidelines development.',
          dueDate: '2025-07-08',
          priority: 'Medium',
          lastUpdate: '1 day ago',
          startDate: '2025-04-15',
          budget: 15000,
          team: ['Sarah Wilson (Designer)', 'Tom Brown (Creative Director)'],
          tags: ['Branding', 'Logo Design', 'Guidelines']
        },
        {
          id: 3,
          name: 'Mobile App UI',
          progress: 90,
          status: 'Completed',
          description: 'User interface design for iOS and Android mobile application.',
          dueDate: '2025-06-30',
          priority: 'High',
          lastUpdate: '5 hours ago',
          startDate: '2025-04-01',
          budget: 30000,
          team: ['Alex Chen (UI Designer)', 'Maria Garcia (UX Designer)'],
          tags: ['Mobile', 'UI Design', 'iOS', 'Android']
        }
      ];

      console.log('Raw project data:', projectsData); // Debug log
      const projects = projectsData.map(data => new Project(data));
      console.log('Mapped projects:', projects); // Debug log
      
      return projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  }

  async getProject(id) {
    try {
      const projects = await this.getProjects();
      return projects.find(project => project.id === parseInt(id));
    } catch (error) {
      console.error('Failed to fetch project:', error);
      return null;
    }
  }

  async getRecentActivity() {
    try {
      // Demo data - in real app: return apiService.get('/activities/recent')
      const activitiesData = [
        {
          id: 1,
          title: 'New design concepts uploaded for Brand Identity project',
          time: '2 hours ago',
          type: 'upload',
          icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
        },
        {
          id: 2,
          title: 'Website wireframes approved and moved to development',
          time: '1 day ago',
          type: 'approval',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          id: 3,
          title: 'Initial consultation call scheduled for next week',
          time: '3 days ago',
          type: 'meeting',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        },
        {
          id: 4,
          title: 'Mobile app prototypes delivered and tested',
          time: '1 week ago',
          type: 'delivery',
          icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
        }
      ];

      return activitiesData.map(data => new Activity(data));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      return [];
    }
  }

  async getProjectDetails(id) {
    try {
      // Demo data - in real app: return apiService.get(`/projects/${id}/details`)
      const projectData = {
        id: parseInt(id),
        name: 'Website Redesign',
        description: 'Complete overhaul of company website with modern design and improved UX. This includes redesigning all pages, improving site performance, implementing responsive design, and enhancing user experience.',
        progress: 75,
        status: 'In Progress',
        priority: 'High',
        dueDate: '2025-07-15',
        startDate: '2025-05-01',
        lastUpdate: '2 days ago',
        budget: 25000,
        team: ['John Doe (Designer)', 'Jane Smith (Developer)', 'Mike Johnson (PM)'],
        tags: ['Web Design', 'UX/UI', 'Development', 'Responsive']
      };

      return new Project(projectData);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      return null;
    }
  }

  async getProjectDeliverables(projectId) {
    try {
      // Demo data - in real app: return apiService.get(`/projects/${projectId}/deliverables`)
      const deliverablesData = [
        {
          id: 1,
          name: 'Homepage Design Mockups',
          type: 'Design Files',
          projectId: projectId,
          projectName: 'Website Redesign',
          date: '2025-06-28',
          status: 'Delivered',
          fileSize: '15728640', // 15MB
          downloadCount: 5,
          description: 'High-fidelity mockups for the new homepage design including desktop and mobile versions.',
          version: '2.1'
        },
        {
          id: 2,
          name: 'Brand Guidelines Document',
          type: 'Documentation',
          projectId: projectId,
          projectName: 'Website Redesign',
          date: '2025-06-25',
          status: 'Approved',
          fileSize: '5242880', // 5MB
          downloadCount: 12,
          description: 'Comprehensive brand guidelines including color palette, typography, and usage rules.',
          version: '1.0'
        },
        {
          id: 3,
          name: 'Interactive Prototype',
          type: 'Interactive Prototype',
          projectId: projectId,
          projectName: 'Website Redesign',
          date: '2025-06-22',
          status: 'Pending Review',
          fileSize: '0', // Link only
          downloadCount: 8,
          description: 'Clickable prototype showing user flows and interactions for the new website.',
          version: '1.5'
        }
      ];

      return deliverablesData.map(data => new Deliverable(data));
    } catch (error) {
      console.error('Failed to fetch deliverables:', error);
      return [];
    }
  }

  async getProjectTimeline(projectId) {
    try {
      // Demo data - in real app: return apiService.get(`/projects/${projectId}/timeline`)
      const timelineData = [
        {
          id: 1,
          title: 'Project Kickoff',
          description: 'Initial meeting with stakeholders and project planning session.',
          date: '2025-05-01',
          type: 'milestone',
          status: 'completed'
        },
        {
          id: 2,
          title: 'Research & Discovery',
          description: 'User research, competitive analysis, and requirements gathering.',
          date: '2025-05-15',
          type: 'phase',
          status: 'completed'
        },
        {
          id: 3,
          title: 'Wireframes Delivered',
          description: 'Low-fidelity wireframes for all main pages completed.',
          date: '2025-05-30',
          type: 'deliverable',
          status: 'completed'
        },
        {
          id: 4,
          title: 'Development Phase',
          description: 'Frontend development and implementation.',
          date: '2025-07-10',
          type: 'phase',
          status: 'in-progress'
        }
      ];

      return timelineData;
    } catch (error) {
      console.error('Failed to fetch project timeline:', error);
      return [];
    }
  }

  async getProjectNotes(projectId) {
    try {
      // Demo data - in real app: return apiService.get(`/projects/${projectId}/notes`)
      return [
        {
          id: 1,
          content: 'Client requested changes to the color scheme. Updated mockups with new brand colors.',
          author: 'Design Team',
          date: '2025-06-28',
          type: 'update'
        },
        {
          id: 2,
          content: 'Great progress on the responsive design! The mobile version looks fantastic.',
          author: 'SNoa Krakovich',
          date: '2025-06-25',
          type: 'feedback'
        }
      ];
    } catch (error) {
      console.error('Failed to fetch project notes:', error);
      return [];
    }
  }

  async getAllDeliveries() {
    try {
      // Demo data for project history page
      const deliveriesData = [
        {
          id: 1,
          name: 'Final Logo Package',
          type: 'Brand Assets',
          project: 'Brand Identity',
          date: '2025-06-25',
          status: 'Pending Review',
          fileSize: '10485760'
        },
        {
          id: 2,
          name: 'Homepage Mockups v2',
          type: 'Design Files',
          project: 'Website Redesign',
          date: '2025-06-22',
          status: 'Delivered',
          fileSize: '15728640'
        },
        {
          id: 3,
          name: 'Color Palette Variations',
          type: 'Brand Assets',
          project: 'Brand Identity',
          date: '2025-06-20',
          status: 'Delivered',
          fileSize: '5242880'
        }
      ];

      return deliveriesData.map(data => new Deliverable(data));
    } catch (error) {
      console.error('Failed to fetch all deliveries:', error);
      return [];
    }
  }

  async downloadDelivery(projectId, deliveryId) {
    try {
      // In real app: return apiService.get(`/projects/${projectId}/deliveries/${deliveryId}/download`)
      console.log(`Downloading delivery ${deliveryId} for project ${projectId}`);
      alert(`Download started for project: ${projectId}`);
    } catch (error) {
      console.error('Failed to download delivery:', error);
      throw error;
    }
  }
}

export const projectService = new ProjectService();
