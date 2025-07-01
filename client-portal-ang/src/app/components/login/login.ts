import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private themeService: ThemeService) {}

  get isDarkMode() {
    return this.themeService.isDarkMode;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onLogin() {
    this.authService.login(this.email, this.password);
  }
}
