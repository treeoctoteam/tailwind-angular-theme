import { AfterViewInit, Component, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SignatureDialogComponent } from '../../components/signature-dialog/signature-dialog.component';
import { ENDocumentField } from '../../models/document-fields.model';
import { ENDocument } from '../../models/document.model';
import { PdfActionButtons } from '../../models/pdf-action-buttons.model';
import { PdfViewerConfig } from '../../models/pdf-viewer.model';
import { OverlayMenuService } from '../../services/overlay-menu.service';
import { ENCanvasDrawerService } from '../../../../projects/canvas-drawer/src/lib/en-canvas-drawer.service';
import { ENUploadImageDialogComponent } from '../../../@euronovate-theme/components/image-cropper/components/en-upload-image-dialog/en-upload-image-dialog.component';
import { of } from 'rxjs';

const createSignatureField = (documentFiled?: Partial<ENDocumentField>): ENDocumentField => {
  return {
    fieldName: documentFiled?.fieldName ? documentFiled.fieldName : '',
    description: documentFiled?.description ? documentFiled.description : '',
    type: documentFiled?.type ? documentFiled.type : 'signatureField',
    mandatory: documentFiled?.mandatory ? documentFiled.mandatory : null,
    parentName: documentFiled?.parentName ? documentFiled.parentName : '',
    priority: documentFiled?.priority ? documentFiled.priority : null,
    signed: documentFiled?.signed ? documentFiled.signed : null,
    signTime: documentFiled?.signTime ? documentFiled.signTime : null,
    backgroundImage: documentFiled?.backgroundImage ? documentFiled.backgroundImage : null,
    status: documentFiled?.status ? documentFiled.status : '',
    pageNumber: documentFiled?.pageNumber ? documentFiled.pageNumber : null,
    isEdited: documentFiled?.isEdited ? documentFiled.isEdited : false,
    dimensions: {
      w: documentFiled?.dimensions?.w ? documentFiled?.dimensions.w : 0,
      h: documentFiled?.dimensions?.h ? documentFiled?.dimensions.h : 0,
      x: documentFiled?.dimensions?.x ? documentFiled?.dimensions.x : 0,
      y: documentFiled?.dimensions?.y ? documentFiled?.dimensions.y : 0
    }
  }
}

export type CanvasActions = 'freeHand' | 'Image' | 'Field';

@Component({
  selector: 'en-pdf-manager',
  templateUrl: './pdf-manager.component.html',
  styleUrls: ['./pdf-manager.component.scss'],
  providers: [ENCanvasDrawerService, OverlayMenuService]
})
export class PdfManagerComponent implements AfterViewInit {

  @Input() document: ENDocument;
  @ViewChild('signForm') signFormTemplateRef: TemplateRef<any>;
  isPrientView = false;
  isOnUpdatePosition = false;
  activeDocumentField: ENDocumentField;
  isActionButtons = false;

  viewerConfig: PdfViewerConfig = {
    height: '100%',
    showBookmarkButton: false,
    showBorders: false,
    showDownloadButton: false,
    showOpenFileButton: false,
    showPrintButton: false,
    showRotateButton: false,
    showSecondaryToolbarButton: false
  };

  actionButtonsConfig: PdfActionButtons = {
    disableField: false,
    disableFreeHand: false,
    disableImage: false,
    disableEditField: true,
    disablePrintPreview: false
  }

  constructor(public canvasDrawerService: ENCanvasDrawerService,
              public overlayMenuService: OverlayMenuService,
              private dialog: MatDialog,
              private deviceDetector: DeviceDetectorService) {}

  ngAfterViewInit(): void {
    this.canvasDrawerService.$elementRightClickEvent.subscribe((node)=> {
      this.isOnUpdatePosition = false;
      this.activeDocumentField = this.setActiveDocumentField(node.id);
      const disableEditField = true;
      this.actionButtonsConfig = { ...this.actionButtonsConfig, disableEditField };
      this.overlayMenuService.open({x: 300, y: 300} as MouseEvent, null, this.signFormTemplateRef);
    });

    this.canvasDrawerService.$elementClickEvent.subscribe((node) => {
      this.isOnUpdatePosition = false;
      this.activeDocumentField = this.setActiveDocumentField(node.id);
      const disableEditField = false;
      this.actionButtonsConfig = { ...this.actionButtonsConfig, disableEditField };
    });

    this.canvasDrawerService.$handleActionButtons.subscribe(({disableField, disableEditField}: Pick<PdfActionButtons, 'disableField' | 'disableEditField'>) => {
      if (disableField !== undefined) {
        this.actionButtonsConfig = {...this.actionButtonsConfig, disableField};
      }
      if (disableEditField !== undefined) {
        this.actionButtonsConfig = {...this.actionButtonsConfig, disableEditField}
      }
    });

    this.canvasDrawerService.$addDocumentField.subscribe((signField) => {
      signField.isEdited = true;
      this.document.documentFields = [...this.document.documentFields, createSignatureField(signField)];
      this.checkPrintPreviewButton();
    });

    this.canvasDrawerService.$updateFieldPosition.subscribe(({dimensions, fieldName: name})=> {
      const currentSignField = this.document.documentFields.find(d => d.fieldName === name);
      if (currentSignField) {
        currentSignField.isEdited = true;
        currentSignField.dimensions = dimensions;
        this.isOnUpdatePosition = true;
        this.activeDocumentField = { ...this.activeDocumentField, dimensions };
      }
    });
  }

