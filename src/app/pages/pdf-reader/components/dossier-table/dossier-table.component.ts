import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EuronovateSidebarService } from '@euronovate-theme/components/sidebar/sidebar.service';
import { ENDocument } from '../../models/document.model';
import { ENDossier } from '../../models/dossier.model';

@Component({
  selector: 'app-dossier-table',
  templateUrl: './dossier-table.component.html',
  styleUrls: ['./dossier-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DossierTableComponent implements OnInit {

  @Input() dataSource: ENDossier[] = [];
  @Output() documentSelected = new EventEmitter<ENDocument>();
  @Output() signDossier = new EventEmitter<ENDossier>();
  @Output() dossierSelectedId = new EventEmitter<Number>();
  columnsToDisplay = ['#', 'name', 'status', 'actions'];
  expandedElement: ENDocument[] = [];
  selectedDocItem: ENDocument;

  constructor(private euronovateSidebarService: EuronovateSidebarService) { }

  ngOnInit(): void { }

  onDocumentSelect(document: ENDocument) {
    this.selectedDocItem = document;
    this.documentSelected.emit(this.selectedDocItem);
  }

  onDossierSelected(document) {
    this.expandedElement = this.expandedElement === document ? null : document;
    this.selectedDocItem = undefined;
    this.documentSelected.emit(this.selectedDocItem);
    this.dossierSelectedId.emit(document.dossierId)
  }

  toggleSidebar(name): void {
      this.euronovateSidebarService.getSidebar(name).toggleOpen();
  }
}
