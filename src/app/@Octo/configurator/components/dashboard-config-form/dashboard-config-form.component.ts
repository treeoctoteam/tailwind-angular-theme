import { OctoFormModel } from './../../../form/models/octo-form.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'octo-dashboard-config-form',
  templateUrl: './dashboard-config-form.component.html',
  styleUrls: ['./dashboard-config-form.component.scss']
})
export class DashboardConfigFormComponent implements OnInit {
  dashboardConfigForm: OctoFormModel = DASHBOARDCONFIG_FORM;
  showForm = false;

  @Output() setDashboardConfig = new EventEmitter();
  @Output() exportDashboardConfig = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  formChange(event) {

  }
  formSubmit(event) {

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
