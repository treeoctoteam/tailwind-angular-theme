import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'octo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    AuthService
  ]
})
export class RegisterComponent implements OnInit {

  registerData: { email: string, username: string, password: string } = { email: "",username: "", password: "" };
  registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      passwords: this.formBuilder.group({
        pass1: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        pass2: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      },
        { validator: this.passwordMatch('pass1', 'pass2') }
      ),
    });
  }

  passwordMatch(field1: string, field2: string) {
    return (group: any) => {
      if (group.get(field1).value !== group.get(field2).value) {
        group.get(field2).setErrors({ notTheSame: true });
      }
      else {
        group.get(field2).setErrors(null);
      }
    }
  }

  async signUp() {
    this.registerData.email = this.registerForm.value.email;
    this.registerData.username = this.registerForm.value.username;
    this.registerData.password = this.registerForm.value.passwords.pass1;
    console.log(this.registerData);
    await this.authService.registerUser(this.registerData)
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/'])
    }
    else {
      alert("Register failed")
    }
  }

}
