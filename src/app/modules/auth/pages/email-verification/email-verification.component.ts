import { AlertService } from './../../../../core/services/alert.service';
import { LoaderService } from './../../../../core/services/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'octo-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  verifyCodeForm: FormGroup;
  data: { email: string, verificationCode: string } = { email: '', verificationCode: '' };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.verifyCodeForm = this.formBuilder.group({
      verifyCode: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
    })
  }

  sendVerificationCode() {
    this.data.verificationCode = this.verifyCodeForm.get('verifyCode').value;
    this.data.email = localStorage.getItem('register-email');
    if (this.data.verificationCode && this.data.email) {
      this.authService.verifyEmail(this.data).subscribe((res) => {
        localStorage.removeItem('register-email');
        this.router.navigate(['auth/email-verified']);
      }, err => {
        this.alertService.present('danger', 'Email not verified', 'You insert a wrong verification code!');
      });
    }
    else {
      console.log("Email or verification code missed");
    }
  }
}
