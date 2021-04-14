import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fileToBase64 } from '../../utils/common-functions';

export interface ImageCropperInfo {
  src: string;
  signatureFieldHeight: number;
  signatureFieldWidth: number;
}

@Component({
  selector: 'octo-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent implements OnInit {

  messageError = '';
  imageCropped = '';
  imageSrc = '';

  @Input() data: any;
  @Output() dismissImageCropper = new EventEmitter<{success: boolean} | void>();
  @Output() confirmCroppedImage = new EventEmitter<{success: boolean; imageBase64: string}>();

  constructor() {}

  ngOnInit(): void {}

  async uploadImage(event: any) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    const file = event.target.files[0] as File;
    if (file) {
      if (acceptedImageTypes.includes(file.type)) {
        this.imageSrc = await fileToBase64(file);
        this.messageError = '';
      } else {
        this.imageSrc = '';
        this.messageError = 'File non supportato.';
      }
      this.imageCropped = '';
    }
  }

  croppedImage(image: string) {
    this.imageCropped = image;
  }
}
