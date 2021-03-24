import { Component, OnInit, Input } from '@angular/core';
import { OctoSectionModel } from '../../models/octo-section.model';
import { OctoFormService } from '../../octo-form.service';

@Component({
  selector: 'octo-section',
  templateUrl: './octo-section.component.html',
  styleUrls: ['./octo-section.component.scss'],
})
export class OctoSectionComponent implements OnInit {

  @Input() section: OctoSectionModel;
  constructor(public formService: OctoFormService) {}

  ngOnInit(): void { }
}
