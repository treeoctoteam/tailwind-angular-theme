import { AfterViewInit, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { octoAnimations } from 'src/app/shared/utils/animations';

@Component({
  selector: 'octo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [octoAnimations],
})
export class DashboardComponent implements AfterViewInit {

  constructor() {
    this.formGroupTest = new FormBuilder().group({
      name: new FormControl('Paolo', [
        Validators.required,
        Validators.maxLength(4),
      ]),
      surname: new FormControl('Milani', [
        Validators.required,
        Validators.maxLength(4),
      ]),
      age: new FormControl(0, [Validators.required, Validators.max(25)]),
    });
    this.formGroupTest.valueChanges.subscribe(console.log);
  }

  get name(): AbstractControl | null {
    return this.formGroupTest.get('name');
  }
  formGroupTest: FormGroup;
  formControld = new FormControl('name');

  animation = {
    value: '*',
    params: {
      duration: '1000ms',
      delay: '1000ms',
      opacity: '0',
      scale: '2',
      x: '300px',
      y: '10000px',
      z: '0px',
    },
  };

  ngAfterViewInit(): void { }

  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
