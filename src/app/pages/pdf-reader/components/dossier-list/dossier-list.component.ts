import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { EnAlert, EnAlertType } from '@euronovate-notification-center/model/en-alert';
import { EnAlertService } from '@euronovate-notification-center/services/en-alert.service';
import { euronovateAnimations } from '@euronovate-theme/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ENDocument } from '../../models/document.model';
import { ENDossier } from '../../models/dossier.model';
import { DossierService } from '../../services/dossier.service';
import { DossierConfiguratorComponent } from '../dossier-configurator/dossier-configurator.component';

@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.scss'],
  animations: euronovateAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DossierListComponent implements OnInit {

  private $unsubscribeAll: Subject<void> = new Subject<void>();
  dossiers: ENDossier[] = [];
  showGridView = true;
  documentDetails: ENDocument;
  dossierSelectedId = 0;

  constructor(private dossierService: DossierService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dossierService.getDossiers()
    this.dossierService.$dossiers.pipe(
      takeUntil(this.$unsubscribeAll)
    ).subscribe((response: ENDossier[]) => {
      this.dossiers = [...response];
      this.changeDetectorRef.markForCheck();
    });
  }

  dossierSelected(dossier: ENDossier) {
    this.dossierSelectedId = dossier.dossierId;
    this.router.navigate([`/pdf/dossier/${dossier.dossierId}`]);
  }

  editDossier(dossier: ENDossier) {
    dossier.isEdit = true;
    this.presentDossierConfigurator(dossier);
  }

  onToggleViewChange() {
    this.showGridView = !this.showGridView;
  }

  documentSelected(document: ENDocument | undefined) {
    this.documentDetails = document !== undefined ? { ...this.documentDetails, ...document } : document;
  }

  editDocument(document: ENDocument) {
    // this.dossiers
  }

  presentDossierConfigurator(dossier?: ENDossier) {
    const dialogRef = this.dialog.open(DossierConfiguratorComponent, {
      disableClose: true,
      hasBackdrop: true,
      maxHeight: '90vh',
      width: '65vw',
      data: dossier
    });

    dialogRef.afterClosed().subscribe((dossier: ENDossier) => {
      if (dossier) {

        !dossier.isEdit ?
          this.dossierService.addDossier(dossier) :
          this.dossierService.editDossier(dossier);

        // let alert: EnAlert = {
        //   icon: "success",
        //   title: "SUCCESS",
        //   message: `Dossier ${dossier.name} ${dossier.isEdit ? 'edited' : 'created'} successfully!`,
        //   timeout: 3500,
        //   type: EnAlertType.success,
        //   id: 0,
        // }
        // return this.alertService.show(alert);
      }
    });
  }

  dossierSelectedIdChange(dossierId: number){
    this.dossierSelectedId = dossierId;
  }

}
