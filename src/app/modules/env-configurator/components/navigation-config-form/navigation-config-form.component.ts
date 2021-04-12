import { group } from '@angular/animations';
import { element } from 'protractor';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface NavigationItem {
  id: number;
  type: 'page';
  translate: string;
  icon: string;
  url: string;
  hidden: boolean;
  position: number;
}

interface NavigationGroup {
  id: number;
  type: 'group';
  translate: string;
  icon: string;
  hidden: boolean;
  position: number;
  children: NavigationItem[];
}

@Component({
  selector: 'octo-navigation-config-form',
  templateUrl: './navigation-config-form.component.html',
  styleUrls: ['./navigation-config-form.component.scss']
})
export class NavigationConfigFormComponent implements OnInit, OnDestroy {

  public optionsType = [
    { value: "page", label: "Page" },
    { value: "group", label: "Group" }
  ];
  public navigationType : "page" | "group" = 'page';

  // show/hide list item
  public showPageList = false;
  public showGroupList = false;
  public showGroupPageList = false;

  public showPageGroupForm = false;
  public showChildForm = false;

  public pageGroupConfigForm: FormGroup;
  public childConfigForm: FormGroup;
  private $unsubscribe = new Subject<void>();

  public showAddChildButton = true;

  public navigationConfig: any[] = [];
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pageGroupConfigForm = this.formBuilder.group({
      position: ['', Validators.required],
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
    })

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

  public setNavigationsConfigForType(navigationConfig) {
    if(navigationConfig) {
      navigationConfig.forEach(navigation => {
        if (navigation.type === "group") {
          this.navigationGroupItems = [...this.navigationGroupItems, navigation];
        }
        else if (navigation.type === "item") {
          this.navigationPageItems = [...this.navigationPageItems, navigation];
        }
      });
      this.navigationPageItemsTemp = this.navigationPageItems;
      this.navigationGroupItemsTemp = this.navigationGroupItems;
    }
    else {
      console.log("Navigation config is empty")
    }
  }

  private resetForm(form: FormGroup) {
    form.reset();
    form.controls['hidden'].setValue('false');
    form.updateValueAndValidity();
  }

  private generateId(): number {
    return new Date().getTime();
  }

  private checkPosistion(position: number, type: 'page' | 'group' | 'child', groupId?: number): boolean {
    let positionValid = true;
    if(type === 'page') {
      this.navigationPageItemsTemp.forEach(page => {
        if(page.position === position) {
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
          group.children.forEach(child => {
            if (child.position === position) {
              positionValid = false;
            }
          })
        }
      });
    }
    if(!positionValid) {
      alert(`position for ${type} already used`);
    }
    return positionValid;

  }

  public showFormChild() {
    this.showAddChildButton = false;
    this.showChildForm = true;
  }

  private applyModifyToElement(array: Array<any>){ 

  }

