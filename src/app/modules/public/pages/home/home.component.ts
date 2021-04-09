import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'octo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void { }

  navigateToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegistrationPage() {
    this.router.navigate(['/auth/register']);
  }
}
