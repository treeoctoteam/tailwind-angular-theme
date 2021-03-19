export class ResultMessage {
  status: boolean;
  message: string;
  code: number;

  public SetSuccess(message: string = 'SUCCESS'): void {
    this.code = 0;
    this.message = message;
    this.status = true;
  }
  public SetError(message: string = 'ERROR'): void {
    this.code = 1;
    this.message = message;
    this.status = false;
  }
  public SetWarning(message: string = 'WARNING'): void {
    this.code = 2;
    this.message = message;
    this.status = false;
  }
}
