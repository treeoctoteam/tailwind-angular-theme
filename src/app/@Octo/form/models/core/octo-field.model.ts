import { OctoFieldValidationModel } from './octo-field-validation.model';
import { OctoAuditModel } from './octo-audit.model';
import { OctoFieldOptionModel } from './octo-field-option.model';

export interface OctoFieldModel {
  id: number;
  name: string;
  class: string;
  style: string;
  placeholder: string;
  appearance: string;
  icon: string;
  iconSet: string;
  label: string;
  value: any;
  type: string;
  options: OctoFieldOptionModel[]
  validation: OctoFieldValidationModel;
  sectionId: number;
  audit: OctoAuditModel;
}
