import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal(false);
  private readonly AUTH_KEY = 'client-portal-auth';

  constructor(private router: Router) {
    // Check if user was previously logged in when service starts
    this.checkStoredAuth();
  }

  get isAuthenticated() {
    return this.isAuthenticatedSignal();
  }

  private checkStoredAuth() {
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    if (storedAuth === 'true') {
      this.isAuthenticatedSignal.set(true);
    }
  }

  login(email: string, password: string): boolean {
    // Mock login - always returns true for demo
    this.isAuthenticatedSignal.set(true);
    localStorage.setItem(this.AUTH_KEY, 'true');
    this.router.navigate(['/dashboard']);
    return true;
  }

  logout(): void {
    this.isAuthenticatedSignal.set(false);
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }
}

