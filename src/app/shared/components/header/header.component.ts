import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'octo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() customTemplate: TemplateRef<any> | undefined;
  @Input() data: unknown | unknown[];

  constructor() { }

}
