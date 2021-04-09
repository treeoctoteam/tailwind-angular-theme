import { ApplicationConfigService } from './application-config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { UserIdleConfig, UserIdleService } from 'angular-user-idle';

interface User {
  email: string;
  role: UserRoles;
  username: string;
}

export type UserRoles = 'admin' | 'superAdmin' | 'user';

interface AuthRes {
  user: User,
  token: {
    bearer: string;
  },
  message: string
}

export class ChangePassword {
  oldPassword: string;
  newPassword: string;
}

@Injectable()
export class AuthService {
  // NB STEFANO
  // Please Stefano, don't delete the second var path, is useful for local tests!
  path = 'https://dev.tap-id.tech/tapidconfig/auth';
  // path = 'http://localhost:3002/tapidconfig/auth';

  public user: User;
  public isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedUserSubject: BehaviorSubject<User>;
  public redirectUrl: string;


  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private userIdle: UserIdleService,
    private applicationConfigservice: ApplicationConfigService
  ) {
    const user = localStorage.getItem("user");
    console.log("User from storage", user)
    if (user) {
      this.user = JSON.parse(user);
    }
    // this.loggedUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem("user"))
    // );

    // this.loggedUserSubject.subscribe((data) => {
    //   if (data) {
    //     localStorage.removeItem("user");
    //     localStorage.setItem("user", JSON.stringify(data));
    //     this.isLoggedSubject.next(true);
    //   } else {
    //     this.isLoggedSubject.next(false);
    //     localStorage.removeItem("loggedUser");
    //     // this.router.navigateByUrl("/auth/login");
    //   }
    // });

    this.idleMonitor();
    this.tokenRefreshMonitor();
  }

  // with token jwt set on local storage
  public get token() {
    return localStorage.getItem("token");
  }
  // get isAuthenticated() {
  //   return !!localStorage.getItem(this.TOKEN_KEY);
  // }
  // logout() {
  //   localStorage.removeItem(this.TOKEN_KEY);
  // };
  public get isLogged(): boolean {
    return this.token !== '' && this.token !== undefined && this.token !== null;
  }

  login(data: { email: string, password: string }): Observable<AuthRes> {
    const $req = this.http.post<AuthRes>(`${this.path}/login`, data).pipe(share());
    $req.subscribe((res: AuthRes) => {
      if (res) {
        this.isLoggedSubject.next(true);
        this.user = { role: res.user.role, username: res.user.username, email: res.user.email };
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", res.token.bearer);
        this.alertService.present("success", "User Logged", "User logged successful")
        this.router.navigateByUrl('configurator/overview');
      }
    });
    return $req;
  }

  register(registerData: { username: string, email: string, password: string }): Observable<AuthRes> {
    const $req = this.http.post<AuthRes>(`${this.path}/register`, registerData).pipe(share());
    $req.subscribe(res => {
      // TODO confirm account and not logged user automatically
      console.log("registered");
      this.user = { role: res.user.role, username: res.user.username, email: res.user.email };
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("token", res.token.bearer);
      this.alertService.present("success", "User Registered", "User logged successful");
      this.router.navigateByUrl('configurator/overview');
    });
    return $req;
  }

  refreshToken(): Observable<void> {
    const $req = this.http.post<void>(`${this.path}/refresh`, null).pipe(share());
    $req.subscribe(res => {
      console.log("refresh res", res)
    })
    return $req;
  }

  // NB STEFANO
  // Please Stefano don't delete this method, is useful for testing!
  checkAuth() {
    const $req = this.http.get<any>("https://dev.tap-id.tech/tapidconfig/home").pipe(share());
    $req.subscribe((res: any) => {
      console.log("EMAIL",res.email);
    })
  }

  idleMonitor() {
    this.isLoggedSubject.subscribe((logged) => {
      if (logged) {
        let config: UserIdleConfig = new UserIdleConfig();
        config = this.applicationConfigservice.config.idleConfig;
        this.userIdle.stopWatching();
        this.userIdle.setConfigValues(config);
        this.userIdle.startWatching();
      } else {
        this.userIdle.stopWatching();
      }
    });

    window.onmousemove = () => {
      this.userIdle.resetTimer();
    };
    window.onkeypress = () => {
      this.userIdle.resetTimer();
    };
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => {
      if (count === 1) {
        this.alertService.present("info", "Tempo di inattività", "La sessione verrà bloccata per inattività.")
      }
    });
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      if (this.isLogged) {
        this.isLoggedSubject.next(false);
        this.router.navigateByUrl("/auth/lock");
      }
    });
  }

  tokenRefreshMonitor() {
    this.isLoggedSubject.subscribe((logged) => {
      if (this.isLogged) {
        // if (this.loggedUserValue.authSetting.tokenRefreshTime) {
        //   this.subscriptionRefresh = interval(
        //     this.loggedUserValue.authSetting.tokenRefreshTime * 1000
        //   ).subscribe((val) => {
        //     this.refreshToken();
        //   });
        // }
      } else {
        // if (this.subscriptionRefresh) {
        //   this.subscriptionRefresh.unsubscribe();
        // }
      }
    });
  }
}
