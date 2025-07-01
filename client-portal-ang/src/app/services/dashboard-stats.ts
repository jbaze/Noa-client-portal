import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardStats {
  totalProjects: number;
  totalBudget: number;
  totalClients: number;
  avgProjectBudget: number;
  lowestProjectBudget: number;
  highestProjectBudget: number;
  projectDistribution: {
    active: number;
    completed: number;
    paused: number;
  };
  recentClients: Array<{
    id: string;
    name: string;
    initials: string;
    avatar?: string;
    color: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardStatsService {

  getDashboardStats(): Observable<DashboardStats> {
    const mockStats: DashboardStats = {
      totalProjects: 237,
      totalBudget: 329000,
      totalClients: 49,
      avgProjectBudget: 6570,
      lowestProjectBudget: 408,
      highestProjectBudget: 920,
      projectDistribution: {
        active: 30,
        completed: 45,
        paused: 25
      },
      recentClients: [
        { id: '1', name: 'Alice Johnson', initials: 'AJ', color: 'bg-orange-500' },
        { id: '2', name: 'Bob Smith', initials: 'BS', color: 'bg-green-500' },
        { id: '3', name: 'Carol Brown', initials: 'CB', color: 'bg-pink-500' },
        { id: '4', name: 'David Wilson', initials: 'DW', color: 'bg-blue-500' },
        { id: '5', name: 'Sarah Johnson', initials: 'SJ', color: 'bg-purple-500' },
        { id: '6', name: 'Mike Davis', initials: 'MD', color: 'bg-indigo-500' },
        { id: '7', name: 'Emma Garcia', initials: 'EG', color: 'bg-yellow-500' },
        { id: '8', name: 'John Miller', initials: 'JM', color: 'bg-red-500' }
      ]
    };

    return of(mockStats);
  }
}
