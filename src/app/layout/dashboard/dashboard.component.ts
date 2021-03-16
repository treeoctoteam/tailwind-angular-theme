import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ToButton } from '@treeocto/ui-kit/dist/types/components/to-button/to-button';
import { delay } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'octo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('spinnerButton') private spinnerBtn: ElementRef<ToButton>;
  @ViewChild('spinnerButton2') private spinnerBtn2: ElementRef<ToButton>;
  @ViewChild('customDialog') customTemplate: TemplateRef<any>;
  isButtonSpinner = false;

  constructor(private dialogService: DialogService,
              private http: HttpClient,
              private loaderService: LoaderService) { }

  ngAfterViewInit(): void {
    this.showDialog1();
    this.showDialog2();
  }

  showDialog1() {
    // const id = 'dialog1';
    // this.dialogService.open({ dialogType: 'danger', dialogTitle: 'fsdf', hasCustomTemplate: false, hasBackdrop: true }, id)
    //   .pipe(filter(d => d.dialogId === id))
    //   .subscribe(response => console.log(response));
  }

  showDialog2() {
    // const id = 'dialog2';
    // this.dialogService.open({ dialogType: 'success', dialogTitle: 'fsdf', hasCustomTemplate: true, hasBackdrop: true }, id)
    //   .pipe(filter(d => d.dialogId === id))
    //   .subscribe(response => console.log(response));
  }

  closeDialog2() {
    this.dialogService.close('dialog2');
  }

  onSpinnerButton() {
    this.loaderService.elementRef = this.spinnerBtn;
    this.http.get('http://localhost:4200').pipe(
      delay(1000000)
      ).subscribe()
    }

  onSpinnerButton2() {
    this.loaderService.elementRef = this.spinnerBtn2;
    this.http.get('http://localhost:4200').pipe(
      delay(1000000)
    ).subscribe()
  }

  onSpinnerButton3() {
    this.loaderService.elementRef = undefined;
    this.http.get('http://localhost:4200').pipe(
      delay(1000000)
    ).subscribe()
  }

  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
