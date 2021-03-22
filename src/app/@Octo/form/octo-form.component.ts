import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { OctoFormModel } from './models/core/octo-form.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OctoFormService } from './octo-form.service';

@Component({
  selector: 'octo-form',
  templateUrl: './octo-form.component.html',
  styleUrls: ['./octo-form.component.scss'],
  providers: [OctoFormService],
})
export class OctoFormComponent implements OnInit, OnDestroy {
  public form: OctoFormModel;
  private $onDestroing: Subject<any> = new Subject<any>();

  @Input() set formModel(data: OctoFormModel) {
    this.form = data;
  };
  @Output() change: EventEmitter<OctoFormModel> = new EventEmitter();
  @Output() submit: EventEmitter<OctoFormModel> = new EventEmitter();

  constructor(public formService: OctoFormService) {
    console.log('Init Form COMPONENT');
    this.formService.InitializeForm(this.form);
    this.formService.$formChange.pipe(
      takeUntil(this.$onDestroing)
    ).subscribe(form => {
      if (form) {
        this.form = form;
        this.change.emit(this.form);
        console.log('Form Change', form);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.$onDestroing.next();
  }

  submitClick() {
    this.submit.emit(this.form);
  }
}
