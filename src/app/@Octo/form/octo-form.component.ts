import { Component, OnInit, OnDestroy } from '@angular/core';
import { OctoFormModel } from './models/core/octo-form.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OctoFormService } from './octo-form.service';

@Component({
  selector: 'octo-form',
  templateUrl: './octo-form.component.html',
  styleUrls: ['./octo-form.component.scss'],
})
export class OctoFormComponent implements OnInit, OnDestroy {
  show = false;
  public form: OctoFormModel;

  private $onDestroing: Subject<any> = new Subject<any>();

  constructor(public _formService: OctoFormService) {
    console.log('Init Form COMPONENT');

    this._formService.$formChange.pipe(
      takeUntil(this.$onDestroing)
    ).subscribe(form => {
      if (form) {
        this.form = form;
        console.log('Recived Form COMPONENT', form);

      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.$onDestroing.next();
  }

  viewForm() {
    this.show = !this.show;
  }

  submit() {
    console.log(this.form)
  }

}
