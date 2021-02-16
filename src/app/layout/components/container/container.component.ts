import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'octo-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @Input() customTemplate: TemplateRef<any> | undefined;
  @Input() data: unknown | unknown[];

  constructor() { }

  ngOnInit(): void {
  }

}
