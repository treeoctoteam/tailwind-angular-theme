import { ENDocumentField } from './document-fields.model';

export interface ENDocument {
  documentId: string;
  userId: string;
  description: string;
  documentFields: ENDocumentField[];
  name: string;
  status: string;
  priority: number;
  type: string;
  url: string | any;
  drawSignatureFields?: boolean;
  showSignatureFields?: boolean;
}

export enum DocumentStatus {
  PENDING,
  SUSPENDED,
  OPEN,
  CLOSED
}
