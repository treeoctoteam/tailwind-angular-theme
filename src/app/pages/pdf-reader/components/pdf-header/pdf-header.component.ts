import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EuronovateSidebarService } from '@euronovate-theme/components/sidebar/sidebar.service';
import { PdfHeaderConfig } from '../../models/pdf-viewer.model';

@Component({
  selector: 'en-pdf-header',
  templateUrl: './pdf-header.component.html',
  styleUrls: ['./pdf-header.component.scss'],
})
export class PdfHeaderComponent implements OnInit {

  @Input() config: PdfHeaderConfig;
  @Input() title: string;
  @Output() nextSignature = new EventEmitter<void>();
  @Output() prevSignature = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }


}
