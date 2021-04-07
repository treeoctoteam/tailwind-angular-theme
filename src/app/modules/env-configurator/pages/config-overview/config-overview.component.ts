
import { ConfiguratorService } from '../../services/configurator.service';
import { OctoFormModel } from 'src/app/@Octo/form/models/octo-form.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { octoAnimations } from 'src/app/shared/utils/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'octo-config-overview',
  templateUrl: './config-overview.component.html',
  styleUrls: ['./config-overview.component.scss'],
  animations: [octoAnimations]
})
export class ConfigOverviewComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public config: any;
  public editConfig: any;
  public isEditedMode = false;
  public optionSelected = "appconfig";

  options = [
    { value: 'appconfig', label: 'Appconfig' },
    { value: 'dashboard', label: 'Dashboard' },
  ];

  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  private setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement
    }
  }


  constructor(private router: Router, public appService: ApplicationConfigService, public configuratorService: ConfiguratorService) {
    if (configuratorService.isStarted) {

      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
      this.editorOptions.enableSort = false;
      this.editorOptions.enableTransform = false;
      this.config = this.appService.config;
    }
    else {
      this.router.navigateByUrl("/configurator/start");
    }
  }

  ngOnInit(): void {
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  export() {
    alert("exported!")
    this.dyanmicDownloadByHtmlTag({
      fileName: 'app-config.json',
      text: JSON.stringify(this.config)
    });
  }
  save() {
    alert("save!")
  }

  jchange(e: any) {
    console.log("JSON CHANGE", e)
  }
  change(e: any) {
    console.log("CHANGE", e)
  }

  setAppConfig(form: OctoFormModel) {
    console.log("04 SET APP CONFIG SUBMIT", form)
    const newConfig = this.configuratorService.generateAppConfigFromOctoForm(form);
    console.log("05 UPDATE APP CONFIG", newConfig);
    this.config = newConfig;
    this.editConfig = null;
  }

  setDashboardConfig(form: OctoFormModel) {
    const newConfig = this.configuratorService.generateDashboardConfigFromOctoForm(form);
    this.config = newConfig;
    this.editConfig = null;
  }

  editForm() {
    this.editConfig = this.config;
  }

  optionChange(event: Event) {
    this.optionSelected = (event as CustomEvent).detail.value;
    console.log(this.optionSelected);
    if (this.optionSelected === "dashboard") {
      this.configuratorService.getDashboardConfig().subscribe(res => {
        this.config = res;
      });
    }
    else if (this.optionSelected === "appconfig") {
      this.configuratorService.getApplicationConfig().subscribe(res => {
        this.config = res;
      });
    }
  }
}
