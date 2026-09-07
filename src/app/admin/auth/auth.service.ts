import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'scane-tech-admin-auth';

interface AuthData {
  token: string;
  username: string;
}

interface LoginResponse {
  token: string;
  username: string;
  is_staff: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal reactif : les composants (garde, layout) reagissent immediatement
  // a une connexion/deconnexion sans devoir recharger la page.
  utilisateur = signal<AuthData | null>(this.lireDepuisStockage());

  constructor(private http: HttpClient) {}

  private lireDepuisStockage(): AuthData | null {
    if (typeof window === 'undefined') return null;
    const brut = window.localStorage.getItem(STORAGE_KEY);
    return brut ? JSON.parse(brut) : null;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login/`, { username, password })
      .pipe(
        tap((res) => {
          const data: AuthData = { token: res.token, username: res.username };
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          this.utilisateur.set(data);
        })
      );
  }

  logout(): void {
    const token = this.getToken();
    window.localStorage.removeItem(STORAGE_KEY);
    this.utilisateur.set(null);
    if (token) {
      this.http.post(`${environment.apiUrl}/auth/logout/`, {}).subscribe({ error: () => {} });
    }
  }

  isLoggedIn(): boolean {
    return !!this.utilisateur();
  }

  getToken(): string | null {
    return this.utilisateur()?.token ?? null;
  }
}
