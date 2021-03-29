import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { ENCanvasDrawerService } from '../../../../projects/canvas-drawer/src/lib/en-canvas-drawer.service';

@Component({
  selector: 'app-signature-dialog',
  templateUrl: './signature-dialog.component.html',
  styleUrls: ['./signature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignatureDialogComponent implements AfterViewInit {

  imageData: any | string;
  isConfirmButton = false;
  regExpFileName = '(.*?)\.(jpg|bmp|jpeg|png)$';
  private $unsubscribe = new Subject<void>();

  @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { isFreeDraw: boolean },
      private canvasDrawerService: ENCanvasDrawerService,
      private cdRef: ChangeDetectorRef,
      public devicesDetector: DeviceDetectorService
      ) { }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = this.devicesDetector.isMobile() ? 300 : 600;
    this.canvasDrawerService.drawingFreeHand(this.canvas.nativeElement, this.$unsubscribe);
    this.canvasDrawerService.$imageData.subscribe((result: string) => {
      this.imageData = result;
      this.cdRef.markForCheck();
    } );
  }
}
