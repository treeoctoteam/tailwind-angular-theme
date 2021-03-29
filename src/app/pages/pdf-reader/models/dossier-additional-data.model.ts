import { Manager } from './manager.model';

export interface DossierAdditionalData {
  sender: string;
  employeeID: string;
  employeeName: string;
  employeeVisualID: string;
  dossierName: string;
  dossierDescription: string;
  processName: string;
  customerName: string;
  internalOperationCode: string;
  managers: Manager[];
  documents: any;
}
