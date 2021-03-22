import { Component, OnInit } from '@angular/core';
import { OctoFormModel } from 'src/app/@Octo/form/models/core/octo-form.model';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';


const STARTUP: OctoFormModel = {
  "mode": "full",
  "id": 1,
  "title": "",
  "class": "",
  "style": "",
  "sections": [
    {
      "id": 1,
      "name": "",
      "class": "",
      "style": "",
      "validation": {
        "required": true
      },
      "fields": [
        {
          "id": 1,
          "name": "startup",
          "disabled": false,
          "readonly": false,
          "placeholder": "File, API ...",
          "placeholderColor": "",
          "appearance": "unstyled",
          "label": "Startup Mode",
          "labelColor": "",
          "borderColor": "",
          "textColor": "",
          "backgroundColor": "",
          "clearable": true,
          "value": "",
          "type": "autocomplete",
          "options": [
            { "value": "File", "label": "File" },
            { "value": "API", "label": "API" }
          ],
          "validation": {
            "required": true,
          },
          "sectionId": 1
        }
      ]
    }
  ]
}



@Component({
  selector: 'octo-app-config-form',
  templateUrl: './app-config-form.component.html',
  styleUrls: ['./app-config-form.component.scss']
})
export class AppConfigFormComponent implements OnInit {

  startupForm: OctoFormModel = STARTUP;
  constructor(public appService: ApplicationConfigService) { }

  ngOnInit(): void {
  }

  updateStartup(data: OctoFormModel) {
    console.log(data);
  }

}
