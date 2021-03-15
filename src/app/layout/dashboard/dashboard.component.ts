import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
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
    this.showDialog1();
    this.showDialog2();
  }

  showDialog1() {
    const id = 'dilog1';
    this.dialogService.open({ dialogType: 'danger', dialogTitle: 'fsdf', hasCustomTemplate: false, hasBackdrop: true }, id)
      .pipe(filter(d => d.dialogId === id))
      .subscribe(response => console.log(response));
  }

  showDialog2() {
    const id = 'dilog1';
    this.dialogService.open({ dialogType: 'success', dialogTitle: 'fsdf', hasCustomTemplate: false, hasBackdrop: true }, id)
      .pipe(filter(d => d.dialogId === id))
      .subscribe(response => console.log(response));
  }

  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
