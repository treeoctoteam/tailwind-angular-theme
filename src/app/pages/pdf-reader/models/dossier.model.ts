import { ENDocument } from './document.model';

 export interface ENDossier {
  dossierId: number;
  name: string;
  status: number;
  userId?: string;
  isEdit?: boolean;
  documents: ENDocument[];
}
