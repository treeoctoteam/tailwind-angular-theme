import { element } from 'protractor';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

interface NavigationItem {
  id: string;
  type: 'page';
  translate: string;
  icon: string;
  url: string;
  hidden: boolean
}

interface NavigationGroup {
  id: string;
  type: 'group';
  translate: string;
  icon: string;
  hidden: boolean;
  children: NavigationItem[];
}

interface NavigationType {
  type: 'group' | 'page';
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
  public optionSelected : "page" | "group" = 'page';

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

  private groupId = '';
  private elementIdToEdit = '';

  @Output() closeForm = new EventEmitter<void>();
  @Output() newNavigationConfigSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pageGroupConfigForm = this.formBuilder.group({
      id: ['', Validators.required],
      type: [{ value: this.optionSelected, disabled: true }, Validators.required],
      translate: ['', Validators.required],
      icon: ['', Validators.required],
      url: [''],
      hidden: ['false', Validators.required],
    });

    this.childConfigForm = this.formBuilder.group({
      id: ['', Validators.required],
      type: [{ value: 'item', disabled: true }, Validators.required],
      translate: ['', Validators.required],
      icon: ['', Validators.required],
      url: ['', Validators.required],
      hidden: ['false', Validators.required]
    })

    this.pageGroupConfigForm.valueChanges.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(res => {
      console.log(res);
    });

    this.childConfigForm.valueChanges.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(res => {
      console.log(res);
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

  public onConfigurationTypeChange(event) {
    this.optionSelected = event.detail.value;
    this.resetForm(this.pageGroupConfigForm);
    // if(this.optionSelected === "page") {
    //   this.pageConfigForm.get('url').setValidators(Validators.required);
    //   this.pageConfigForm.updateValueAndValidity();
    // }
    // else {
    //   this.pageConfigForm.get('url').clearValidators();
    //   this.pageConfigForm.updateValueAndValidity();
    // }
    this.pageGroupConfigForm.controls['type'].setValue(this.optionSelected);
  }

  public showFormChild() {
    this.showAddChildButton = false
    this.showChildForm = true;
    this.addNavigationItem();
  }

  public addChild() {
    this.showAddChildButton = true;
    this.showChildForm = false;
    const child: NavigationItem = this.childConfigForm.value;
    child.type = "page";
    this.navigationGroupItemsTemp.forEach((group, index) => {
      if(group.id === this.groupId) {
        this.navigationGroupItemsTemp[index].children = [...this.navigationGroupItemsTemp[index].children, child];
        this.resetForm(this.childConfigForm);
        this.childConfigForm.controls['type'].setValue('item');
      }
    })
  }

  public addNavigationItem() {
    if(this.optionSelected === "page") {
      const page: NavigationItem = this.pageGroupConfigForm.value;
      page.type = this.optionSelected;
      this.navigationPageItemsTemp = [ ...this.navigationPageItemsTemp, page ];
      this.resetForm(this.pageGroupConfigForm);
    }
    else if (this.optionSelected === "group") {
      const page: NavigationGroup = this.pageGroupConfigForm.value;
      page.type = this.optionSelected;
      this.navigationGroupItemsTemp = [...this.navigationGroupItemsTemp, page];
      this.groupId = this.pageGroupConfigForm.get('id').value;
      this.resetForm(this.pageGroupConfigForm);
    }
  }

  setPageGroupForm(value: NavigationItem | NavigationGroup, type: "page" | "group") {
    this.optionSelected = type;
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.pageGroupConfigForm.get('id').setValue(value.id);
    this.pageGroupConfigForm.get('hidden').setValue(value.hidden);
    this.pageGroupConfigForm.get('icon').setValue(value.icon);
    this.pageGroupConfigForm.get('translate').setValue(value.translate);
    // TODO disable doesn't work
    this.pageGroupConfigForm.get('type').setValue(type);
    this.pageGroupConfigForm.get('type').disable();
    if (type === "page") {
      this.pageGroupConfigForm.get('url').setValue((value as NavigationItem).url);
    }
  }

  editPage(page: NavigationItem) {
    this.setPageGroupForm(page, "page");
  }

  editGroup(group: NavigationGroup) {
    this.setPageGroupForm(group, "group");
  }

  deleteItem(page: NavigationItem) {
    this.navigationPageItemsTemp = this.navigationPageItemsTemp.filter(item => page.id !== item.id);
  }

  deleteGroup(group: NavigationGroup) {
    this.navigationGroupItemsTemp = this.navigationGroupItemsTemp.filter(item => group.id !== item.id);
  }

  addPage() {
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.resetForm(this.pageGroupConfigForm);
    this.pageGroupConfigForm.get('type').setValue("page");
    this.optionSelected = "page";
  }

  addGroup() {
    this.showPageGroupForm = true;
    this.showChildForm = false;
    this.resetForm(this.pageGroupConfigForm);
    this.pageGroupConfigForm.get('type').setValue("group");
    this.optionSelected = "group";
  }

}
