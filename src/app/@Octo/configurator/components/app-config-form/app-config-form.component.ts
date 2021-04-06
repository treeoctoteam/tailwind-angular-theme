import { I18nService } from 'src/app/core/services/i18n.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OctoFormModel } from 'src/app/@Octo/form/models/octo-form.model';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { ApplicationConfig } from 'src/app/shared/models/application-config.model';
import { Language } from 'src/app/shared/models/language.model';


@Component({
  selector: 'octo-app-config-form',
  templateUrl: './app-config-form.component.html',
  styleUrls: ['./app-config-form.component.scss'],
})
export class AppConfigFormComponent implements OnInit {
  appConfigForm: OctoFormModel = APPCONFIG_FORM;
  languages: Language[] = [
    {
      "id": "en",
      "title": "LOCALES.EN",
      "flag": "EN",
      "iso3code": "USA",
      "enabled": false
    },
    {
      "id": "it",
      "title": "LOCALES.IT",
      "flag": "IT",
      "iso3code": "ITA",
      "enabled": false
    }
  ]
  showForm = false;
  configForm: ApplicationConfig;
  @Output() setAppConfig = new EventEmitter();
  @Output() exportAppConfig = new EventEmitter();
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

  constructor(public appService: ApplicationConfigService, public i18nService: I18nService) { }

  ngOnInit(): void { }

  formSubmit(form: OctoFormModel) {
    console.log("02 FORM SUBMIT START", form);
    this.appConfigForm = { ...form };
    const languagesValue = this.appConfigForm.sections[6].fields[1].value as string[];
    if (languagesValue) {
      let newLanguagesValue: any[] = []
      languagesValue?.forEach(lang => {
        this.languages.forEach((language) => {
          if (lang === language.flag) {
            language.enabled = true;
            newLanguagesValue = [language, ...newLanguagesValue];
          }
        })
      })
      this.appConfigForm.sections[6].fields[1].value = newLanguagesValue;
    }
    console.log("03 RESULT FORM SUBMIT START", this.appConfigForm);
    this.setAppConfig.emit(this.appConfigForm);
  }

  formChange(form: OctoFormModel) {
    console.log('form emit changes', form);
  }


  editConfig() {
    this.appConfigForm.sections[0].fields[0].value = this.configForm.startup;
    this.appConfigForm.sections[1].fields[0].value = this.configForm.customerInfo.name;
    this.appConfigForm.sections[1].fields[1].value = this.configForm.customerInfo.address;
    this.appConfigForm.sections[1].fields[2].value = this.configForm.customerInfo.supportEmail;
    this.appConfigForm.sections[1].fields[3].value = this.configForm.customerInfo.phone;
    this.appConfigForm.sections[2].fields[0].value = this.configForm.network.host;
    this.appConfigForm.sections[2].fields[1].value = this.configForm.network.basePath;
    this.appConfigForm.sections[2].fields[2].value = this.configForm.network.hostApi;
    this.appConfigForm.sections[2].fields[3].value = this.configForm.network.hostApiV1;
    this.appConfigForm.sections[2].fields[4].value = this.configForm.network.hostApiV2;
    this.appConfigForm.sections[2].fields[5].value = this.configForm.network.hostApiV3;
    this.appConfigForm.sections[2].fields[6].value = this.configForm.network.openViduServerUrl;
    this.appConfigForm.sections[3].fields[0].value = this.configForm.authenticationSettings.enableAuthentication;
    this.appConfigForm.sections[3].fields[1].value = this.configForm.authenticationSettings.authenticationMode;
    this.appConfigForm.sections[4].fields[0].value = this.configForm.idleConfig.timeout;
    this.appConfigForm.sections[4].fields[1].value = this.configForm.idleConfig.idle;
    this.appConfigForm.sections[4].fields[2].value = this.configForm.idleConfig.ping;

    this.appConfigForm.sections[5].fields[0].value = this.configForm.layoutSettings.defaultLayout;
    this.appConfigForm.sections[5].fields[1].value = this.configForm.layoutSettings.layouts;
    this.appConfigForm.sections[6].fields[0].value = this.configForm.languageSettings.defaultLanguage;

    let enabledLanguageFromConfig: string[] = [];
    this.configForm.languageSettings.languages?.forEach((language: Language) => {
      if (language.enabled === true) {
        enabledLanguageFromConfig = [language.flag, ...enabledLanguageFromConfig];
      }
    });
    this.appConfigForm.sections[6].fields[1].value = enabledLanguageFromConfig;
    this.appConfigForm.sections[7].fields[0].value = this.configForm.theme.favicon;
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
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Startup',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'select',
          options: [
            { value: 'file', label: 'File' },
            { value: 'api', label: 'API' },
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
          placeholder: 'Ex Euronovate, Siga98...',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Name',
          labelColor: '',
          borderColor: 'border-red-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'text',
          validation: {
            required: false,
            maxLength: 4,
            regEx: '^[aeiouy]+$'
          },
          sectionId: '2',
        },
        {
          id: '2',
          name: 'address',
          disabled: false,
          placeholder: 'Ex via roma 1',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Address',
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
          id: '3',
          name: 'supportEmail',
          disabled: false,
          placeholder: 'Ex support@treeocto.com',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Support Email',
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
          name: 'phone',
          disabled: false,
          placeholder: 'Ex +3472941411',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Phone',
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
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Host',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          multipleSelection: false,
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
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Base path',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Host API',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: '',
          placeholderColor: 'Choose one',
          appearance: 'simple',
          label: 'Host API V1',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: '',
          placeholderColor: 'Choose one',
          appearance: 'simple',
          label: 'Host API V2',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Host API V3',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: '',
          placeholderColor: '',
          appearance: 'simple',
          label: 'OpenVidu server url',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
      name: 'authenticationSettings',
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
          placeholder: '',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Enable authentication',
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
          sectionId: '4'
        },
        {
          id: '2',
          name: 'authenticationMode',
          disabled: false,
          placeholder: 'JWT or Cookie',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Authentication mode',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: 'Ex 1000',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Timeout',
          labelColor: '',
          borderColor: 'border-green-700',
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

          placeholder: 'Ex 1000',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Idle',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          placeholder: 'Ex 1000',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Ping',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
      name: 'layoutSettings',
      title: 'Layout settings',
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
          placeholder: 'Choose one',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Default layout',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'autocomplete',
          options: [
            { value: '/landingpage', label: 'landingpage' },
            { value: '/dashboard', label: 'dashboard' },
            { value: '/workflow', label: 'workflow' },
            { value: '/configurator', label: 'configurator' },
          ],
          validation: {
            required: true,
          },
          sectionId: '6',
        },
        {
          id: '2',
          name: 'layouts',
          disabled: false,
          placeholder: 'Choose one or more',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Layouts',
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
            { value: '/landingpage', label: 'landingpage' },
            { value: '/dashboard', label: 'dashboard' },
            { value: '/workflow', label: 'workflow' },
            { value: '/configurator', label: 'configurator' },
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
      name: 'languageSettings',
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
          placeholder: 'Ex en, it ...',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Default language',
          labelColor: '',
          borderColor: 'border-green-700',
          borderWidth: '',
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
          sectionId: '7',
        },
        {
          id: '2',
          name: 'languages',
          disabled: false,
          placeholder: 'Choose one or more',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Languages',
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
            {
              label: 'USA',
              value: 'EN'
            },
            {
              label: 'ITA',
              value: 'IT'
            }
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
          placeholder: 'Insert file ico',
          placeholderColor: '',
          appearance: 'simple',
          label: 'Favicon',
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
          sectionId: '8',
        }
      ]
    },
  ],
};
