import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '@euronovate-theme/directives/euronovate-dnd/euronovate-dnd.directive.model';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ENDocument } from '../../models/document.model';
import { ENDossier } from '../../models/dossier.model';

const createDocumentForm = (document?: ENDocument): FormGroup => {
  return new FormGroup({
    documentId: new FormControl(document?.documentId ? document.documentId : new Date().getTime().toString()),
    description: new FormControl(document?.description ? document.description : ''),
    documentFields: new FormControl(document?.documentFields ? document.documentFields : []),
    name: new FormControl(document?.name ? document.name : '', Validators.required),
    status: new FormControl(document?.status ? document.status : 0, Validators.required),
    priority: new FormControl(document?.priority ? document.priority : ''),
    type: new FormControl(document?.type ? document.type : ''),
    url: new FormControl(document?.url ? document.url : '', Validators.required),
    drawSignatureFields: new FormControl(document?.drawSignatureFields ? document.drawSignatureFields : false),
    showSignatureFields: new FormControl(document?.showSignatureFields ? document.showSignatureFields : false)
  });
};

@Component({
  selector: 'app-dossier-configurator',
  templateUrl: './dossier-configurator.component.html',
  styleUrls: ['./dossier-configurator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DossierConfiguratorComponent implements OnInit, OnDestroy {
  
  private $unsubscribeAll: Subject<void> = new Subject<void>();
  isEdit = false;
  isSelected = false;
  selectedDocument: ENDocument;
  selectedDocumentIndex = -1;
  dossierForm: FormGroup;
  documentForm: FormGroup = createDocumentForm();
  currentIndexes: number;
  documentStatus: string[] = [
    'PENDING',
    'SUSPENDED',
    'OPEN',
    'CLOSED'
  ];

  constructor(public dialogRef: MatDialogRef<DossierConfiguratorComponent>,
              @Inject(MAT_DIALOG_DATA) public dossier: ENDossier) {}

  ngOnInit(): void {
    this.dossierForm = new FormGroup({
      dossierId: new FormControl(this.dossier?.dossierId ? this.dossier.dossierId : ''),
      name: new FormControl(this.dossier?.name ? this.dossier.name : '', Validators.required),
      status: new FormControl(this.dossier?.status ? this.dossier.status : 0, Validators.required),
      userId: new FormControl(this.dossier?.userId ? this.dossier.userId : '12345'),
      isEdit: new FormControl(this.dossier?.isEdit ? this.dossier.isEdit : false),
      documents: new FormArray([])
    });

    if (this.dossier?.documents.length > 0) {
      this.dossier.documents.forEach(document => this.documents.push(createDocumentForm(document)));
    }

    this.documentForm.get('drawSignatureFields').valueChanges.pipe(
      takeUntil(this.$unsubscribeAll),
      distinctUntilChanged()
    ).subscribe((value: boolean) => {
      const showSignatureFields = this.documentForm.get('showSignatureFields');
      !value ? showSignatureFields.disable() : showSignatureFields.enable();
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribeAll.next();
  }

  get documents(): FormArray {
    return this.dossierForm.get('documents') as FormArray;
  }

  addDocument() {
    if (this.isEdit && ~this.selectedDocumentIndex) {
      this.documents.at(this.selectedDocumentIndex).patchValue(this.documentForm.value);
    } else {
      this.documents.push(createDocumentForm(this.documentForm.value));
    }
    this.resetDocumentForm();
  }

  resetDocumentForm() {
    this.documentForm.reset();
    this.documentForm.updateValueAndValidity();
    this.isEdit = false;
    this.selectedDocument = undefined;
  }

  onFileSelected(file: FileHandle) {
    const name = file.file.name;
    this.documentForm.get('name').setValue(name);
    this.documentForm.get('url').setValue(file.url);
    this.documentForm.get('documentId').setValue(name);
    this.documentForm.get('status').setValue(0);
  }

  onDocumentSelect(document: ENDocument, index: number) {
    if (this.selectedDocument?.documentId === document.documentId) {
      this.isSelected = false;
      if (!this.isSelected) {
        this.resetDocumentForm();
      }
    } else {
      this.selectedDocument = {...document};
      this.selectedDocumentIndex = index;
      this.documentForm.setValue(document);
      this.isEdit = true;
      this.isSelected = true;
    } 
  }

  removeDocument(index: number) {
    this.documents.removeAt(index);
  }
}
