import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'octo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() customTemplate: TemplateRef<any> | undefined;
  @Input() data: unknown | unknown[];

  constructor() { }

  ngOnInit(): void {}

}
