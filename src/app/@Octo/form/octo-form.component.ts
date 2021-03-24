import {
  Component,
  OnDestroy,
  Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { OctoFormService } from './octo-form.service';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'octo-form',
  templateUrl: './octo-form.component.html',
  styleUrls: ['./octo-form.component.scss'],
  providers: [OctoFormService],
})
export class OctoFormComponent implements OnDestroy {

  @Input() octoForm: FormGroup;
  private $onDestroing: Subject<any> = new Subject<any>();

  constructor(public formService: OctoFormService) {}

  getFormProp(prop: string): string {
    return this.octoForm.get(`${prop}`)?.value;
  }

  get sectionsFormArrayControls(): AbstractControl[] {
    return (this.octoForm.get('sections') as FormArray).controls;
  }

  ngOnDestroy(): void {
    this.$onDestroing.next();
  }

  getErrorMessage(): string {
    // if (this.input.touched) {
    //   if (this.input.hasError('required')) {
    //     return 'You must enter a value';
    //   }
    //   if (this.input.hasError('min')) {
    //     return 'Min error';
    //   }
    //   if (this.input.hasError('minDate')) {
    //     return 'Min date error';
    //   }
    //   if (this.input.hasError('maxDate')) {
    //     return 'Max date error';
    //   }
    //   return this.input.hasError('max') ? 'Max error' : '';
    // }
    return '';
  }
}
