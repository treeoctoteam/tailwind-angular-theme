import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ENDocumentField } from '../../models/canvas-drawer.model';
import { ENDocument } from '../../models/document.model';

@Component({
  selector: 'octo-pdf-reader',
  templateUrl: './pdf-reader.component.html',
  styleUrls: ['./pdf-reader.component.scss']
})
export class PdfReaderComponent implements OnInit {

  documents: ENDocument[] = [];
  activeDocument: ENDocument;
  currentDocumentIndex = 0;
  activeSignatureField: ENDocumentField;
  currentSignatureFieldIndex = -1;
  canDrawSignature = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ENDocument>('assets/pdf-test/fake-document.json')
    .subscribe((response: ENDocument) => {
      if (response) {
        this.activeDocument = response;
      }
    });
  }

}
