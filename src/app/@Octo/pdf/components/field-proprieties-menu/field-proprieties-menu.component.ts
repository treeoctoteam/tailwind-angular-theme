import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ENDocumentField } from '../../models/document-fields.model';

const createSignFieldForm = (): FormGroup => {
  return new FormBuilder().group({
    description: [''],
    mandatory: [''],
    fieldName: [''],
    pageNumber: [''],
    parentName: [''],
    priority: [''],
    signed: [''],
    signTime: [''],
    status: [''],
    type: [''],
    isEdited: [''],
    backgroundImage: [''],
    dimensions: new FormBuilder().group({
      w: [''],
      h: [''],
      x: [''],
      y: ['']
    })
  });
}

@Component({
  selector: 'en-field-proprieties-menu',
  templateUrl: './field-proprieties-menu.component.html',
  styleUrls: ['./field-proprieties-menu.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldProprietiesMenuComponent implements OnInit, OnDestroy {

  $unsubscribe = new Subject<void>();
  signFieldForm: FormGroup = createSignFieldForm();
  @Input() set activeDocumentField(data: ENDocumentField){
    if (data) {
      this.signFieldForm.setValue(data);
    }
  }
  @Output() closeMenu = new EventEmitter<void>();
  @Output() formDataChange = new EventEmitter<Partial<ENDocumentField>>();
  @Output() deleteSignField = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.signFieldForm.valueChanges.pipe(
      takeUntil(this.$unsubscribe),
      distinctUntilChanged()
    ).subscribe(value => this.formDataChange.emit(value));
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
  }

  closeOverlayMenu() {
    this.closeMenu.emit()
  }

  deleteSignFieldElement(){
    const name = this.signFieldForm.get('fieldName').value;
    this.deleteSignField.emit(name);

  }
}
