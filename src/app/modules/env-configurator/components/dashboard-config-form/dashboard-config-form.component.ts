import { DialogService } from './../../../../core/services/dialog.service';
import { NavigationBase } from './../../../models/modules.model';
import { OctoFormModel } from '../../../../@Octo/form/models/octo-form.model';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { DashboardConfig } from '../../../models/modules.model';
import { ToDialog, TODialogOptions } from '@treeocto/ui-kit/dist/types/components/to-dialog/to-dialog';

const navigationConfDialog = "navigationConfDialogID"

@Component({
  selector: 'octo-dashboard-config-form',
  templateUrl: './dashboard-config-form.component.html',
  styleUrls: ['./dashboard-config-form.component.scss']
})
export class DashboardConfigFormComponent implements OnInit {
  dashboardConfigForm: OctoFormModel = DASHBOARDCONFIG_FORM;
  showForm = false;
  configForm: DashboardConfig;
  navigations: NavigationBase[] = [
    {
      "id": "home",
      "translate": "NAV.HOME",
      "type": "item",
      "icon": "home",
      "url": "/home",
      "hidden": false
    },
    {
      "id": "pdf-reader",
      "translate": "NAV.DOCUMENTS",
      "type": "item",
      "icon": "insert_drive_file",
      "url": "/pdf",
      "hidden": false
    },
    {
      "id": "item",
      "translate": "NAV.APPLICATIONS",
      "type": "item",
      "icon": "apps",
      "url": "/test",
      "hidden": false
    }
  ]

  @ViewChild('navigationConfigFormDialog') dialog : TemplateRef<any>;
  @Output() setDashboardConfig = new EventEmitter();
  @Output() exportDashboardConfig = new EventEmitter();
  @Input() set form(conf) {
    console.log("01 RECIVED CONF", conf);
    if (conf) {
      this.showForm = true;
      this.configForm = conf;
      this.editConfig();
    } else {
      this.showForm = false;
    }
  }

  

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
    
  }


  closeDialog() {
    this.dialogService.close(navigationConfDialog);
  }

  openDialog(){
    const option: Partial<TODialogOptions> ={
      hasBackdrop: true,
      hasCustomTemplate: true,
      dialogTitle: "Navigation config form"
    }
    this.dialogService.open(option, navigationConfDialog, this.dialog).subscribe(res => {
      console.log(res)
    })
  }

  addEventToButton(sectionName: string, form) {
    const button = document.getElementById(form.sections.find(s => s.name === sectionName).fields.find(f => f.name === `${sectionName}NavigationButton`).id);
    button.addEventListener("btnClick", e => {
      this.openDialog();
    });
  }

  formChange(event) {
    console.log("EVENT", event)
    // TODO without timeout doesn't work because element is not already rendered
    setTimeout(() => {
      this.addEventToButton("navbar", event);
      this.addEventToButton("sidebar", event);
      this.addEventToButton("footer", event);
    }, 100);
  }

  formSubmit(event) {
    
  }

  editConfig() {

  }
}

const DASHBOARDCONFIG_FORM: OctoFormModel = {
  mode: 'full',
  id: '1',
  title: 'Dashborad config form',
  class: '',
  style: '',
  sections: [
    {
      id: 's1',
      name: 'navbar',
      title: 'Navigation config',
      class: 'border-2 broder-grey-100 rounded-md py-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: 'f1s1',
          name: 'logoPath',
          class: '',
          disabled: false,
          placeholder: 'Insert logo path',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Logo path',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'text',
          validation: {
            required: true,
          },
          sectionId: 's1',
        },
        {
          id: 'f2s1',
          name: 'navbarNavigationButton',
          class: '',
          disabled: false,
          placeholderColor: '',
          appearance: 'simple',
          label: 'Handle navigation',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'button',
          validation: {
            required: true,
          },
          sectionId: 's1',
        }
      ]
    },
    {
      id: 's2',
      name: 'sidebar',
      title: 'Sidebar config',
      class: 'border-2 broder-grey-100 rounded-md py-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: 'f1s2',
          name: 'logoPath',
          class: 'col-span-2',
          disabled: false,
          placeholder: 'Insert logo path',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Logo path',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'text',
          validation: {
            required: true,
          },
          sectionId: 's2',
        },
        {
          id: 'f2s2',
          name: 'sidebarNavigationButton',
          class: '',
          disabled: false,
          placeholderColor: '',
          appearance: 'simple',
          label: 'Handle navigation',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'button',
          validation: {
            required: true,
          },
          sectionId: 's2',
        }
      ],
    },
    {
      id: 's3',
      name: 'footer',
      title: 'Footer config',
      class: 'border-2 broder-grey-100 rounded-md py-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: 'f1s3',
          name: 'logoPath',
          class: 'col-span-2',
          disabled: false,
          placeholder: 'Insert logo path',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Logo path',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'text',
          validation: {
            required: true,
          },
          sectionId: 's3',
        },
        {
          id: 'f2s3',
          name: 'footerNavigationButton',
          class: '',
          disabled: false,
          placeholderColor: '',
          appearance: 'simple',
          label: 'Handle navigation',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'button',
          validation: {
            required: true,
          },
          sectionId: 's3',
        }
      ]
    },
    {
      id: 's3',
      name: 'othersconfig',
      title: 'Others config',
      class: 'border-2 broder-grey-100 rounded-md py-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: 'f1s3',
          name: 'authenticate',
          class: 'col-span-2',
          disabled: false,
          appearance: 'simple',
          label: 'Authenticate',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'toggle',
          validation: {
            required: true
          },
          sectionId: 's3',
        },
        {
          id: 'f2s3',
          name: 'defaultRoute',
          class: 'col-span-2',
          disabled: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Default route',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          validation: {
            required: true,
          },
          options:[
            { value: "faq", label:"Faq"},
            { value: "login", label: "login" }
          ],
          sectionId: 's3',
        }
      ]
    },
    
  ],
}
