import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  remember = false;
  currentYear = new Date().getFullYear();
  roleHint: 'student' | 'teacher' | 'admin' | '' = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.access_token);
        const role = this.auth.getRole();
        this.router.navigate([role === 'teacher' ? '/maestro' : '/alumno']);
      },
      error: () => this.error = 'Credenciales inválidas'
    });
  }
}
