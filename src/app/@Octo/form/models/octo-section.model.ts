import { OctoSectionValidationModel } from './octo-section-validation.model';
import { OctoFieldModel } from './octo-field.model';
import { OctoAuditModel } from './octo-audit.model';

export interface OctoSectionModel {
  id: string;
  name: string;
  title?: string;
  class: string;
  style: string;
  validation: OctoSectionValidationModel;
  fields: OctoFieldModel[];
  audit?: OctoAuditModel;
}
