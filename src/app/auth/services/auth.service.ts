import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {
  private _token = signal<string | null>(null);
  private _user = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>('checking');

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus()
  });

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') return 'checking';

    if(this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  login(email: string, password: string):Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`,
      { email, password }).pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error) => {
          this.handleAuthError();
          return of(false);
        })
      );
  }

  checkStatus():Observable<boolean> {
    const token = localStorage.getItem('token');
    if(!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error) => {
          this.handleAuthError();
          return of(false);
        })
      );
  }

  logout() {
    this._token.set(null);
    this._user.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess(resp: AuthResponse) {
    this._token.set(resp.token);
    this._user.set(resp.user);
    this._authStatus.set('authenticated');

    localStorage.setItem('token', resp.token);

    return(true);
  }

  private handleAuthError() {
    this.logout();
    return of(false);
  }
}
