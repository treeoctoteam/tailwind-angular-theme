import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'octo-config-overview',
  templateUrl: './config-overview.component.html',
  styleUrls: ['./config-overview.component.scss']
})
export class ConfigOverviewComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  private setting = {
    element: {
      dynamicDownload: null as unknown as HTMLElement
    }
  }

  constructor(public appService: ApplicationConfigService) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.editorOptions.enableSort = false;
    this.editorOptions.enableTransform = false;

    this.data = appService.config;
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
      text: JSON.stringify(this.data)
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
}
