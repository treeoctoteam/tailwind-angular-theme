import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentStatus } from '../../models/document.model';
import { ENDossier } from '../../models/dossier.model';

@Component({
  selector: 'app-dossier-card',
  templateUrl: './dossier-card.component.html',
  styleUrls: ['./dossier-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DossierCardComponent {

  @Input() dossier: ENDossier;
  @Output() dossierSelected = new EventEmitter<ENDossier>()
  @Output() editDossier = new EventEmitter<ENDossier>();
  showCounter = false;
  dossierStatus = DocumentStatus;

  constructor() { }

  // getStatusColor(): { primaryColor: string, secondaryColor: string } {
  //   switch (this.dossier.status) {
  //     case this.dossierStatus.PENDING:
  //       return { primaryColor: '#23CBF4', secondaryColor: '#06BAEE' };
  //     case this.dossierStatus.SUSPENDED:
  //       return { primaryColor: '#FFBD00', secondaryColor: '#F1A402' };
  //     case this.dossierStatus.OPEN:
  //       return { primaryColor: '#62DE82', secondaryColor: '#66CA7F' };
  //     case this.dossierStatus.CLOSED:
  //       return { primaryColor: '#FF7F92', secondaryColor: '#FF5E6E' };
  //   }
  // }

}
