import { NavigationBase } from './../../../models/modules.model';
import { OctoFormModel } from '../../../../@Octo/form/models/octo-form.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
      this.configForm = conf;
      this.showForm = true;
      this.editConfig();
    } else {
      this.showForm = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  formChange(event) {
    console.log("CHANGE EVENT",event.sections[0].fields[2].value);
    if (event.sections[0].fields[2].value === "item"){
      this.dashboardConfigForm.sections[0].fields[5].class = "hidden";
      this.dashboardConfigForm.sections[0].fields[6].class = "";
    }
    else if (event.sections[0].fields[2].value === "group") {
      this.dashboardConfigForm.sections[0].fields[5].class = "";
      this.dashboardConfigForm.sections[0].fields[6].class = "hidden";
    }

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
      id: '1',
      name: 'navbar',
      title: 'Navigation config',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
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
          sectionId: '1',
        },
        {
          id: '2',
          name: 'id',
          disabled: false,
          placeholder: 'Ex Applications...',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Id',
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
          sectionId: '1',
        },
        {
          id: '3',
          name: 'type',
          disabled: false,
          placeholder: '',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Type',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'select',
          options: [
            { value: 'group', label: 'Group' },
            { value: 'item', label: 'Item' },
          ],
          validation: {
            required: true,
          },
          sectionId: '1',
        },
        {
          id: '4',
          name: 'translate',
          disabled: false,
          placeholder: 'Ex NAV.APPLICATIONS',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Translate',
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
          sectionId: '1',
        },
        {
          id: '5',
          name: 'icon',
          disabled: false,
          placeholder: 'Ex home',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Icon',
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
          sectionId: '1',
        },
        {
          id: '6',
          name: 'children',
          disabled: false,
          class: '',
          placeholder: 'Choose one or more',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Children',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          multipleSelection: true,
          options: [
            { value: 'home', label: 'Home' },
            { value: 'pdf-reader', label: 'PDF reader' }
          ],
          validation: {
            required: true,
          },
          sectionId: '1',
        },
        {
          id: '7',
          name: 'item',
          disabled: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Item',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          multipleSelection: true,
          options: [
            { value: 'home', label: 'Home' },
            { value: 'pdf-reader', label: 'PDF reader' }
          ],
          validation: {
            required: true,
          },
          sectionId: '1',
        },
        {
          id: '8',
          name: 'hidden',
          disabled: false,
          placeholder: '',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Hidden',
          labelColor: '',
          borderColor: '',
          backgroundColor: 'bg-green-600',
          textColor: '',
          clearable: true,
          value: '',
          type: 'toggle',
          validation: {
            required: true
          },
          sectionId: '1'
        },
      ],
      
    },
    {
      id: '2',
      name: '',
      title: 'Navigation config',
      class: '',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
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
          sectionId: '1',
        },
      ]
    }
  ],
}
