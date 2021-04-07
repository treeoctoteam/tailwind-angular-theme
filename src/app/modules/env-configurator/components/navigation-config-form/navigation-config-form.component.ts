import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'octo-navigation-config-form',
  templateUrl: './navigation-config-form.component.html',
  styleUrls: ['./navigation-config-form.component.scss']
})
export class NavigationConfigFormComponent implements OnInit {

  @Output() closeDialog = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