  private setActiveDocumentField(fieldName: string): ENDocumentField {
    const signatureField = this.document.documentFields.find(f => f.fieldName === fieldName);
    return signatureField;
  }

  drawingField() {
    if (this.deviceDetector.isDesktop()) {
      const disableField = true;
      this.actionButtonsConfig = { ...this.actionButtonsConfig, disableField };
      this.canvasDrawerService.createCanvasWrapper();
    } else {
      const signatureField = createSignatureField({
        fieldName: new Date().getTime().toString()
      });
      this.canvasDrawerService.createFieldMobile(signatureField);
    }
  }

  drawingFreeHand() {
    const dialogRef = this.dialog.open(SignatureDialogComponent, {
      minWidth: '330px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        const signatureField = createSignatureField({
          fieldName: new Date().getTime().toString(),
          pageNumber: this.canvasDrawerService.pageNumber,
          backgroundImage: result
        });
        this.document.documentFields = [...this.document.documentFields, signatureField];
        this.checkPrintPreviewButton();
        this.canvasDrawerService.drawInputElement(signatureField, true);
      }
    });
  }

  createDrawingImage() {
    const dialogRef = this.dialog.open(ENUploadImageDialogComponent, {
        minWidth: '300px',
        minHeight: '200px',
        data:{ title: "Carica la tua firma", message: ""}
      });
    dialogRef.afterClosed().subscribe((result: {success: boolean; imageBase64: string}) => {
      if(result?.success) {
        const signatureField = createSignatureField({
          fieldName: new Date().getTime().toString(),
          pageNumber: this.canvasDrawerService.pageNumber,
          backgroundImage: result.imageBase64
        });
        this.document.documentFields = [...this.document.documentFields, signatureField];
        this.checkPrintPreviewButton();
        this.canvasDrawerService.drawInputElement(signatureField, true);
      }
    });
  }

  closeMenu(){
    this.overlayMenuService.close();
    const disableEditField = false;
    this.actionButtonsConfig = { ...this.actionButtonsConfig, disableEditField };
  }

  formDataChange(documentField: ENDocumentField) {
    if (!this.isOnUpdatePosition) {
      this.canvasDrawerService.drawInputElement(documentField, false);
    }
  }

  editField(){
    if(this.activeDocumentField){
      const disableEditField = true;
      this.actionButtonsConfig = { ...this.actionButtonsConfig, disableEditField };
      this.overlayMenuService.open({ x: 300, y: 300 } as MouseEvent, null, this.signFormTemplateRef);
    }
  }

  deleteSignField(name: string) {
    this.canvasDrawerService.removeExistingElement(name);
    this.document.documentFields = this.document.documentFields.filter(f => f.fieldName !== name);
    this.checkPrintPreviewButton();
    this.closeMenu();
  }

  drawDocumentFields(documentField: ENDocumentField) {
    if (documentField?.isEdited === false) {
      documentField.isEdited = true;
      this.document.documentFields = [...this.document.documentFields, createSignatureField(documentField)];
      this.checkPrintPreviewButton();
    }
    if (documentField) {
      this.canvasDrawerService.drawInputElement(documentField, false);
    }
  }

  setCurrentPageElement(pageElement: HTMLElement) {
    this.canvasDrawerService.pageElement = pageElement;
  }

  setDocumentFields(signatureField: ENDocumentField){
    this.document.documentFields = [...this.document.documentFields, signatureField];
    this.checkPrintPreviewButton();
  }

  private checkPrintPreviewButton(){
    const disablePrintPreview = this.document?.documentFields?.length === 0;
    this.actionButtonsConfig = { ...this.actionButtonsConfig, disablePrintPreview };
  }

  printView(){
    this.isPrientView = !this.isPrientView;
    const pages = Array.from(document.querySelectorAll(".page"));
    pages.forEach(element => {
      const fields =Array.from(element.children);
      fields.filter((field) => {
        if (this.isPrientView && field.getAttribute("type")==="signatureField") {
          (field as HTMLElement).style.borderColor = "transparent";
          // hide resize button
          (field.children[0] as HTMLButtonElement).style.display = "none";
        }
        else if (!this.isPrientView && field.getAttribute("type") === "signatureField") {
          (field as HTMLElement).style.border = '2px solid #99042f';
          // show resize button
          (field.children[0] as HTMLButtonElement).style.display = "block";
        }
      })
    })
  }
}
