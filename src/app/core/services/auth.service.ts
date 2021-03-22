import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  email: string;
  role: string;
  name: string;
}

@Injectable()
export class AuthService {
  path = 'https://dev.tap-id.tech/tapidconfig/auth';
  user: AuthResponse;
  constructor(private http: HttpClient) { }

  // with token jwt set on local storage
  // get token() {
  //   return localStorage.getItem(this.TOKEN_KEY);
  // }
  // get isAuthenticated() {
  //   return !!localStorage.getItem(this.TOKEN_KEY);
  // }
  // logout() {
  //   localStorage.removeItem(this.TOKEN_KEY);
  // };

  setToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  loginUser(data: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.path}/login`, data)
      .pipe(
        tap(res => {
          this.setToken('user', res.email);
          this.setToken('role', res.role);
          this.user = { role: res.role, name: res.email, email: res.email };
        })
      );
    //We are calling shareReplay to prevent the receiver of this Observable from accidentally
    //triggering multiple POST requests due to multiple subscriptions.
    // .shareReplay()
  }

  registerUser(registerData: { username: string, email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.path}/register`, registerData)
      .pipe(
        tap(res => {
          this.setToken('user', res.email);
          this.setToken('role', res.role);
          this.user = { role: res.role, name: res.email, email: res.email };
        })
      );
  }

  refreshToken(): Observable<void> {
    return this.http.post<void>(`${this.path}/refresh`, null);
  }
}
