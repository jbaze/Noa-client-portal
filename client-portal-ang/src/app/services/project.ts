import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  getAllProjects(): Observable<Project[]> {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Website Redesign',
        status: 'active',
        progress: 75,
        description: 'Complete overhaul of company website with modern design and improved UX.',
        startDate: new Date('2024-11-01'),
        expectedDelivery: new Date('2025-02-15'),
        clientNote: 'Great progress on the homepage! Looking forward to seeing the product pages.'
      },
      {
        id: '2',
        name: 'Brand Identity',
        status: 'active',
        progress: 60,
        description: 'Logo design, color palette, and brand guidelines development.',
        startDate: new Date('2024-10-15'),
        expectedDelivery: new Date('2025-01-30'),
        clientNote: 'Waiting for your feedback on the latest logo and branding concepts...'
      },
      {
        id: '3',
        name: 'Mobile App UI',
        status: 'completed',
        progress: 100,
        description: 'User interface design for iOS and Android mobile application.',
        startDate: new Date('2024-08-01'),
        expectedDelivery: new Date('2024-12-01'),
        clientNote: 'Project completed successfully! Ready for development phase.'
      },
      {
        id: '4',
        name: 'E-commerce Platform',
        status: 'active',
        progress: 40,
        description: 'Custom e-commerce solution with advanced filtering and checkout optimization.',
        startDate: new Date('2024-12-01'),
        expectedDelivery: new Date('2025-04-15'),
        clientNote: 'Working on payment gateway integration designs. Next milestone: user testing.'
      },
      {
        id: '5',
        name: 'Marketing Campaign',
        status: 'paused',
        progress: 25,
        description: 'Digital marketing assets including social media templates and ad creatives.',
        startDate: new Date('2024-11-15'),
        expectedDelivery: new Date('2025-03-01'),
        clientNote: 'Project paused pending budget approval. Ready to resume when confirmed.'
      }
    ];

    return of(mockProjects);
  }

  getCurrentProject(): Observable<Project> {
    // Return the first active project as the "current" one
    return this.getAllProjects().pipe(
      map(projects => projects.find(p => p.status === 'active') || projects[0])
    );
  }

  getProjectDeliveries(): Observable<Delivery[]> {
    const mockDeliveries: Delivery[] = [
      {
        id: '1',
        projectId: '1',
        name: 'Initial Brand Concepts',
        description: 'First round of logo and brand direction concepts',
        deliveryDate: new Date('2024-01-25'),
        downloadUrl: '#',
        fileSize: '2.4 MB',
        fileType: 'PDF',
        status: 'approved'
      },
      {
        id: '2',
        projectId: '1',
        name: 'Logo Refinements',
        description: 'Refined logo designs based on initial feedback',
        deliveryDate: new Date('2024-02-05'),
        downloadUrl: '#',
        fileSize: '1.8 MB',
        fileType: 'PDF',
        status: 'pending_feedback'
      },
      {
        id: '3',
        projectId: '1',
        name: 'Business Card Designs',
        description: 'Business card layouts and print specifications',
        deliveryDate: new Date('2024-02-12'),
        downloadUrl: '#',
        fileSize: '3.2 MB',
        fileType: 'PDF',
        status: 'delivered'
      }
    ];

    return of(mockDeliveries);
  }
}
