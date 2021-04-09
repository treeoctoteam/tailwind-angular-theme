import { TOInputAppearance } from '@treeocto/ui-kit/dist/types/utils/utils';
import { TOInputType } from '@treeocto/ui-kit/dist/types/components/to-input/to-input';
import { OctoFieldOptionModel } from './octo-field-option.model';
import { OctoFieldValidationModel } from './octo-field-validation.model';
import { OctoAuditModel } from './octo-audit.model';

export type OctoFieldType = TOInputType | 'select' | 'autocomplete' | 'toggle' | 'checkbox' | 'textarea' | 'button' | 'container';

export interface OctoFieldModel {
  id: string;
  class?: string;
  style?: string;
  name: string;
  disabled: boolean;
  value: string | number | string[] | boolean;
  placeholder?: string;
  appearance: TOInputAppearance;
  type: OctoFieldType;
  multipleSelection?: boolean;
  clearable?: boolean;
  label?: string;
  labelColor?: string;
  borderColor?: string;
  placeholderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderWidth?: string;
  options?: OctoFieldOptionModel[];
  validation?: Partial<OctoFieldValidationModel>;
  sectionId: string;
  audit?: OctoAuditModel;
}
