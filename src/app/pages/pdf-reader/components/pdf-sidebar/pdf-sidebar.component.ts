import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ENDocument } from '../../models/document.model';

@Component({
  selector: 'en-pdf-sidebar',
  templateUrl: './pdf-sidebar.component.html',
  styleUrls: ['./pdf-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PdfSidebarComponent implements OnInit {

  showDocumentPopover = false
  @Input() dossierName: string;
  @Input() documents: ENDocument[];
  @Input() activeDocumentName: string;
  @Output() documentSelected = new EventEmitter<ENDocument>();
  @Output() presentDocumentConfig = new EventEmitter<{ mouseEvent: MouseEvent, document: ENDocument }>();

  constructor() { }

  ngOnInit(): void { }

  handleDocumentConfig(mouseEvent: MouseEvent, document: ENDocument) {
    if (document.name === this.activeDocumentName) { // TODO change condition with ids
      this.presentDocumentConfig.emit({ mouseEvent, document });
    }
  }

  calculateState(signFields): string {
    return "";
  }

  calculateSignCompleted(signFields): number {
    return 0
  }
}
