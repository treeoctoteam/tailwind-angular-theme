import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'octo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('customDialog') customTemplate: TemplateRef<any>;
  isButtonSpinner = false;

  constructor(private dialogService: DialogService,
              private loaderService: LoaderService) { }

  ngAfterViewInit(): void {
    this.showDialog1();
    this.showDialog2();
  }

  showDialog1() {
    const id = 'dialog1';
    this.dialogService.open({ dialogType: 'danger', dialogTitle: 'fsdf', hasCustomTemplate: false, hasBackdrop: true }, id)
      .pipe(filter(d => d.dialogId === id))
      .subscribe(response => console.log(response));
  }

  showDialog2() {
    const id = 'dialog2';
    this.dialogService.open({ dialogType: 'success', dialogTitle: 'fsdf', hasCustomTemplate: true, hasBackdrop: true }, id, this.customTemplate)
      .pipe(filter(d => d.dialogId === id))
      .subscribe(response => console.log(response));
  }

  closeDialog2() {
    this.dialogService.close('dialog2');
  }

  onSpinnerButton() {
    this.loaderService.isLoaderElement = true;
    this.isButtonSpinner = true;
    setTimeout(() => {
      this.isButtonSpinner = false;
      this.closeDialog2();
    }, 3000)
  }

  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
