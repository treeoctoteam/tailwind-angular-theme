import { TODialogOptions } from '@treeocto/ui-kit/dist/types/components/to-dialog/to-dialog';
import { DialogService } from './../../../../core/services/dialog.service';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export interface NavigationItem {
  id: number;
  type: 'page';
  translate: string;
  icon: string;
  url: string;
  hidden: boolean;
  position: number;
}

export interface NavigationGroup {
  id: number;
  type: 'group';
  translate: string;
  icon: string;
  hidden: boolean;
  position: number;
  children: NavigationItem[];
}

const dialogId = 'checkPositionDialog';

@Component({
  selector: 'octo-navigation-config-form',
  templateUrl: './navigation-config-form.component.html',
  styleUrls: ['./navigation-config-form.component.scss']
})
export class NavigationConfigFormComponent implements OnInit, OnDestroy {

  private sectionName = '';

  public optionsType = [
    { value: 'page', label: 'Page' },
    { value: 'group', label: 'Group' }
  ];
  public navigationType: 'page' | 'group' = 'page';

  // show/hide list item
  public showPageList = false;
  public showGroupList = false;
  public showGroupPageList = false;

  public showPageGroupForm = false;
  public showChildForm = false;
  public showAddChildButton = false;
  public showTable = false;

  public pageGroupConfigForm: FormGroup;
  public childConfigForm: FormGroup;
  private $unsubscribe = new Subject<void>();

  public navigationConfig: { navigation: any[]; sectionName: string } = {navigation: [], sectionName: ''};
  // split navigation config for type
  public navigationPageItems: NavigationItem[] = [];
  public navigationGroupItems: NavigationGroup[] = [];

  // temp config for type
  public navigationPageItemsTemp: NavigationItem[] = [];
  public navigationGroupItemsTemp: NavigationGroup[] = [];

  private groupId = 0;
  private elementIdToEdit = 0;
  public isEditingMode = false;


  @Output() closeForm = new EventEmitter<void>();
  @Output() newNavigationConfigSubmit = new EventEmitter<any>();

  @ViewChild('invalidPositionDialog') invalidPositionDialog: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.pageGroupConfigForm = this.formBuilder.group({
      position: [null, Validators.required],
      translate: ['', Validators.required],
      icon: ['', Validators.required],
      url: [''],
      hidden: ['false', Validators.required],
    });

    this.childConfigForm = this.formBuilder.group({
      position: [null, Validators.required],
      translate: ['', Validators.required],
      icon: ['', Validators.required],
      url: ['', Validators.required],
      hidden: ['false', Validators.required]
    });

    this.pageGroupConfigForm.valueChanges.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(res => {
    });

