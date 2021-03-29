import { OctoFormService } from './../../../form/octo-form.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OctoFormModel } from 'src/app/@Octo/form/models/octo-form.model';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';

@Component({
  selector: 'octo-app-config-form',
  templateUrl: './app-config-form.component.html',
  styleUrls: ['./app-config-form.component.scss'],
})
export class AppConfigFormComponent implements OnInit {

  appConfigForm: OctoFormModel = APPCONFIG_FORM;
  constructor(public appService: ApplicationConfigService, private formServices: OctoFormService) { }

  @Output() submit = new EventEmitter();

  @Input() configForm: any;

  ngOnInit(): void { }

  formSubmit(form: OctoFormModel) {
    // const sections = this.octoFormUtilsService.getSectionFormMap(form);
    this.appConfigForm = {...form};
    this.submit.emit(this.appConfigForm);
    console.log('form submit', form);
  }

  formChange(form: OctoFormModel) {
    console.log('form change', form);
  }

  test() {
    console.log("THIS CONFIG FORM",this.configForm);
    const test = this.formServices.setFieldValue("test", '2', '2')
    
    // this.APPCONFIG_FORM
  }
}

const APPCONFIG_FORM: OctoFormModel = {
  mode: 'full',
  id: '1',
  title: 'App config form',
  class: '',
  style: '',
  sections: [
    {
      id: '1',
      name: 'startup',
      title: 'Start up from',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'startup',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Startup',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'select',
          options: [
            { value: 'file', label: 'File' },
            { value: 'API', label: 'API' },
          ],
          validation: {
            required: true,
          },
          sectionId: '1',
        }
      ]
    },
    {
      id: '2',
      name: 'customerInfo',
      title: 'Customer info',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'name',
          disabled: false,
          readonly: false,
          placeholder: 'Ex Euronovate, Siga98...',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Name',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'text',
          validation: {
            required: true,
            maxLength: 4,
            min: 2
          },
          sectionId: '2',
        },
        {
          id: '2',
          name: 'address',
          disabled: false,
          readonly: false,
          placeholder: 'Ex via roma 1',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Address',
          labelColor: '',
          borderColor: '',
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
          id: '3',
          name: 'supportEmail',
          disabled: false,
          readonly: false,
          placeholder: 'Ex support@treeocto.com',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Support Email',
          labelColor: '',
          borderColor: '',
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
          name: 'phone',
          disabled: false,
          readonly: false,
          placeholder: 'Ex +3472941411',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Phone',
          labelColor: '',
          borderColor: '',
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
      ],
    },
    {
      id: '3',
      name: 'network',
      title: 'Network',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'host',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Host',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: 'https://dev.tap-id.tech', label: 'Dev' },
            { value: 'https://test.tap-id.tech', label: 'Test' },
          ],
          validation: {
            required: true,
          },
          sectionId: '3',
        },
        {
          id: '2',
          name: 'basePath',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Base path',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: '/video_operator/euronovate/', label: 'Euronovate' },
            { value: '/siga98/', label: 'Siga98' },
            { value: '/admware/', label: 'Admware' },
            { value: '/stonize/', label: 'Stonize' },
            { value: '/servizenter/', label: 'Servizenter' },
            { value: '/legallab/', label: 'Legallab' },
            { value: '/video_operator/demo/', label: 'Demo' },
            { value: '/video_operator/nebula/', label: 'Nebula' },
            { value: '/mobile/', label: 'Mobile' },
            { value: '/cgcom/', label: 'Cgcom' },
            { value: '/carnetprofesional/', label: 'Carnetprofesional' },
            { value: '/sahibinden/', label: 'Sahibinden' },
          ],
          validation: {
            required: true,
          },
          sectionId: '3',
        },
        {
          id: '3',
          name: 'hostApi',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Host API',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: 'https://dev.tap-id.tech', label: 'Dev API' },
            { value: 'https://test.tap-id.tech', label: 'Test API' },
          ],
          validation: {
            required: true,
          },
          sectionId: '3',
        },
        {
          id: '4',
          name: 'hostApiV1',
          disabled: false,
          readonly: false,
          placeholder: '',
          placeholderColor: 'Choose one',
          appearance: 'simple',
          label: 'Host API V1',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: 'https://dev.tap-id.tech/v1', label: 'Dev API V1' },
            { value: 'https://test.tap-id.tech/v1', label: 'Test API V1' },
          ],
          validation: {
            required: true,
          },
          sectionId: '3',
        },
        {
          id: '5',
          name: 'hostApiV2',
          disabled: false,
          readonly: false,
          placeholder: '',
          placeholderColor: 'Choose one',
          appearance: 'simple',
          label: 'Host API V2',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: 'https://dev.tap-id.tech/v2', label: 'Dev API V2' },
            { value: 'https://test.tap-id.tech/v2', label: 'Test API V2' },
          ],
          validation: {
            required: true,
          },
          sectionId: '3',
        },
        {
          id: '6',
          name: 'hostApiV3',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Host API V3',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: 'https://dev.tap-id.tech/v3', label: 'Dev API V3' },
            { value: 'https://test.tap-id.tech/v3', label: 'Test API V3' },
          ],
          validation: {
            required: true,
          },
          sectionId: '3',
        },
        {
          id: '7',
          name: 'openViduServerUrl',
          disabled: false,
          readonly: false,
          placeholder: '',
          placeholderColor: '',
          appearance: 'simple',
          label: 'OpenVidu server url',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: 'https://rtc.tap-id.tech:4443',
          type: 'text',
          validation: {
            required: true,
          },
          sectionId: '3',
        },
      ],
    },
    {
      id: '4',
      name: '',
      title: 'Authentication',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'enableAuthentication',
          disabled: false,
          readonly: false,
          placeholder: '',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Enable authentication',
          labelColor: '',
          borderColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'toggle',
          validation: {
            required: true,
          },
          sectionId: '4',
        },
        {
          id: '2',
          name: 'authenticationMode',
          disabled: false,
          readonly: false,
          placeholder: 'JWT or Cookie',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Authentication mode',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'select',
          options: [
            { value: 'JWT', label: 'JWT' },
            { value: 'Cookie', label: 'Cookie' },
          ],
          validation: {
            required: true,
          },
          sectionId: '4',
        }
      ]
    },
    {
      id: '5',
      name: 'idleConfig',
      title: 'Idle Config',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'timeout',
          disabled: false,
          readonly: false,
          placeholder: 'Ex 1000',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Timeout',
          labelColor: '',
          borderColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'number',
          validation: {
            required: true,
          },
          sectionId: '5',
        },
        {
          id: '2',
          name: 'idle',
          disabled: false,
          readonly: false,
          placeholder: 'Ex 1000',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Idle',
          labelColor: '',
          borderColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'number',
          validation: {
            required: true,
          },
          sectionId: '5',
        },
        {
          id: '3',
          name: 'ping',
          disabled: false,
          readonly: false,
          placeholder: 'Ex 1000',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Ping',
          labelColor: '',
          borderColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'number',
          validation: {
            required: true,
          },
          sectionId: '5',
        },
      ]
    },
    {
      id: '6',
      name: '',
      title: 'Default layout',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'defaultLayout',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: '',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: '/landingpage', label: 'landingpage' },
            { value: '/dashboard', label: 'dashboard' },
            { value: '/workflow', label: 'workflow' },
          ],
          validation: {
            required: true,
          },
          sectionId: '6',
        }
      ]
    },
    {
      id: '7',
      name: '',
      title: 'Layouts',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'layouts',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one or more',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Layouts',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          multipleSelection: true,
          options: [
            { value: '/landingpage', label: 'landingpage' },
            { value: '/dashboard', label: 'dashboard' },
            { value: '/workflow', label: 'workflow' },
          ],
          validation: {
            required: true,
          },
          sectionId: '7',
        }
      ]
    },
    {
      id: '8',
      name: '',
      title: 'Language settings',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'defaultLanguage',
          disabled: false,
          readonly: false,
          placeholder: 'Ex en, it ...',
          placeholderColor: '',
          appearance: 'simple',
          label: '',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'select',
          options: [
            { label: 'Italiano', value: 'it' },
            { label: 'English', value: 'en' }
          ],
          validation: {
            required: true,
          },
          sectionId: '8',
        },
        {
          id: '2',
          name: 'languages',
          disabled: false,
          readonly: false,
          placeholder: 'Choose one or more',
          placeholderColor: '',
          appearance: 'simple',
          label: '',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          multipleSelection: true,
          options: [
            {
              label: 'Italiano',
              value: {
                "id": "en",
                "title": "LOCALES.EN",
                "flag": "EN",
                "iso3code": "USA",
                "enabled": false
              }
            },
            {
              label: 'English',
              value: {
                "id": "it",
                "title": "LOCALES.IT",
                "flag": "IT",
                "iso3code": "ITA",
                "enabled": false
              }
            }
          ],
          validation: {
            required: true,
          },
          sectionId: '8',
        }
      ]
    },
    {
      id: '9',
      name: 'theme',
      title: 'Theme',
      class: 'border-2 broder-grey-100 rounded-md p-4',
      style: '',
      validation: {
        required: true,
      },
      fields: [
        {
          id: '1',
          name: 'favicon',
          disabled: false,
          readonly: false,
          placeholder: 'Insert file ico',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Favicon',
          labelColor: '',
          borderColor: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'text',
          validation: {
            required: true,
          },
          sectionId: '9',
        }
      ]
    },
  ],
};
