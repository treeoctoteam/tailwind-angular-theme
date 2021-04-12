import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService, UserRoles } from 'src/app/core/services/auth.service';
@Directive({
  selector: '[octoIsLogged]'
})
export class IsLoggedDirective {

  @Input()
  set role(role: UserRoles) {
    if (!this.isMatchingRole(role) && !this.authService.isLogged) {
      this.hideElement();
    }
  }

  constructor(private elementRef: ElementRef,
              private authService: AuthService) {
    if (!authService.isLogged) {
      this.hideElement();
    }
  }

  private isMatchingRole(role: UserRoles) {
    return role === 'admin' || role === 'superAdmin' || role === 'user';
  }

  private hideElement(): void {
    this.elementRef.nativeElement.style.display = 'none';
  }
}