    this.childConfigForm.valueChanges.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(res => {
    });
  }


  ngOnDestroy() {
    this.$unsubscribe.next();
  }

  closeDialog() {
    this.dialogService.close(dialogId);
  }

  openDialog(){
    const option: Partial<TODialogOptions> = {
      hasBackdrop: true,
      hasCustomTemplate: true
    };
    this.dialogService.open(option, dialogId, this.invalidPositionDialog).subscribe();
  }

  public setNavigationsConfigForType(navigationConfig, sectionName: string) {
    this.showTable = true;
    if (navigationConfig && sectionName) {
      this.sectionName = sectionName;
      navigationConfig.forEach(navigation => {
        if (navigation.type === 'group') {
          this.navigationGroupItems = [...this.navigationGroupItems, navigation];
        }
        else if (navigation.type === 'item') {
          this.navigationPageItems = [...this.navigationPageItems, navigation];
        }
      });
      this.navigationPageItemsTemp = this.navigationPageItems;
      this.navigationGroupItemsTemp = this.navigationGroupItems;
    }
    else {
      console.log('Navigation config is empty');
    }
  }

  private resetForm(form: FormGroup) {
    form.reset();
    form.controls.hidden.setValue('false');
    form.updateValueAndValidity();
  }

  private generateId(): number {
    return new Date().getTime();
  }

  private checkPosistion(position: number, type: 'page' | 'group' | 'child', groupId?: number): boolean {
    let positionValid = true;
    if (type === 'page') {
      this.navigationPageItemsTemp.forEach(page => {
        if (page.position === position) {
          positionValid = false;
        }
      });
    }
    else if (type === 'group') {
      this.navigationGroupItemsTemp.forEach(group => {
        if (group.position === position) {
          positionValid = false;
        }
      });
    }
    else if (type === 'child') {
      this.navigationGroupItemsTemp.forEach(group => {
        if (group.id === groupId) {
          group.children?.forEach(child => {
            if (child.position === position) {
              positionValid = false;
            }
          });
        }
      });
    }
    if (!positionValid) {
      this.openDialog();
    }
    return positionValid;

  }

  public showFormChild() {
    this.showChildForm = true;
  }

  private hideAllForms() {
    this.showPageGroupForm = false;
    this.showChildForm = false;
  }

  public cancel(type: 'child' | 'element') {
    this.hideAllForms();
    if (type === 'child') {
      this.resetForm(this.childConfigForm);
    }
    else {
      this.resetForm(this.pageGroupConfigForm);
    }

  }

  // TODO FIND FUNCTION AND SET VALUE OF FOUND ITEM
  private applyModifyToElement(array: Array<any>, type: 'child' | 'group' | 'page'): boolean {
    let findElment = false;
    for (let i = 0; i < array.length && !findElment; i++) {
      if (array[i].id === this.elementIdToEdit) {
        array[i].hidden = this.pageGroupConfigForm.get('hidden').value;
        if (array[i].position !== parseInt(this.pageGroupConfigForm.get('position').value)) {
          const positionValid = this.checkPosistion(parseInt(this.pageGroupConfigForm.get('position').value), type, this.groupId);
          if (positionValid) {
            array[i].position = parseInt(this.pageGroupConfigForm.get('position').value);
          }
        }
        array[i].icon = this.pageGroupConfigForm.get('icon').value;
        array[i].translate = this.pageGroupConfigForm.get('translate').value;
        if (type === 'page' || type === 'child') {
          array[i].url = this.pageGroupConfigForm.get('url').value;
        }
        findElment = true;
      }
    }
    return findElment;
  }

  public applyNavigationItemModify() {
    let findElment = false;
    findElment = this.applyModifyToElement(this.navigationGroupItemsTemp, 'group');
    if (!findElment) {
      findElment = this.applyModifyToElement(this.navigationPageItemsTemp, 'page');
    }
    if (!findElment) {
      let find = false;
      for (let i = 0; i < this.navigationGroupItemsTemp.length && !find; i++) {
        find = this.applyModifyToElement(this.navigationGroupItemsTemp[i].children, 'child');
      }
      findElment = find;
    }
    if (!findElment) {
      console.log('ERROR: ELEMENT NOT FOUND');
    }
    this.hideAllForms();
  }

  public addChild() {
    const child = this.childConfigForm.value;
    child.id = this.generateId();
    child.type = 'page';
    child.position = parseInt(child.position);
    const validPosition = this.checkPosistion(child.position, 'child');
    if (validPosition) {
      this.navigationGroupItemsTemp.forEach((group: NavigationGroup) => {
        if (group.id === this.groupId) {
          group.children = [...group.children, child];
          this.resetForm(this.childConfigForm);
        }
      });
      this.hideAllForms();
    }
  }

  // TODO 3 FORMS WITH RXJS?
  private createNavigationElement(type: 'page' | 'group') {
    const id = this.generateId();
    const navigationElement = this.pageGroupConfigForm.value;
    navigationElement.type = this.navigationType;
    navigationElement.id = id;
    // TODO: CHECK WHY POSITION IS A STRING AND NOT A NUMBER LIKE INTERFACE DECLARATION
    navigationElement.position = parseInt(navigationElement.position);
    const validPosition = this.checkPosistion(navigationElement.position, type);
    if (validPosition) {
      this.isEditingMode = true;
      if (type === 'page') {
        this.navigationPageItemsTemp = [...this.navigationPageItemsTemp, navigationElement];
      }
      else if (this.navigationType === 'group') {
        navigationElement.children = [];
        this.navigationGroupItemsTemp = [...this.navigationGroupItemsTemp, navigationElement];
        this.groupId = id;
      }
      this.resetForm(this.pageGroupConfigForm);
      this.hideAllForms();
    }
  }

  public addNavigationItem() {
    if (this.navigationType === 'page') {
      this.createNavigationElement('page');
    }
    else if (this.navigationType === 'group') {
      this.createNavigationElement('group');
    }
  }

  public addPage() {
    this.isEditingMode = false;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.resetForm(this.pageGroupConfigForm);
    this.navigationType = 'page';
  }

  public addGroup() {
    this.isEditingMode = false;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.showAddChildButton = false;
    this.resetForm(this.pageGroupConfigForm);
    this.navigationType = 'group';
  }

  private setPageGroupForm(value: NavigationItem | NavigationGroup, type: 'page' | 'group') {
    this.isEditingMode = true;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.navigationType = type;
    this.elementIdToEdit = value.id;
    this.pageGroupConfigForm.get('hidden').setValue(value.hidden);
    this.pageGroupConfigForm.get('position').setValue(value.position);
    this.pageGroupConfigForm.get('icon').setValue(value.icon);
    this.pageGroupConfigForm.get('translate').setValue(value.translate);
    if (type === 'page') {
      this.pageGroupConfigForm.get('url').setValue((value as NavigationItem).url);
    }
    else {
      this.groupId = value.id;
    }
  }

  public editPage(page: NavigationItem) {
    this.setPageGroupForm(page, 'page');
  }

  public editGroup(group: NavigationGroup) {
    this.showAddChildButton = true;
    this.setPageGroupForm(group, 'group');
  }

  public deletePage(page: NavigationItem) {
    this.navigationPageItemsTemp = this.navigationPageItemsTemp.filter(item => page.id !== item.id);
  }

  public deleteGroup(group: NavigationGroup) {
    this.navigationGroupItemsTemp = this.navigationGroupItemsTemp.filter(item => group.id !== item.id);
  }

  public submitNewNavigationConfiguration() {
    this.navigationGroupItemsTemp?.forEach(group => {
      this.navigationConfig.navigation.push(group);
    });
    this.navigationPageItemsTemp?.forEach(page => {
      this.navigationConfig.navigation.push(page);
    });
    this.navigationConfig.sectionName = this.sectionName;
    this.hideAllForms();
    this.newNavigationConfigSubmit.emit(this.navigationConfig);
    this.showTable = false;
  }

  public discardChanges() {
    this.showTable = !this.showTable;
    this.navigationPageItemsTemp = [];
    this.navigationGroupItemsTemp = [];
    this.closeForm.emit();
  }

}
