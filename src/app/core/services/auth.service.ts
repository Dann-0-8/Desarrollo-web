import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

type Jwt = { sub: string; role: 'teacher' | 'student'; exp?: number };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private key = 'edu_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(
      `${environment.apiBaseUrl}/auth/login`,
      { username, password }
    );
  }

  setToken(t: string) { localStorage.setItem(this.key, t); }
  getToken() { return localStorage.getItem(this.key); }

  isLoggedIn(): boolean {
    try {
      const token = this.getToken();
      if (!token) return false;

      const j = jwtDecode<{ exp?: number }>(token);
      if (j.exp && Date.now() >= j.exp * 1000) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }


  getRole(): 'teacher' | 'student' | null {
    try {
      const t = this.getToken();
      return t ? jwtDecode<Jwt>(t).role : null;
    } catch { return null; }
  }

  logout() { localStorage.removeItem(this.key); }
}
