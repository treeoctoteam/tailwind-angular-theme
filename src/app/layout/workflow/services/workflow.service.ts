import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Step } from '../../models/stepper.model';
import { SessionService } from '../../../shared/services/session.service';
import { ClientService } from '../../../shared/services/client.service';
import { ApplicationService } from '../../../shared/services/application.service';
import { RouteParam } from 'src/app/models/route-param.model';

const getFakeSteps = () => {
  const fakeSteps: Step[] = [
    {
      stepId: 'step1',
      name: 'Step 1',
      icon: 'fa-circle-check',
      isCustomIcon: true,
      title: 'step1',
      route: 'contacts',
      disabled: false,
      active: true,
      completed: false,
      params: [],
      activeBack: true,
      data: undefined,
      sections: [
        {
          idCode: 'section1',
          name: 'Section 1',
          hidden: false,
          validationRequired: true,
        }
      ]
    },
    {
      stepId: 'step2',
      name: 'Step 2',
      icon: 'fa-circle-check',
      isCustomIcon: true,
      title: 'step2',
      route: 'faq',
      disabled: false,
      active: false,
      completed: false,
      params: [],
      activeBack: true,
      data: undefined,
      sections: [
        {
          idCode: 'section1',
          name: 'Section 1',
          hidden: false,
          validationRequired: true,
        }
      ]
    }
  ];
  return fakeSteps;
}

export enum DataStepperType {
  OCR = "ocr",
  DOCUMENT = "document",
  SELFIE = "selfie",
  ADDITIONAL = "additional"
}

@Injectable({
  providedIn: "root",
})
export class WorkflowService {

  steps: Step[] = [];
  activeStep: Step;
  private stepsSubject = new BehaviorSubject<Step[]>([]);
  public setActive = new BehaviorSubject<boolean>(false);

  constructor(
    private sessionService: SessionService,
    private clientService: ClientService,
    private router: Router,
    private config: ApplicationService
    // private loggerService: LoggerService,
    // private alertService: AlertService,
    // private translateService: TranslateService,
    // private spinnerService: NgxSpinnerService,
  ) { }

  public set() {
    // this.spinner.hide();
    const route = this.createRoot();
    console.log(`Set route ==> ${route}`);
    const payload = {
      current_route: route,
    };
    const $termsObserver = this.clientService.getSteps(payload);
    $termsObserver.subscribe((res: any) => {
      if (res.success) {
        this.stepsSubject.next(res.data);
        this.steps = res.data;
        this.steps.forEach((step: Step) => {
          if (step.active) {
            console.log("STEP: ", step);
            this.activeStep = step;
            this.setActive.next(true);
            return;
          }
        });
      }
      if (res.error) {
        // this._logger.logError(res.error);
        this.router.navigateByUrl(res?.data?.route);
        console.log(res.message);
        // this._alert.showError(this._translate.instant("LOGGER.ERROR"), res.message);
      }
    });
    return $termsObserver;
  }
  public move(id: string, loader = false) {
    // this._spinner.show();
    const currentUrl = this.router.url;
    if (this.activeStep?.stepId) {
      if (id == null) {
        id = this.activeStep.stepId;

      }
      this.clientService.moveToStep(id).subscribe((res: any) => {
        if (res.success) {
          console.log("ROUTE TO GO: " + res.route);
          this.setActive.next(false);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl(res.route);
        }
        if (res.error) {
          console.log(res.message);
          // this._alert.showError(this._translate.instant("LOGGER.ERROR"), res.message);
        }
        // this._spinner.hide();
      });
    } else {
      setTimeout(() => {
        this.router.navigateByUrl(currentUrl);
        // this._spinner.hide();
      }, 250);
    }
  }
  public next(params?: RouteParam[]) {
    console.log(`Next route params ===> ${JSON.stringify(params)}`);
    if (params?.length) {
      this.clientService.nextStep(params).subscribe((res: any) => {
        if (res.success) {
          this.router.navigateByUrl(res.route);
        }
        if (res.error) {
          console.log(res.message);
          // this._alert.showError(this._translate.instant("LOGGER.ERROR"), res.message);
        }
      });
    }
  }
  public back() {
    if (this.steps) {
      for (let index = 0; index < this.steps.length; index++) {
        const step = this.steps[index];
        if (step.stepId === this.activeStep.stepId) {
          if (index != 0) {
            this.move(this.steps[index - 1].stepId);
          }
        }
      }
    }
  }

  public resume(route: any) { }

  public validateStep(hashemail: string, token: string, certificateRequestId?: string) {
    this.clientService.validateStep(hashemail, token, certificateRequestId).subscribe(
      (res: any) => {
        if (res.success) {
          this.sessionService.setSessionId(res.sessionId);
          if (res.requireLogin) {
            this.router.navigateByUrl(this.config.appConfig.ui.customerStartPage + "/" + res.token);
          } else {
            this.router.navigateByUrl(res.route);
          }
        }
        if (res.error) {
          // this._alert.showError(this._translate.instant("LOGGER.ERROR"), res.message);
          console.log(res.message);
          this.router.navigateByUrl("/");
        }
      },
      (err: any) => console.log(err.message)
    );
  }

  private createRoot() {
    let counter = 0;
    for (let i = 0; i < this.router.url.length; i++) {
      const index_of_sub = this.router.url.indexOf("/", i);
      if (index_of_sub > -1) {
        counter++;
        if (counter > 3) {
          return this.router.url.substr(1, index_of_sub - 1);
        }
        i = index_of_sub;
      }
    }
    return this.router.url.substr(1, this.router.url.length);
  }

  public getSteps(): Observable<any> {
    this.stepsSubject.next(getFakeSteps());
    return this.stepsSubject.asObservable();
  }

  public updateSteps(steps: Step[]) {
    this.stepsSubject.next(steps);
  }

  public restartWorkflow() {
    this.clientService.start().subscribe((res: any) => {
      if (res.success && res.sessionId) {
        this.sessionService.setSessionId(res.sessionId);
        this.sessionService.removeUserId();
        this.updateSteps(res.data);
        this.router.navigateByUrl(this.steps[0].route);
        // this._spinner.hide()
      }
      if (res.error) {
        // this._spinner.hide();
        // this._alert.showError(this._translate.instant("LOGGER.ERROR"), res.message);
      }
    });
  }
}
