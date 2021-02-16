import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'octo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() customTemplate: TemplateRef<any> | undefined;
  @Input() data: unknown | unknown[];

  constructor() { }

  ngOnInit(): void {
  }

}
