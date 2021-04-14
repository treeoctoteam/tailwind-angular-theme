import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, takeUntil } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { UserIdleConfig, UserIdleService } from 'angular-user-idle';
import { ApplicationConfigService } from './application-config.service';

export type UserRoles = 'admin' | 'superAdmin' | 'user';

export interface User {
  email: string;
  role: UserRoles;
  username: string;
}

interface AuthRes {
  user: User;
  token: {
    bearer: string;
  };
  message: string;
}

export class ChangePassword {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // NB STEFANO
  // Please Stefano, don't delete the second var path, is useful for local tests!
  #path = 'https://dev.tap-id.tech/tapidconfig/auth';
  // path = 'http://localhost:3002/tapidconfig/auth';

  public $isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  public $loggedUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  public $lockUserSubject: Subject<void> = new Subject<void>();
  public redirectUrl: string;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private applicationService: ApplicationConfigService,
    private userIdleService: UserIdleService) {}

  // with token jwt set on local storage
  public get token(): string {
    return localStorage.getItem('token');
  }

  public get user(): User {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  public get isLogged(): boolean {
    return this.token !== '' && this.token !== undefined && this.token !== null;
  }

  login(data: { email: string, password: string }): Observable<AuthRes> {
    const $req = this.http.post<AuthRes>(`${this.#path}/login`, data).pipe(share());
    $req.subscribe((res: AuthRes) => {
      if (res) {
        this.handleUserLoggedInResponse(res);
        this.alertService.present('success', 'User Logged', 'User logged successful!');
      }
    });
    return $req;
  }

  register(registerData: { username: string, email: string, password: string }): Observable<AuthRes> {
    const $req = this.http.post<AuthRes>(`${this.#path}/register`, registerData).pipe(share());
    $req.subscribe((res: AuthRes) => {
      if (res) {
        // TODO confirm account and not logged user automatically
        this.handleUserLoggedInResponse(res);
        this.alertService.present('success', 'User Registered', 'User logged successful!');
      }
    });
    return $req;
  }

  private checkUserLoggedState(): void {
    if (!this.token && this.user) {
      this.$lockUserSubject.next();
      this.$loggedUserSubject.next(this.user);
    }
  }

  private handleUserLoggedInResponse(response: AuthRes) {
    const user: User = { role: response.user.role, username: response.user.username, email: response.user.email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', response.token.bearer);
    this.$isLoggedSubject.next(this.isLogged);
    this.$loggedUserSubject.next(this.user);
    this.initIdleMonitoring(this.applicationService.config.idleConfig);
    this.router.navigateByUrl('configurator/overview');
  }

  public refreshToken(): Observable<any> {
    const $req = this.http.post<any>(`${this.#path}/refresh`, null).pipe(share());
    $req.subscribe((res: any) => {
      if (res) {
        localStorage.setItem('token', res.token.bearer);
      }
    });
    return $req;
  }

  // NB STEFANO
  // Please Stefano don't delete this method, is useful for testing!
  public checkAuth() {
    const $req = this.http.get<any>('https://dev.tap-id.tech/tapidconfig/home').pipe(share());
    $req.subscribe((res: any) => {
      console.log('EMAIL', res.email);
    });
  }

  public initIdleMonitoring(idleConfig: UserIdleConfig) {
    this.checkUserLoggedState();
    if (this.isLogged) {
      this.userIdleService.setConfigValues(idleConfig);
      this.userIdleService.startWatching();

      this.userIdleService.ping$.pipe(
        takeUntil(this.userIdleService.onTimeout())
      ).subscribe(() => this.refreshToken());

      // Start watching when user idle is starting.
      this.userIdleService.onTimerStart().pipe(
        takeUntil(this.userIdleService.onTimeout())
      ).subscribe((count) => {
        if (count === 1) {
          this.alertService.present('warning', 'Be careful!', 'Your session is gonna be locked.', idleConfig.timeout * 1000);
        }
      });

      // Start watch when time is up.
      this.userIdleService.onTimeout().subscribe(() => {
        if (this.isLogged) {
          localStorage.removeItem('token');
          this.checkUserLoggedState();
          this.userIdleService.stopWatching();
        }
      });

      window.onmousemove = () => {
        this.userIdleService.resetTimer();
      };
      window.onkeypress = () => {
        this.userIdleService.resetTimer();
      };
    } else {
      this.userIdleService.stopWatching();
    }
  }

  public logout(route?: string){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (route){
      this.router.navigateByUrl(route);
    }
    else {
      this.router.navigateByUrl('auth/login');
    }
  }
}
