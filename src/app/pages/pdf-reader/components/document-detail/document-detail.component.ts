import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { euronovateAnimations } from '@euronovate-theme/animations';
import { Router } from '@angular/router';
import { FileHandle } from '@euronovate-theme/directives/euronovate-dnd/euronovate-dnd.directive.model';
import { ENDocument } from '../../models/document.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  animations: [euronovateAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailComponent implements OnInit {
  @Input() documentDetails: ENDocument;
  @Output() editDocumentDetails = new EventEmitter<ENDocument>();
  @Input() dossierId: number;

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  onFileSelected(file: FileHandle) {
    const name = file.file.name;
    this.documentDetails = { ...this.documentDetails, name };
    this.documentDetails.url = { ...this.documentDetails, url: file.url };
    this.documentDetails = { ...this.documentDetails, documentId: name };
  }

  clearDocumentDetails(): void {
    this.documentDetails = undefined;
  }

  signDocument() {
    this._router.navigate([`/pdf/dossier/${this.dossierId}/document/${this.documentDetails.documentId}`]);
  }

}
