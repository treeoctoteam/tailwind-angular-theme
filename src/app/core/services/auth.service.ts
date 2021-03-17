import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  // path = 'https://dev.tap-id.tech/tapidconfig/auth';
  path = 'http://localhost:3002/tapidconfig/auth';

  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  // with token jwt set oon local storage
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

  loginUser(loginData: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.path}/login`, loginData)
      .pipe(
        tap(res => {
          res.email;
          this.setToken('token', res.accessToken);
          this.setToken('refreshToken', res.refreshToken);
        })
      );
    //We are calling shareReplay to prevent the receiver of this Observable from accidentally 
    //triggering multiple POST requests due to multiple subscriptions.
    // .shareReplay()
  }

  registerUser(registerData: { email: string, username: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.path}/register`, registerData)
      .pipe(
        tap(res => {
          res.email;
          this.setToken('token', res.accessToken);
          this.setToken('refreshToken', res.refreshToken);
        })
      );
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    // const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.path}/refresh`, {})
      // .pipe(
      //   tap(res => {
      //     this.setToken('token', res.accessToken);
      //     this.setToken('refreshToken', res.refreshToken);
      //   })
      // );
  }

  test() {
    // return this.http.get<any>("https://dev.tap-id.tech/tapidconfig/home");
    return this.http.get<any>("http://localhost:3002/tapidconfig/home");
  }
}
