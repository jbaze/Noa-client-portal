import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'client-portal';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check authentication state and redirect accordingly
    // This handles the case when user refreshes the page
    const currentUrl = this.router.url;

    if (this.authService.isAuthenticated) {
      // User is logged in
      if (currentUrl === '/' || currentUrl === '/login') {
        // Redirect to dashboard if on login page
        this.router.navigate(['/dashboard']);
      }
      // Otherwise, let them stay on current protected page
    } else {
      // User is not logged in
      if (currentUrl !== '/login') {
        // Redirect to login if trying to access protected pages
        this.router.navigate(['/login']);
      }
    }
  }
}
