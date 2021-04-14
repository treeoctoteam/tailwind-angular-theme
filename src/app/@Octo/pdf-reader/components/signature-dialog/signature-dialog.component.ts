import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanvasDrawerService } from '../../services/canvas-drawer.service';

@Component({
  selector: 'octo-signature-dialog',
  templateUrl: './signature-dialog.component.html',
  styleUrls: ['./signature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignatureDialogComponent implements AfterViewInit, OnDestroy {

  imageData: any | string;
  isConfirmButton = false;
  regExpFileName = '(.*?)\.(jpg|bmp|jpeg|png)$';
  private $unsubscribe = new Subject<void>();

  @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;
  @Output() dismissDrawSignature  = new EventEmitter<{success: boolean} | void>();
  @Output() confirmSignatureDrawn = new EventEmitter<{success: boolean; imageBase64: string; }>();

  constructor(
    private canvasDrawerService: CanvasDrawerService,
    private cdRef: ChangeDetectorRef,
    public devicesDetector: DeviceDetectorService
  ) { }

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = this.devicesDetector.isMobile() ? 300 : 760;
    this.canvas.nativeElement.height = this.devicesDetector.isMobile() ? 100 : 200;
    this.canvasDrawerService.drawingFreeHand(this.canvas.nativeElement, this.$unsubscribe);
    this.canvasDrawerService.$imageData.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe((result: string) => {
      this.imageData = result;
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
  }
}
