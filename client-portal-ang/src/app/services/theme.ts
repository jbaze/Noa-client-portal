import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSignal = signal(false);
  private readonly THEME_KEY = 'client-portal-theme';

  constructor() {
    this.initializeTheme();
  }

  get isDarkMode() {
    return this.isDarkModeSignal();
  }

  private initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem(this.THEME_KEY);

    if (savedTheme) {
      this.isDarkModeSignal.set(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkModeSignal.set(prefersDark);
    }

    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkModeSignal.set(!this.isDarkModeSignal());
    this.saveThemePreference();
    this.applyTheme();
  }

  private saveThemePreference() {
    localStorage.setItem(this.THEME_KEY, this.isDarkModeSignal() ? 'dark' : 'light');
  }

  private applyTheme() {
    const html = document.documentElement;

    if (this.isDarkModeSignal()) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
