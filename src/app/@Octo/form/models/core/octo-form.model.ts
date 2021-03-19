import { OctoAuditModel } from './octo-audit.model';
import { OctoSectionModel } from './octo-section.model';

export interface OctoFormModel {
  id: number;
  title: string;
  class: string;
  style: string;
  sections: OctoSectionModel[];
  audit: OctoAuditModel;
  mode: string;
}
