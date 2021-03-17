import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  login() {
    this.loginData = this.loginForm.value;
    if (this.loginData) {
      this.authService.loginUser(this.loginData).subscribe(
        () => {
          console.log("User is logged in");
          this.router.navigateByUrl('/');
        }
      );
    }
  }

}
