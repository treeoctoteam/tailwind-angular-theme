import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { octoAnimations } from 'src/app/shared/utils/animations';
import { PdfActionButtons } from '../../models/pdf-action-buttons.model';

@Component({
  selector: 'octo-actions-buttons',
  templateUrl: './actions-buttons.component.html',
  styleUrls: ['./actions-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [octoAnimations],
})
export class ActionsButtonsComponent {

  @Output() drawingField = new EventEmitter<void>();
  @Output() drawingImage = new EventEmitter<void>();
  @Output() drawingFreeHand = new EventEmitter<void>();
  @Output() editField = new EventEmitter<void>();
  @Output() printView = new EventEmitter<void>();
  @Input() config: PdfActionButtons;
  showFieldActions = false;

  constructor() { }

}
