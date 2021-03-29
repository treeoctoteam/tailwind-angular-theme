import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ENDocumentField } from '../../models/document-fields.model';

@Component({
  selector: 'en-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfViewerComponent implements OnInit {

  @Input() config: any;
  @Input() enableHandTool: boolean;
  @Input() documentSrc: string;
  @Output() currentPageElement = new EventEmitter<HTMLElement>();
  @Output() setDocumentFields = new EventEmitter<ENDocumentField>();
  @Output() drawDocumentFields = new EventEmitter<Partial<ENDocumentField>>();
  @Input() documentFields: ENDocumentField[];
  currentPageHeigth = 0;
  prevPageHeight = 0

  constructor() { }

  ngOnInit(): void {}

  loadComplete(event): void {
    if (event) {
      const pageElement = this.getPageElement(1);
      this.currentPageElement.emit(pageElement);
    }
  }

  pageRendered(event) {
    const pageData = event.source;
    const pageDimensions = {
      canvasWidth: pageData.canvas.clientWidth,
      canvasHeight: pageData.canvas.clientHeight,
      pageWidth: pageData.pdfPage.view[2],
      pageHeight: pageData.pdfPage.view[3]
    }
    const pageElement = this.getPageElement(pageData.id);
    this.currentPageHeigth = pageDimensions.canvasHeight;
    if (pageElement) {
      pageData.pdfPage.getAnnotations().then((annotations) => {
        let documentFields = [];
       if (this.prevPageHeight === 0 && annotations?.length > 0) {
          for (let annotation of annotations) {
            let documentField: Partial<ENDocumentField>;
            documentField = {
              dimensions: this.calculateSignaturePositionByAnnotationRect(annotation.rect, pageDimensions, pageElement),
              fieldName: annotation?.fieldName ? annotation.fieldName : new Date().getTime().toString(),
              isEdited: false,
              pageNumber: +pageData.id
            }
            documentFields = [...documentFields, documentField];
          }
          this.documentFields = [...this.documentFields, ...documentFields];
          for (let documentField of documentFields) {
            this.drawDocumentFields.emit(documentField);
          }
        }
        this.prevPageHeight = pageDimensions.canvasHeight;
      });
    }
  }

  pageChange(pageId: number) {
    const pageElement = this.getPageElement(pageId);
    this.currentPageElement.emit(pageElement);
  }

  zoomChange(value: number) {
    if (value) {
      for (let documentField of this.documentFields) {
        if (this.prevPageHeight !== 0) {
          documentField.dimensions = this.calculateSignaturePositionByDimensions(documentField.dimensions)
        }
        this.drawDocumentFields.emit(documentField);
      }
    }
  }

  private calculateSignaturePositionByAnnotationRect(signFieldRect: number[], pageDimensions, pageElement) {
    const fx = signFieldRect[0];
    const fh = Math.abs(signFieldRect[1] - signFieldRect[3]);
    const fy = signFieldRect[1] - (signFieldRect[1] - signFieldRect[3]) - fh;
    const fw = Math.abs(signFieldRect[2] - signFieldRect[0]);
    const elementDimensions = {
      h: (pageDimensions.canvasHeight * fh) / pageDimensions.pageHeight,
      w: (pageDimensions.canvasWidth * fw) / pageDimensions.pageWidth,
      y: (pageElement.clientHeight - ((pageDimensions.canvasHeight * fh) / pageDimensions.pageHeight) - ((pageDimensions.canvasHeight * fy) / pageDimensions.pageHeight)),
      x: (pageDimensions.canvasWidth * fx) / pageDimensions.pageWidth
    };
    return elementDimensions;
  }

  private calculateSignaturePositionByDimensions(fieldDimension) {
    const coefficient = this.currentPageHeigth / this.prevPageHeight;
    const elementDimensions = {
      h: fieldDimension.h * coefficient,
      w: fieldDimension.w * coefficient,
      y: fieldDimension.y * coefficient,
      x: fieldDimension.x * coefficient,
    };
    return elementDimensions;
  }

  private getPageElement(id: number): HTMLElement {
    const pageElement = document.getElementsByClassName('page')[id - 1] as HTMLElement;
    return pageElement;
  }
}
