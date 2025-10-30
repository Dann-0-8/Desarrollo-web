import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
  <div class="layout">
    <aside class="sidebar">
      <h3>Plataforma Educativa</h3>
      <a routerLink="/maestro">Usuario Maestro</a>
      <a routerLink="/alumno">Usuario Alumno</a>
      <a routerLink="/subir-notas">Subir notas</a>
      <a routerLink="/subir-tareas">Subir tareas</a>
      <a routerLink="/entregar-tarea">Entrega de tareas</a>
      <a routerLink="/calendario">Calendario</a>
      <a routerLink="/anuncios">Anuncios</a>
      <a routerLink="/cursos">Cursos</a>
      <a routerLink="/info">Información</a>
      <button (click)="logout()">Salir</button>
    </aside>
    <main><router-outlet/></main>
  </div>
  `,
  styles: [`
    .layout{display:grid;grid-template-columns:240px 1fr;min-height:100vh}
    .sidebar{padding:16px;border-right:1px solid #e5e5e5;display:flex;flex-direction:column;gap:8px}
    main{padding:24px}
    a{text-decoration:none}
  `]
})
export class MainLayoutComponent {
  logout(){ localStorage.removeItem('edu_token'); location.href = '/login'; }
}
