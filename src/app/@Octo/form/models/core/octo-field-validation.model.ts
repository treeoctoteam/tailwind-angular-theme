export interface OctoFieldValidationModel {
  required: boolean;
  min: number;
  max: number;
  maxLength: number;
  minLength: number;
  minDate: string;
  maxDate: string;
  regEx: string;
}
