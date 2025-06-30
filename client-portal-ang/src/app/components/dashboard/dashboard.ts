import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project';
import { AuthService } from '../../services/auth';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  clientName = 'Noa Krakovich';
  viewMode: 'cards' | 'table' = 'cards'; // NEW: View mode toggle

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  logout() {
    this.authService.logout();
  }

  navigateToHistory() {
    this.router.navigate(['/project-history']);
  }

  navigateToProjectHistory(projectId: string) {
    this.router.navigate(['/project-history'], {
      queryParams: { projectId: projectId }
    });
  }

  downloadLatest(project: Project) {
    alert(`Downloading latest delivery for: ${project.name}`);
  }

  // NEW METHOD: Toggle between card and table view
  toggleViewMode() {
    this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'paused':
        return 'Paused';
      default:
        return 'Unknown';
    }
  }
}
