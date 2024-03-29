import { NavigationConfigFormComponent } from './../navigation-config-form/navigation-config-form.component';
import { OctoFormModel } from '../../../../@Octo/form/models/octo-form.model';
import { Component, EventEmitter, Input, ViewChild, Renderer2, ElementRef, Output } from '@angular/core';
import { DashboardConfig } from '../../../models/modules.model';

const navigationConfDialog = 'navigationConfDialogID';

@Component({
  selector: 'octo-dashboard-config-form',
  templateUrl: './dashboard-config-form.component.html',
  styleUrls: ['./dashboard-config-form.component.scss']
})
export class DashboardConfigFormComponent {
  // TODO fix with lazy loading see lazyLoadingComponent()
  @ViewChild('navigationConfigContainerNavbar') navigationConfigContainerNavbar: ElementRef;
  @ViewChild('navigationConfigContainerSidebar') navigationConfigContainerSidebar: ElementRef;
  @ViewChild('navigationConfigContainerFooter') navigationConfigContainerFooter: ElementRef;

  @ViewChild('navigationConfigComponentNavbar') navigationConfigComponentNavbar: NavigationConfigFormComponent;
  @ViewChild('navigationConfigComponentSidebar') navigationConfigComponentSidebar: NavigationConfigFormComponent;
  @ViewChild('navigationConfigComponentFooter') navigationConfigComponentFooter: NavigationConfigFormComponent;


  @Output() setDashboardConfig = new EventEmitter();
  @Output() exportDashboardConfig = new EventEmitter();
  @Input() set form(conf) {
    console.log('01 RECIVED CONF', conf);
    if (conf) {
      this.showForm = true;
      this.configForm = conf;
      this.editConfig();
    } else {
      this.showForm = false;
    }
  }

  dashboardConfigForm: OctoFormModel = DASHBOARDCONFIG_FORM;
  showForm = false;
  configForm: DashboardConfig;

  private navigationNavbar = [];
  private navigationSidebar = [];
  private navigationFooter = [];

  constructor(
    private render: Renderer2
  ) { }

  // async lazyLoadingComponent() {
  //   this.viewContainerRef.clear();
  //   const { NavigationConfigFormComponent } = await import('../navigation-config-form/navigation-config-form.component');
  //   this.viewContainerRef.createComponent(
  //     this.componentFactoryResolver.resolveComponentFactory(NavigationConfigFormComponent)
  //   )
  // }

  addEventToButton(sectionName: string, form) {
    const button = document.getElementById(form.sections.find(s => s.name === sectionName).fields.find(f => f.name === `${sectionName}NavigationButton`).id);
    const container = document.getElementById(form.sections.find(s => s.name === sectionName).fields.find(f => f.name === `${sectionName}NavigationConfigForm`).id);
    button.addEventListener('btnClick', e => {
      this.handleNavigationConfig(container, sectionName);
    });
  }

  formChange(event) {
    // console.log("EVENT", event)
  }

  formSubmit(form) {
    console.log('submit', form);
    this.dashboardConfigForm = { ...form };
    this.setDashboardConfig.emit({ form: this.dashboardConfigForm, footer: this.navigationFooter, navbar: this.navigationNavbar, sidebar: this.navigationSidebar });

  }

  editConfig() {
    this.dashboardConfigForm.sections[0].fields[0].value = this.configForm.navbar.logoPath;
    this.navigationNavbar = this.configForm.navbar.navigation;
    this.dashboardConfigForm.sections[1].fields[0].value = this.configForm.sidebar.logoPath;
    this.navigationSidebar = this.configForm.sidebar.navigation;
    this.dashboardConfigForm.sections[2].fields[0].value = this.configForm.footer.logoPath;
    this.navigationFooter = this.configForm.footer.navigation;
    this.dashboardConfigForm.sections[3].fields[0].value = this.configForm.authenticate;
    this.dashboardConfigForm.sections[3].fields[1].value = this.configForm.defaultRoute;
    // // TODO without timeout doesn't work because element is not already rendered
    setTimeout(() => {
      this.addEventToButton('navbar', this.dashboardConfigForm);
      this.addEventToButton('sidebar', this.dashboardConfigForm);
      this.addEventToButton('footer', this.dashboardConfigForm);
    }, 100);

    // this.navigationConfigComponent.nativeElement.navigationConfig = this.navigationNavbar;

  }

  handleNavigationConfig(container, sectionName) {
    if (sectionName === 'navbar') {
      this.render.appendChild(container as HTMLDivElement, this.navigationConfigContainerNavbar.nativeElement);
      this.navigationConfigComponentNavbar.setNavigationsConfigForType(this.navigationNavbar, sectionName);
    }
    else if (sectionName === 'footer') {
      this.render.appendChild(container as HTMLDivElement, this.navigationConfigContainerFooter.nativeElement);
      this.navigationConfigComponentFooter.setNavigationsConfigForType(this.navigationFooter, sectionName);
    }
    else if (sectionName === 'sidebar') {
      this.render.appendChild(container as HTMLDivElement, this.navigationConfigContainerSidebar.nativeElement);
      this.navigationConfigComponentSidebar.setNavigationsConfigForType(this.navigationSidebar, sectionName);
    }
  }

  setNewNavigationConfig(config) {
    if (config.sectionName === 'navbar') {
      this.navigationNavbar = config.navigation;
    }
    else if (config.sectionName === 'footer') {
      this.navigationFooter = config.navigation;
    }
    else if (config.sectionName === 'sidebar') {
      this.navigationSidebar = config.navigation;
    }
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
      class: 'border-2 broder-grey-100 rounded-md py-4 px-10',
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
          label: 'Navigation settings',
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
        },
        {
          id: 'f3s1',
          name: 'navbarNavigationConfigForm',
          class: 'w-full',
          style: 'width: 100%',
          disabled: false,
          placeholderColor: '',
          appearance: 'simple',
          label: '',
          labelColor: '',
          borderColor: '',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'container',
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
      class: 'border-2 broder-grey-100 rounded-md py-4 px-10',
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
          label: 'Navigation settings',
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
        },
        {
          id: 'f3s2',
          name: 'sidebarNavigationConfigForm',
          class: 'w-full',
          style: 'width: 100%',
          disabled: false,
          placeholderColor: '',
          appearance: 'simple',
          label: '',
          labelColor: '',
          borderColor: '',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'container',
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
      class: 'border-2 broder-grey-100 rounded-md py-4 px-10',
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
          label: 'Navigation settings',
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
        },
        {
          id: 'f3s3',
          name: 'footerNavigationConfigForm',
          class: 'w-full',
          style: 'width: 100%',
          disabled: false,
          placeholderColor: '',
          appearance: 'simple',
          label: '',
          labelColor: '',
          borderColor: '',
          borderWidth: '',
          textColor: '',
          backgroundColor: '',
          clearable: true,
          value: '',
          type: 'container',
          validation: {
            required: true,
          },
          sectionId: 's3',
        }
      ]
    },
    {
      id: 's4',
      name: 'othersconfig',
      title: 'Others config',
      class: 'border-2 broder-grey-100 rounded-md py-4 px-10',
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
          textColor: 'text-green-700',
          clearable: true,
          value: '',
          type: 'toggle',
          validation: {
            required: true
          },
          sectionId: 's4',
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
          type: 'text',
          validation: {
            required: true,
          },
          sectionId: 's4',
        }
      ]
    },

  ],
};