  public applyNavigationItemModify() {
    console.log("ID2", this.elementIdToEdit, this.navigationGroupItemsTemp, this.navigationPageItemsTemp);
    let findElment = false;

    for (let indexGroup = 0; indexGroup < this.navigationGroupItemsTemp.length && !findElment; indexGroup++){
      if (this.navigationGroupItemsTemp[indexGroup].id === this.elementIdToEdit){
        this.navigationGroupItemsTemp[indexGroup].hidden = this.pageGroupConfigForm.get('hidden').value;
        if (this.navigationGroupItemsTemp[indexGroup].position !== this.pageGroupConfigForm.get('position').value){
          const positionValid = this.checkPosistion(this.pageGroupConfigForm.get('position').value, "group", this.groupId);
          if (positionValid) {
            this.navigationGroupItemsTemp[indexGroup].position = this.pageGroupConfigForm.get('position').value;
          }
        }
        this.navigationGroupItemsTemp[indexGroup].icon = this.pageGroupConfigForm.get('icon').value;
        this.navigationGroupItemsTemp[indexGroup].translate = this.pageGroupConfigForm.get('translate').value;
        this.checkPosistion(this.pageGroupConfigForm.get('position').value, "group",);
        findElment = true;
      }
      else {
        for (let indexChild = 0; indexChild < this.navigationGroupItemsTemp[indexGroup].children.length && !findElment; indexChild++) {
          if (this.navigationGroupItemsTemp[indexGroup].children[indexChild].id === this.elementIdToEdit) {
            this.navigationGroupItemsTemp[indexGroup].children[indexChild].hidden = this.pageGroupConfigForm.get('hidden').value;
            if (this.navigationGroupItemsTemp[indexGroup].children[indexChild].position !== this.pageGroupConfigForm.get('position').value) {
              const positionValid = this.checkPosistion(this.pageGroupConfigForm.get('position').value, "child");
              if (positionValid) {
                this.navigationGroupItemsTemp[indexGroup].children[indexChild].position = this.pageGroupConfigForm.get('position').value;
              }
            }
            this.navigationGroupItemsTemp[indexGroup].children[indexChild].icon = this.pageGroupConfigForm.get('icon').value;
            this.navigationGroupItemsTemp[indexGroup].children[indexChild].translate = this.pageGroupConfigForm.get('translate').value;
            this.navigationGroupItemsTemp[indexGroup].children[indexChild].url = this.pageGroupConfigForm.get('url').value;
            findElment = true;
          }
        }
      }
    }
    for (let indexPage = 0; indexPage < this.navigationPageItemsTemp.length && !findElment; indexPage++) {
      if (this.navigationPageItemsTemp[indexPage].id === this.elementIdToEdit) {
        this.navigationPageItemsTemp[indexPage].hidden = this.pageGroupConfigForm.get('hidden').value;
        if (this.navigationPageItemsTemp[indexPage].position !== this.pageGroupConfigForm.get('position').value) {
          const positionValid = this.checkPosistion(this.pageGroupConfigForm.get('position').value, "page");
          if (positionValid) {
            this.navigationPageItemsTemp[indexPage].position = this.pageGroupConfigForm.get('position').value
          }
        }
        this.navigationPageItemsTemp[indexPage].icon = this.pageGroupConfigForm.get('icon').value;
        this.navigationPageItemsTemp[indexPage].translate = this.pageGroupConfigForm.get('translate').value;
        this.navigationPageItemsTemp[indexPage].url = this.pageGroupConfigForm.get('url').value;
        findElment = true;
      }
    }
    if(!findElment) {
      console.log("ERROR: ELEMENT NOT FOUND");
    }
    this.showChildForm = false;

  }

  public addChild() {
    this.showAddChildButton = true;
    this.showChildForm = false;
    const child: NavigationItem = this.childConfigForm.value;
    child.type = "page";
    child.id = this.generateId();
    this.navigationGroupItemsTemp.forEach((group: NavigationGroup) => {
      if(group.id === this.groupId) {
        group.children = [...group.children, child];
        this.resetForm(this.childConfigForm);
      }
    })
  }

  private createNavigationElement(type: "page" | "group") {
    const id = this.generateId();
    this.isEditingMode = true;
    const navigationElement = this.pageGroupConfigForm.value;
    navigationElement.type = this.navigationType;
    navigationElement.id = id;
    if(type === "page") {
      this.navigationPageItemsTemp = [...this.navigationPageItemsTemp, navigationElement];
    }
    else if (this.navigationType === "group") {
      this.navigationGroupItemsTemp = [...this.navigationGroupItemsTemp, navigationElement];
      this.groupId = id;
    }
    this.resetForm(this.pageGroupConfigForm)
  }

  public addNavigationItem() {
    if(this.navigationType === "page") {
      this.createNavigationElement("page");
    }
    else if (this.navigationType === "group") {
      this.createNavigationElement("group")
    }
  }

  public addPage() {
    this.isEditingMode = false;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.resetForm(this.pageGroupConfigForm);
    this.navigationType = "page";
  }

  public addGroup() {
    this.isEditingMode = false;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.resetForm(this.pageGroupConfigForm);
    this.navigationType = "group";
  }

  private setPageGroupForm(value: NavigationItem | NavigationGroup, type: "page" | "group") {
    this.isEditingMode = true;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.navigationType = type;
    this.elementIdToEdit = value.id;
    console.log("ID3", this.elementIdToEdit);
    this.pageGroupConfigForm.get('hidden').setValue(value.hidden);
    this.pageGroupConfigForm.get('position').setValue(value.position);
    this.pageGroupConfigForm.get('icon').setValue(value.icon);
    this.pageGroupConfigForm.get('translate').setValue(value.translate);
    if (type === "page") {
      this.pageGroupConfigForm.get('url').setValue((value as NavigationItem).url);
    }
    else {
      this.groupId = value.id;
    }
  }

  public editPage(page: NavigationItem) {
    this.setPageGroupForm(page, "page");
  }

  public editGroup(group: NavigationGroup) {
    this.setPageGroupForm(group, "group");
  }

  public deleteItem(page: NavigationItem) {
    this.navigationPageItemsTemp = this.navigationPageItemsTemp.filter(item => page.id !== item.id);
  }

  public deleteGroup(group: NavigationGroup) {
    this.navigationGroupItemsTemp = this.navigationGroupItemsTemp.filter(item => group.id !== item.id);
  }

}
