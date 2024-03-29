import { Component, Input } from '@angular/core';
import { OctoSectionModel } from '../../models/octo-section.model';
import { OctoFormService } from '../../octo-form.service';

@Component({
  selector: 'octo-section',
  templateUrl: './octo-section.component.html',
  styleUrls: ['./octo-section.component.scss'],
})
export class OctoSectionComponent {

  @Input() section: OctoSectionModel;
  constructor(public formService: OctoFormService) { }

}
