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

  public optionSelected = 'page';
  public pageConfigForm: FormGroup;
  public childConfigForm: FormGroup;
  private $unsubscribe = new Subject<void>();

  public showAddChildButton = true;
  public showChildForm = false;

  public navigationConfig: any[] = [];

  public navigationItems: NavigationItem[] = [];
  public navigationGroupItems: NavigationGroup[] = [];

  // TEMP VAR
  public navigationPages = [];
  public navigationGroups = [];



  @Output() closeDialog = new EventEmitter<void>();
  @Output() navigationConfigSubmit = new EventEmitter<any>();
  @Input() navigationConfigObject : any = "CIAO";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pageConfigForm = this.formBuilder.group({
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

    this.pageConfigForm.valueChanges.pipe(
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

  // private setNavigationConfig(navigationConfig, pagesArray, groupsArray) {
  //   navigationConfig?.forEach(navigation => {
  //     if (navigation.type === "group") {
  //       groupsArray = [...groupsArray, navigation];
  //     }
  //     else if (navigation.type === "item") {
  //       pagesArray = [...pagesArray, navigation];
  //     }
  //   });
  //   console.log("NAVIGATION", navigationConfig, this.navbarNavigationItems, this.navbarNavigationGroupItems)
  // }

  public setNavigationsConfig(navigationConfig) {
    if(navigationConfig) {
      navigationConfig.forEach(navigation => {
        if (navigation.type === "group") {
          this.navigationGroupItems = [...this.navigationGroupItems, navigation];
        }
        else if (navigation.type === "item") {
          this.navigationItems = [...this.navigationItems, navigation];
        }
      });
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
    this.resetForm(this.pageConfigForm);
    // if(this.optionSelected === "page") {
    //   this.pageConfigForm.get('url').setValidators(Validators.required);
    //   this.pageConfigForm.updateValueAndValidity();
    // }
    // else {
    //   this.pageConfigForm.get('url').clearValidators();
    //   this.pageConfigForm.updateValueAndValidity();
    // }
    this.pageConfigForm.controls['type'].setValue(this.optionSelected);
  }

  public showFormChild() {
    this.showAddChildButton = false
    this.showChildForm = true;
  }

  public addChild() {
    // this.showAddChildButton = true;
    // this.showChildForm = false;
    // const child: NavigationItem = this.childConfigForm.value;
    // child.type = "page";
    // this.navigationGroupItems = [ ...this.navigationGroupItems, child ];
    // this.resetForm(this.childConfigForm);
    // this.childConfigForm.controls['type'].setValue('item');
  }

  public addNavigationItem() {
    // if(this.optionSelected === "page") {
    //   const page: NavigationItem = this.pageConfigForm.value;
    //   page.type = this.optionSelected;
    //   this.navigationConfig = [ ...this.navigationConfig, page ];
    //   this.resetForm(this.pageConfigForm);
    // }
    // else if (this.optionSelected === "group") {
    //   const page: NavigationGroup = this.pageConfigForm.value;
    //   page.children = this.navigationGroupItem;
    //   this.navigationConfig = [...this.navigationConfig, page];
    //   this.navigationGroupItem = [];
    //   this.resetForm(this.pageConfigForm);
    // }
    // console.log("navigation", this.navigationConfig);
  }

  editPage(page) {
    console.log("EDIT PAGE",page)
  }

}
