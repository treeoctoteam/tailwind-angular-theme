import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs/operators';
import { AlertService } from '../../core/services/alert.service';
import { Step } from './models/stepper.model';
import { WorkflowService } from './services/workflow.service';

@Component({
  selector: 'octo-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  steps: Step[] = [];
  constructor(
    private alertService: AlertService,
    private router: Router,
    public workflowService: WorkflowService,
  ) { }

  @ViewChild('stepper') stepper: ElementRef;

  ngOnInit() {
    this.alertService.present('success', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('info', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('primary', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('warning', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('danger', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('success', 'Titolo di test', 'Messaggio di test!', 6000);

    this.workflowService.getSteps().subscribe((data: any) => {
      this.steps = data;
      console.log("STEPS Recuperati :", this.steps);
      this.redirect(this.steps[0]);
    });
  }

  nextStep() {
    this.stepper.nativeElement.nextStep();
  }


  prevStep() {
    this.stepper.nativeElement.prevStep();
  }

  move(step: Step) {
    if (step.stepId != this.workflowService.activeStep.stepId) {
      this.workflowService.move(step.stepId);
    }
  }

  redirect(step: Step) {
    let route = step.route;
    step.params.forEach((element) => {
      route = route + "/" + element;
    });
    // set active step
    if (this.workflowService.activeStep?.stepId) {
      this.steps.forEach((element: Step) => {
        if (element.stepId === step.stepId) {
          element.active = true;
        }
        else if (element.stepId === this.workflowService.activeStep.stepId) {
          element.active = false;
        }
      })
    }
    this.router.navigateByUrl(`workflow/${route}`);
    this.workflowService.activeStep = step;
  }

  validate(i: number) {
    if (this.steps[i].active || this.steps[i].completed) {
      return false;
    } else {
      if (i > 0) {
        if (this.steps[i - 1].completed && !this.steps[i - 1].disabled) {
          return false;
        }
      }
    }
    return true;
  }

  checkBack() {
    if (this.steps) {
      for (let index = 0; index < this.steps.length; index++) {
        const step = this.steps[index];
        if (step.stepId === this.workflowService.activeStep.stepId) {
          if (index - 1 < 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  testInputChange(event: any) {
    const value = (event.target as HTMLInputElement).value;
    console.log("input change", event)
  }

}
