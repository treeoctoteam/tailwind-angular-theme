import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Step } from '../models/stepper.model';
import { WorkflowService } from './services/workflow.service';

@Component({
  selector: 'octo-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  steps: Step[] = [];
  constructor(
    private router: Router,
    public workflowService: WorkflowService,
  ) {

  }

  ngOnInit() {
    this.workflowService.getSteps().subscribe((data: any) => {
      this.steps = data;
      console.log("STEPS Recuperati :", this.steps)
    });
  }
  
  test(){
    console.log("click")
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
    this.router.navigateByUrl(route);
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

}
