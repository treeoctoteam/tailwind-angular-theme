import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'octo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('customDialog') customTemplate: TemplateRef<any>;

  constructor(private dialogService: DialogService) { }

  ngAfterViewInit(): void {
    this.dialogService.open({ dialogType: 'success', dialogTitle: 'fsdf' }, this.customTemplate)
      .subscribe(response => console.log(response));
  }


  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
