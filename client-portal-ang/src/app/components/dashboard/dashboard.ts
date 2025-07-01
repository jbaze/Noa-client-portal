import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project';
import { AuthService } from '../../services/auth';
import { DashboardStatsService, DashboardStats } from '../../services/dashboard-stats';
import { ThemeService } from '../../services/theme';
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
  viewMode: 'cards' | 'table' = 'cards';
  dashboardStats: DashboardStats | null = null;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private themeService: ThemeService,
    private dashboardStatsService: DashboardStatsService,
    private router: Router
  ) {}

   get isDarkMode() {
    return this.themeService.isDarkMode;
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });

    this.dashboardStatsService.getDashboardStats().subscribe(stats => {
      this.dashboardStats = stats;
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

   toggleTheme() {
    this.themeService.toggleTheme();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  getProgressPercentage(value: number, total: number): number {
    return Math.round((value / total) * 100);
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
