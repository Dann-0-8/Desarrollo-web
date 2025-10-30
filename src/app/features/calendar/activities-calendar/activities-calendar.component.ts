import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type ActivityType = 'Tarea' | 'Examen' | 'Proyecto' | 'Evento';
interface Activity {
  id: number;
  title: string;
  course: string;
  type: ActivityType;
  dueAt: string; // ISO: YYYY-MM-DD
  time?: string;
  link?: string;
}

@Component({
  standalone: true,
  selector: 'app-activities-calendar',
  imports: [CommonModule],
  templateUrl: './activities-calendar.component.html',
  styleUrls: ['./activities-calendar.component.scss']
})
export class ActivitiesCalendarComponent {
  // ----- Datos de ejemplo (conecta tu servicio real cuando quieras) -----
  activities: Activity[] = [
    { id: 1, title: 'Búsqueda binaria',   course: 'Algoritmos I',        type: 'Tarea',   dueAt: '2025-10-02', time: '23:59' },
    { id: 2, title: 'Examen parcial',     course: 'Matemática Discreta', type: 'Examen',  dueAt: '2025-10-11', time: '09:00' },
    { id: 3, title: 'Entrega proyecto',   course: 'Bases de Datos',      type: 'Proyecto',dueAt: '2025-10-17', time: '18:00' },
    { id: 4, title: 'Revisión de ensayo', course: 'Redacción Técnica',   type: 'Evento',  dueAt: '2025-10-26' },
    { id: 5, title: 'Sprint demo',        course: 'Ingeniería SW',       type: 'Evento',  dueAt: '2025-11-02' },
  ];

  // ----- Estado de calendario -----
  today = new Date();
  y = this.today.getFullYear();
  m = this.today.getMonth(); // 0-11
  monthLabel = this.label(this.y, this.m);
  grid: (number | null)[] = this.makeGrid(this.y, this.m); // null = celda vacía

  // Conjunto de fechas (YYYY-MM-DD) con actividad del mes visible
  private monthActivitySet = new Set<string>();

  constructor() {
    this.refreshMonthActivitySet();
  }

  prev() {
    if (this.m === 0) { this.m = 11; this.y--; } else { this.m--; }
    this.refresh();
  }
  next() {
    if (this.m === 11) { this.m = 0; this.y++; } else { this.m++; }
    this.refresh();
  }

  // ----- Listado filtrado para el mes visible -----
  get visibleActivities(): Activity[] {
    const ym = `${this.y}-${String(this.m + 1).padStart(2, '0')}`;
    return this.activities
      .filter(a => a.dueAt.startsWith(ym))
      .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  }

  // Marcar punto en el día si hay actividad
  hasActivity(day: number): boolean {
    const iso = `${this.y}-${String(this.m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.monthActivitySet.has(iso);
  }

  // ----- Helpers -----
  private refresh() {
    this.monthLabel = this.label(this.y, this.m);
    this.grid = this.makeGrid(this.y, this.m);
    this.refreshMonthActivitySet();
  }

  private refreshMonthActivitySet() {
    this.monthActivitySet.clear();
    const ym = `${this.y}-${String(this.m + 1).padStart(2, '0')}`;
    this.activities.forEach(a => { if (a.dueAt.startsWith(ym)) this.monthActivitySet.add(a.dueAt); });
  }

  private makeGrid(year: number, month: number): (number | null)[] {
    const first = new Date(year, month, 1);
    // Lunes=0 ... Domingo=6
    const blanks = ((first.getDay() || 7) - 1);
    const days = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(blanks).fill(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }

  private label(year: number, month: number) {
    return new Date(year, month, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }
}
