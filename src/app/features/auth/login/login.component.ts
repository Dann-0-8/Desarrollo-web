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
    // 🔹 Validar campos antes de enviar al backend
    if (!this.username || !this.password || !this.roleHint) {
      this.error = 'Por favor completa todos los campos antes de continuar.';
      return;
    }

    // 🔹 Llamada al servicio de autenticación
    this.auth.login(this.username, this.password, this.roleHint)
      .subscribe({
        next: (res) => {
          this.auth.setToken(res.access_token);
          const role = this.auth.getRole() ?? this.roleHint;

          // 🔹 Redirigir según el rol
          if (role === 'teacher') {
            this.router.navigate(['/maestro']);
          } else if (role === 'student') {
            this.router.navigate(['/alumno']);
          } else if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.error = 'Credenciales inválidas. Verifica tus datos.';
        }
      });
  }
}
