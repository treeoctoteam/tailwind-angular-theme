import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'octo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    AuthService
  ]
})
export class LoginComponent implements OnInit {

  loginData: { username: string, password: string } = { username: "", password: "" };
  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  async signIn() {
    this.loginData = this.loginForm.value;
    await this.authService.loginUser(this.loginData);
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/'])
    }
    else {
      alert("Login failed")
    }
  }
}
