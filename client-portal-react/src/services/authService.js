import { apiService } from './apiService';
import { User } from '../models/User';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authListeners = [];
  }

  async login(credentials) {
    try {
      // Demo authentication
      if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
        const userData = {
          id: '1',
          name: 'Noa Krakovich',
          email: 'demo@example.com',
          company: 'TechStart Inc.',
          memberSince: 'March 2024'
        };
        
        const user = new User(userData);
        this.setCurrentUser(user);
        
        // In real app, you'd get this from API
        localStorage.setItem('authToken', 'demo-token-123');
        
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('authToken');
    this.notifyAuthListeners();
  }

  setCurrentUser(user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.notifyAuthListeners();
  }

  getCurrentUser() {
    if (this.currentUser) return this.currentUser;
    
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = new User(JSON.parse(userData));
    }
    
    return this.currentUser;
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  onAuthChange(callback) {
    this.authListeners.push(callback);
  }

  offAuthChange(callback) {
    this.authListeners = this.authListeners.filter(listener => listener !== callback);
  }

  notifyAuthListeners() {
    this.authListeners.forEach(callback => callback(this.currentUser));
  }
}

export const authService = new AuthService();
