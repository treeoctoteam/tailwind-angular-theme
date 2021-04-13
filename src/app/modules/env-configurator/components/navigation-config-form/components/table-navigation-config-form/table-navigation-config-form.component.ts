import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationItem, NavigationGroup } from '../../navigation-config-form.component';

interface HideChildren extends NavigationGroup {
  hideChildren: boolean;
}

@Component({
  selector: 'octo-table-navigation-config-form',
  templateUrl: './table-navigation-config-form.component.html',
  styleUrls: ['./table-navigation-config-form.component.scss']
})
export class TableNavigationConfigFormComponent implements OnInit {

  public showPageList = false;
  public showGroupList = false;
  public showGroupPageList = false;

  @Input() dataTable: any;
  @Input() navigationElementType: 'groups' | 'pages' = 'pages';

  @Output() addPage = new EventEmitter<void>();
  @Output() addGroup = new EventEmitter<void>();

  @Output() editPage = new EventEmitter<NavigationItem>();
  @Output() deletePage = new EventEmitter<NavigationItem>();

  @Output() editGroup = new EventEmitter<NavigationGroup>();
  @Output() deleteGroup = new EventEmitter<NavigationGroup>();

  constructor() { }

  ngOnInit(): void {
  
  }

  public showHideGroupPageList(item: HideChildren) {
    this.showGroupPageList = !this.showGroupPageList;
    item.hideChildren = this.showGroupPageList
  }

}
