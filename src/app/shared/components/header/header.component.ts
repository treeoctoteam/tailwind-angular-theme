import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'octo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() customTemplate: TemplateRef<any> | undefined;
  @Input() data: unknown | unknown[];

  constructor() { }

  ngOnInit(): void {
  }

}
