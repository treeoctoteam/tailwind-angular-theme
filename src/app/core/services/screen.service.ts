import { Injectable, HostListener, OnDestroy } from "@angular/core";
import { Observable, Subscription, fromEvent } from "rxjs";
// import { Platform } from "@angular/cdk/platform";

@Injectable()
export class ScreenService implements OnDestroy {
  public innerWidth: any;

  // private _platform: Platform;
  private resizeObservable$: Observable<Event>;
  private resizeSubscription$: Subscription;

  constructor() {
    this.innerWidth = window.innerWidth;
    // console.log("ResizeSubscription: START");
    this.resizeObservable$ = fromEvent(window, "resize");
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.innerWidth = window.innerWidth;
    });
  }

  ngOnDestroy() {
    // console.log("ResizeSubscription: END");
    this.resizeSubscription$.unsubscribe();
  }

  public isMobile() {
    if (this.innerWidth <= 576) {
      return true;
    }
    return false;
  }
  public isTablet() {
    if (this.innerWidth > 576 && this.innerWidth <= 1024) {
      return true;
    }
    return false;
  }
  public isDesktop() {
    if (this.innerWidth > 1024) {
      return true;
    }
    return false;
  }
}
