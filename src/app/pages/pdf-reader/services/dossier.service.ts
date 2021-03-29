import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { ENDossier } from '../models/dossier.model';

const FAKE_DOSSIERS_URL = 'assets/fake/dossier-documents.json';

@Injectable()
export class DossierService {

  $dossiers = new BehaviorSubject<ENDossier[]>([]);
  private dossiers: ENDossier[] = [];

  constructor(private http: HttpClient) { }

  getDossiers() {
    const $dossierSub = environment.fake ? this.http.get(FAKE_DOSSIERS_URL).pipe(share()) : of(null);
    $dossierSub.subscribe((dossiers: ENDossier[]) => {
      this.dossiers = [...dossiers];
      this.$dossiers.next(this.dossiers);
    })
  }

  addDossier(newDossier: ENDossier) {
    newDossier.dossierId = new Date().getTime();
    newDossier.isEdit = false;
    this.dossiers = [...this.dossiers, newDossier];
    this.$dossiers.next(this.dossiers);
  }

  editDossier(dossier: ENDossier) {
    const index = this.dossiers.findIndex(d => d.dossierId === dossier.dossierId);
    this.dossiers[index] = {...this.dossiers[index], ...dossier};
    this.$dossiers.next(this.dossiers);
  }
}