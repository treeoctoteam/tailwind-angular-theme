export interface OctoFieldValidationModel {
  required: boolean;
  min?: number;
  max?: number;
  minDate?: string;
  maxDate?: string;
  regEx?: string;
}
