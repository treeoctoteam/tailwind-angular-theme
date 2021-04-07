import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'octo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToLoginPage() {
    this.router.navigate(['auth/login']);
  }

  navigateToRegistrationPage() {
    this.router.navigate(['auth/registration']);
  }
}
