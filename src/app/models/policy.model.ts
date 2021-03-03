export class Policy {
  constructor() {
    this._checked = false;
  }
  idCode: number;
  content: string; // html
  required: boolean;
  country: string;
  description: string;

  _checked: boolean;
}
