import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ENDocument } from '../../models/document.model';
import { PdfActionConfig } from '../../models/pdf-viewer.model';
import { DialogActionsComponent } from './dialog-actions/dialog-actions.component';

@Component({
  selector: 'en-pdf-actions',
  templateUrl: './pdf-actions.component.html',
  styleUrls: ['./pdf-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfActionsComponent implements OnInit {

  @Input() activeDocument: ENDocument;
  @Input() isAdmin: boolean;
  @Output() showSignatureFields = new EventEmitter<void>();

  // @Output() setSignType = new EventEmitter<string>();
  // @Output() forward = new EventEmitter<void>();
  // @Output() seal = new EventEmitter<void>();
  // @Output() review = new EventEmitter<void>();
  // @Output() sign = new EventEmitter<void>();
  // @Output() abort = new EventEmitter<void>();

  dialogConfig: MatDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '400px',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }


  openDialog() {
    this.dialog.open(DialogActionsComponent, this.dialogConfig);
  }


}
