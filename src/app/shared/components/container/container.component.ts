import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'octo-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  @Input() customTemplate: TemplateRef<any> | undefined;
  @Input() data: unknown | unknown[];

  constructor() { }

}
