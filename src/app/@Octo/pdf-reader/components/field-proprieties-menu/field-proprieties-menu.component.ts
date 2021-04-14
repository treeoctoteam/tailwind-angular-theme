import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ENDocumentField } from '../../models/document-fields.model';

const createSignFieldForm = (): FormGroup => new FormBuilder().group({
    description: new FormControl(''),
    mandatory: new FormControl(''),
    fieldName: new FormControl(''),
    pageNumber: new FormControl(''),
    parentName: new FormControl(''),
    priority: new FormControl(''),
    signed: new FormControl(''),
    signTime: new FormControl(''),
    status: new FormControl(''),
    type: new FormControl(''),
    isEdited: new FormControl(''),
    backgroundImage: new FormControl(''),
    dimensions: new FormBuilder().group({
      w: new FormControl(''),
      h: new FormControl(''),
      x: new FormControl(''),
      y: new FormControl('')
    })
  });

@Component({
  selector: 'octo-field-proprieties-menu',
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
    this.closeMenu.emit();
  }

  deleteSignFieldElement(){
    const name = this.signFieldForm.get('fieldName')?.value;
    this.deleteSignField.emit(name);

  }
}
