import { NavigationBase } from './../../../models/modules.model';
import { OctoFormModel } from '../../../../@Octo/form/models/octo-form.model';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { DashboardConfig } from '../../../models/modules.model';

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

  constructor() { }

  ngOnInit(): void {
    
  }

  async setHiddenField(sectionName: string, form){
    const group = document.getElementById(form.sections.find(s => s.name === sectionName).fields.find(f => f.name === "children").id);
    const page = document.getElementById(form.sections.find(s => s.name === sectionName).fields.find(f => f.name === "page").id);
    if (form.sections.find(s => s.name === sectionName).fields.find(f => f.name === "type").value === "item") {
      group.classList.add("hidden");
      page.classList.remove("hidden");
    }
    else if (form.sections.find(s => s.name === sectionName).fields.find(f => f.name === "type").value === "group") {
      page.classList.add("hidden");
      group.classList.remove("hidden");
    }
  }

  formChange(event) {
    console.log("EVENT", event)
    // TODO without timeout doesn't work because element is not already rendered
    // setTimeout(() => {
    //   this.setHiddenField("navbar", event);
    //   this.setHiddenField("sidebar", event);
    //   this.setHiddenField("footer", event);
    // }, 100);
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
          sectionId: 's1',
        }
      ],
      
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
