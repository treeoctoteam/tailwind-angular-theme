import { AppConfigFormComponent } from './../../components/app-config-form/app-config-form.component';
import { OctoFormModel } from 'src/app/@Octo/form/models/octo-form.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { octoAnimations } from 'src/app/shared/utils/animations';

@Component({
  selector: 'octo-config-overview',
  templateUrl: './config-overview.component.html',
  styleUrls: ['./config-overview.component.scss'],
  animations: [octoAnimations]
})
export class ConfigOverviewComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public appConfig: any;
  public editAppConfig: any;
  public isEditedMode = false;

  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  private setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement
    }
  }

  editedConfigForm: any;

  constructor(public appService: ApplicationConfigService) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;
    this.appConfig = this.appService.config;

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
      text: JSON.stringify(this.appConfig)
    });
  }
  save() {
    alert("save!")
  }

  jchange(e: any) {
    console.log("JCHANGE", e)
  }
  change(e: any) {
    console.log("CHANGE", e)
  }

  setAppConfig(form: OctoFormModel) {
    const newConfig = this.appService.generateConfigFromOctoForm(form);
    console.log("UPDATE APP CONFIG", newConfig);
    this.appConfig = newConfig;
    this.editAppConfig = null;
  }
  editForm() {
    this.editAppConfig = this.appConfig;
  }
}
