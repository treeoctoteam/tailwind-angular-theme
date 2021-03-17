import { Component, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LandingPageConfig } from '../models/layout.model';
import { NavigationItem } from '../models/navigation.model';

@Component({
  selector: 'octo-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  $unsubscribe = new Subject<void>();
  landingPageConfig: LandingPageConfig;

  constructor(private appService: ApplicationConfigService, private authService:AuthService) {
  }

  getNavigationItem(): NavigationItem[] {
    this.landingPageConfig = this.appService.activeLayoutConfig as LandingPageConfig;
    // console.log(this.appService.activeLayoutConfig)
    return this.landingPageConfig.navbar.navigation[0].children;
  }

  ngOnInit(): void {
    this.getNavigationItem();
    const navMenuDiv = document.getElementById("nav-content");
    const navMenu = document.getElementById("nav-toggle");
    const checkParent = (t: any, elm: any) => {
      while (t.parentNode) {
        if (t === elm) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    }

    fromEvent(document, 'click').pipe(takeUntil(this.$unsubscribe)).subscribe((e: any) => {
      const target = (e && e.target) || (event && event.srcElement);
      //Nav Menu
      if (!checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, navMenu)) {
          // click on the link
          if (navMenuDiv?.classList.contains("hidden")) {
            navMenuDiv.classList.remove("hidden");
          } else {
            navMenuDiv?.classList.add("hidden");
          }
        } else {
          // click both outside link and outside menu, hide menu
          navMenuDiv?.classList.add("hidden");
        }
      }
    });
  }

  test() {
    console.log("TEST");
    this.authService.test().subscribe(
      () => {
        console.log("User is authorizate");
      }
    );;
  }
}
