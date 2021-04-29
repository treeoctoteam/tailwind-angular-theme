import { Observable, BehaviorSubject, Subject, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, take, takeUntil, first } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { UserIdleConfig, UserIdleService } from 'angular-user-idle';
import { ApplicationConfigService } from './application-config.service';
import { LoaderService } from './loader.service';

export type UserRoles = 'admin' | 'superAdmin' | 'user';

export interface User {
  email: string;
  role: UserRoles;
  username: string;
  isLocked: boolean;
}

interface AuthRes {
  message: string;
  success: boolean;
  data: {
    user: User;
    token: string;
  }
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
  // #path = 'https://dev.tap-id.tech/tapidconfig/auth';
  #path = 'http://localhost:3002/api/auth';

  public $isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  public $loggedUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  public $lockUserSubject: Subject<void> = new Subject<void>();
  public redirectUrl: string;

  private tokenStorage;
  private userStorage;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService,
    private applicationService: ApplicationConfigService,
    private userIdleService: UserIdleService,
  ) {
    this.tokenStorage = localStorage.getItem('token');
    this.userStorage = JSON.parse(localStorage.getItem('user'));

    this.applicationService.$config.pipe(take(1)).subscribe(res => {
      if (this.token && this.user) {
        this.$isLoggedSubject.next(true);
        this.$loggedUserSubject.next(this.user);
        this.refreshToken();
        this.initIdleMonitoring(res.idleConfig);
      } else if (!this.token && this.user) {
        this.$lockUserSubject.next();
        this.$loggedUserSubject.next(this.user);
      } else if (!this.token && !this.user) {
        this.$isLoggedSubject.next(false);
        this.$loggedUserSubject.next(null);
      }
    })
  }

  // with token jwt set on local storage
  public get token(): string {
    return this.tokenStorage;
  }

  public get user(): User {
    return this.userStorage;
  }

  public get isLogged(): boolean {
    return this.token !== '' && this.token !== undefined && this.token !== null;
  }

  public login(data: { email: string; password: string }): Observable<AuthRes> {
    const $req = this.http.post<AuthRes>(`${this.#path}/login`, data).pipe(share());
    $req.subscribe((res: AuthRes) => {
      if (res) {
        this.handleUserLoggedInResponse(res);
        this.alertService.present('success', 'User Logged', 'User logged successful!', 4000);
        this.router.navigate(['dashboard']);
      }
    }, err => {
      this.alertService.present('danger', 'Login error', err.error.message, 4000);
    });
    return $req;
  }

  public register(registerData: { username: string; email: string; password: string }): Observable<any> {
    const $req = this.http.post<any>(`${this.#path}/register`, registerData).pipe(share());
    $req.subscribe((res) => {
      if (res) {
        localStorage.setItem('register-email', registerData.email);
        this.alertService.present('success', 'User Registered', 'You need to verify email!', 4000);
      }
    }, err => {
      this.alertService.present('danger', 'Register error', err.error.message, 4000);
    });
    return $req;
  }

  private handleUserLoggedInResponse(response: AuthRes) {
    const user: User = response.data.user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', response.data.token);
    this.$isLoggedSubject.next(this.isLogged);
    this.$loggedUserSubject.next(this.user);
    this.initIdleMonitoring(this.applicationService.config.idleConfig);
  }

  public refreshToken(): Observable<any> {
    const $req = this.http.post<any>(`${this.#path}/refresh`, null, this.loaderService.createHiddenSpinnerHeader()).pipe(share());
    $req.subscribe((res: any) => {
      if (res) {
        localStorage.setItem('token', res.data.token);
        this.tokenStorage = res.data.token;
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
    if (this.isLogged && idleConfig) {
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
        if (this.isLogged && this.user) {
          localStorage.removeItem('token');
          this.$isLoggedSubject.next(false);
          this.$lockUserSubject.next();
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

  public logout(route?: string) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.$isLoggedSubject.next(false);
    this.userIdleService.stopWatching();
    if (route) {
      this.router.navigateByUrl(route);
    }
    else {
      this.router.navigateByUrl('auth/login');
    }
  }

  public verifyEmail(data: { email: string; verificationCode: string }): Observable<any> {
    const $req = this.http.post<any>(`${this.#path}/verify-email`, data).pipe(share());
    $req.subscribe((res) => {
      if (res) {
        console.log("Verify email message", res);
      }
    });
    return $req;
  }

  public resendEmail(email: string): Observable<any> {
    const $req = this.http.post<any>(`${this.#path}/resend-email`, { email }).pipe(share());
    $req.subscribe((res) => {
      if (res) {
        console.log("Resend email message", res);
      }
    });
    return $req;
  }
}
