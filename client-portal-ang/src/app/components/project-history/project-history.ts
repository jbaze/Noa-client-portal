import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project';
import { AuthService } from '../../services/auth';
import { Delivery } from '../../models/delivery.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-history.html',
  styleUrls: ['./project-history.scss']
})
export class ProjectHistoryComponent implements OnInit {
  deliveries: Delivery[] = [];
  allDeliveries: Delivery[] = [];
  projects: Project[] = [];
  selectedProjectId: string | null = null;
  selectedProjectName: string = '';
  clientName = 'Noa Krakovich';

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Load all projects first
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;

      // Load all deliveries
      this.projectService.getProjectDeliveries().subscribe(deliveries => {
        this.allDeliveries = deliveries;

        // Check if a specific project was requested via URL
        this.route.queryParams.subscribe(params => {
          this.selectedProjectId = params['projectId'] || null;
          this.filterDeliveries();
        });
      });
    });
  }

  filterDeliveries() {
    if (this.selectedProjectId) {
      // Filter deliveries for specific project
      this.deliveries = this.allDeliveries.filter(d => d.projectId === this.selectedProjectId);

      // Get project name
      const project = this.projects.find(p => p.id === this.selectedProjectId);
      this.selectedProjectName = project ? project.name : 'Unknown Project';
    } else {
      // Show all deliveries
      this.deliveries = this.allDeliveries;
      this.selectedProjectName = '';
    }
  }

  getProjectName(projectId: string): string {
    const project = this.projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  downloadFile(delivery: Delivery) {
    alert(`Downloading ${delivery.name}... (This is a demo)`);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending_feedback':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending_feedback':
        return 'Pending Feedback';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  }
}
