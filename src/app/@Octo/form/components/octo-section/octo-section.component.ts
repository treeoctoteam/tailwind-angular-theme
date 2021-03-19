import { Component, OnInit, Input } from '@angular/core';
import { OctoSectionModel } from '../../models/core/octo-section.model';
import { OctoFormService } from '../../octo-form.service';

@Component({
  selector: 'octo-section',
  templateUrl: './octo-section.component.html',
  styleUrls: ['./octo-section.component.css']
})
export class OctoSectionComponent implements OnInit {
  @Input() section: OctoSectionModel;

  constructor(public _formService: OctoFormService) { }

  ngOnInit(): void {
    console.log("SECTION", this.section)
  }
}
