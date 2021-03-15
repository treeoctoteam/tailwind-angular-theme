import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  loginUser(loginData: { email: string, password: string }) {
    return this.http.post<any>(`${this.path}/login`, loginData);
    //We are calling shareReplay to prevent the receiver of this Observable from accidentally 
    //triggering multiple POST requests due to multiple subscriptions.
    // .shareReplay()
  }

  registerUser(registerData: { email: string, username: string, password: string}) {
    return this.http.post<any>(`${this.path}/register`, registerData);
  }

  test() {
    return this.http.get<any>("http://localhost:3002/tapidconfig/home");
  }
}
