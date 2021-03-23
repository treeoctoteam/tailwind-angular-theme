import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

interface User {
  email: string;
  role: string;
  name: string;
}

@Injectable()
export class AuthService {
  path = 'https://dev.tap-id.tech/tapidconfig/auth';

  user: User;
  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) {
    const user = localStorage.getItem("user");
    console.log("User from storage", user)
    if (user) {
      this.user = JSON.parse(user);
    }
  }

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


  login(data: { email: string, password: string }): Observable<User> {
    const $req = this.http.post<User>(`${this.path}/login`, data).pipe(share());
    $req.subscribe(res => {
      console.log("logged");
      this.user = { role: res.role, name: res.email, email: res.email };
      localStorage.setItem("user", JSON.stringify(this.user));
      this.alertService.present("success", "User Logged", "")
      this.router.navigateByUrl('configurator/overview');
    })
    return $req;
  }

  register(registerData: { username: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.path}/register`, registerData)
      .pipe(
        tap()
      );
  }

  refreshToken(): Observable<void> {
    return this.http.post<void>(`${this.path}/refresh`, null);
  }
}
