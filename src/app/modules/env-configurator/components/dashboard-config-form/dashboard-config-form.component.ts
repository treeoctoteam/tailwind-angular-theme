import { OctoFormModel } from '../../../../@Octo/form/models/octo-form.model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DashboardConfig } from '../../../models/modules.model';

export interface Page {
  id: string;
  translate: string;
  type: string;
  icon: string;
  url: string;
  hidden: boolean;
}

@Component({
  selector: 'octo-dashboard-config-form',
  templateUrl: './dashboard-config-form.component.html',
  styleUrls: ['./dashboard-config-form.component.scss']
})
export class DashboardConfigFormComponent implements OnInit {
  dashboardConfigForm: OctoFormModel = DASHBOARDCONFIG_FORM;
  showForm = false;
  configForm: DashboardConfig;
  pages: Page[] = [
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
      "type": "items",
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
      title: 'Navbar cnfigurator from',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'logoPath',
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
        }
      ]
    },
    {
      id: '2',
      name: 'navigation',
      title: 'Navigation',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
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
          sectionId: '2',
        },
        {
          id: '2',
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
            { value: 'itams', label: 'Items' },
          ],
          validation: {
            required: true,
          },
          sectionId: '2',
        },
        {
          id: '3',
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
          sectionId: '2',
        },
        {
          id: '4',
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
          sectionId: '2',
        },
        {
          id: '5',
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
          sectionId: '2'
        },
      ],
    },
  ],
}
