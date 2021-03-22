import { LoaderService } from './../../../core/services/loader.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToButton } from '@treeocto/ui-kit/dist/types/components/to-button/to-button';

@Component({
  selector: 'octo-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [
    AuthService
  ]
})
export class LoginFormComponent implements OnInit {

  loginData: { email: string, password: string } = { email: "", password: "" };
  loginForm: FormGroup;
  @ViewChild("loginButton") loginButtonElement : ElementRef<ToButton>;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private loaderService: LoaderService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  login() {
    this.loginData = this.loginForm.value;
    if (this.loginData) {
      this.loaderService.elementRef = this.loginButtonElement;
      this.authService.loginUser(this.loginData).subscribe(
        () => {
          this.loaderService.elementRef = undefined;
          this.router.navigateByUrl('/');
        }
      );
    }
  }

}
