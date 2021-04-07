import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Step } from '../models/stepper.model';
import { SessionService } from '../../../core/services/session.service';
import { RouteParam } from 'src/app/shared/models/route-param.model';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

const getFakeSteps = () => {
  const fakeSteps: Step[] = [
    {
      stepId: 'step1',
      name: 'Step 1',
      icon: 'fas fa-pen',
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

      ]
    },
    {
      stepId: 'step2',
      name: 'Step 2',
      icon: 'fas fa-adjust',
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
    private router: Router,
    private config: ApplicationConfigService,
    private logger: LoggerService,
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  public set() {
    const route = this.createRoot();
    this.logger.logInfo(`Set route ==> ${route}`);
    const payload = {
      current_route: route,
    };
    const $termsObserver = this.getStepList(payload);
    $termsObserver.subscribe((res: any) => {
      if (res.success) {
        this.stepsSubject.next(res.data);
        this.steps = res.data;
        this.steps.forEach((step: Step) => {
          if (step.active) {
            this.logger.logInfo("STEP: ", step);
            this.activeStep = step;
            this.setActive.next(true);
            return;
          }
        });
      }
      if (res.error) {
        this.logger.logError(res.error);
        this.router.navigateByUrl(res?.data?.route);
        this.logger.logInfo(res.message);
      }
    });
    return $termsObserver;
  }

  public move(id: string, loader = false) {
    const currentUrl = this.router.url;
    console.log(currentUrl, this.activeStep?.stepId, "CURRENT URL1")
    if (this.activeStep?.stepId) {
      if (id == null) {
        id = this.activeStep.stepId;

      }
      this.moveToStep(id).subscribe((res: any) => {
        if (res.success) {
          this.logger.logInfo("ROUTE TO GO: " + res.route);
          this.setActive.next(false);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl(res.route);
        }
        if (res.error) {
          this.logger.logInfo(res.message);
        }
      });
    } else {
      setTimeout(() => {
        console.log(currentUrl, "CURRENT URL2")
        this.router.navigateByUrl(currentUrl);
      }, 250);
    }
  }

  public next(params?: RouteParam[]) {
    this.logger.logInfo(`Next route params ===> ${JSON.stringify(params)}`);
    if (params?.length) {
      this.nextStep(params).subscribe((res: any) => {
        if (res.success) {
          this.router.navigateByUrl(res.route);
        }
        if (res.error) {
          this.logger.logInfo(res.message);
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
    this.validationStep(hashemail, token, certificateRequestId).subscribe(
      (res: any) => {
        if (res.success) {
          this.sessionService.setSessionId(res.sessionId);
          if (res.requireLogin) {
            this.router.navigateByUrl(this.config.config.layoutSettings.defaultLayout + "/" + res.token);
          } else {
            this.router.navigateByUrl(res.route);
          }
        }
        if (res.error) {
          // this._alert.showError(this._translate.instant("LOGGER.ERROR"), res.message);
          this.logger.logInfo(res.message);
          this.router.navigateByUrl("/");
        }
      },
      (err: any) => this.logger.logInfo(err.message)
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
    this.start().subscribe((res: any) => {
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


  // API CALL
  getStepList(payload: any) {
    return this.http.post(
      `${this.config.config.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow`,
      payload
    ).pipe(share());
  }

  moveToStep(id: string) {
    return this.http.get(
      `${this.config.config.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/move?id=${id}`
    );
  }

  nextStep(params: RouteParam[]) {
    if (!params) {
      return this.http.get(
        `${this.config.config.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/next`
      );
    } else {
      return this.http.get(
        `${this.config.config.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/next?${params[0].key
        }=${params[0].value}`
      );
    }
  }

  validationStep(hashemail: string, token: string, certficiateRequestId?: any): any {
    if (!certficiateRequestId && hashemail && token) {
      return this.http.get(`${this.config.config.network.hostApiV3}/api/user/${hashemail}/${token}`);
    }
    if (certficiateRequestId && hashemail && token) {
      return this.http.get(
        `${this.config.config.network.hostApiV3}/api/user/${hashemail}/${token}/${certficiateRequestId}`
      );
    }
    if (!certficiateRequestId && !hashemail && token) {
      return this.http.get(
        `${this.config.config.network.hostApiV3}/api/agent/${token}`
      );
    }
  }
  start(hashemail?: any, certificateRequestId?: any) {
    if (certificateRequestId && hashemail) {
      return this.http.get(`${this.config.config.network.hostApiV3}/api/session/${hashemail}/${certificateRequestId}`);
    }
    return this.http.get(`${this.config.config.network.hostApiV3}/api/session`);
  }
}
