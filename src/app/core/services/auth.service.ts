import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  path = 'http://localhost:3002/auth';

  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  };

  async loginUser(loginData: any) {
    try {
      const res = await this.http.post<any>(`${this.path}/login`, loginData).toPromise()
      this.saveToken(res.token);
    }
    catch (err) {
      console.log(`Errore: ${err}`);
    }

  }

  async registerUser(registerData: any) {
    try {
      const res = await this.http.post<any>(`${this.path}/register`, registerData).toPromise()
      this.saveToken(res.token);
    }
    catch (err) {
      console.log(`Errore: ${err}`)
    }
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
