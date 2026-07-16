import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {
  private _token = signal<string | null>(null);
  private _user = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>('checking');

  private http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') return 'checking';

    if(this._user()) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`,
      { email, password }).pipe(tap(resp => {
        this._token.set(resp.token);
        this._user.set(resp.user);
        this._authStatus.set('authenticated');

        localStorage.setItem('token', resp.token);
      }))
      ;
  }
}
