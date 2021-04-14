import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OctoFormModel } from './models/octo-form.model';
import { OctoFormService } from './octo-form.service';

@Component({
  selector: 'octo-form',
  templateUrl: './octo-form.component.html',
  styleUrls: ['./octo-form.component.scss'],
  providers: [OctoFormService],
})
export class OctoFormComponent implements OnDestroy {

  public form: OctoFormModel;
  private $onDestroing: Subject<void> = new Subject<void>();
  @Input() set formModel(data: OctoFormModel) {
    this.form = data;
    this.formService.InitializeForm(this.form);
  }
  @Output() formChange: EventEmitter<OctoFormModel> = new EventEmitter();
  @Output() formSubmit: EventEmitter<OctoFormModel> = new EventEmitter();

  constructor(public formService: OctoFormService) {
    this.formService.$formChange
      .pipe(takeUntil(this.$onDestroing))
      .subscribe((form: OctoFormModel) => {
        if (form) {
          this.form = form;
          this.formChange.emit(this.form);
        }
      });
  }

  ngOnDestroy(): void {
    this.$onDestroing.next();
  }

  submitClick() {
    this.formSubmit.emit(this.form);
  }

}
