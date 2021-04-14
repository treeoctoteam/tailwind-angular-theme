import { LoaderService } from '../../../../core/services/loader.service';
import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToButton } from '@treeocto/ui-kit/dist/types/components/to-button/to-button';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'octo-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginData: { email: string, password: string } = { email: '', password: '' };
  loginForm: FormGroup;

  @Input() isLocked = false;

  @ViewChild('loginButton') loginButtonElement: ElementRef<ToButton>;


  constructor(private alertService: AlertService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private loaderService: LoaderService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  login() {
    this.loginData = this.loginForm.value;
    if (this.loginData) {
      this.loaderService.elementRef = this.loginButtonElement;
      this.authService.login(this.loginData).subscribe(
        () => {
          this.loaderService.elementRef = undefined;
        }
      );
    }
  }

  testAuth() {
    this.authService.checkAuth();
  }

  testRefresh() {
    this.authService.refreshToken();
  }

}
