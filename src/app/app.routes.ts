/*import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      // Vistas por rol
      { path: 'maestro', loadComponent: () => import('./features/teacher/teacher-user/teacher-user.component').then(m => m.TeacherUserComponent), canActivate: [roleGuard], data: { roles: ['teacher'] } },
      { path: 'alumno',  loadComponent: () => import('./features/student/student-user/student-user.component').then(m => m.StudentUserComponent), canActivate: [roleGuard], data: { roles: ['student'] } },

      // Funciones comunes
      { path: 'subir-notas',   loadComponent: () => import('./features/grades/upload-grades/upload-grades.component').then(m => m.UploadGradesComponent) },
      { path: 'subir-tareas',  loadComponent: () => import('./features/tasks/upload-tasks/upload-tasks.component').then(m => m.UploadTasksComponent) },
      { path: 'entregar-tarea',loadComponent: () => import('./features/tasks/submit-tasks/submit-tasks.component').then(m => m.SubmitTasksComponent) },
      { path: 'calendario',    loadComponent: () => import('./features/calendar/activities-calendar/activities-calendar.component').then(m => m.ActivitiesCalendarComponent) },
      { path: 'anuncios',      loadComponent: () => import('./features/announcements/announcements/announcements.component').then(m => m.AnnouncementsComponent) },
      { path: 'cursos',        loadComponent: () => import('./features/courses/courses/courses.component').then(m => m.CoursesComponent) },
      { path: 'info',          loadComponent: () => import('./features/info/info/info.component').then(m => m.InfoComponent) },

      { path: '', pathMatch: 'full', redirectTo: 'alumno' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];*/

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    // canActivate: [authGuard],  // 🔒 Desactivado temporalmente
    children: [
      // Vistas por rol (sin roleGuard)
      {
        path: 'maestro',
        loadComponent: () => import('./features/teacher/teacher-user/teacher-user.component').then(m => m.TeacherUserComponent)
        // canActivate: [roleGuard], data: { roles: ['teacher'] }
      },
      {
        path: 'alumno',
        loadComponent: () => import('./features/student/student-user/student-user.component').then(m => m.StudentUserComponent)
        // canActivate: [roleGuard], data: { roles: ['student'] }
      },

      { path: 'subir-notas',    loadComponent: () => import('./features/grades/upload-grades/upload-grades.component').then(m => m.UploadGradesComponent) },
      { path: 'subir-tareas',   loadComponent: () => import('./features/tasks/upload-tasks/upload-tasks.component').then(m => m.UploadTasksComponent) },
      { path: 'entregar-tarea', loadComponent: () => import('./features/tasks/submit-tasks/submit-tasks.component').then(m => m.SubmitTasksComponent) },
      { path: 'calendario',     loadComponent: () => import('./features/calendar/activities-calendar/activities-calendar.component').then(m => m.ActivitiesCalendarComponent) },
      { path: 'anuncios',       loadComponent: () => import('./features/announcements/announcements/announcements.component').then(m => m.AnnouncementsComponent) },
      { path: 'cursos',         loadComponent: () => import('./features/courses/courses/courses.component').then(m => m.CoursesComponent) },
      { path: 'info',           loadComponent: () => import('./features/info/info/info.component').then(m => m.InfoComponent) },

      { path: '', pathMatch: 'full', redirectTo: 'alumno' }
    ]
  },

  { path: '**', redirectTo: 'alumno' }
];

