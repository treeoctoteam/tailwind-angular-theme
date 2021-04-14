import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import Cropper from 'cropperjs';

const INITIAL_ZOOM = 0.4;

@Component({
  selector: 'octo-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCropperComponent {

  cropper: Cropper;
  zoom = INITIAL_ZOOM;
  @Input() signatureFieldWidth: number;
  @Input() signatureFieldHeight: number;
  @Input()
  set imageSrc(src: string) {
    if (src) {
      this.createCropper(src);
    }
  }
  @Output() croppedImage = new EventEmitter<string>();

  constructor() { }

  private createCropper(src: string): void {
    const cropperContainer = document.getElementsByClassName('cropper-container')[0] as HTMLElement;
    cropperContainer.style.visibility = 'visible';
    const containerElement = document.querySelector('.img-cropper-container');
    const imageElement = containerElement?.getElementsByTagName('img').item(0);
    imageElement.src = src;
    const options: any = {
      aspectRatio: 19 / 6,
      toggleDragModeOnDblclick: false,
      viewMode: 0,
      zoomOnWheel: true,
      preview: '.img-preview',
      ready: () => {
        this.zoom = INITIAL_ZOOM;
        this.cropper.setDragMode('move');
        this.cropImage();
      },
      zoom: () => this.cropImage(),
      cropend: () => this.cropImage()
    };
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = new Cropper(imageElement, options);
  }

  onCropperZoom(type: 'zoom-in' | 'zoom-out') {
    const containerData = this.cropper.getCropBoxData();
    const x = containerData.left + containerData.width / 2;
    const y = containerData.top + containerData.height / 2;
    if (type === 'zoom-in') {
      this.zoom += 0.025;
      this.cropper.zoomTo(this.zoom, { x, y });
    } else {
      this.zoom -= 0.025;
      this.cropper.zoomTo(this.zoom, { x, y });
    }
  }

  private cropImage(): void {
    const imageBase64 = this.cropper.getCroppedCanvas().toDataURL();
    this.croppedImage.next(imageBase64);
  }
}
