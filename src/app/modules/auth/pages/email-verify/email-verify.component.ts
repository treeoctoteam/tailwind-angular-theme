import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'octo-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToLoginPage() {
    this.router.navigate(['auth/login']);
  }

}
