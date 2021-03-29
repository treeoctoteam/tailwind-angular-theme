import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EuronovateTranslationLoaderService } from '@euronovate-theme/services/translation-loader.service';
import { ENDocumentField } from './models/document-fields.model';
import { PdfViewerConfig, PdfHeaderConfig } from './models/pdf-viewer.model';
import { locale as En } from './i18n/en';
import { locale as It } from './i18n/it';
import { of, Subject } from 'rxjs';
import { ENDocument } from './models/document.model';
import { DossierService } from './services/dossier.service';
import { map, mergeMap, pluck, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayMenuService } from '@euronovate-pdf-manager/services/overlay-menu.service';
import { AuthenticationService } from '@euronovate-auth/services/authentication.service';
import { EuronovateSidebarService } from '@euronovate-theme/components/sidebar/sidebar.service';

@Component({
  selector: 'app-pdf-reader',
  templateUrl: './pdf-reader.component.html',
  styleUrls: ['./pdf-reader.component.scss'],
  providers: [OverlayMenuService]
})
export class PdfReaderComponent implements OnInit, OnDestroy {

  private $unsubscribeAll: Subject<void> = new Subject<void>();
  @ViewChild('documentConfig') documentConfigTemplateRef: TemplateRef<any>;

  dossierName = 'Dossier Name';
  documents: ENDocument[] = [];
  activeDocument: ENDocument;
  currentDocumentIndex = 0;
  activeSignatureField: ENDocumentField;
  currentSignatureFieldIndex = -1;
  canDrawSignature = true;

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

  headerConfig: PdfHeaderConfig = {
    showSignatureWidget: true,
    isNextDisabled: false,
    isPrevDisabled: false,
    showTitle: true
  }

  showSidebar = true;
  showSignatureFields = true;
  isAdmin = false;
  startDrowing = false;

  constructor(private translationLoader: EuronovateTranslationLoaderService,
    private overlayService: OverlayMenuService,
    private route: ActivatedRoute,
    private dossierService: DossierService,
    private _router: Router,
    private _authService: AuthenticationService,
    private euronovateSidebarService: EuronovateSidebarService
  ) { }

  ngOnInit(): void {
    this.translationLoader.loadTranslations(En, It);
    this.route.paramMap.pipe(
      takeUntil(this.$unsubscribeAll),
      pluck('params', 'dossierGuid'),
      withLatestFrom(this.dossierService.$dossiers),
      mergeMap(([dossierId, dossiers]) => of({ dossierId, dossiers })),
      map(({ dossierId, dossiers }) => dossiers.find(d => +d.dossierId === +dossierId)),
      tap(dossier => this.dossierName = dossier?.name),
      map(dossier => dossier.documents),
    ).subscribe((documents: ENDocument[]) => {
      for (let document of documents) {
        if (typeof document.url === 'string') {
          document.url = this.convertBase64ToBlob(document.url as string);
        } else {
          document.url = document.url[Object.keys(document.url)[0]];
        }
      }
      this.documents = [...documents];
      this.setActiveDocument(this.documents[this.currentDocumentIndex]);
    });

    if (this._router.url.includes("/document")) {
      this.showSidebar = false;
    }

    const userRole = this._authService.loggedUserValue.roles[0].name;
    if (userRole == "Administrator") {
      this.isAdmin = true;
    }
  }

  ngOnDestroy(): void {
    this.$unsubscribeAll.next();
    this.$unsubscribeAll.complete();
  }

  documentSelected(document: ENDocument): void {
    if (this.activeDocument.documentId !== document.documentId) {
      this.setActiveDocument(document);
      this.resetSignatureFields();
      this.showSignatureWidget(this.activeDocument.showSignatureFields);
    }
  }

  nextSignature(): void {
    if (this.currentSignatureFieldIndex <= this.activeDocument?.documentFields?.length - 1) {
      this.currentSignatureFieldIndex++;
      this.setActiveSignatureField();
    }
  }

  prevSignature(): void {
    if (this.currentSignatureFieldIndex >= 0) {
      this.currentSignatureFieldIndex--;
      this.setActiveSignatureField();
    }
  }
  toggleSidebar(name): void {
    this.euronovateSidebarService.getSidebar(name).toggleOpen();
  }
  setActiveSignatureField(): void {
    this.activeSignatureField = { ...this.activeDocument.documentFields[this.currentSignatureFieldIndex] };
  }

  setSignatureFields(signatureField: ENDocumentField): void {
    this.activeDocument.documentFields = [...this.activeDocument.documentFields, signatureField];
  }

  setActiveDocument(document: ENDocument): void {
    this.activeDocument = { ...this.activeDocument, ...document };
  }
  deleteSignatureFields(fieldName) {
    this.activeDocument.documentFields = this.activeDocument.documentFields.filter(f => f.name !== fieldName);
  }
  presentDocumentConfig(event) {
    this.overlayService.open(event.mouseEvent, event.document, this.documentConfigTemplateRef);
  }

  changeDocumentConfig(showSignatureFields: boolean, document: ENDocument) {
    document.showSignatureFields = showSignatureFields;
    this.setActiveDocument(document);
    this.resetSignatureFields();
    this.showSignatureWidget(showSignatureFields);
  }

  resetSignatureFields() {
    this.currentSignatureFieldIndex = -1;
    this.activeSignatureField = null;
  }

  showSignatureWidget(checkValue: boolean): void {
    this.headerConfig.showSignatureWidget = checkValue;
  }

  convertBase64ToBlob(documentUrl: string, contentType = '') { // TODO remove function
    const b64toBlob = (b64Data: string, contentType: string, sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }

    const blob = b64toBlob(documentUrl, contentType);
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
  }

  showSignatureFieldChange() {
    this.showSignatureFields = !this.showSignatureFields;
    this.changeDocumentConfig(this.showSignatureFields, this.activeDocument)
  }

}
