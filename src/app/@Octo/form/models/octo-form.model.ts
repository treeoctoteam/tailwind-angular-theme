import { OctoAuditModel } from './octo-audit.model';
import { OctoSectionModel } from './octo-section.model';

export interface OctoFormModel {
  id: string;
  title: string;
  class: string;
  style: string;
  sections: OctoSectionModel[];
  audit?: OctoAuditModel;
  mode: string;
}
