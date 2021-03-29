import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input} from '@angular/core';
// import { euronovateAnimations } from '../../../@euronovate-theme/animations';
import { PdfActionButtons } from '../../models/pdf-action-buttons.model';

@Component({
  selector: 'en-actions-buttons',
  templateUrl: './actions-buttons.component.html',
  styleUrls: ['./actions-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [euronovateAnimations],
})
export class ENActionsButtonsComponent implements OnInit {

  @Output() drawingField = new EventEmitter<void>();
  @Output() drawingImage = new EventEmitter<void>();
  @Output() drawingFreeHand = new EventEmitter<void>();
  @Output() editField = new EventEmitter<void>();
  @Output() printView = new EventEmitter<void>();
  @Input() config: PdfActionButtons;
  showFieldActions = false;

  constructor() { }

  ngOnInit(): void {}
}
